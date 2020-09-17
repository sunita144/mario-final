
var gameState = "PLAY";

var mario, mario_running, mario_collided;
var bg, bgImage;
var coinsGroup, coinImage;
var brickGroup, brickImage;
var obstaclesGroup, obstacle1, turtleObstacleImage, obstacle3;
var invisibleGround;
var coinScore=0;
var gameOver, restart;
var jumpSound,dieSound;

function preload(){
  mario_running =   loadAnimation("mar1.png","mar2.png","mar3.png","mar4.png","mar5.png","mar6.png","mar7.png");
  mario_collided = loadAnimation("dead.png");
  bgImage = loadImage("bgnew.png");
  coinImage = loadAnimation("con1.png","con2.png","con3.png","con4.png","con5.png","con6.png");
  brickImage = loadImage("brick.png");
  mushObstacleImage = loadAnimation("mush1.png","mush2.png","mush3.png","mush4.png","mush5.png","mush6.png",);
  turtleObstacleImage = loadAnimation("tur1.png","tur2.png","tur3.png","tur4.png","tur5.png",);
  obstacle3 = loadImage("obs3.png");
  jumpSound = loadSound("jump.mp3");
  coinSound = loadSound("coinSound.mp3");
  dieSound = loadSound("dieSound.mp3");
}

function setup() {
  createCanvas(1000, 600);
  textSize(20);
  fill("green");
  
  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =0.5;
  bg.x=bg.width/4;
  console.log(bg.width)
  bg.velocityX = -6;
  
  gameOver = createSprite(300,100);
  mario = createSprite(200,585,20,50);
  
  mario.addAnimation("running", mario_running);

  mario.addAnimation("collided", mario_collided);
  mario.setCollider("rectangle",0,0,300,600);
  //mario.debug=true
mario.scale =0.3;
  restart = createSprite(300,140);
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,585,400,10);
  invisibleGround.visible = false;
  
  coinsGroup = new Group();
  obstaclesGroup = new Group();
  bricksGroup = new Group();
  coinScore = 0;
}

function draw() {
  
  background(255);
  if(mario.x<200){
    mario.x=200;
  }

  if (gameState==="PLAY"){
    
    
    console.log(bg.x)
    if(keyDown("space") && mario.y >= 309) {
      mario.velocityY = -16;
      jumpSound.play();
    }
    mario.velocityY = mario.velocityY + 0.5
  
    if (bg.x < 100){
      bg.x = 400;
    }
    for(var i = 0 ; i< (bricksGroup).length ;i++){
      var temp = (bricksGroup).get(i) ;
      
      if (temp.isTouching(mario)) {
         mario.collide(temp);
        }
          
      }

      for(var i = 0 ; i< (coinsGroup).length ;i++){
        var temp = (coinsGroup).get(i) ;
        
        if (temp.isTouching(mario)) {
          coinSound.play();
          coinScore++;
          temp.destroy();
          temp=null;
          }
            
        }
    spawnCoins();
    spawnObstacles();
    spawnBricks();
  
    if(obstaclesGroup.isTouching(mario)){
        dieSound.play();
        mario.scale=0.4
        mario.setCollider("rectangle",0,0,300,10);
        mario.y=570
        gameState = "END";
    }
  }
  else if (gameState === "END") {
   
    
    bg.velocityX = 0;
    mario.velocityY = 0;
    
    mario.changeAnimation("collided",mario_collided);
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    bricksGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    bricksGroup.setVelocityXEach(0);
  }
  mario.collide(invisibleGround);
  drawSprites();
  text("Coins Collected: "+ coinScore, 500,50);
  
}

function spawnCoins() {
  if (frameCount % 50 === 0) {
    var coin = createSprite(1200,120,40,10);

    coin.addAnimation("coin", coinImage);
    coin.y = Math.round(random(80,350));
   // coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.velocityX = -3;
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(1200,545,10,40);
    obstacle.velocityX = -4;
    obstacle.scale=0.2
    switch(Math.round(random(1,2))){
    case 1:
        obstacle.addAnimation("mush",mushObstacleImage);
        break;
    case 2:
      obstacle.addAnimation("turtle", turtleObstacleImage);
        break;
    case 3:
        obstacle.addImage(obstacle3);
        break;    
    }
             
  
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function spawnBricks() {
  if (frameCount % 70 === 0) {
    var brick = createSprite(1200,120,40,10);
    brick.y = Math.round(random(50,450));
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityX = -5;
    bricksGroup.add(brick);
  }
  
}