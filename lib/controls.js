const Controls = (hero, heldKeys, jumpSound) => {


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
};

module.exports = Controls;
