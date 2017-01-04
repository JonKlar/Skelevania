## Sample JS Project Proposal: Skelevania

### Background

Skelevania is a sidescrolling adventure where you must get past a horde of skeletons to get to the curry restaurant for lunch.


### Functionality & MVP  
In Skelevania players will be able to

- [ ] Move, Jump, and use multiple attacks
- [ ] Destroy skeletons, causing them to collapse into a pile of bones and play a xylophone sound
- [ ] Find and equip different weapons
- [ ] Save their progress

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

The app will contain a single view screen with content that moves horizontally and is rendered as the player moves.  It will be optimized using an LRU cache.

![wireframes]()

### Architecture and Technologies


This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`viewPort.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`object.js`: this class will handle the logic for the movement of objects rendered on the screen, as well as caching the most recently derendered objects.  This class will be extended by Player, Skeleton, and Weapon.

`Player.js`: This class will hold the state of the player object, as well as the logic for user inputs for movement

`Skeleton.js`: This class will hold the logic for skeleton objects, including what happens when they are overlapped with a weapon obejct.

`Weapon.js`: This class will contain the animation and logic for hitboxes for the weapon, as well as the user input for attacks.   

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  Build out the Player Object and connect it to the ViewPort

- Complete the `object.` module (constructor, update functions)
- Render a player object to the `Canvas` using `Easel.js`
- Make a background for the ViewPort
- Be able to move the player object in the ViewPort

**Day 3**: Create the Skeleton class and logic.  Place skeletons in the viewPort.

- Render skeleton objects
- Be able to kill skeletons


**Day 4**: Implement different weapons and attacks for the user to kill skeletons.  

- Create an ending for the game
- Have a styled `Canvas`, nice looking controls and title
- If time: allow player to customize the way their player looks
