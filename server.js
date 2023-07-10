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

const secretKey = process.env.secretKey;
const PORT = process.env.port || 8080;
const uri = process.env.uri;

currentYear = () => {
  return new Date().getFullYear();
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("website"));


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
  formData.year = currentYear();
  const studentName = formData.studentName;

  try {
    const db = await connectToDatabase();
    const existingDocument = await db
      .collection(`${currentYear()}`)
      .findOne({ studentName });

    if (existingDocument) {
      return res.status(409).redirect("/submits/duplicate.html");
    }

    await db.collection(`${currentYear()}`).insertOne(formData);

    return res.status(200).redirect("/submits/success.html");
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).redirect("/submits/fail.html");
  }
});

// Handle login verification
app.post("/login-verification", async (req, res) => {
  try {
    const loginData = req.body;
    const db = await connectToDatabase();
    const jsonData = await db
      .collection("adminUsers")
      .findOne({ auth: "admin" });

    const bcryptRes = await bcrypt.compare(
      loginData.password,
      jsonData.password
    );

    if (
      loginData.userName === jsonData.userName &&
      bcryptRes &&
      jsonData.auth === "admin"
    ) {
      const token = await jwt.sign({ userName: loginData.userName }, secretKey);

      res.cookie("lg", token);
      return res.redirect("/admin");
    } else {
      return res.status(401).redirect("/login");
    }
  } catch (err) {
    console.error("Error verifying login:", err);
    return res.status(500).redirect("/submits/faild.html");
  }
});


// admin Dashboard routes
app.get("/applicationData", async (req, res) => {
  try {
    const token = req.cookies["lg"];

    if (!token) {
      return res.status(401).redirect("/login");
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).redirect("/login");
      }
       
      const collectionName = await req.query.key
      const db = await connectToDatabase();
      const applicationData = await db.collection(`${collectionName}`).find().toArray();

      res.status(200).json(applicationData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).redirect("/submits/faild.html");
  }
});


app.get("/collectionsNames", async (req, res) => {
  try {
    const token = req.cookies["lg"];

    if (!token) {
      return res.status(401).redirect("/login");
    }

     jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).redirect("/login");
      }

      const db = await connectToDatabase();
      const collectionsList = await db.listCollections().toArray();
      let collectionsNames = collectionsList.map(({ name }) => name);
      collectionsNames = collectionsNames.filter(
        (name) => name !== "adminUsers"
      );
      collectionsNames = collectionsNames.sort((a, b) => a - b);
      res.status(200).json(collectionsNames);
    });
  } catch (err) {
    console.log(err);
    res.status(500).redirect("/submits/faild.html");
  }
});

