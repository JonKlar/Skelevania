/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HeroSS = __webpack_require__(3);
	const SkeletonSS = __webpack_require__(4);
	const stage = new createjs.Stage("Canvas");
	const collapseSound = new Audio('./assets/sounds/smw_stomp_bones.wav');
	const themeMusic = new Audio('./assets/sounds/68-gerudo-valley.mp3');
	const swordSlash = new Audio('./assets/sounds/sword-slash1.mp3');
	const jumpSound = new Audio('./assets/sounds/OOT_YoungLink_Jump1.wav');
	const reviveSound = new Audio('./assets/sounds/backwards_smw_stomp_bones.wav');
	themeMusic.volume = 0.2;
	jumpSound.volume = 0.3;
	swordSlash.volume = 0.1;
	themeMusic.play();
	
	
	
	const heldKeys = {
	  "d": false,
	  "a": false,
	  "ArrowRight": false,
	  "ArrowLeft": false,
	};
	
	window.addEventListener("keydown",(event) => {
	  event.preventDefault();
	  const key = event.key;
	  switch (key) {
	    case "d":
	      if (heldKeys.d === false) {
	        hero.hit19 = false;
	        if (hero.y !== 345) {
	          hero.gotoAndPlay("attackJump");
	        } else if (heldKeys.ArrowRight === false && heldKeys.ArrowLeft === false) {
	        hero.gotoAndPlay("attackStand");
	        } else {
	        hero.gotoAndPlay("attackRun");
	        }
	      }
	      heldKeys.d = true;
	      break;
	    case "ArrowRight":
	      if (heldKeys.ArrowRight === false && hero.y === 345){
	        hero.scaleX = 1;
	        hero.gotoAndPlay("runRight");
	        hero.vX = 8;
	        heldKeys.ArrowRight = true;
	      }
	      break;
	    case "ArrowLeft":
	      if (hero.y === 345 && heldKeys.ArrowLeft === false) {
	        hero.scaleX = -1;
	        hero.gotoAndPlay("runRight");
	        hero.vX = -8;
	        heldKeys["ArrowLeft"] = true;
	      }
	      break;
	    case " ":
	      if (hero.y === 345) {
	        jumpSound.play();
	        hero.gotoAndPlay("jump");
	        hero.vY = -20;
	      }
	  }
	});
	
	window.addEventListener("keyup", (event) => {
	  event.preventDefault();
	  const key = event.key;
	  heldKeys[key] = false;
	  switch (key) {
	    case "ArrowRight":
	    case "ArrowLeft":
	    if (hero.y === 345 && heldKeys.ArrowLeft === false && heldKeys.ArrowRight === false){
	      hero.gotoAndPlay("stand");
	      hero.vX = 0;
	    }
	      break;
	  }
	});
	
	let hero = new createjs.Sprite(HeroSS);
	hero.hit19 = false;
	hero.x = 100;
	hero.y = 345;
	hero.vX = 0;
	hero.vY = 0;
	hero.regX = 16;
	
	
	let skele = new createjs.Sprite(SkeletonSS);
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
	  } else if (hero.currentFrame === 20 && Math.abs(hero.x - (skeleton.x)) < 75){
	    if (hero.hit19 === false) {
	      skeleton.hp -= 100;
	      swordSlash.play();
	    } else {
	      skeleton.hp -= 10;
	    }
	  }
	}
	
	function updateSkeleton(skeleton) {
	    if (skeleton.dead === false) {
	      skeleton.x += skeleton.vX;
	      if (skeleton.x > 600){
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
	        skeleton.y = 393;
	      }
	    } else {
	      skeleton.deadTime += 1;
	      if (skeleton.deadTime > 40) {
	        skeleton.gotoAndPlay("revive");
	        reviveSound.play();
	        skeleton.y = 384;
	        skeleton.hp = 100;
	        skeleton.dead = false;
	        skeleton.deadTime = 0;
	      } else if (skeleton.deadTime > 20)
	        if (skeleton.deadTime % 2 === 0) {
	          skeleton.x += 5;
	      } else {
	          skeleton.x -= 5;
	      }
	
	    }
	}
	
	
	
	function handleTick(){
	  updateHero();
	  skeletons.forEach((skeleton) => {
	    updateSkeleton(skeleton);
	  });
	  stage.update();
	}


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	const HeroSS = new createjs.SpriteSheet({
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
	    [168, 540, 30, 36],
	    [204, 540, 30, 40],
	    [234, 540, 30, 40],
	    [268, 540, 30, 40], //idx25
	
	],
	  "animations": {
	    "stand": 0,
	    "runRight": [1,8],
	    "runLeft": [9,16],
	    "attackRun": {
	    frames: [0,17,18,19,20,19,18,0],
	    next: "runRight"
	  },
	    "attackStand": {
	    frames: [0,17,18,19,20,19,18,0],
	    next: "stand"
	    },
	    "attackJump": {
	    frames: [0,17,18,19,20,19,18,0],
	    next: "jumpCont"
	    },
	    "jump": {
	      frames: [21,22],
	      next: "jumpCont"
	    },
	    "jumpCont": 22,
	    "landStand": {
	      frames: [23,24,25],
	      next: "stand"
	    },
	    "landRun": {
	      frames: [23,24,25],
	      next: "runRight"
	    }
	  }
	});
	module.exports = HeroSS;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const SkeletonSS = new createjs.SpriteSheet({
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
	    "revive": [18, 18, "walkRight"]
	  }
	});
	
	module.exports = SkeletonSS;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map