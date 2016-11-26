/* Things renamed:
 * - myGameCanvas = game
 * - myGamePiece = player
 */

var paused = false; 

// Creates Game Canvas with properties
var game = {
    canvas : document.createElement("canvas"),
    start : function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    
    // Clears canvas
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}; // end Game object

// Keyboard handler
var kbd = function () {
  this.up = false;
};

// add keyevent listener to track arrow key actions
document.addEventListener("keydown", function (e) {
  if (e.keyCode === 39 || e.keyCode === 68) {
    kbd.right = true;
  }
  else if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32) {
    kbd.up = true;
  }
  else if (e.keyCode === 37 || e.keyCode === 65) {
    kbd.left = true;
  }
  else if (e.keyCode === 27) {
       paused = !paused;
  }
}, false);

document.addEventListener("keyup", function (e) {
  if (e) {
    kbd.up = kbd.left = kbd.right = false;
  }
}, false);

game.start(); // canvas not created until this function is called    

// Constants
var ROCK_BOTTOM = game.canvas.height;
var GRID_SIZE = 10;
var PLATFORM_HEIGHT = 10;
var PLATFORM_WIDTH = 100;
var PLATFORM_SPEED = 3;
var INIT_X = game.canvas.width;
var INIT_Y = game.canvas.height - PLATFORM_HEIGHT;
//var PLAYER_IMG = "imgs/download.png"

//var NUM_PLATFORMS = 3;

// Global variables
var player;
var platform1;
var platform2;
var platform3;
var platforms = [];

// Platform class
var Platform = function (x, y, height, width, color) {   
    this.x = x;
    this.y = y;
    this.color = color;
    this.height = height;
    this.width = width;
    
    // Different X speeds could be implemented for different platforms
    this.dx = -PLATFORM_SPEED;
    
    this.move = function () {
    
        // Check if platform crossed left side of screen
        if (this.x + this.width < 0) {
            makeNewPlatform();
        }
        
        if (this.x + this.width + this.width < 0) {
            makeNewPlatformTwo();
        }
        
        else this.x += this.dx;
    };
    
    // redraws the Platform to the screen
    this.update = function() {
        ctx = game.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

};

// initializes a new game
function startGame() {

    // width, height, color, x, y
    player = new Player(30, 30, "red", 10, 120);
    
    makeNewPlatform();
    makeNewPlatformTwo();
    
    // debug:
    //console.log(game.canvas.width + " " + game.canvas.height);
    //console.log(platform1);
}

// generates a new Platform
function makeNewPlatform (height) {
    // x, y, height, width, color
    platform1 = new Platform(INIT_X, INIT_Y, PLATFORM_HEIGHT, PLATFORM_WIDTH, "green");
};

function makeNewPlatformTwo (height) {
    // x, y, height, width, color
    platform2 = new Platform(INIT_X + 130, INIT_Y - 50, PLATFORM_HEIGHT, PLATFORM_WIDTH, "brown");
};

// Player class
function Player(width, height, color, x, y) {
    this.landed = false;
    this.jumping = false;
    this.jumpCounter = 0;
    this.width = width;
    this.height = height;
    //this.speedX = 0;
    this.speedY = 0;
    this.gravity = 7;
    this.x = x;
    this.y = y;
    
    // Draw the player to screen
    this.update = function() {
        ctx = game.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    // Repositions the player for this frame
    this.move = function() {
        
        // Speed without pressing keys
        this.speedX = 0;
        this.speedY = 0;

        // Check if jump button is pressed
        if (kbd.up && this.landed) {
            this.jumping = true;
        }
        
        // Smooth jumping
        if (this.jumping) {
            this.y += -30;
            this.jumpCounter++;
        }
        
        // reset jump if we're at top of jump
        if (this.jumpCounter === 5) {
            this.jumping = false;
            this.jumpCounter = 0;
        }

        this.speedY += this.gravity;
        //this.x += this.speedX;
        
        this.y += this.speedY;
        this.collisionDetect();
    }
    
    // Checks collisions between player and ground/platforms
    this.collisionDetect = function() {
        
        // check for platform contact
        if (this.x + this.width >= platform1.x && 
            this.y + this.height >= platform1.y) {                    
            this.y = platform1.y - this.height;
            this.landed = true;
        }
        
        // check for colliding with bottom of screen
        else if (this.y >= game.canvas.height - this.height) {
            this.y = game.canvas.height - this.height;
            this.landed = true;
        }
        
        else if (this.x + this.width >= platform2.x && 
            this.y + this.height >= platform2.y) {                    
            this.y = platform2.y - this.height;
            this.landed = true;
        }
        
        else {
            this.landed = false;
        }
    }
}

// Called multiple times
function updateGameArea() {
    /*
    var x, y;
    
    for (i = 0; i < platforms.length; i += 1) {
        if (player.crashWith(platform1[i])) {
            game.stop();
            return;
        } 
    }
    game.clear();
    game.frameNo += 1;
    if (game.frameNo == 1 || everyinterval(150)) {
        x = game.canvas.width;
        y = game.canvas.height - 200
        //todo
        //platform1.push(new Player(10, 200, "green", x, y));
    }
    for (i = 0; i < platforms.length; i++) {
        platform1[i].x += -1;
        platform1[i].update();
    }
    */
    

    // Clears screen of previous frames
    game.clear();
    
    // Handle collision detection
    player.collisionDetect();

    // Move stuff
    player.move();
    platform1.move();
    platform2.move();

    // Draw images
    player.update();
    platform1.update();
    platform2.update();
    
    if (paused) {
        return;
    }
}
