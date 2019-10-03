let items = require('../models/items');
let express = require('express');
let router = express.Router();

//Find all
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(items,null,5));
}

//Find one by ID
router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var item = getByValue(items,req.params.id);
    if (item != null)
        res.send(JSON.stringify(item,null,5));
    else
        res.send('Sorry the item was NOT found!');
}

//Get by ID
function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}


/* NOTE: Implement GET for WITRooms
//Find by room
router.findByRoom = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var room = getByRoom(items,req.params.WITRoom);
    if (room != null)
        res.send(JSON.stringify(room,null,5));
    else
        res.send('Sorry the room was NOT found!!!');
}

//Get by room
function getByRoom(array, WITRoom) {
    var outcome  = array.filter(function(obj){return obj.WITRoom == WITRoom;} );
    return outcome ? outcome[0] : null; // or undefined
}
*/


//Add an item
router.addItem = (req, res) => {
    //Add a new item to our list
    var id = Math.floor((Math.random() * 10000) + 1); //Randomly generate an id
    var currentSize = items.length;

    items.push({"id" : id, "studentid" : req.body.studentid, "name" : req.body.name, "witbuilding" : req.body.witbuilding, "witroom": req.body.witroom, "lostitem": req.body.lostitem,  "likes" : 0});

    if((currentSize + 1) == items.length)
        res.json({ message: 'Thank you the item was added successfully!'});
    else
        res.json({ message: 'Sorry the item was NOT Added!'});
}


//Deletes item
router.deleteItem = (req, res) => {
    //Delete the selected item based on its id
    var item = getByValue(items,req.params.id);
    var index = items.indexOf(item);

    var currentSize = items.length;
    items.splice(index, 1);

    if((currentSize - 1) == items.length)
        res.json({ message: 'The item was successfully deleted!'});
    else
        res.json({ message: 'Sorry the item was NOT deleted!'});
}


//Get Total likes
function getTotalLikes(array) {
    let totalLikes = 0;
    array.forEach(function(obj) { totalLikes += obj.likes; });
    return totalLikes;
}

//find total likes
router.findTotalLikes = (req, res) => {
    let likes = getTotalLikes(items);
    res.json({totallikes : likes});
}

//Add like
router.incrementLikes = (req, res) => {
    // Find the relevant item based on params id passed in
    // Add 1 to likes property of the selected item based on its id
    var item = getByValue(items,req.params.id);

    if (item != null) {
        item.likes += 1;
        res.json({status : 200, message : 'Like Successful' , item : item });
    }
    else
        res.send('Item was not found - Sorry the like was NOT successful!');
}

module.exports = router;