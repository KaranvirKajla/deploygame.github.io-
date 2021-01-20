const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')
const upButton = document.getElementById("upButton")
const downButton = document.getElementById("downButton")
const leftButton = document.getElementById("leftButton")
const rightButton = document.getElementById("rightButton")
const bulletcountscreen = document.getElementById("bulletcountscreen");
const timercountscreen = document.getElementById("timercountscreen")
const highScoreDiv= document.getElementById("highScoreDiv")
const highScorePlayerNameDiv =document.getElementById("highScorePlayerNameDiv");
const blueButton = document.getElementById("blueButton")

let high



startScreen.addEventListener('click',start)
let player={speed:5, score:0}
let keys = {ArrowUp:false, ArrowDown:false, ArrowLeft:false,ArrowRight:false}
let buttons = {ButtonUp:false,ButtonDown:false,ButtonLeft:false,ButtonRight:false}


const gameAudio = new Audio("Getaway_Powder.mp3");
const crashAudio = new Audio("Crash.mp3");
const gameOverAudio = new Audio("gameover.mp3");
const blastAudio = new Audio("blast.mp3")
const missileAudio = new Audio("missile.mp3")

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup',keyUp);


let bulletCount=2;
let timerCount = 2;

const enemyCars = ["carbrown","carsilver","carwhite","carmerz","card","power","time"]


function keyDown(e){
    console.log(e)
    keys[e.key]=true
    if(e.keyCode===32){
        
        if(bulletCount>0 && player.start){
            missileAudio.play()
            let bullet = document.createElement("div");
            bullet.style.position="absolute"
            bullet.style.top = player.y + "px"
            bullet.style.left  = (player.x+20) + "px"
            bullet.style.background="white"
            bullet.style.width="20px"
            bullet.style.height="70px"
            bullet.style.backgroundImage= "url('bullet.png')"
            bullet.style.backgroundSize="100% 100%"
            bullet.style.backgroundColor = "#2d3436"
            bullet.y =player.y
            bullet.x = player.x
            bullet.setAttribute('class','bullet')
            gameArea.append(bullet)
            bulletCount--
            bulletcountscreen.innerText="Bullets "+bulletCount
        }
    }

    if(player.start&& timerCount>0 && e.key=='s'){
        timerCount--;
        timercountscreen.innerText="Slow time "+timerCount
        temp = player.speed;
        if(temp<5){temp=5}
        player.speed=2
        setTimeout(() => {
            player.speed = temp
        }, 5000);
    }

}

blueButton.addEventListener("touchstart",function(){
    if(bulletCount>0 && player.start){
        missileAudio.play()
        let bullet = document.createElement("div");
        bullet.style.position="absolute"
        bullet.style.top = player.y + "px"
        bullet.style.left  = (player.x+20) + "px"
        bullet.style.background="white"
        bullet.style.width="20px"
        bullet.style.height="70px"
        bullet.style.backgroundImage= "url('bullet.png')"
        bullet.style.backgroundSize="100% 100%"
        bullet.style.backgroundColor = "#2d3436"
        bullet.y =player.y
        bullet.x = player.x
        bullet.setAttribute('class','bullet')
        gameArea.append(bullet)
        bulletCount--
        bulletcountscreen.innerText="Bullets "+bulletCount
    }
})

function keyUp(e){
    
    keys[e.key]=false
}
function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top > bRect.bottom)||(aRect.right<bRect.left)|| (aRect.left>bRect.right))
}
function moveLines(){
    let lines = document.querySelectorAll(".lines")
    lines.forEach(function(item){
        if(item.y > 700){
            item.y -= 750
        }
        item.y += player.speed;
        item.style.top = item.y+"px"
    })
}


function saveName(){
    console.log(document.getElementById("name").value)   
     localStorage.setItem("highScorePlayerName",document.getElementById("name").value);
     localStorage.setItem("highScore",player.score)
    start();
}

function endGame(){
    clearInterval(speedInterval);
    player.speed = 5
    gameAudio.pause();
    crashAudio.play();
    player.start=false;
    startScreen.classList.remove('hide')
    console.log("cccccccccccccooooooooommmmmmpppppppppp ",player.score,"   ",high)
    if(player.score>high){
        startScreen.removeEventListener('click',start)
        startScreen.innerHTML = `
        Congrats!! <br> You brake the high score<br>
        <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">Enter your Name</label>
          <input id="name" type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
          <button type="button" class="btn btn-danger" onclick="saveName()">Restart</button>
      </form>
        `
    }else
    {
        startScreen.addEventListener('click',start)
        startScreen.innerHTML= `Game Over<br> Your Score is ${player.score+1}<br> Click to restart the game`
    // Uncomment after
    gameOverAudio.play();
    }
}
function moveEnemy(car){
    let enemy = document.querySelectorAll(".enemy")
    enemy.forEach(function(item){
        if(isCollide(car,item)){
           // console.log("Iiiiiiiiiiiiiiiiiitttttttttteeeeeeeeeeeeemmmmmmmmmmmmmmmm  = ",item.index);
            if(item.index<=4)
            endGame();
            else if(item.index==5){
              //  console.log("pppppppppppooooooooooooowwwwwwwwwwweeeeeeeeeeerrrrrrrrrrrr uuuuuuuuuuppppppppppp")
              bulletCount++;
                item.style.display="none"
                bulletcountscreen.innerText="Bullets "+bulletCount
            }else{
                timerCount++;
                item.style.display="none"
                timercountscreen.innerText="Slow time "+timerCount
            }
        }
        if(item.y > 750){
            item.y= - 300
            item.style.display="block"
            item.style.left = Math.floor(Math.random()*350)+"px"
            item.x = parseInt(item.style.left)
            //console.log("iiiiiiiiiiiiiittttttttttttteeeeeeeeeeeeeeemmmmmmmmmmmmmmmmxxxxxxxxxxxxxxxxx   ="+item.x)
            item.index =Math.floor(Math.random()*enemyCars.length)
            item.style.backgroundImage = "url('"+enemyCars[item.index]+".png')"
            item.style.backgroundSize = "100% 100%"
            item.style.backgroundColor = "#2d3436"
            item.swi = true
        }     
        item.y += player.speed;
        item.style.top = item.y+"px"

       
        if(item.index==1){
            if(item.swi)
            {item.x += player.speed+1
           
            item.style.left = item.x+"px"
                if(item.x>350){item.swi=false}
              }else{
            item.x -=player.speed+1
           
            item.style.left = item.x+"px"
                if(item.x<0){item.swi=true}
            }
        }else if(item.x<350 && item.index==2){
            if(car.offsetTop- item.y < 1)
            {item.x +=player.speed
           
            item.style.left = item.x+"px"}
        }else if(item.x>0 && item.index==3){
            if(car.offsetTop- item.y < 1)
            {item.x -=player.speed
            
            item.style.left = item.x+"px"}
        }


        
    })
}
function gamePlay(){
    let car = document.querySelector('.car')
    let road = gameArea.getBoundingClientRect();
    if(player.start)
    {
        moveLines();
        moveEnemy(car);
        moveBullet();
        if((keys.ArrowUp || buttons.ButtonUp) && player.y > (road.top + 70)){player.y -= player.speed}
        if((keys.ArrowDown || buttons.ButtonDown) && player.y< (road.bottom-75)){player.y += player.speed}
        if((keys.ArrowLeft || buttons.ButtonLeft) && player.x>0){player.x -= player.speed}
        if((keys.ArrowRight || buttons.ButtonRight) && player.x <(road.width - 50)){player.x += player.speed}
    
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    window.requestAnimationFrame(gamePlay);
   // console.log(player.score++)
    player.score++;
    score.innerText = "Score: "+player.score
    }
}

function moveBullet(){
    let bullets = document.querySelectorAll('.bullet');
    let enemyCars = document.querySelectorAll(".enemy")
    if(bullets!=null)
    bullets.forEach(function(item){
        item.y -= player.speed;
        item.style.top = item.y+"px"
        console.log("dddddiiiiiissssspp")
        enemyCars.forEach(function(element){
            
            if(isCollide(item,element)){
               powerUp(item,element)
            }
        })

    })
}

function powerUp(item,element) {
    let blast = document.createElement("img");
    blast.setAttribute("src","blast.gif");
    blast.style.position="absolute"
    blast.style.top = item.y + "px"
    blast.style.left = item.x+"px"
    blastAudio.play();
     gameArea.append(blast)

    console.log("BBBBBBBBBBBBLLLLLLLLLLAAAAAAAAAADSTYTT")
    item.style.display="none"
    element.style.display="none"
    item.remove();

    setTimeout(() => {
        blast.remove();
    }, 1000);
   
 
}

rightButton.addEventListener('touchstart',function(){
    buttons.ButtonRight=true
})
rightButton.addEventListener('touchend',function(){
    buttons.ButtonRight=false
})
leftButton.addEventListener('touchstart',function(){
    buttons.ButtonLeft=true
})
leftButton.addEventListener('touchend',function(){
    buttons.ButtonLeft=false
})
upButton.addEventListener('touchstart',function(){
    buttons.ButtonUp=true
})
upButton.addEventListener('touchend',function(){
    buttons.ButtonUp=false
})
downButton.addEventListener('touchstart',function(){
    buttons.ButtonDown=true
})
downButton.addEventListener('touchend',function(){
    buttons.ButtonDown=false
})

function start(){

  high = localStorage.getItem("highScore");
console.log("hhhhhhhhhhhiiiiiiiiiiiiiiiggggggggghhhhh  "+high)
if(high==null){
    localStorage.setItem("highScore",0);
    high=0;
}
 let highScorePlayerName = localStorage.getItem("highScorePlayerName");
if(high==null){
    localStorage.setItem("highScorePlayerName","");
    highScorePlayerName=""
}
highScoreDiv.innerText=`High Score: ${high}`
highScorePlayerNameDiv.innerHTML=`By ${highScorePlayerName}`

    gameOverAudio.pause();
    startScreen.classList.add('hide')
    gameArea.innerHTML = "";
    player.start = true
    player.score=0
    gameAudio.play();
    gameAudio.loop = true
   
    window.requestAnimationFrame(gamePlay);

    speedInterval =  setInterval(() => {
    player.speed = player.speed+1
    console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
    }, 10000);


    for(x=0;x<10;x++)
    {let roadLine = document.createElement('div');
    roadLine.setAttribute('class','lines')
    roadLine.y = (x*150)
    roadLine.style.top= (x*150)+"px";
    gameArea.append(roadLine)}

    let car = document.createElement('div')
    car.setAttribute('class','car')
    // car.innerText="Hey I ma ur car"
    gameArea.append(car);
   
    player.x = car.offsetLeft;
    player.y = car.offsetTop; 

    for(x=0;x<3;x++)
    {let enemyCar = document.createElement('div');
    enemyCar.setAttribute('class','enemy')
    // enemyCar.y = (x*150)
    enemyCar.y = ((x+1)*350)* -1
    enemyCar.style.top= (x*150)+"px";
    enemyCar.style.background='blue'
    enemyCar.style.left = Math.floor(Math.random()*350)+"px"
    let index = Math.floor(Math.random()*enemyCars.length)
    enemyCar.style.backgroundImage = "url('"+enemyCars[index]+".png')"
            enemyCar.style.backgroundSize = "100% 100%"
            enemyCar.style.backgroundColor = "#2d3436"

            enemyCar.index = index
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  ",enemyCar.index)
    gameArea.append(enemyCar)}
}
