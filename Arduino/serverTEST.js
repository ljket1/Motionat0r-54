
var http = require('http');
var express = require('express');
var app = express();
var SerialPort = require("serialport").SerialPort;
var server = http.createServer(app).listen(3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/client'));

var sp = new SerialPort("/dev/ttyACM0", {baudRate: 115200}); // replace "/dev/ttyACM0" with your port address

arduinoMessage = '';

sp.on('open', function(){
  // Server is not connected to arduino
  console.log('Serial Port Opened');

  var lastValue;
  io.sockets.on('connection', function (socket) {
      // Connecting to client 
      console.log('Socket connected');
      //socket.emit('connected');
      var lastValue;


      sp.on('data', function(data){
        sendMessage(data, socket);
      });


  });
});



/**
 * 
 * This function concatenates the information coming from serialport and sends it to client page
 *
 */
sendMessage = function(buffer, socket) {
  arduinoMessage += buffer.toString();

  if (arduinoMessage.indexOf('\r') >= 0) {

    
    socket.emit('data', arduinoMessage);
    // reset the output string to an empty value
    arduinoMessage = '';
  }
};