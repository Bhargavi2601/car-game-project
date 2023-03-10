const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
startScreen.addEventListener('click',start);

let player= {speed : 5};

let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function isColide(a,b){

    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top) || (aRect.top>bRect.bottom) || (aRect.right<bRect.left) || (aRect.left>bRect.right));
}

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

        if(item.y >= 560){
            item.y -= 600;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame(){
    player.start = false;
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){

        if(isColide(car,item)){
            endGame();
            startScreen.classList.remove('hide');
        }

        if(item.y >= 560){
            item.y -= 600;
            item.style.left = Math.floor(Math.random()*350)+'px';
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay(){
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    
    if(player.start){

        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y>(road.top)){player.y -= player.speed}
        if(keys.ArrowDown && player.y<(road.bottom-150)){player.y += player.speed}
        if(keys.ArrowLeft && player.x>0){player.x -= player.speed}
        if(keys.ArrowRight && player.x<(road.width-55)){player.x += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerText = "Score: "+ player.score;
    }
}

function start(){

    startScreen.classList.add('hide');
    gameArea.innerHTML = '';

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(let x=0;x<4;x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(let x=0;x<3;x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = (x*350)*-1;//((x+1)*350)*-1
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random()*350)+'px';
        gameArea.appendChild(enemyCar);
    }
}

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return hex;
    }
    return "#"+c()+c()+c();
}