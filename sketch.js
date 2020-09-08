var PLAY = 1;
var END = 2;
var READY = 0;
var gameState = READY;

var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup; 
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;

var restartB,restartImg;
var scene, bow, crackers, rand,edges;

var arrowSound,pop_green,pop_blue,pop_red,BirthdaySong;

var score,crackersImg;

var rd_grp;
var bl_grp;
var gr_grp;
var ar_grp;

function preload(){
  
  backgroundImage = loadImage("BeFunky-collage.jpg");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  crackersImg = loadImage("HB2.jpg");
  restartImg = loadImage("restart1.png");
  
  arrowSound = loadSound("ArrowSwoosh.mp3");
  pop_green = loadSound("Pop_green.mp3");
  pop_blue = loadSound("Pop_green.mp3");
  pop_red = loadSound("Pop_red.mp3");
  BirthdaySong = loadSound("BirthdaySong.mp3");
  
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
   // Moving background
scene=createSprite(width/2,height-350,width,height);
scene.addImage(backgroundImage);
scene.scale=0.7;
scene.velocityX= 2;
//scene.x=width/2;

//creating bow to shoot arrrow
bow = createSprite(width-20,height-300,20,20);
bow.addImage(bowImage);
bow.scale = 1.5


crackers = createSprite(width/2,height-300,width,height);
crackers.addImage(crackersImg);
crackers.visible=false;
crackers.scale = 0.7;

restartB = createSprite(width-50,height-50,20,20);
restartB.addImage(restartImg);
restartB.visible=false;
restartB.scale = 0.1;
  
rd_grp = new Group();
bl_grp = new Group();
gr_grp = new Group();
ar_grp = new Group();

score =0;
    
}

function draw() {
  background("white");
  
  drawSprites();
  
  if(gameState===READY)
  {
    scene.velocityX= 2;
    // reset background to center
     if (scene.x > 1000) 
      {
       scene.x = width/2;
      }
    
    bow.visible = false;  
    
    //Press space to PLAY
    fill("black");
    stroke("white")
    strokeWeight(7)
    textFont("black letter");
    textSize(80);
    text("Press 'Space' to Play",width/3,200);
    
    //Description to play
    textSize(40);
    fill("white");
    stroke("black")
    strokeWeight(4)
    text("* Press 'Space' to release Arrow",width/3,270);
    text("* Move 'Mouse' to move the Bow",width/3,320);
    
    if(keyWentDown("space"))
    {
      gameState=PLAY;
    }
  }
  
  //text style for Score
  fill("grey");
  stroke("white")
  strokeWeight(7)
  textFont("black letter");
  textSize(50);
  
  if(gameState===PLAY)
  {
    //giving velocity to background
      scene.velocityX= 2;
  // bow moving on Yaxis with mouse
      bow.visible = true;
      bow.y = World.mouseY;
      
      // reset background to center
     if (scene.x > 1000) 
      {
       scene.x = width/2;
      }
      
     rand = Math.round(random(1,6));
      switch(rand)
      {
        case 1 : balloon_red();
        break;
        case 2 : balloon_blue();
        break;
        case 3 : balloon_green();
        break;
        default : break;
      }
    
      if(keyWentDown("space")&&gameState===PLAY)
      {
        arrow_fun();
      }
      
      
      if(rd_grp.isTouching(ar_grp))
      {
        pop_red.play();
        rd_grp.destroyEach();
        ar_grp.destroyEach();
        score= score + 1;
      }
      
      if(bl_grp.isTouching(ar_grp))
      {
        pop_blue.play();
        bl_grp.destroyEach();
        ar_grp.destroyEach();
        score= score + 1;
      }
      
      if(gr_grp.isTouching(ar_grp))
      {
        pop_green.play();
        gr_grp.destroyEach();
        ar_grp.destroyEach();
        score= score + 1;
      }
      
      
      if(score===29)
      {
        gameState=END;
        BirthdaySong.play();
      }
      
      
  }
  else if(gameState===END)
  {
    scene.velocityX=0;
    rd_grp.setVelocityXEach(0);
    bl_grp.setVelocityXEach(0);
    gr_grp.setVelocityXEach(0);
    ar_grp.setVelocityXEach(0);
    rd_grp.destroyEach();
    bl_grp.destroyEach();
    gr_grp.destroyEach();
    ar_grp.destroyEach();
    bow.velocityY = 0;
    crackers.visible=true;
    restartB.visible=true;
    
    if(mousePressedOver(restartB))
    {
      reset();
    }
    
    text("' th",width-80,50);
  }
  
  //creating edges and make bow collide with right edge
  edges = createEdgeSprites();
  bow.collide(edges);
  
  
  text(score,width-150,50);

}

function reset()
{
  gameState=READY;
  score = 0;
  crackers.visible=false;
  restartB.visible=false;
  BirthdaySong.stop();
  console.log("hello");
}

function balloon_red()
{
  if(World.frameCount%80===0)
  {
    var b1_red = createSprite(0,random(20,height-40),20,20);
    b1_red.addImage(red_balloonImage);
    b1_red.scale = 0.1
    b1_red.velocityX = 3 + score/2;
    b1_red.lifetime=width/3;
    rd_grp.add(b1_red);
  //  b1_red.debug = true;
    b1_red.setCollider("circle",-100,-100,300);
  }
}

function balloon_blue()
{
  if(World.frameCount%80===0)
  {
    var b2_blue = createSprite(0,random(20,height-40),20,20);
    b2_blue.addImage(blue_balloonImage);
    b2_blue.scale = 0.1
    b2_blue.velocityX = 3+ score/2;
    b2_blue.lifetime=width/3;
    bl_grp.add(b2_blue);
   // b2_blue.debug = true;
    b2_blue.setCollider("circle",-100,-100,300);
  }
}

function balloon_green()
{
  if(World.frameCount%80===0)
  {
    var b3_green = createSprite(0,random(20,height-40),20,20);
    b3_green.addImage(green_balloonImage);
    b3_green.scale = 0.1
    b3_green.velocityX = 3 + score/2;
    b3_green.lifetime=width/3;
    gr_grp.add(b3_green);
   // b3_green.debug = true;
    b3_green.setCollider("circle",-100,-100,300);
  }
}

function arrow_fun()
{
  var arrow = createSprite(width-20,height-300,20,20);
  arrow.velocityX = -5;
  arrowSound.play();
  arrow.addImage(arrowImage);
  arrow.scale = 0.4
  arrow.lifetime=width/5;
  arrow.y = bow.y;
  ar_grp.add(arrow);
 // arrow.debug = true;
  arrow.setCollider("rectangle",0,-10,250,20);
}
