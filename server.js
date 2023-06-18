const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ejs = require('ejs');
const uri = 'mongodb+srv://ayman:01279463663@cluster0.kolkapz.mongodb.net/applications?retryWrites=true&w=majority';
const app = express();
const port = process.env.PORT || 3030;

/*-------------------------------------------------------------------------------*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('views', path.join(__dirname, 'website'));
app.use(express.static('website'));
app.set('view engine', 'ejs');


/*----------------------------------------------------------------------------------------------------------*/
app.listen(port, () => {
    console.log("Server Is Running!\nClick http://localhost:3030/ To View.");
});
/*-------------------------------------------------------------------------------*/
app.post('/submit', async (req, res) => {
  const formData = req.body;
  const studentName = formData.studentName;

  try {
    await mongoose.connect(uri, { useNewUrlParser: true });

    const db = mongoose.connection.db;
    const existingDocument = await db.collection('applications').findOne({ studentName });

    if (existingDocument) {
      // The studentName already exists in the database
      mongoose.connection.close();
      return res.status(409).redirect('submits/duplicate.html');
    }

    await db.collection('applications').insertOne(formData);

    // Close the MongoDB connection
    mongoose.connection.close();
    return res.status(200).redirect('submits/success.html');
  } catch (error) {
    console.error(error);
    return res.status(500).redirect('submits/fail.html');
  }
});


/*------------------------------------------------------------------------------------------------------------------*/
app.post('/login-verification', async (req, res) => { 

  try {
    const formData = req.body;
    const userData = await readFileAsync('users.json');
    const jsonData = JSON.parse(userData);

    const bcryptRes = await bcrypt.compare(formData.password, jsonData.password);

    if (formData.userName === jsonData.userName && bcryptRes && jsonData.auth === "admin") {
      res.redirect('dashboard');
    }else{
      return res.status(500).redirect('submits/faild.html');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).redirect('submits/faild.html');
  }

});
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
app.get('/dashboard',  async (req, res) => {
  
    try {
      await mongoose.connect(uri, { useNewUrlParser: true });
  
      const db = mongoose.connection.db;
      const applicationsData = (await db.collection('applications').find().toArray());
  
      // Close the MongoDB connection
      mongoose.connection.close();
  
      res.render('admin/index', { applicationsData: JSON.stringify(applicationsData) });

    } catch (error) {
      res.redirect('submits/faild.html')
    }
});


