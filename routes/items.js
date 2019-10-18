let items = require('../models/items');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');

var Item = require('../models/items');
var mongodbUri = 'mongodb+srv://jonathanmcdonagh:20074520@web-app-cluster-uct5k.mongodb.net/witlostandfounddb?retryWrites=true&w=majority';

mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});


//Find all
router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Item.find(function(err, items) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(items,null,5));
    });
};


//Find one by ID
router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Item.find({ "_id" : req.params.id },function(err, item) {
        if (err)
            res.json({ message: 'Item NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(item,null,5));
    });
};

//Find by WITBuilding
router.findByBuilding = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Item.find({ "WITBuilding" : req.params.WITBuilding },function(err, item) {
        if (err)
            res.json({ message: 'Building NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(item,null,5));
    });
};

//Find by WITRoom
router.findByRoom = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Item.find({ "WITRoom" : req.params.WITRoom },function(err, item) {
        if (err)
            res.json({ message: 'Room NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(item,null,5));
    });
};


//Add an item
router.addItem= (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var item = new Item();
    item.studentid = req.body.studentid;
    item.name = req.body.name;// the requested value
    item.WITBuilding = req.body.WITBuilding;// the requested value
    item.WITRoom = req.body.WITRoom; // the requested value
    item.lostitem = req.body.lostitem;// the requested value
    item.likes = req.body.likes; // the requested value

    item.save(function(err) {
        if (err)
            res.json({ message: 'Item NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Item Successfully Added!', data: item });
    });
};


//Deletes item
router.deleteItem = (req, res) => {

    Item.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Item NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Item Successfully Deleted!'});
    });
};


//Get Total likes
function getTotalLikes(array) {
    let totalLikes = 0;
    array.forEach(function(obj) { totalLikes += obj.likes; });
    return totalLikes;
}


//find total likes
router.findTotalLikes = (req, res) => {

    Item.find(function(err, items) {
        if (err)
            res.send(err);
        else
            res.json({ totallikes : getTotalLikes(items) });
    });
};


//Add like
router.incrementLikes = (req, res) => {

    Item.findById(req.params.id, function(err,item) {
        if (err)
            res.json({ message: 'Item NOT Found!', errmsg : err } );
        else {
            item.likes += 1;
            item.save(function (err) {
                if (err)
                    res.json({ message: 'Item NOT liked!', errmsg : err } );
                else
                    res.json({ message: 'Item Successfully liked!', data: item });
            });
        }
    });
};


module.exports = router;