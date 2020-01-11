(function(window){
  'use strict';
  var App = window.App || {};
  var launchCount = 0;

  function Spaceship(){

  }

  Spaceship.prototype.blastoff = function(){
    launchCount++;
    console.log('Spaceship launched!');
  };

  Spaceship.prototype.reportLaunchCount = function(){
    console.log('Total number of launches: ' + launchCount);
  };

  App.Spaceship = Spaceship;
  window.App = App;
})(window);
