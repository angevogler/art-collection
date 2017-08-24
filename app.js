// required
const express = require('express');
const mustache = require('mustache-express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

// require schema
const Art = require('./mongoose');

// configure express
const app = express();

//configure mustache
app.use(bodyparser.urlencoded({ extended: false }))
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

// configure public directory
app.use(express.static('public'));

// connect database
mongoose.connect('mongodb://localhost:27017/art');

app.get('/', function (req, res) {
  Art.find()
  .then(function (piece) {
    console.log('success')
    res.render('art', {
      art: piece,
    });
  })
  .catch(function() {
    console.log('error')
  });
});

// post request to find artwork by artist name
app.post('/search', function (req, res) {
  Art.find({ artistName: req.body.search_artist })
    .then(function (piece) {
      console.log('found artist results')
      res.render('art', {
        art: piece,
      });
    })
    .catch(function (piece) {
      res.send('there was an error returning your search results')
    });
});

// post request to enter new artwork
app.post('/new-artwork', function (req, res) {
  Art.create({
    imageSource: req.body.imageSource,
    artistName: req.body.artistName,
    artPiece: [
      { pieceName: req.body.pieceName },
      { pieceDate: req.body.pieceDate },
    ],
    artCollection: req.body.artCollection,
  })
    .then(function (piece) {
      res.redirect('/');
    })
    .catch(function (piece) {
      res.send('there was an error with your submission');
      console.log(piece)
    })
});

// connect server
app.listen('4000', function() {
  console.log('server is running');
});
