let inputVelocity = {
        x: 0,
        y: 0
};

const appleSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
let scoreClass = document.querySelector('.score');
let highscoreClass = document.querySelector('.highscore');
let gameover = document.createElement("div");
let highscore = 0;
let speed = 7;
let score = 0;
let lastTime = 0;
let snakeArray = [
        { x: 14, y: 12 }
];
const board = document.querySelector(".board");

apple = { x: 7, y: 10 };

function main(currtime)
{ 
        window.requestAnimationFrame(main); //this calls main function repeatedly
        if (score > 5)
                speed = 10;
        else if (score > 10)
                speed = 15;
        else if (score > 15)
                speed = 18;
        if ((currtime - lastTime) / 1000 < 1 / speed)
        { 
                return;
        }
        lastTime = currtime;
        gameEngine();
}

function isCollide(snake)
{
        //if snake bump into itself
        for (let i = 1; i < snakeArray.length; i++){
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
                { 
                        return true;
                }
        }
        //if snake bumps into walls 
        if (snake[0].x > 30 || snake[0].x <= 0 || snake[0].y > 20 || snake[0].y <= 0)
        { 
                return true;
        }
        return false;
}

function gameEngine() {
        //1. updating snake body and food position
        if (isCollide(snakeArray)) {
                gameOverSound.play();
                inputVelocity = { x: 0, y: 0 };
                snakeArray = [
                        { x: 14, y: 12 }
                ];
                alert("Game Over! Press any key to Start Again.")
                score = 0;
                scoreClass.innerHTML = "Score: " + score;
        }

        // * increment score when snake eats apple and regenerate apple
        if (snakeArray[0].y === apple.y && snakeArray[0].x === apple.x) {
                appleSound.play();
                score += 1;
                if (score > highscore)
                {
                        highscore = score;
                        localStorage.setItem("hiscore", JSON.stringify(highscore));
                        highscoreClass.innerHTML = "Highscore: " + highscore;
                }
                scoreClass.innerHTML = "Score: " + score;
                snakeArray.unshift({
                        x: snakeArray[0].x + inputVelocity.x,
                        y: snakeArray[0].y + inputVelocity.y
                })
                let a = 1;
                let b = 29;
                let c = 19;
                apple = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (c-a)* Math.random())}
        }

        //move snake
        for (let i = snakeArray.length - 2; i >= 0; i--)
        { 
                snakeArray[i + 1] = { ...snakeArray[i] };
        }

        snakeArray[0].x += inputVelocity.x;
        snakeArray[0].y += inputVelocity.y;

        //2. Display snake and apple.
        //display snake 
        board.innerHTML = "";
        snakeArray.forEach((e, index) => {
                snakeElement = document.createElement('div');
                snakeElement.style.gridRowStart = e.y;
                snakeElement.style.gridColumnStart = e.x;

                if (index === 0) {
                        snakeElement.classList.add('head');
                }
                else {
                        snakeElement.classList.add('snake-body');
                }
                board.appendChild(snakeElement);
        });

        //display apple
        appleElement = document.createElement('div');
        appleElement.style.gridColumnStart = apple.x;
        appleElement.style.gridRowStart = apple.y;
        appleElement.classList.add('apple');
        board.appendChild(appleElement);
}

//Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) 
{
        highscore = 0;
        localStorage.setItem("hiscore", JSON.stringify(highscore))
        highscoreClass.innerHTML = "Highscore: 0";
}
else
{
        hishscore = JSON.parse(hiscore);
        highscoreClass.innerHTML = "Highscore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
        intputVelocity = { x: 0, y: 1 };
        moveSound.play();
        switch (e.key) {
                case "ArrowUp":
                        inputVelocity.x = 0;
                        inputVelocity.y = -1;
                        break;
                
                case "ArrowDown":
                        inputVelocity.x = 0;
                        inputVelocity.y = 1;
                        break;
                
                case "ArrowLeft":
                        inputVelocity.x = -1;
                        inputVelocity.y = 0;
                        break;
                
                case "ArrowRight":
                        inputVelocity.x = 1;
                        inputVelocity.y = 0;
                        break;
                default:
                        break;
        }
});