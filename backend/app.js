

const dates = require('./routers/dates');

var express = require('express');
var axios = require('axios');
var app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var { booked } = require('./data');

require('dotenv').config();

const dbURI = process.env.ATLAS_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });

var cors = require('cors');
app.use(cors());

app.use(dates);

io.on("connection", socket => {
  console.log("New client connected");

  let interval = setInterval(() => {
    getApiAndEmit(socket);
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});



const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "http://localhost:8080/getDates"
    );
    socket.emit("view-dates", res.data);

  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(port, () => {
  console.log("Server running on port 8080");
});