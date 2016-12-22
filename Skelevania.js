
const stage = new createjs.Stage("Canvas");
let HeroSpriteSheet = new createjs.SpriteSheet({
  "images": ["assets/sprites/hero_pixel_sheet.png"],
  "frames": [
    // x, y, width, height, imageIndex*, regX*, regY*
    //stand
     [6, 7, 30, 40], //idx0
    //run right
    [33, 323, 30, 40], //idx1
    [67, 323, 30, 40],
    [100, 323, 30, 40],
    [135, 323, 30, 40],
    [167, 323, 30, 40],
    [202, 323, 30, 40],
    [234, 323, 30, 40],
    [267, 323, 30, 40], //idx8
    // run left
    [37, 368, 30, 40], //idx9
    [71, 368, 30, 40],
    [104, 368, 30, 40],
    [139, 368, 30, 40],
    [171, 368, 30, 40],
    [206, 368, 30, 40],
    [238, 368, 30, 40],
    [271, 368, 30, 40], //idx16
    // attack
    [28, 590, 40, 40], //idx17
    [93, 590, 45, 40],
    [164, 590, 90, 40],
    [301, 590, 91, 40], //idx20
    // jump
    [133, 548, 30, 40], //idx21
    [168, 540, 30, 50],
    [204, 540, 30, 50],
    [234, 540, 30, 40],
    [268, 540, 30, 40], //idx25

],
  "animations": {
    "stand": 0,
    "runRight": [1,8],
    "runLeft": [9,16],
    "attack": {
    frames: [0,17,18,19,20,19,18,0],
    },
    "jump": {
      frames: [21,22,22,22,23,24,25]
    },
  }
});

let SkeletonSpriteSheet = new createjs.SpriteSheet({
  "images": ["assets/sprites/skeleton_pixel_sheet.png"],
  "frames": {
    height: 32,
    width: 32,
    count: 72,
    margin: 0,
    spacing: 0,
    regX: 16,
    regY: 32,
  },
  "animations": {
    "walkRight":{
      frames: [23, 32],
      speed: 0.5
    },
    "collapse": 26,
  }
});

let hero = new createjs.Sprite(HeroSpriteSheet);
hero.x = 100;
hero.y = 529;
hero.scaleX = 1.2;
hero.scaleY = 1.2;

let hero2 = new createjs.Sprite(HeroSpriteSheet);
hero2.x = 200;
hero2.y = 529;

let hero3 = new createjs.Sprite(HeroSpriteSheet);
hero3.y = 529;

let hero4 = new createjs.Sprite(HeroSpriteSheet);
hero4.x = 400;
hero4.y = 529;

let hero5 = new createjs.Sprite(HeroSpriteSheet);
hero5.x = 300;
hero5.y = 529;
hero5.regX = 20;
hero5.scaleX = -1;

let hero6 = new createjs.Sprite(HeroSpriteSheet);
hero6.x = 500;
hero6.y = 529;

let skele = new createjs.Sprite(SkeletonSpriteSheet);
skele.x = 600;
skele.y = 540;
skele.scaleX = 1.5;
skele.scaleY = 1.5;


stage.addChild(hero);
stage.addChild(hero2);
stage.addChild(hero3);
stage.addChild(hero4);
stage.addChild(hero5);
stage.addChild(hero6);
stage.addChild(skele);
hero.gotoAndPlay("runRight");
hero2.gotoAndPlay("runLeft");
hero3.gotoAndPlay("stand");
hero4.gotoAndPlay("attack");
hero5.gotoAndPlay("attack");
hero6.gotoAndPlay("jump");
skele.gotoAndPlay("walkRight");
createjs.Ticker.setFPS(10);
createjs.Ticker.addEventListener("tick", stage);

//Update stage will render next frame
