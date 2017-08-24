const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const artSchema = new mongoose.Schema ({
  imageSource: { type: String, required: true },
  artistName: { type: String, required: true, lowercase: true},
  artPiece: [{
    pieceName: { type: String, required: true, unique: true, lowercase: true},
    pieceDate: { type: Number, required: true }
  }],
  artCollection: { type: String, lowercase: true },
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;
