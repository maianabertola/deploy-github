//global elements

const gameAerea = document.getElementById("gameAerea");
// bottom: 505.296875 height:372.296875 left:275 right:857 top:133 width:582
//x: 275 y: 133
const gameBorders = gameAerea.getBoundingClientRect();

window.onload = function () {
  const startBtn = document.getElementById("btnStart");
  startBtn.addEventListener("click", startGame);
};

//class to create points, ennemies and obstacles
//spawn every x seconds
//speed increase

class Entities {
  constructor(name) {
    this.name = name;
    setInterval(() => {
      this.element = this.createEntities();
      this.spawnPosition(this.element);
    }, 5000);
  }

  createEntities() {
    const div = document.createElement("div");
    div.classList.add("entities");
    gameAerea.append(div);
    return div;
  }

  spawnPosition(element) {
    const elementBorders = element.getBoundingClientRect();

    let maxY = gameBorders.top + elementBorders.height;
    let minY = gameBorders.bottom - elementBorders.height * 1.2;
    let positionY = Math.floor(Math.random() * (maxY - minY) + minY);

    let positionX = gameBorders.right - elementBorders.width * 1.5;

    element.style.top = positionY + "px";
    element.style.left = positionX + "px";

    setInterval(() => {
      let speed = 5;
      let currentLeft = element.getBoundingClientRect().left;
      let newLeft = currentLeft - speed;
      element.style.left = newLeft + "px";
    }, 50);
  }
}

class Player {
  constructor() {
    this.player = this.createPlayer();
    this.position = this.setPosition(this.player);
    this.playerBorders = this.player.getBoundingClientRect();
  }

  createPlayer() {
    const div = document.createElement("div");
    div.id = "player";
    gameAerea.append(div);
    return div;
  }

  setPosition(player) {
    //references to place my player on the map
    let playerX = gameAerea.getBoundingClientRect().x + 10;
    let playerY = gameAerea.getBoundingClientRect().bottom / 2;

    //placing my player in the map
    player.style.left = playerX + "px";
    player.style.bottom = playerY + "px";
    // console.log(playerY, playerX);
  }

  movePlayer(direction) {
    switch (direction) {
      case "right":
        if (this.canMoveRight()) {
          this.x += 1;
        }
        break;

      case "left":
        if (this.canMoveLeft()) {
          this.x -= 1;
        }
        break;

      case "up":
        if (this.canMoveUp()) {
          this.y += 1;
        }
        break;

      case "down":
        if (this.canMoveDown()) {
          this.y -= 1;
        }
        break;
    }
    this.setPosition();
  }

  canMoveRight() {
    if (playerBorders.right < gameBorders.right) {
      return true;
    } else {
      return false;
    }
  }

  canMoveRight() {
    if (playerBorders.left > gameBorders.left) {
      return true;
    } else {
      return false;
    }
  }

  canMoveUp() {
    if (playerBorders.top < gameBorders.top) {
      return true;
    } else {
      return false;
    }
  }

  canMoveDown() {
    if (playerBorders.bottom > gameBorders.bottom) {
      return true;
    } else {
      return false;
    }
  }
}

class Game {
  constructor() {
    this.Player = new Player();
    this.Entities = new Entities();
    this.intervalID = null;
  }
}

function startGame() {
  new Game();
}

// gameOver() {}

// collisionDetection() {}

// udpateLevel() {}

/* 
class Entities

function spawn ()
-> when create element
-> what position (random)
-> div + background image

function movement ()
-> how can he moves (one direction)
-> which speed
-> boundaries ? dder à florian si on doit détruire
les éléments pour éviter qu'il run ad vitam

function points ()



class Player {
    function createPlayer ()
    function setPosition ()
    always at the center of the div

    function move (direction)

    function moveRight
    function moveLeft
    function moveUp
    function moveDown

    function attack

}



  spawnPosition() {
    this.x = 10;
    this.y = 10;



class Score {
    function createScore
    function updateScore 
    
}
*/
