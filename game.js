"use strict";
const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

const namePlayer = document.querySelector(".name");
const headScore = document.querySelector(".score");
const countLife = document.querySelector(".life");
const timerMin = document.querySelector(".min");
const timerSec = document.querySelector(".sec");

const plate = new Image();
const fruit01 = new Image();
const fruit02 = new Image();
const fruit03 = new Image();

plate.src = "img/plate.png"; // это тарелка = plate
fruit01.src = "img/fruit01.png";
fruit02.src = "img/fruit02.png";
fruit03.src = "img/fruit03.png";

// // Звуковые файлы
// var fly = new Audio();
// var score_audio = new Audio();
//
// fly.src = "audio/fly.mp3";
// score_audio.src = "audio/score.mp3";
//
let gap = 10;
// let lag = Math.floor(Math.random()*15);

// При нажатии на какую-либо кнопку
// document.addEventListener("keydown", moveUp);
//
// function moveUp() {
//     xPos -= 25;
//     // fly.play();
// }
document.addEventListener("keydown", direction);
let dir;

function direction(event) {
    if (event.keyCode === 39) {
        dir = "right";
    } else if (event.keyCode === 37) {
        dir = "left";
    }
}


// Создание блоков

let fruits = []; //падающие фрукты

// fruits[0] = {
//     x :  Math.floor(Math.random() * (cvs.width-40)),
//     y : 1
// }
fruits[0] = {
    x :  Math.floor(Math.random() * (cvs.width-40)),
    y :  Math.floor(Math.random()*15) - 55
}
fruits[1] = {
    x :  Math.floor(Math.random() * (cvs.width-45)),
    y :  Math.floor(Math.random()*30) + 40
}
fruits[2] = {
    x :  Math.floor(Math.random() * (cvs.width-55)),
    y :  Math.floor(Math.random()*45)
}

// console.log(fruits);
// console.log(fruits.length);

// Позиция тарелки >plate
let xPos = cvs.width/2 - 32;
let yPos = cvs.height - 40;

let life = 3;
let score = 0;
let nameP = "***";
let timerId;

function update() {
    // let clock = document.getElementById('clock');
    let date = new Date();

    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    timerMin.innerHTML = minutes;

    let seconds = date.getSeconds();
    if (seconds < 10) seconds = '0' + seconds;
    timerSec.innerHTML = seconds;
}

function draw() {
    // ctx.drawImage(bg, 0, 0);
    ctx.fillStyle = "#212837";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    ctx.drawImage(plate, xPos, yPos);

    if (dir === "left") xPos -= 3;
    if (dir === "right") xPos += 3;


    namePlayer.innerText = nameP;

    timerId =setInterval(update,100);
    update();

    for (let i = 0; i < fruits.length; i++) {
        ctx.drawImage(fruit03, fruits[0].x, fruits[0].y);
        ctx.drawImage(fruit02, fruits[1].x, fruits[1].y);
        ctx.drawImage(fruit01, fruits[2].x, fruits[2].y);

        fruits[i].y++;
        // fruits[1].y++;
        // fruits[2].y++;

        // if(fruits[i].y === cvs.height || fruits[i].y === cvs.height || fruits[i].y === cvs.height)
        if(fruits[i].y === cvs.height) {
            fruits.push({
                x: Math.floor(Math.random() * fruit03.height) - fruit03.height,
                y: cvs.height
            });
        }

        if(xPos + plate.width/2 === fruits[0].x + fruit03/2 && yPos === fruits[i].y || xPos + plate.width/2 === fruits[1].x && yPos === fruits[i].y || xPos + plate.width/2 === fruits[2].x && yPos === fruits[i].y) {
            score +=5;
            // location.reload(); // Перезагрузка страницы
        }

        // ctx.drawImage(fruit03, fruits[i].x, fruits[i].y);
        // ctx.drawImage(fruit02, fruits[i].x, fruits[i].y);
        // ctx.drawImage(fruit01, fruits[i].x, fruits[i].y);
        //
        // fruits[i].y++;
        // // fruits[1][i].y++;
        // // fruits[2][i].y++;
        //
        // console.log(fruits);
        //
        //
        // if (fruits[i].y === cvs.height) {
        //     fruits.push({
        //         x: Math.floor(Math.random() * fruit03.height) - fruit03.height,
        //         y: cvs.height
        //     });

        if (fruits[i].y === cvs.height || fruits[i].y === cvs.height || fruits[i].y === cvs.height) {
            life-=1;
            // clearInterval(game);
            //
        }
    }


    //Отслеживание прикосновений
    // if(xPos + bird.width <= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
    //     && (yPos <= pipe[i].y + pipeUp.height
    //         || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
    //     score++;
    //     location.reload(); // Перезагрузка страницы
    //
    // }

    // if(xPos + plate.width === fruits[i].x && yPos === fruits[i].y || xPos + plate.width === fruits[i].x && yPos === fruits[i].y ) {
    //     score +=5;
    //     // location.reload(); // Перезагрузка страницы
    // }
    // if(xPos + plate.width === fruits[2][i].x && yPos === fruits[0][i].y) {
    //     score +=5;
    //     location.reload(); // Перезагрузка страницы
    // }
    //
    //
    // if (fruits[0][i].y === cvs.height || fruits[1][i].y === cvs.height || fruits[2][i].y === cvs.height) {
    //     life-=1;
    //     // clearInterval(game);
    //       //
    // }
    if (score === 50) {
        ctx.fillStyle = "#f1c4c4";
        ctx.font = "24px Verdana";
        ctx.fillText("Вы выиграли! Ваш счет: " + score, 250, cvs.height - 300);
    }

    if (life === 0) {
        ctx.fillStyle = "#f1c4c4";
        ctx.font = "24px Verdana";
        ctx.fillText("Вы проиграли! У вас не осталось жизней!", 50, cvs.height - 300);
    }


    if (score === 50 && life === 0) {
        clearInterval(timerId); {
            timerId =null;
        }
    }

    // ctx.drawImage(plate, xPos, yPos);
    //
    // if (dir === "left") xPos -= 1;
    // if (dir === "right") xPos += 1;

    headScore.innerText = score;
    countLife.innerText = life;


    requestAnimationFrame(draw);

}
nameP = prompt("Введите ваше имя:");

fruit03.onload = draw;
fruit02.onload = draw;
fruit01.onload = draw;
// let game = setInterval(draw, 200);
