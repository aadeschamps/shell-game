
var game = {
  $p: $('#display'),
  $button: $('#button'),
  $level: $('#level'),
  cups: [],
  locations: [ 'left' , 'middle' , 'right' ],
  canChoose: false,
  played: false,
  interval: undefined,
  level: 1,

  guess: function(results){
    if (results){
      this.setDisplay('You have chosen wisely');
      this.level += 1;
      this.displayLevel();
    } else {
      this.setDisplay('You have chosen poorly');
    }
    this.cups[1].showBall();
    this.canChoose = false;
  },

  swapAround: function(index1, index2){
    var cups = [];
    for(var i = 0; i < this.cups.length; i += 1){
      cups.push(this.cups[i]);
    }
    var cup1 = cups.splice(Math.floor(Math.random() * cups.length), 1)[0];
    var cup2 = cups.splice(Math.floor(Math.random() * cups.length), 1)[0];
    var loc1 = cup1.getLoc();
    var loc2 = cup2.getLoc();;
    cup1.move(loc2);
    cup2.move(loc1);
  },

  setDisplay: function(msg){
    this.$p.text(msg);
  },

  displayLevel: function(){
    this.$level.text(this.level);
  },

  setChoose: function(){
    this.canChoose = true;
    this.setDisplay('Choose');
  },

  reset: function(){
    clearInterval(this.interval);
    this.setDisplay('Start when ready');
    for (var i = 0; i < this.cups.length; i++) {
      this.cups[i].reset();
    }
  },

  startGame: function(){
    var time = (1 / this.level) * 1000;
    this.cups[1].hideBall();
    var swaps = 10 + (this.level * 3);
    var that = this;
    this.interval = setInterval(function(){
      if(swaps > 0){
        that.swapAround();
      }else{
        clearInterval(that.interval);
        that.setChoose();
      }
      swaps-=1;
    }, time)
  },

  setButtonEvent: function(){
    var that = this;
    this.$button.on('click', function(){
      if( that.played ) {
        that.reset();
        that.played = false;
        that.$button.text('Start')
      } else {
        that.startGame();
        that.played = true;
        that.$button.text('Reset')
      }
      
    })
  },

  createCups: function(){
    var $cupList = $('#guesses');
    $cupList.html('');
    for(var i = 0; i < 3; i += 1){
      var cup = new Cup(this.locations[i])
      if(this.locations[i] === 'middle'){
        cup.hasBall = true;
      }
      var cupView = new CupView(cup);
      cupView.render($cupList)
      this.cups.push(cupView);
    }
  },

  initialize: function(){
    this.createCups();
    this.setDisplay('Start when ready');
    this.setButtonEvent();
  }

}

$(function(){
  game.initialize();
})