class aSprite {
    constructor(x, y, imageSRC, velx, vely, spType){
    this.zindex = 0;
    this.x = x;
    this.y = y;
    this.vx = velx;
    this.vy = vely;
    this.sType = spType;
    this.sImage = new Image();
    this.sImage.src = imageSRC;
    }
    // Getter
    get xPos(){
        return this.x;
    }

    get yPos(){
        return this.y;
    }

    // Setter
        set xPos(newX){
        this.x = newX;
    }

    set yPos(newY){
        this.y = newY;
    }

    // Method
    render()
    {
        canvasContext.drawImage(this.sImage,this.x, this.y);
    }
    // Method
    scrollBK(delta)
    {
        //var xPos = delta * this.vx;

        canvasContext.save();
        canvasContext.translate(-delta, 0);
        canvasContext.drawImage(this.sImage,0, 0);
        canvasContext.drawImage(this.sImage,this.sImage.width, 0);
        canvasContext.restore();
    }


    // Method
    sPos(newX,newY){
        this.x = newX;
        this.y = newY;
    }

    // Static Method
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }

    // Method
    spriteType(){
        console.log('I am an instance of aSprite!!!');
    }

}

class Enemy extends aSprite {
    // Method
    spriteType(){
        super.spriteType();
        console.log('I am a ' + this.sType + ' instance of aSprite!!!');
    }
}

var canvas;
var canvasContext;
var theCar;
var layers = [];
var layerSpeeds = [];

var mainMenu = true;
var gameLevel = false;
var endMenu = false;
var mouseIsDown = 0;
var lastPt = null;


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function load()
{
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    init();
}

function init() {

    if (canvas.getContext) {
    //Set Event Listeners for window, mouse and touch

    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);

    canvas.addEventListener("touchstart", touchDown, false);
    canvas.addEventListener("touchmove", touchXY, true);
    canvas.addEventListener("touchend", touchUp, false);

    document.body.addEventListener("touchcancel", touchUp, false);


    canvas.addEventListener('mousedown', touchDown, false);


    resizeCanvas();

    /*bkgdImage = new aSprite(0,0,"Road.png", 100, 0, "Generic");
    theCar = new aSprite(100,0,"Car.png", 0, 0, "Generic");
    theCar.sPos(100,400);
    console.log(theCar.y);*/

    mainMenuBkImg = new aSprite(0,0,"MainMenu.png", 0, 0, "Generic");

    layers[0] = new aSprite(0,0,"layer8.png", 10, 0, "Generic");
    layers[1] = new aSprite(0,0,"layer7.png", 10, 0, "Generic");
    layers[2] = new aSprite(0,0,"layer6.png", 13, 0, "Generic");
    layers[3] = new aSprite(0,0,"layer5.png", 16, 0, "Generic");
    layers[4] = new aSprite(0,0,"layer4.png", 19, 0, "Generic");
    layers[5] = new aSprite(0,0,"layer3.png", 22, 0, "Generic");
    layers[6] = new aSprite(0,0,"layer2.png", 20, 0, "Generic");
    layers[7] = new aSprite(0,0,"layer1.png", 20, 0, "Generic");

    layerSpeeds[0] = 0;
    layerSpeeds[1] = 0;
    layerSpeeds[2] = 0;
    layerSpeeds[3] = 0;
    layerSpeeds[4] = 0;
    layerSpeeds[5] = 0;
    layerSpeeds[6] = 0;
    layerSpeeds[7] = 0;

    startTimeMS = Date.now();
    gameLoop();
    }
}

function gameLoop(){
    //console.log("gameLoop");
    var elapsed = (Date.now() - startTimeMS)/1000;

    for (i = 0; i < layers.length; i++)
    {
        //console.log(layerSpeeds[i]);
        layerSpeeds[i] += elapsed * (layers[i].vx);
        //console.log("Initial Speed " + layerSpeeds[i] + layers[i].vx);
        if (layerSpeeds[i] > layers[i].sImage.width)
        {
            layerSpeeds[i] = 0;
        }
    }

    update(elapsed);
    render(elapsed);
    startTimeMS = Date.now();
    requestAnimationFrame(gameLoop);
}

function render(delta) {
    canvasContext.clearRect(0,0,canvas.width, canvas.height);

    if(mainMenu == true && (gameLevel == false && endMenu == false))
    {
        mainMenuBkImg.render();
    }

    if(gameLevel == true && (mainMenu == false && endMenu == false))
    {
        for (i = 0; i < layers.length; i++)
        {
            layers[i].scrollBK(layerSpeeds[i]);
            //console.log(layerSpeeds[i]);
        }
    }
}

function update(delta) {
}

function collisionDetection() {

}

function styleText(txtColour, txtFont, txtAlign, txtBaseline)
{
    canvasContext.fillStyle = txtColour;
    canvasContext.font = txtFont;
    canvasContext.textAlign = txtAlign;
    canvasContext.textBaseline = txtBaseline;
}

function touchUp(evt) {
    evt.preventDefault();
    // Terminate touch path
    lastPt=null;
}

function touchDown(evt) {
    evt.preventDefault();
    mouseIsDown = 1;
    if(mainMenu == true && (gameLevel == false && endMenu == false))
    {
        gameLevel = true;
        mainMenu = false;
        return;
    }

    if(gameLevel == true && (mainMenu == false && endMenu == false))
    {
        mainMenu = true;
        gameLevel = false;
        return;
    }
    touchXY(evt);
}

function touchXY(evt) {
    evt.preventDefault();
    if(lastPt!=null) {
        var touchX = evt.touches[0].pageX - canvas.offsetLeft;
        var touchY = evt.touches[0].pageY - canvas.offsetTop;
    }
    lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
}
