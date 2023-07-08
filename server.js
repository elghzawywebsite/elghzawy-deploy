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
const ejs = require("ejs");

const secretKey = process.env.secretKey;
const PORT = process.env.port || 8080;
const uri = process.env.uri;
const currentYear = new Date().getFullYear();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("views", path.join(__dirname, "website"));
app.use(express.static("website"));
app.set("view engine", "ejs");

// Connect to MongoDB
async function connectToDatabase(currentUri) {
  try {
    await mongoose.connect(uri + currentUri, {
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
  formData.year = new Date().getFullYear();
  const studentName = formData.studentName;

  try {
    const currentUri = '/applications?retryWrites=true&w=majority';
    const db = await connectToDatabase(currentUri);
    const existingDocument = await db.collection(`${currentYear}`).findOne({ studentName });

    if (existingDocument) {
      await mongoose.connection.close();
      return res.status(409).redirect("/submits/duplicate.html");
    }

    await db.collection(`${currentYear}`).insertOne(formData);
    await mongoose.connection.close();

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
    const currentUri = '/adminUsers?retryWrites=true&w=majority';
    const db = await connectToDatabase(currentUri);
    const jsonData = await db.collection('admin').findOne({ auth: 'admin' });

    const bcryptRes = await bcrypt.compare(formData.password, jsonData.password);

    await mongoose.connection.close();

    if (
      formData.userName === jsonData.userName &&
      bcryptRes &&
      jsonData.auth === "admin"
    ) {
      const token = await jwt.sign({ userName: formData.userName }, secretKey);

      res.cookie("lg", token);
      return res.redirect("dashboard");
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
    const token = req.cookies["lg"];

    if (!token) {
      return res.status(401).redirect("login");
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).redirect("/submits/faild.html");
      }

      const currentUri = '/applications?retryWrites=true&w=majority';
      const db = await connectToDatabase(currentUri);
      const collectionsList = await db.listCollections().toArray();
      const collectionsNames = collectionsList.map(({ name }) => name);

      const allApplicationsData = [];

      for (const collectionName of collectionsNames) {
        const collection = db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        allApplicationsData.push(...documents);
      }

      await mongoose.connection.close();

      res.status(200).render("admin/index", {
        applications: JSON.stringify(allApplicationsData),
        collectionsNames: JSON.stringify(collectionsNames),
      });
    });
  } catch (err) {
    res.status(500).redirect("/submits/faild.html");
  }
});
