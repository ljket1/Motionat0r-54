var socket = io.connect("http://127.0.0.1:3000");

var $ledToggleBtn = $('#toggleLedButton');
var $ledStatus = $('#tLBSpan', $ledToggleBtn);
var ledStatus = true;

var $motionToggleBtn = $('#toggleMotionButton');
var $motionToggleStatus = $('#tMBSpan', $motionToggleBtn);
var motionToggleStatus = true;

var $totalMotions = $('#totalMotionP');
var $totalShortMotions = $('#totalSMotionP');
var $totalLongMotions = $('#totalLMotionP');

var $delayThreshold = $('#delayThreshold');

var toggleLedStatus = function () {
  if (ledStatus) {
    socket.emit('toggleLed', false);
    $ledStatus.text("Enable");
    ledStatus = false;
  }
  else {
    socket.emit('toggleLed', true);
    $ledStatus.text("Disable");
    ledStatus = true;
  }
};

var toggleMotionStatus = function () {
  if (motionToggleStatus) {
    socket.emit('toggleMotionSensor', false);
    $motionToggleStatus.text("Enable");
    motionToggleStatus = false;
  }
  else {
    socket.emit('toggleMotionSensor', true);
    $motionToggleStatus.text("Disable");
    motionToggleStatus = true;
  }
};

var updateData = function (data) {
  $totalMotions.text(data["totalMotions"]);
  $totalShortMotions.text(data["shortMotions"]);
  $totalLongMotions.text(data["longMotions"]);

  $delayThreshold.text(data["motionTimeout"]);
  //todo: motionTimeout


  if (data["ledStatus"] == true) {
    $ledStatus.text("Disable");
    ledStatus = true;
  }
  else {
    $ledStatus.text("Enable");
    ledStatus = false;
  }

  if (data["motionSensorStatus"] == true) {
    $motionToggleStatus.text("Disable");
    motionToggleStatus = true;
  }
  else {
    $motionToggleStatus.text("Enable");
    motionToggleStatus = false;
  }

};

// Listeners
socket.on('update', updateData);
$ledToggleBtn.on('click', toggleLedStatus);
$motionToggleBtn.on('click', toggleMotionStatus);

function updateSliderValue(value) {
  document.getElementById("delayThreshold").innerHTML = value;
}
