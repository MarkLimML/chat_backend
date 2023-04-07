const express = require('express');
const app = express();

const cors = require('cors');
const rooms = ['general','tech'];

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const server = require('http').createServer(app);
const PORT = 8000;
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST']
    }
})

server.listen(PORT, ()=> {
    console.log('Listening to port', PORT);
})