var dianasour,dianosourRunning,dianosourCollided;
var obstacles,obstaclesGroup;
var checkPointSound;
var ground;
var score=0;

PLAY=1;
END=2;
var gameState=PLAY;

function preload(){
  dianasourRunning=loadAnimation("dianasour1Image.png","dianasour2Image.png","dianasour3Image.png");
 dianasourCollidedImage=loadImage("dianasour3Image.png")
  ground1Image=loadImage("bg1.png");
   ground2Image=loadImage("bg2.png");
   ground3Image=loadImage("bg3.png");
  restartImage=loadImage("restart.png");
  gameoverImage=loadImage("gameOver.png");
   obstacle1Image=loadImage("obstacle1Image.png")
   obstacle2Image=loadImage("obstac.png")
   obstacle3Image=loadImage("obstacle3Image.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
   ground1=createSprite(0,0,width,height);
  ground1.addImage(ground1Image);
  ground1.scale=3;
 
  invisibleGround=createSprite(width/2,height-50,width,10)

    dianasour=createSprite(100,height-100,100,100);
  dianasour.addAnimation("running",dianasourRunning);
  dianasour.addAnimation("collided",dianasourCollidedImage)
  dianasour.scale=0.5;

  gameover=createSprite((width/2),(height/2));
    gameover.addImage(gameoverImage);
    restart=createSprite((width/2),(height/2)+80)
    restart.addImage(restartImage);
  
  obstaclesGroup=createGroup();
}

function draw(){
  background(0);
  invisibleGround.visible=false;
  
  if(gameState===PLAY){
     gameover.visible=false;
      restart.visible=false
    dianasour.changeAnimation("running",dianasourRunning)
    ground1.velocityX=-12;
  if(ground1.x<=0){
    ground1.x=ground1.width/2;
    rand=Math.round(random(1,3));
    console.log(rand)
    if(rand===1){
      ground1.addImage(ground1Image);
    }
    else if(rand===2){
       ground1.addImage(ground2Image);
    }else{
       ground1.addImage(ground3Image);
    }
  }
   if((touches.lenght>0||keyDown("space"))&&dianasour.y>=height-200){
      dianasour.velocityY=-15;
      touches = [];
    }
  dianasour.velocityY=dianasour.velocityY+0.8;
  //dianasour.debug=true;
  dianasour.setCollider("rectangle",0,-100,100,250);
  dianasour.collide(invisibleGround);
    
    if(score%200===0){
      ground1.velocityX=ground1.velocityX-1; 
    }
  
    if(dianasour.isTouching(obstaclesGroup)){
      gameState=END
    }
  spawningObstacles();   
  }if(gameState===END){
    dianasour.changeAnimation("collided",dianasourCollidedImage);
    ground1.velocityX=0;
    dianasour.velocityY=0;
    dianasour.addImage("collided",dianasourCollidedImage)
    frameCount=0;
      obstaclesGroup.setVelocityXEach(0);
    gameover.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)){
      gameState=PLAY;
      score=0;
      obstaclesGroup.destroyEach();
    }
  }
  drawSprites();
  fill("blue")
  textSize(25)
  text("score :"+score,width-150,height-500)
  score=score+Math.round(frameCount/100);
}

function spawningObstacles(){
  if(frameCount%100===0){
    var obstacles=createSprite(width,height-70,200,200);
    obstacles.velocityX=-15;
     if(score%200===0){
     obstacles.velocityX=obstacles.velocityX-1;
    }
    obstacles.lifetime=width/obstacles.velocityX
    var a=Math.round(random(1,3))
   if(a===1){
     obstacles.addImage(obstacle1Image);
     obstacles.setCollider("rectangle",70,-20,200,70)
   }
    else if(a===2){
      obstacles.setCollider("rectangle",70,-20,200,80);
      obstacles.addImage(obstacle2Image)
    }else{
      obstacles.addImage(obstacle3Image);
      obstacles.setCollider("rectangle",50,-10,200,50)
    }
   //obstacles.debug=true;
    obstaclesGroup.add(obstacles);
  }
} 