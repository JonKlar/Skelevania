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

	const HeroSS = __webpack_require__(1);
	const SkeletonSS = __webpack_require__(2);
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


/***/ },
/* 1 */
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
	module.exports = HeroSS;


/***/ },
/* 2 */
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
	  }
	});
	
	module.exports = SkeletonSS;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map