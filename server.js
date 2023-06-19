const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const jwt = require('jsonwebtoken');
const secretKey = 'b4880f3f65ef4b1a7415f96dab24c843c5fca6fc7692ccac7f9f085d334a7eaf8f2c4c2b8ef401234567890abcdef1234567890abcdef1234567890abcdef';
const mongoose = require('mongoose');
const ejs = require('ejs');
const uri = 'mongodb+srv://ayman:01279463663@cluster0.kolkapz.mongodb.net/applications?retryWrites=true&w=majority';
const app = express();
const cache = new Map();
const port = process.env.PORT || 3030;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('views', path.join(__dirname, 'website'));
app.use(express.static('website'));
app.set('view engine', 'ejs');

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return mongoose.connection.db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}


app.listen(port, () => {
  console.log("Server Is Running!\nClick http://localhost:3030/ To View.");
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const formData = req.body;
  const studentName = formData.studentName;

  try {
    const db = await connectToDatabase();
    const existingDocument = await db.collection('applications').findOne({ studentName });

    if (existingDocument) {
      // The studentName already exists in the database
      return res.status(409).redirect('/submits/duplicate.html');
    }

    await db.collection('applications').insertOne(formData);

    // Clear cache
    cache.delete('applicationsData');

    return res.status(200).redirect('/submits/success.html');
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).redirect('/submits/fail.html');
  }
});

// Handle login verification
app.post('/login-verification', async (req, res) => {
  try {
    const formData = req.body;
    const userData = await readFileAsync('users.json');
    const jsonData = JSON.parse(userData);

    const bcryptRes = await bcrypt.compare(formData.password, jsonData.password);

    if (formData.userName === jsonData.userName && bcryptRes && jsonData.auth === 'admin') {
      // Generate JWT token
      const token = jwt.sign({ userName: formData.userName }, secretKey);

      res.cookie('loginToken', token); // Set token as a cookie named 'loginToken'
      res.redirect('dashboard');
    } else {
      return res.status(401).redirect('/submits/faild.html');
    }
  } catch (err) {
    console.error('Error verifying login:', err);
    return res.status(500).redirect('/submits/faild.html');
  }
});

// Dashboard route
app.get('/dashboard', async (req, res) => {
  try {
    const token = req.cookies['loginToken'];

    if (!token) {
      return res.status(401).redirect('login');
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).redirect('/submits/faild.html');
      }

      const cachedData = cache.get('applicationsData');
      if (cachedData) {
        return res.render('admin/index', { applications: JSON.stringify(cachedData) });
      }

      const db = await connectToDatabase();
      const applicationsData = await db.collection('applications').find().toArray();

      cache.set('applicationsData', applicationsData);

      res.status(200).render('admin/index', { applications: JSON.stringify(applicationsData) });
    });
  } catch (err) {
    res.status(500).redirect('/submits/faild.html');
  }
});


