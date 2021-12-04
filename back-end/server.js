const express = require('express');
const bodyParser = require("body-parser");
/*
// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});
*/ // I SHOULDN'T NEED THIS RIGHT??
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/epcot', {
  useNewUrlParser: true
});
// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  info1: String,
  info2: String,
  //path: String,      CHECK THIS SPOT LATER!!
});

const Item = mongoose.model('Item', itemSchema);

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    info1: req.body.info1,
    info2: req.body.info2,
    //path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async(req, res, next) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    //item.title = req.body.title;
    //item.description = req.body.description;
    //item.info1 = req.body.info1;
    item.info2 = req.body.info2;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendstatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
