var Cup = function(location){
  this.location = location;
  this.hasBall = false;
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


