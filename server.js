const express = require("express");
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
require("./cron/cronJob");
const path = require("path");

// Middleware
app.use(express.json());
app.use(cors());

// Client build
app.use(express.static("client/build"));

// Routes
app.use("/api/note", require("./routes/note"));
app.use("/api/user", require("./routes/user"));

// Catch-all handler
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.info(`Server is listening at ${PORT}`);
});

// new comment
