// Server
var app = require("express")()
var http = require("http").Server(app)
var io = require("socket.io")(http)

// IoT Panel Page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, function() {
  console.log("Server started on 3000.")
});

// Arduino
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var led = new five.Led(13);
  var motionSensor = new five.Motion(2);
  var curMotionTimestamp = null;

  var data = {
    'shortMotions': 0,
    'longMotions': 0,
    'totalMotions': 0,
    'ledStatus': true,
    'motionSensorStatus': true,
    'motionTimeout': 6
  }

  motion.on("calibrated", function() {
    console.log("Motion Sensor: Calibrated", Date.now().toUTCString());
  });

  motion.on("motionstart", function() {
    curMotionTimestamp = Date.now()
    console.log("Motion Sensor: Motion Detected (Start)", curMotionTimestamp);
    if (data["ledStatus"])
      led.on();
  });

  motion.on("motionend", function() {
    console.log("Motion Sensor: Motion Detected (End)", Date.now());
    if (data["ledStatus"])
      led.off();
    var diff = (curMotionTimestamp.getTime() - Date.now().getTime()) / 1000
    if (diff < data["motionTimeout"]) {
      data["shortMotions"]++;
    } else {
      data["longMotions"]++;
    }
    data["totalMotions"]++;
    io.emit('update', data)
  });

  io.on("connection", function(socket){
    console.log("Connection: " + Date.now());
    io.emit('update', data); // This pushes new data to any page that connects to the server

    socket.on('toggleLed', function(msg) {
        //data["ledStatus"] = !data["ledStatus"];
        data["ledStatus"] = msg;
    });
    socket.on('toggleMotionSensor', function(msg) {
        //data["motionSensorStatus"] = !data["motionSensorStatus"];
        data["motionSensorStatus"] = msg;
    });
    socket.on('updateMotionTimeout', function(value) {
        data["motionTimeout"] = parseInt(value);
    });
  });
});
