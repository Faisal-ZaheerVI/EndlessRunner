var keyPressed = {
    up: false,
    left: false,
    right: false,
    down: false
}

var keyValues = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
}

var size = {
    width: 480, 
    height: 360
}
var myPlayer;

//
function startGame() {
    myGameArea.start();
    myPlayer = new component(100, 100, "blue", 100, 100);
}

//starts game with properties
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function component (width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

document.onkeydown = function(e) {
    var key = e.keyCode
    
    if (key === keyValues.down) {
        keyPressed.down = true
    }
    
    //do for all other keys
    
}


startGame()
