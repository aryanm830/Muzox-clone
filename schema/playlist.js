const { Schema, model } = require("mongoose");

const Playlist = new Schema({
    Username: {
        type: String,
        required: false
    },
    UserId: {
        type: String,
        required: true
    },
    PlaylistName: {
        type: String,
        required: true
    },
    songs: {
        type: Array,
        required: true
    },
    CreatedOn: {
        type: Number,
        required: true
    }

});

module.exports = model('playlist', Playlist);