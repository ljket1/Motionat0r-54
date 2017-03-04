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

    //splitInput;

    toggleledStatus = function() {
      ledStatus = ledStatus === 'Disable' ? 'Enable' : 'Disable';
      socket.emit('ledStatusMessage', ledStatus);
    },

    // toggleMotionStatus = function(){
    //   motionToggleStatus = motionToggleStatus === 'Disable' ? 'Enable' : 'Disable';
    //   socket.emit('motionSensorStatus', motionToggleStatus);
    // },


    //   if(data.includes("off")){
    //     $ledStatus.text("Disable");
    //   }
    //   else{
    //     $ledStatus.text("Enable");
    //   }
    // },

    updateStats = function(data) {
      var splitInput;

      splitInput = data.split(" ");

      $totalMotions.text(splitInput[1]);
      $totalShortMotions.text(splitInput[2]);
      $totalLongMotions.text(splitInput[3]);


    };

  //socket.on('data', onSocketNotification);
  socket.on('statData', updateStats);
  $ledToggleBtn.on('click', toggleledStatus);
  //$motionToggleBtn.on('click', toggleMotionStatus);

  socket.emit('ledStatusMessage', ledStatus);

  //socket emit UPDATE STATUS so when load page new data is pulled!!
}());