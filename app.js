const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path")
const app = express();





// const avatars = [];
// const booksDir = path.join(__dirname, "public", "avatars")
// app.post("/users/avatars", upload.single("avatar", async (req, res) => {
// const { path: tempUpload, originalname } = req.file
// const resultUpload = path.join(booksDir, originalname)
//   await fs.rename(tempUpload, resultUpload)
//   const avatar = path.join("avatars", originalname)

// }))










const authRouter = require("./routes/api/auth")
const contactsRouter = require("./routes/api/contacts");


const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/users", authRouter)
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
