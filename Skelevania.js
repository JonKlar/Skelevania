const HeroSS = require('./lib/hero');
const SkeletonSS = require('./lib/skeleton');
const stage = new createjs.Stage("Canvas");

let hero = new createjs.Sprite(HeroSS);
hero.x = 100;
hero.y = 529;


hero.addEventListener("click", handleClick);
function handleClick(){
hero.gotoAndPlay("attack");
}


let skele = new createjs.Sprite(SkeletonSS);
skele.x = 600;
skele.y = 540;
skele.scaleX = 1.3;
skele.scaleY = 1.3;


stage.addChild(hero);
stage.addChild(skele);
hero.gotoAndPlay("runRight");
skele.gotoAndPlay("walkRight");
createjs.Ticker.setFPS(10);
createjs.Ticker.addEventListener("tick", stage);
