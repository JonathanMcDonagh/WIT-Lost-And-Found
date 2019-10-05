let users = require('../models/users');
let express = require('express');
let router = express.Router();

//Find all
router.findAllUsers = (req, res) => {
  // Return a JSON representation of our list
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(users,null,5));
}

//Find one by ID
router.findOneUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  var user = getByUserID(users,req.params.id);
  if (user != null)
    res.send(JSON.stringify(user,null,5));
  else
    res.send('Sorry this user was NOT found!');
}

//Get by ID
function getByUserID(array, id) {
  var result  = array.filter(function(obj){return obj.id == id;} );
  return result ? result[0] : null; // or undefined
}


//Add a USER
router.addUser = (req, res) => {
  //Add a new item to our list
  var id = Math.floor((Math.random() * 20000) + 1); //Randomly generate an id
  var currentSize = users.length;

  users.push({"id" : id, "email" : req.body.email, "name" : req.body.name, "password" : req.body.password, "posts" : 0});

  if((currentSize + 1) == users.length)
    res.json({ message: 'Thank you the user was added successfully!'});
  else
    res.json({ message: 'Sorry the user was NOT Added!'});
}


//Deletes a USER
router.deleteUser = (req, res) => {
  //Delete the selected item based on its id
  var user = getByUserID(users,req.params.id);
  var index = users.indexOf(user);

  var currentSize = users.length;
  users.splice(index, 1);

  if((currentSize - 1) == users.length)
    res.json({ message: 'The user was successfully deleted!'});
  else
    res.json({ message: 'Sorry the user was NOT deleted!'});
}


module.exports = router;