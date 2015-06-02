
var CupView = function(cup){
  this.cup = cup;
  this.$el = $('<li>')
  this.showingBall = false;

  var that = this;
  this.$el.on('click', function(){
    if(game.canChoose){
      game.guess(that.cup.hasBall);
    }
  })
}

CupView.prototype.render = function($ul){
  this.$el.addClass('guess')
          .append('<div>');
  this.$el.addClass(this.cup.getLoc());
  $ul.append(this.$el);
  this.showBall();
}

CupView.prototype.showBall = function(){
  if(this.cup.hasBall && !this.showingBall){
    var ball = $('<div>').addClass('ball');
    this.$el.append(ball);
    this.showingBall = true;
  }
}

CupView.prototype.hideBall = function(){
  if(this.showingBall){
    this.$el.children().last().fadeOut(function(){
      this.remove();
    });
    this.showingBall = false;
  }
}

CupView.prototype.move = function(newLoc){
  this.$el.removeClass(this.cup.getLoc());
  this.$el.addClass(newLoc);
  this.cup.move(newLoc);
}

CupView.prototype.reset = function(){
  this.$el.removeClass(this.cup.location);
  this.$el.addClass(this.cup.reset());
  this.showBall();
}

CupView.prototype.getLoc = function(){
  return this.cup.getLoc();
}