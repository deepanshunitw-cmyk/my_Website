/* ==========================================================
   Happy Birthday Website - script.js
   Countdown • Typewriter • Music • Letter
   Hearts • Balloons • Fireworks
==========================================================*/

/* -------------------------
   Birthday Date
   Change this date!
--------------------------*/
const birthday = new Date("August 4, 2026 23:15:00").getTime();

/* -------------------------
   Elements
--------------------------*/
const countdownScreen = document.getElementById("countdownScreen");
const mainContent = document.getElementById("mainContent");

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const giftBtn = document.getElementById("giftBtn");
const letterSection = document.getElementById("letterSection");

const typing = document.getElementById("typing");

/* ==========================================================
   Countdown
==========================================================*/

const timer = setInterval(() => {

    const now = new Date().getTime();

    const distance = birthday - now;

    if(distance <= 0){

        clearInterval(timer);

        countdownScreen.style.display = "none";

        mainContent.style.display = "block";

        launchFireworks();

        music.play().catch(()=>{});

        return;

    }

    const d = Math.floor(distance / (1000*60*60*24));

    const h = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const m = Math.floor((distance%(1000*60*60))/(1000*60));

    const s = Math.floor((distance%(1000*60))/1000);

    days.innerHTML = String(d).padStart(2,"0");

    hours.innerHTML = String(h).padStart(2,"0");

    minutes.innerHTML = String(m).padStart(2,"0");

    seconds.innerHTML = String(s).padStart(2,"0");

},1000);

/* ==========================================================
   Typewriter
==========================================================*/

const message =
"Today is your special day. I hope you can feel all the happiness, love, and warm wishes I'm sending your way. Thank you for being such a wonderful person in my life.Your presence makes some moments brighter, and your smile and voice means more than you know.I hope life gives you all the happiness your heart deserves ❤️";

let index = 0;

function typeWriter(){

    if(index < message.length){

        typing.innerHTML += message.charAt(index);

        index++;

        setTimeout(typeWriter,40);

    }

}

/* ==========================================================
   Gift Button
==========================================================*/

giftBtn.addEventListener("click",()=>{

    letterSection.style.display="block";

    letterSection.scrollIntoView({

        behavior:"smooth"

    });

    launchFireworks();

});

/* ==========================================================
   Music Button
==========================================================*/

musicBtn.addEventListener("click",()=>{

    if(music.paused){

        music.play();

        musicBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

    }

    else{

        music.pause();

        musicBtn.innerHTML='<i class="fa-solid fa-music"></i>';

    }

});

/* ==========================================================
   Floating Hearts
==========================================================*/

const heartsContainer = document.getElementById("hearts");

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(15+Math.random()*25)+"px";

    heart.style.animationDuration=(6+Math.random()*8)+"s";

    heartsContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },14000);

}

setInterval(createHeart,400);

/* ==========================================================
   Balloons
==========================================================*/

const balloonColors=[

"#ff4d88",

"#ffd54f",

"#5ec8ff",

"#7eff8a",

"#ff884d",

"#c77dff"

];

function createBalloon(){

    const balloon=document.createElement("div");

    balloon.className="balloon";

    balloon.style.left=Math.random()*100+"vw";

    balloon.style.background=

    balloonColors[Math.floor(Math.random()*balloonColors.length)];

    balloon.style.animationDuration=(10+Math.random()*8)+"s";

    document.body.appendChild(balloon);

    setTimeout(()=>{

        balloon.remove();

    },18000);

}

setInterval(createBalloon,1800);

/* ==========================================================
   Fireworks
==========================================================*/

const canvas=document.getElementById("fireworks");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

});

let particles=[];

function random(min,max){

    return Math.random()*(max-min)+min;

}

function launchFireworks(){

    for(let k=0;k<6;k++){

        const x=random(150,canvas.width-150);

        const y=random(100,canvas.height/2);

        explode(x,y);

    }

}

function explode(x,y){

    for(let i=0;i<90;i++){

        particles.push({

            x,

            y,

            radius:random(2,5),

            speedX:random(-6,6),

            speedY:random(-6,6),

            alpha:1,

            color:`hsl(${Math.random()*360},100%,60%)`

        });

    }

}

function animateFireworks(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,index)=>{

        p.x+=p.speedX;

        p.y+=p.speedY;

        p.speedY+=0.05;

        p.alpha-=0.01;

        ctx.save();

        ctx.globalAlpha=p.alpha;

        ctx.beginPath();

        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);

        ctx.fillStyle=p.color;

        ctx.fill();

        ctx.restore();

        if(p.alpha<=0){

            particles.splice(index,1);

        }

    });

    requestAnimationFrame(animateFireworks);

}

animateFireworks();

/* ==========================================================
   Auto Fireworks Every 8 Seconds
==========================================================*/

setInterval(()=>{

    if(mainContent.style.display==="block"){

        launchFireworks();

    }

},8000);

/* ==========================================================
   Start Typewriter After Page Opens
==========================================================*/

const observer=new MutationObserver(()=>{

    if(mainContent.style.display==="block"){

        typeWriter();

        observer.disconnect();

    }

});

observer.observe(mainContent,{

    attributes:true,

    attributeFilter:["style"]

});

/* ==========================================================
   Sparkle Cursor
==========================================================*/

document.addEventListener("mousemove",(e)=>{

    const spark=document.createElement("div");

    spark.style.position="fixed";

    spark.style.left=e.clientX+"px";

    spark.style.top=e.clientY+"px";

    spark.style.width="6px";

    spark.style.height="6px";

    spark.style.borderRadius="50%";

    spark.style.background="white";

    spark.style.pointerEvents="none";

    spark.style.opacity=".8";

    spark.style.transition="all .8s linear";

    spark.style.zIndex="99999";

    document.body.appendChild(spark);

    setTimeout(()=>{

        spark.style.transform="scale(4)";

        spark.style.opacity="0";

    },20);

    setTimeout(()=>{

        spark.remove();

    },800);

});