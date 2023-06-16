const bcrypt = require('bcrypt');

const plainTextPassword = '123'; // Replace with the actual password
const saltRounds = 10; // Number of salt rounds for bcrypt

bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    // Handle the error
  }

  // Store the 'hash' value in your users.json file or database
  console.log(hash)
});