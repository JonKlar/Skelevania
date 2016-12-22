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
