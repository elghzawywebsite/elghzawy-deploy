const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const fs = require("fs");
const util = require("util");
const path = require("path");
const readFileAsync = util.promisify(fs.readFile);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cache = new Map();
const ejs = require("ejs");

const secretKey = process.env.secretKey;
const PORT = process.env.port || 8080;
const uri = process.env.uri;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("views", path.join(__dirname, "website"));
app.use(express.static("website"));
app.set("view engine", "ejs");

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return mongoose.connection.db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

app.listen(PORT, () => {
  console.log(`Server Is Running!\nClick http://localhost:${PORT}/ To View.`);
});

// Handle form submission
app.post("/submit", async (req, res) => {
  const formData = req.body;
  const studentName = formData.studentName;

  try {
    const db = await connectToDatabase();
    const existingDocument = await db
      .collection("applications")
      .findOne({ studentName });

    if (existingDocument) {
      // The studentName already exists in the database
      return res.status(409).redirect("/submits/duplicate.html");
    }

    await db.collection("applications").insertOne(formData);

    // Clear cache
    cache.delete("applicationsData");

    return res.status(200).redirect("/submits/success.html");
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).redirect("/submits/fail.html");
  }
});

// Handle login verification
app.post("/login-verification", async (req, res) => {
  try {
    const formData = req.body;
    const userData = await readFileAsync("users.json");
    const jsonData = JSON.parse(userData);

    const bcryptRes = await bcrypt.compare(
      formData.password,
      jsonData.password
    );

    if (
      formData.userName === jsonData.userName &&
      bcryptRes &&
      jsonData.auth === "admin"
    ) {
      // Generate JWT token
      const token = jwt.sign({ userName: formData.userName }, secretKey);

      res.cookie("loginToken", token); // Set token as a cookie named 'loginToken'
      res.redirect("dashboard");
    } else {
      return res.status(401).redirect("/submits/faild.html");
    }
  } catch (err) {
    console.error("Error verifying login:", err);
    return res.status(500).redirect("/submits/faild.html");
  }
});

// Dashboard route
app.get("/dashboard", async (req, res) => {
  try {
    const token = req.cookies["loginToken"];

    if (!token) {
      return res.status(401).redirect("login");
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).redirect("/submits/faild.html");
      }

      const cachedData = cache.get("applicationsData");
      if (cachedData) {
        return res.render("admin/index", {
          applications: JSON.stringify(cachedData),
        });
      }

      const db = await connectToDatabase();
      const applicationsData = await db
        .collection("applications")
        .find()
        .toArray();

      cache.set("applicationsData", applicationsData);

      res
        .status(200)
        .render("admin/index", {
          applications: JSON.stringify(applicationsData),
        });
    });
  } catch (err) {
    res.status(500).redirect("/submits/faild.html");
  }
});
app.get("/students", async (req, res) => {
  const db = await connectToDatabase();
  const applicationsData = await db
    .collection("applications")
    .find({
      $or: [{ grade: "sec2s" }, { grade: "sec2l" }],
    })
    .toArray();
  res.send(applicationsData);
});
