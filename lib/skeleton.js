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
