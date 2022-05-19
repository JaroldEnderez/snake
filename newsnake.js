const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.height =400; 

var isDead = false;
var currentScore= highScore=0;
const FR = 5;
const S = 20;
const T = canvas.width / S;
var gameOver = false;

let pos, vel, food, snake;

function welcome(){

  ctx.fillStyle = '#231f20';
  ctx.fillRect(0,0,canvas.height,canvas.width);

  ctx.font = "30px Bold Courier New ";
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";
  ctx.fillText("YOU DIED!", canvas.width/2, canvas.height/4);
  
  ctx.font = "15px Bold Courier New ";
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";
  ctx.fillText("Press Enter to play again", canvas.width/2, canvas.height/2);

  document.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      init();
    }
  });
}


function init(){
  pos = {x: 10, y: 10};
  vel = {x: 0, y: 0};

  snake = [
    {x: 8, y: 10},
    {x: 9, y: 10},
    {x: 10, y: 10},
  ]

  randomFood();
}

init();


function randomFood(){
  food = {
    x: Math.floor(Math.random() * T),
    y: Math.floor(Math.random() * T),
  }

  for (let cell of snake) {
    if(cell.x === food.x && food.y === cell.y) {
      return randomFood();
    }
  }
}

document.addEventListener('keydown', keydown);

function keydown(e){
  switch(e.keyCode) {
    case 37: {
      return vel = {x: -1, y: 0}
    }
    case 38: {
      return vel = {x: 0, y: -1}
    }
    case 39: {
      return vel = {x: 1, y: 0}
    }
    case 40: {
      return vel = {x: 0, y: 1}
    }
  }
}

setInterval(() => {
  requestAnimationFrame(gameLoop);
}, 1000 /FR);

function gameLoop(){
  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = SNAKE_COLOUR;
  for (let cell of snake) {
    ctx.fillRect(cell.x*S, cell.y*S, S,S);
  }

  ctx.fillStyle = FOOD_COLOUR;
  ctx.fillRect(food.x*S,food.y*S,S,S);

  pos.x += vel.x;
  pos.y += vel.y;

  if (pos.x < 0 || pos.x > T || pos.y < 0 || pos.y > T) {
    currentScore=0;
    
    welcome();
    
  }

  if (food.x === pos.x && food.y === pos.y) {
    var scorediv = document.getElementById('scorediv');

    currentScore++;

    snake.push({...pos});
    pos.x += vel.x;
    pos.y += vel.y;

    scorediv.innerHTML = "High Score: "+highScore+" Score: "+currentScore;
    if(currentScore>=highScore){
      highScore=currentScore;
      scorediv.innerHTML = "High Score: "+highScore+" Score: "+currentScore;
    }
    randomFood();
  }

  if (vel.x || vel.y) {
    for (let cell of snake) {
      if (cell.x === pos.x && cell.y === pos.y) {
        welcome();
        currentScore=0;
        scorediv.innerHTML = "High Score: "+highScore+" Score: "+currentScore;
      }
    }
    snake.push({...pos});
    snake.shift();
  }
}
