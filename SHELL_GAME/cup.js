var Cup = function(location){
  this.location = location;
  this.ball = false;
  this.startLoc = location;
}

Cup.prototype.reset = function(){
  this.location = this.startLoc;
  return this.startLoc;
}

Cup.prototype.move = function(loc){
  this.location = loc;
}

Cup.prototype.getLoc = function(){
  return this.location;
}

Cup.prototype.hasBall = function(){
  return this.ball;
}


