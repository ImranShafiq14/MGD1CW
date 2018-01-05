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

    scrollBK1(delta)
    {
        //var xPos = delta * this.vx;

        canvasContext.save();
        canvasContext.translate(delta, 0);
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
var travel=0;
//var travel[]=0;
var theCar;
var layers = [];
var layerSpeeds = [];
var layerSpeed = 0;

var l1speed = 0;
var l2speed = 0;
var l3speed = 0;
var l4speed = 0;
var l5speed = 0;
var l6speed = 0;
var l7speed = 0;
var l8speed = 0;

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

    resizeCanvas();

    /*bkgdImage = new aSprite(0,0,"Road.png", 100, 0, "Generic");
    theCar = new aSprite(100,0,"Car.png", 0, 0, "Generic");
    theCar.sPos(100,400);
    console.log(theCar.y);
    startTimeMS = Date.now();
    gameLoop();*/


    /*var layers = [
        layer8 = new aSprite(0,0,"layer8.png", 10, 0, "Generic"),
        layer7 = new aSprite(0,0,"layer7.png", 25, 0, "Generic"),
        layer6 = new aSprite(0,0,"layer6.png", 50, 0, "Generic"),
        layer5 = new aSprite(0,0,"layer5.png", 100, 0, "Generic"),
        layer4 = new aSprite(0,0,"layer4.png", 100, 0, "Generic"),
        layer3 = new aSprite(0,0,"layer3.png", 100, 0, "Generic"),
        layer2 = new aSprite(0,0,"layer2.png", 100, 0, "Generic"),
        layer1 = new aSprite(0,0,"layer1.png", 200, 0, "Generic")
    ];*/

    //var layers = [];
    /*layers[0] = new aSprite(0,0,"layer8.png", 10, 0, "Generic");
    layers[1] = new aSprite(0,0,"layer7.png", 25, 0, "Generic");
    layers[2] = new aSprite(0,0,"layer6.png", 50, 0, "Generic");
    layers[3] = new aSprite(0,0,"layer5.png", 10, 0, "Generic");
    layers[4] = new aSprite(0,0,"layer4.png", 25, 0, "Generic");
    layers[5] = new aSprite(0,0,"layer3.png", 50, 0, "Generic");
    layers[6] = new aSprite(0,0,"layer2.png", 10, 0, "Generic");
    layers[7] = new aSprite(0,0,"layer1.png", 25, 0, "Generic");*/

    layerSpeeds[0] = 0;
    layerSpeeds[1] = 0;
    layerSpeeds[2] = 0;
    layerSpeeds[3] = 0;
    layerSpeeds[4] = 0;
    layerSpeeds[5] = 0;
    layerSpeeds[6] = 0;
    layerSpeeds[7] = 0;

    layer8 = new aSprite(0,0,"layer8.png", 10, 0, "Generic");
    layer7 = new aSprite(0,0,"layer7.png", 10, 0, "Generic");
    layer6 = new aSprite(0,0,"layer6.png", 13, 0, "Generic");
    layer5 = new aSprite(0,0,"layer5.png", 16, 0, "Generic");
    layer4 = new aSprite(0,0,"layer4.png", 19, 0, "Generic");
    layer3 = new aSprite(0,0,"layer3.png", 22, 0, "Generic");
    layer2 = new aSprite(0,0,"layer2.png", 20, 0, "Generic");
    layer1 = new aSprite(0,0,"layer1.png", 20, 0, "Generic");
    startTimeMS = Date.now();
    gameLoop();
    }
}

function gameLoop(){
    //console.log("gameLoop");
    var elapsed = (Date.now() - startTimeMS)/1000;
    //travel += elapsed * bkgdImage.vx;
    //if (travel > bkgdImage.sImage.width)

    //travel += elapsed * layers.vx;
    //if (travel > layers.sImage.width)

    /*for (var i = 0; i < layers.length; i++)
    {
        //for (var t = 0; t <layers.length; t++)
        //{
            travel[t] += elapsed * layers[i].vx;
            if (travel[t] > layers[i].sImage.width)
            {
                travel[t] = 0;
            }

            /*var layerSpeed = travel[t] += elapsed * layers[i].vx;
            if (layerSpeed > layers[i].sImage.width)
            {
                layerSpeed = 0;
            }*/
        //}
        //var layerSpeed = layers[i.vx];

    //}*/

    //travel += elapsed * (layer8.vx)
    //if (travel > (layer8).sImage.width)



    /*for (var i = 0; i < layers.length; i++)
    {
        for (var s = 0; s <layerSpeeds.length; s++)
        {
            //console.log(layerSpeeds[s]);
            layerSpeeds[s] += elapsed * layers[i].vx;
            if (layerSpeeds[s] > layers[i].sImage.width)
            {
                layerSpeeds[s] = 0;
            }
        }
    }*/

    //for (var s = 0; s <layerSpeeds.length; s++)
    //{
     /*   for (var i = 0; i < layers.length; i++)
        {

            //console.log(layerSpeed);
            layerSpeed += elapsed * layers[i].vx;
            console.log(layers[i].vx);
            //console.log(layerSpeeds[s]);
            //console.log(layerSpeed);
            if (layerSpeed > layers[i].sImage.width)
            {
                layerSpeed = 0;
                //console.log(layerSpeed);
            }
        }*/
    //}


   /* for (var i = 0; i < layers.length; i++)
    {
        layerSpeed += elapsed * layers[i].vx
        if (layerSpeed > layers[i].sImage.width)
        {
            layerSpeed = 0;
        }
    }*/


    /*layers.forEach(function(layer)
    {
        layerSpeed += elapsed * layer.vx
        if (layerSpeed > layer.sImage.width)
        {
            layerSpeed = 0;
        }
    }*/


    /*for (var i = 0; i < layers.length; i++)
    {
        var layer = layers[i];
        layerSpeed += elapsed * layer.vx
        if (layerSpeed > layer.sImage.width)
        {
            layerSpeed = 0;
        }
    }*/



    //travel += elapsed * layers[0].vx
    //if (travel > layers[0].sImage.width)
    //{
        //travel = 0;
    //}



    l8speed += elapsed * layer8.vx
    if (l8speed > layer8.sImage.width /*|| l8speed < -layer8.sImage.width*/)
    {
        l8speed = 0;
    }

    l7speed += elapsed * layer7.vx
    if (l7speed > layer7.sImage.width /*|| l7speed < -layer7.sImage.width*/)
    {
        l7speed = 0;
    }


    l6speed += elapsed * layer6.vx
    if (l6speed > layer6.sImage.width)
    {
        l6speed = 0;
    }

    l5speed += elapsed * layer5.vx
    if (l5speed > layer5.sImage.width)
    {
        l5speed = 0;
    }

    l4speed += elapsed * layer4.vx
    if (l4speed > layer4.sImage.width)
    {
        l4speed = 0;
    }

    l3speed += elapsed * layer3.vx
    if (l3speed > layer3.sImage.width)
    {
        l3speed = 0;
    }

    l2speed += elapsed * layer2.vx
    if (l2speed > layer2.sImage.width)
    {
        l2speed = 0;
    }

    l1speed += elapsed * layer1.vx
    if (l1speed > layer1.sImage.width)
    {
        l1speed = 0;
    }

    update(elapsed);
    render(elapsed);
    startTimeMS = Date.now();
    requestAnimationFrame(gameLoop);
}

function render(delta) {
    canvasContext.clearRect(0,0,canvas.width, canvas.height);

    //layers.scrollBK(travel);

    //layers[i].scrollBK(travel[t]);

    /*layers[0].scrollBK(travel);
    layers[1].scrollBK(travel);
    layers[2].scrollBK(travel);
    layers[3].scrollBK(travel);
    layers[4].scrollBK(travel);
    layers[5].scrollBK(travel);
    layers[6].scrollBK(travel);
    layers[7].scrollBK(travel);*/


    /*layers[0].scrollBK(layerSpeeds[0]);
    layers[1].scrollBK(layerSpeeds[1]);
    layers[2].scrollBK(layerSpeeds[2]);
    layers[3].scrollBK(layerSpeeds[3]);
    layers[4].scrollBK(layerSpeeds[4]);
    layers[5].scrollBK(layerSpeeds[5]);
    layers[6].scrollBK(layerSpeeds[6]);
    layers[7].scrollBK(layerSpeeds[7]);*/

    /*layers[0].scrollBK(layerSpeed);
    layers[1].scrollBK(layerSpeed);
    layers[2].scrollBK(layerSpeed);
    layers[3].scrollBK(layerSpeed);
    layers[4].scrollBK(layerSpeed);
    layers[5].scrollBK(layerSpeed);
    layers[6].scrollBK(layerSpeed);
    layers[7].scrollBK(layerSpeed);*/



    /*layers.forEach(function(layer)
    {
        layer.scrollBK(layerSpeed);
    }*/

    /*for (var i = 0; i < layers.length; i++)
    {
        var layer = layers[i];
        layer.scrollBK(layerSpeed);
    }*/

    layer8.scrollBK(l8speed);
    layer7.scrollBK(l7speed);
    layer6.scrollBK(l6speed);
    layer5.scrollBK(l5speed);
    layer4.scrollBK(l4speed);
    layer3.scrollBK(l3speed);
    layer2.scrollBK(l2speed);
    layer1.scrollBK(l1speed);


    /*layer8.scrollBK(travel);
    layer7.scrollBK(travel);
    layer6.scrollBK(travel);
    layer5.scrollBK(travel);
    layer4.scrollBK(travel);
    layer3.scrollBK(travel);
    layer2.scrollBK(travel);
    layer1.scrollBK(travel);*/

    //bkgdImage.scrollBK(travel);
    //theCar.render();
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
    if(gameOverScreenScreen)
    {
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
