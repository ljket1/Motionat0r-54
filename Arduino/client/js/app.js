(function() {
  'use strict';
  
  var socket = io.connect('http://0.0.0.0:3000'),
    
    //$body = $('body'),
    $ledToggleBtn = $('#toggleLedButton'),
    $ledStatus = $('#tLBSpan', $ledToggleBtn),
    ledStatus = 'Disable',
    
    $motionToggleBtn = $('#toggleMotionButton'),
    $motionToggleStatus = $('#tMBSpan', $motionToggleBtn),
    motionToggleStatus = 'Disable',

    $totalMotions = $('#totalMotionP'),
    $totalShortMotions = $('#totalSMotionP'),
    $totalLongMotions = $('#totalLMotionP'),

    toggleledStatus = function() {
      ledStatus = ledStatus === 'Disable' ? 'Enable' : 'Disable';
      socket.emit('ledStatusMessage', ledStatus);
    },

    // toggleMotionStatus = function(){
    //   motionToggleStatus = motionToggleStatus === 'Disable' ? 'Enable' : 'Disable';
    //   socket.emit('motionSensorStatus', motionToggleStatus);
    // },

    onSocketNotification = function(data) {
      // $totalLongMotions.text("LONG MOTION COUNTER");
      // $totalShortMotions.text("SHORT MOTION COUNTER");
      // $totalMotions.text("TOTAL MOTIONS");
      
      $totalMotions.text(data);
      if(data.includes("off")){
        $ledStatus.text("Disable");
      }
      else{
        $ledStatus.text("Enable");
      }
    };


  socket.on('data', onSocketNotification);
  $ledToggleBtn.on('click', toggleledStatus);
  //$motionToggleBtn.on('click', toggleMotionStatus);

  socket.emit('ledStatusMessage', ledStatus);
}());