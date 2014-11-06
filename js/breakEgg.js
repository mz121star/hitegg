var breakEgg = {
  ctx: null,
  item: null,
  imageReady: false,
  start: false,
  end: false,
  x: 0,
  y: -240,
  y1: 240,
  frame: 0,
  alpha: 1,
  redrawTime: 1000 / 7,
  config: function( opts ){
    var self = this;

    self.egg = opts.egg;
    self.hammer = opts.hammer;
    self.imgSrc = opts.imgSrc;
    self.click = opts.click;

    return self;
  },
  init: function() {
    var self = this;
    var egg = document.getElementById( self.egg || "breakEgg");
    var c = document.getElementById( self.hammer || "hammer");

    egg.width = egg.parentNode.clientWidth;
    egg.height = egg.parentNode.clientHeight;

    self.imageReady = false;
    self.x = 0;

    self.ctx = egg.getContext("2d");
    self.ctx.clearRect( 0, 0, 636, 478 );

    self.img = document.createElement("img");
    self.img.src = self.imgSrc || "images/d.png";
    self.img.onload = self.loaded();

    c.onclick = function(){
      self.click && self.click( self );
      c.className += " active";

      setTimeout(function(){
        c.className = "hammer";

        setTimeout(function(){
          if( self.imageReady && self.frame < 7 ) {
            self.start = true;
            self.update();
          }
        }, 400);
      }, 400);
    };
  },
  loaded: function() {
    var self = breakEgg;
     if( ( /chrome/.test( window.navigator.userAgent.toLowerCase() ) || /version\/([\d.]+).*safari/.test( window.navigator.userAgent.toLowerCase() ) ) && ! self.img.complete )
    {
      setTimeout( self.loaded, 1 );
    }
    else{
      self.update();
    }
  },
  redraw: function( opts ) {
    var self = this;
    self.ctx.clearRect( 0, 0, 1000, 1000 );

    var height = self.img.naturalHeight/2;  
     var width = self.img.naturalWidth/4;  
     var row = Math.floor(self.frame / 4);  
     var col = self.frame - row * 4;
     var offw = col * width;  
     var offh = row * height; 

     self.ctx.globalAlpha = self.alpha;

     self.ctx.drawImage(self.img, offw, offh, width, height, self.x, self.y, width, height);
     if( ! opts) self.frame++;
  },
  imgIn: function(){
    var self = breakEgg;
    self.y += self.y1 / 15;

    if( self.y >= 0 ) self.imageReady = true;

    self.ctx.clearRect( 0, 0, 1000, 1000 );
    self.redraw(1);
  },
  fade: function(){
    var self = breakEgg;
    self.alpha -= 1 / 15;

    self.ctx.clearRect( 0, 0, 1000, 1000 );
     self.redraw(1);

    if( self.alpha <= 0 ) {
      self.end = false;
      self.y = -self.y1;
      self.frame = 0;
      self.alpha = 1;
    }
  },
  update: function() {
    var self = breakEgg;
    if ( self.frame < 7 && self.start ) {
      self.redraw();
      setTimeout( self.update, self.redrawTime );
    }
    else if( ( self.frame == 0 || self.frame == 7 ) && ! self.imageReady ){
      if( self.end ) {
        self.fade();
        setTimeout( self.update, 500/15 );
      }
      else
      {
        self.imgIn();
        setTimeout( self.update, 500/15 );
      }
    }
    else{
      self.start = false;
      self.end = true;
    }
  }
}