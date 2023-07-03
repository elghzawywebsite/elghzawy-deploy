const bcrypt = require('bcrypt');

const plainText = ''; // Replace with the actual 
const saltRounds = 10; // Number of salt rounds for bcrypt

bcrypt.hash(plainText, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    // Handle the error
  }

  // Store the 'hash' value in your users.json file or database
  console.log(hash)
});