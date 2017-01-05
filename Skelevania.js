const HeroSS = require('./lib/hero_sheet');
const SkeletonSS = require('./lib/skeleton_sheet');
const stage = new createjs.Stage("Canvas");
const collapseSound = new Audio('./assets/sounds/smw_stomp_bones.wav');
const themeMusic = new Audio('./assets/sounds/68-gerudo-valley.mp3');
const swordSlash = new Audio('./assets/sounds/sword-slash1.mp3');
const jumpSound = new Audio('./assets/sounds/OOT_YoungLink_Jump1.wav');
const reviveSound = new Audio('./assets/sounds/backwards_smw_stomp_bones.wav');
const hitSound = new Audio('./assets/sounds/hitSound.wav');
const textBox = document.getElementById("text-box");
const textBox2 = document.getElementById("text-box2");
const TextLines = require('./lib/text_lines');
const clickToStart = document.getElementById("start");
const overlay = document.getElementById("overlay");
const Controls = require('./lib/controls');
themeMusic.volume = 0.2;
jumpSound.volume = 0.3;
swordSlash.volume = 0.1;
hitSound.volume = 0.1;



clickToStart.addEventListener("click", (event) => {
  overlay.classList.add("closed");
  themeMusic.play();
  skele.active = true;
});



const heldKeys = {
  "d": false,
  "a": false,
  "ArrowRight": false,
  "ArrowLeft": false,
};


let hero = new createjs.Sprite(HeroSS);
hero.hit19 = false;
hero.x = 100;
hero.y = 345;
hero.vX = 0;
hero.vY = 0;
hero.regX = 16;

Controls(hero, heldKeys, jumpSound);

let skele = new createjs.Sprite(SkeletonSS);
skele.active = false;
skele.dead = false;
skele.deadTime = 0;
skele.deathCounter = 0;
skele.hp = 100;
skele.x = 200;
skele.y = 384;
skele.vX = 10;
skele.vY = 0;
skele.scaleX = 1.2;
skele.scaleY = 1.2;
skele.hitTimer = 5;

const skeletons = [skele];

stage.addChild(hero);
stage.addChild(skele);
hero.gotoAndPlay("stand");
skele.gotoAndPlay("walkRight");
createjs.Ticker.setFPS(10);
createjs.Ticker.addEventListener("tick", handleTick);

function updateHero() {
  hero.x += hero.vX;
  hero.y += hero.vY;
  if (hero.x > 810) {
    hero.x = -10;
  } else if (hero.x < -10){
    hero.x = 810;
  }
  if (hero.y < 345){
    hero.vY += 4;
  } else if (hero.y > 345) {
    hero.y = 345;
    hero.vY = 0;
    if (heldKeys.ArrowRight === false && heldKeys.ArrowLeft === false){
      hero.gotoAndPlay("landStand");
      hero.vX = 0;
    } else {
      hero.gotoAndPlay("landRun");
    }
  }
}

function checkCollision(skeleton){
    if (Math.abs(hero.x - (skeleton.x)) < 25){
      console.log("collision");
    }
}

function checkHit(skeleton) {
  if (hero.currentFrame === 19 && Math.abs(hero.x - (skeleton.x)) < 65) {
    hero.hit19 = true;
    skeleton.hp -= 10;
    handleHit();
  } else if (hero.currentFrame === 20 && Math.abs(hero.x - (skeleton.x)) < 75){
    if (hero.hit19 === false) {
      skeleton.hp -= 100;
      swordSlash.play();
    } else {
      skeleton.hp -= 10;
      hitSound.play();
    }
    handleHit();
  }
}

function handleHit() {
  skele.vX = 15 * ((skele.x - hero.x) / Math.abs(skele.x - hero.x));
  skele.vY = -10;
  skele.hitTimer = 0;
}

function updateSkeleton(skeleton) {
    if (skeleton.dead === false) {
      skeleton.x += skeleton.vX;
      skeleton.y += skeleton.vY;
      if (skeleton.y < 384){
        skeleton.vY += 7;
      } else if (skeleton.y > 384) {
        skeleton.y = 384;
        skeleton.vY = 0;
      }
      if (skeleton.hitTimer < 4) {
        skeleton.hitTimer += 1;
      } else {
        skeleton.vX = 10 * skeleton.scaleX;
      }
      if (skeleton.x > 800){
        skeleton.scaleX = -1.2;
        skeleton.vX = -10;
      } else if (skeleton.x < 0){
        skeleton.scaleX = 1.2;
        skeleton.vX = 10;
      }
      checkCollision(skeleton);
      checkHit(skeleton);
      if (skeleton.hp < 1) {
        skeleton.gotoAndPlay("collapse");
        collapseSound.play();
        skeleton.dead = true;
        if (skeleton.active) {
          skeleton.deathCounter += 1;
        }
        updateTextBox();
        skeleton.y = 393;
        skeleton.vY = 0;
        skeleton.hitTimer = 5;
      }
    } else {
      skeleton.deadTime += 1;
      if (skeleton.deadTime > 60) {
        skeleton.gotoAndPlay("revive");
        reviveSound.play();
        skeleton.y = 384;
        skeleton.hp = 100;
        skeleton.dead = false;
        updateTextBox();
        skeleton.deadTime = 0;
      } else if (skeleton.deadTime > 40)
        if (skeleton.deadTime % 2 === 0) {
          skeleton.x += 5;
      } else {
          skeleton.x -= 5;
      }

    }
}

function updateTextBox() {
  if (skele.dead === true) {
    textBox.classList.add('pre-animation');
    textBox2.classList.add('pre-animation');
    textBox.innerHTML = TextLines[skele.deathCounter][0];
    textBox2.innerHTML = TextLines[skele.deathCounter][1];
    setTimeout( () => {
    textBox.classList.remove('pre-animation');
    textBox2.classList.remove('pre-animation');
    }, 100);
  } else {
    textBox.innerHTML = "";
    textBox2.innerHTML = "";
  }
}



function handleTick(){
  updateHero();
  skeletons.forEach((skeleton) => {
    updateSkeleton(skeleton);
  });
  stage.update();
}
