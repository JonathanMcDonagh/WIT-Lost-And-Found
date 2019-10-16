let users = require('../models/users');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');

var User = require('../models/users');

//Find all users
router.findAllUsers = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.send(JSON.stringify(users,null,5));
  });
};


//Find user by ID
router.findOneUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  User.find({ "_id" : req.params.id },function(err, user) {
    if (err)
      res.json({ message: 'Item NOT Found!', errmsg : err } );
    else
      res.send(JSON.stringify(user,null,5));
  });
};


//Add a user
router.addUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  var user = new User();

  user.email = req.body.email;
  user.name = req.body.name;
  user.password = req.body.password;
  user.posts = req.body.posts;

  user.save(function(err) {
    if (err)
      res.json({ message: 'User NOT Added!', errmsg : err } );
    else
      res.json({ message: 'User Successfully Added!', data: user });
  });
};


//Deletes users
router.deleteUser = (req, res) => {

  User.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.json({ message: 'User NOT DELETED!', errmsg : err } );
    else
      res.json({ message: 'User Successfully Deleted!'});
  });
};

module.exports = router;