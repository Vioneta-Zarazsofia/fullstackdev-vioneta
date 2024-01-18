const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Sesuaikan dengan password MySQL Anda
  database: "story", // Sesuaikan dengan nama database Anda
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.post("/story", upload.single("file"), (req, res) => {
  const { title, writes, synopsis, category, tags, status } = req.body;

  // Simpan data ke database
  const sql =
    "INSERT INTO stories (title, writes, synopsis, category, tags, status, file) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    title,
    writes,
    synopsis,
    category,
    tags,
    status,
    req.file.buffer,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving data to MySQL:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data saved to MySQL:", result);
      res.status(200).send("Data saved successfully");
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
