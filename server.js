const express = require("express");
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/note", require("./routes/note"));
app.use("/api/user", require("./routes/user"));

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.info(`Server is listening at ${PORT}`);
});
