//global elements

//My map
const gameAerea = document.getElementById("gameAerea");
// bottom: 505.296875 height:372.296875 left:275 right:857 top:133 width:582
//x: 275 y: 133
const gameBorders = gameAerea.getBoundingClientRect();

const modal = document.getElementById("end-game");

//Fire events when everything is fully loaded
window.onload = function () {
  const startBtn = document.getElementById("btnStart");
  startBtn.addEventListener("click", startGame);
};

const pressedKeys = {
  left: false,
  right: false,
  up: false,
  down: false,
  space: false,
};

class Entities {
  constructor(name) {
    this.name = name;
    this.speed = 1;
    this.points = 0;
    this.array = [];
    this.elementBorders;
    this.arrayElementBorders = [];

    setInterval(() => {
      this.element = this.createEntities();
      this.array.push(this.element);
      this.spawnPosition(this.element);
    }, 10000);
  }

  // Create points or enemies
  createEntities() {
    const div = document.createElement("div");
    div.classList.add("entities");
    gameAerea.append(div);
    return div;
  }

  // Randomly spawn the entities and make them move from the right to the left
  spawnPosition(div) {
    const elementBorders = div.getBoundingClientRect();
    // console.log("avant", elementBorders);
    this.arrayElementBorders.push(elementBorders);

    // Set up the limited space where to spawn
    const maxY = gameBorders.top + elementBorders.height;
    const minY = gameBorders.bottom - 10 - elementBorders.height * 1.2;

    // Random spawn for Y; X remains the same
    const positionY = Math.floor(Math.random() * (maxY - minY) + minY);
    const positionX = gameBorders.right - elementBorders.width * 1.5;

    //update my element x & y with new value
    elementBorders.x = positionX;
    elementBorders.y = positionY;
    // Style the new positions to move the entities
    div.style.top = positionY + "px";
    div.style.left = positionX + "px";

    // Move the entities at a constant speed
    const moveInterval = setInterval(() => {
      const currentLeft = parseFloat(div.style.left); //convert into number
      const newLeft = currentLeft - this.speed;
      div.style.left = newLeft + "px";
      elementBorders.x -= this.speed;
      // console.log("apres", elementBorders.x);

      // Remove the entity if it goes beyond the game area
      if (newLeft < gameBorders.left + 10) {
        clearInterval(moveInterval); // stop the interval to move the div
        div.remove(); //remove the div from the page
        const index = this.array.indexOf(div); // find the index of the div removed
        if (index !== -1) {
          // returns -1 if not found
          this.array.splice(index, 1); // splice one element from the index
          this.arrayElementBorders.splice(index, 1); //same for this array
        }
      }
    }, 50);
  }
}

//the class to build my Player
class Player {
  constructor() {
    this.player = this.createPlayer();
    this.playerPosition = this.setPosition(this.player);
    this.playerBorders;
    window.addEventListener("keydown", this.handlePressedKeys.bind(this)); //create a window event which fires a function; bind this = refers to the Player class
    window.addEventListener("keyup", this.handleReleasedKeys.bind(this)); //create a window event which fires a function; bind this = refers to the Player class
    this.animate();
    this.speed = 5;
    this.move();
  }

  //instantiate my player
  createPlayer() {
    const div = document.createElement("div");
    div.id = "player";
    gameAerea.append(div);
    return div;
  }

  //set up the position of my player
  setPosition() {
    this.playerBorders = this.player.getBoundingClientRect();

    //references to help me place it
    const positionX = this.playerBorders.x + 10;
    const positionY = gameAerea.getBoundingClientRect().bottom / 2;

    //placing my player in the gameAerea
    this.player.style.left = positionX + "px";
    this.player.style.bottom = positionY + "px";

    //store new values
    this.playerBorders.x = positionX;
    this.playerBorders.y = positionY;
  }

  handlePressedKeys(event) {
    switch (event.code) {
      // event.code // event.code = have the key code of the pressed key
      case "ArrowLeft":
        pressedKeys.left = true;
        break; // left key is pressed
      case "ArrowRight":
        pressedKeys.right = true;
        break; // right key is pressed
      case "ArrowUp":
        pressedKeys.up = true;
        break; // up key is pressed
      case "ArrowDown":
        pressedKeys.down = true;
        break; // down key is pressed
      case "Space":
        pressedKeys.space = true;
    }
    this.animate();
  }

  handleReleasedKeys(event) {
    switch (event.code) {
      // event.code // event.code = have the key code of the pressed key
      case "ArrowLeft":
        pressedKeys.left = false;
        break; // left key is not pressed
      case "ArrowRight":
        pressedKeys.right = false;
        break; // right key is not pressed
      case "ArrowUp":
        pressedKeys.up = false;
        break; // up key is not pressed
      case "ArrowDown":
        pressedKeys.down = false;
        break; // down key is not pressed
      case "Space":
        pressedKeys.space = false;
    }
    this.animate();
  }

  animate() {
    if (
      pressedKeys.left === true &&
      this.playerBorders.left > gameBorders.left + 10
    ) {
      this.move("left");
    }

    if (
      pressedKeys.right === true &&
      this.playerBorders.right < gameBorders.right - 10
    ) {
      this.move("right");
    }
    // console.log("map'", gameBorders);
    // console.log("player", this.playerBorders);
    if (
      pressedKeys.down === true &&
      this.playerBorders.bottom < gameBorders.bottom
    ) {
      this.move("down");
      // console.log(this.playerBorders.bottom, gameBorders.bottom);
      //62, 409
    }

    if (pressedKeys.up === true && this.playerBorders.top > gameBorders.top) {
      this.move("up");
    }
    console.log(this.playerBorders.top, gameBorders.top);
    //315, 120

    if (pressedKeys.space === true) {
      console.log(pressedKeys.space);
      this.attack();
    }

    // else if (pressedKeys.space !== true){
    //   this.player.style.transform = "rotate(30deg)"
    // }
  }

  move(direction) {
    switch (direction) {
      case "left":
        this.playerBorders.x -= this.speed;
        break;
      case "right":
        this.playerBorders.x += this.speed;
        break;
      case "up":
        this.playerBorders.y += this.speed;
        break;
      case "down":
        this.playerBorders.y -= this.speed;
        break;
    }
    this.player.style.left = this.playerBorders.x + "px"; // style.left and bottom require a string so "px"
    this.player.style.bottom = this.playerBorders.y + "px";
  }

  attack() {
    this.player.style.transform = "rotate(300deg)";
  }
}

class Game {
  constructor() {
    this.player = new Player();
    this.entities = new Entities();
    this.dectectionInterval = null;
    this.collisionDetection();
  }

  collisionDetection() {
    console.log("DETECT");
    const playerPos = this.player.playerBorders;
    const entitiesArr = this.entities.arrayElementBorders;
    // console.log(entitiesArr);

    let checkCollision = setInterval(() => {
      // console.log("test");
      for (let i = 0; i < entitiesArr.length; i++) {
        let elementPos = entitiesArr[i];
        console.log(playerPos, elementPos);
        // console.log("playerpos", playerPos);
        // console.log(entitiesArr);
        // console.log(elementPos);
        if (
          playerPos.right === elementPos.left ||
          playerPos.left === elementPos.right ||
          playerPos.top === elementPos.bottom ||
          playerPos.bottom === elementPos.bottom
        ) {
          console.log("CRASH");
          this.gameOver();
          clearInterval(checkCollision);
        }
      }
    }, 1000);
  }

  gameOver() {
    console.log("gameover");
    // modal.showModal();
  }
}

// function game over => display a Div with the title Game Over + 2 div buttons to replay or quit

function startGame() {
  new Game();
}
