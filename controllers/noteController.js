const asyncHandler = require("express-async-handler");

const pool = require("../config/db");

/**
 * @description Method get all the notes for username
 */
const getNotes = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const queryString =
    "SELECT note, id, done, created_at FROM notes where username = $1";
  const { rows } = await pool.query(queryString, [username]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error(`No Todo found for ${username}`);
  } else {
    res.status(200).json(rows);
  }
});

/**
 * @description Method to create a new note
 */
const createNote = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { note } = req.body;
  if (!note) {
    res.status(400);
    throw new Error("Please add a Todo");
  }

  const queryString =
    "INSERT INTO notes (note, username) VALUES ($1, $2) RETURNING *";
  const { rows } = await pool.query(queryString, [note, username]);
  res.status(201).json({ msg: "Todo created successfully", ...rows[0] });
});

const updateNote = asyncHandler(async (req, res) => {
  const { note, done } = req.body;
  const { id } = req.params;
  if (!note) {
    res.status(400);
    throw new Error("Pllease add a Todo");
  }

  console.info(`note - ${note} :: done - ${done} :: id - ${id}`);

  const queryString =
    "UPDATE notes SET note = $1, done = $2 WHERE id = $3 RETURNING *";
  const { rows } = await pool.query(queryString, [note, done, id]);
  console.info(`rows - ${JSON.stringify(rows)}`);

  if (rows.length === 0) {
    res.status(400);
    throw new Error("Todo doesn't exists");
  } else {
    res.status(200).json({ msg: "Todo updated successfully", ...rows[0] });
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const queryString = "DELETE FROM notes WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(queryString, [id]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error(`Todo doesn't exist for id - ${id}`);
  } else {
    res.status(200).json({ msg: "Todo deleted Successfully!!", ...rows[0] });
  }
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
