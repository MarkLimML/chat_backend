const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: String,
    fromUser: Object,
    socketid: String,
    time: String,
    date: String,
    to: String
})

const Message = mongoose.Model({'Message', MessageSchema});

module.exports = Message