var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var led = new five.Led(13);
  var motion = new five.Motion(2);

  motion.on("calibrated", function() {
    console.log("Motion: Calibrated", Date.now());
  });

  motion.on("motionstart", function() {
    console.log("Motion: Start", Date.now());
    led.on();
  });

  motion.on("motionend", function() {
    console.log("Motion: End", Date.now());
    led.off();
  });
});
