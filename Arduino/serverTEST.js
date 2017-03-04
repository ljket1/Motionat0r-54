
var http = require('http');
var express = require('express');
var app = express();
var SerialPort = require("serialport").SerialPort;
var server = http.createServer(app).listen(3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/client'));

var sp = new SerialPort("/dev/ttyACM0", {baudRate: 115200}); // replace "/dev/ttyACM0" with your port address
//var splitInput;

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
    splitInput = arduinoMessage.split(" ");

    if(splitInput[0].includes("STATS:")){
      // socket.emit('numTotal', splitInput[1]);
      // socket.emit('numSTotal', splitInput[2]);
      // socket.emit('numLTotal', splitInput[3]);
      socket.emit('statData', arduinoMessage);
      console.log("here");
      //socket.emit('data', splitInput[1]);
    }

    // else if(String(splitInput[1]).includes("num")){
    //   console.log("asd");
    // }

    
    
    // reset the output string to an empty value
    arduinoMessage = '';
  }
};