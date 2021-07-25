//CONSTATNS
const DROP_NUMBER = 500;
const Y_INIT = 600;
const VX_MIN = -3;
const VX_MAX = -5;
const VY_MIN = 5;
const VY_MAX = 10;
const L_MIN = 2;
const L_MAX = 5;

//GLOBAL
let canvas,context,rain;

//rain Drop
class Drop{
    constructor(x,y,vx,vy,l){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.l = l;
    }

    show(){
        context.beginPath();
        context.strokeStyle="White";
        context.moveTo(this.x,this.y);
        context.lineTo(this.x+this.vx,this.y+this.l);
        context.stroke();
    }

    fall(){
        this.y+=this.vy;
        this.x+=this.vx;
        //reset drop when reaching end of canvas
        if(this.y > canvas.height){
            let randY   =   Math.floor( Math.random() * Y_INIT ) - Y_INIT;
            let randVX  =   Math.floor( Math.random() * VX_MAX ) + VX_MIN;
            let randVY  =   Math.floor( Math.random() * VY_MAX ) + VY_MIN;
            let randL   =   Math.floor( Math.random() * L_MAX  ) + L_MIN;

            let h_total =   canvas.height+randY; 
            let randX   =   Math.floor( Math.random() * canvas.width ) - h_total*randVX/randVY; //dx=h_tot*vx/vy  
            
            this.x = randX;  
            this.y = randY;
            this.vy = randVY;
            this.l = randL;            
        }
    }
}

//loop
function loop(){
    context.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<rain.length;i++){
        rain[i].show();
        rain[i].fall();
    }
}

//setup
function setup(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    //rain = new Drop(500,0,10,10,6);
    rain = [];
    for(let i=0; i<DROP_NUMBER; i++){
        let randY   =   Math.floor( Math.random() * Y_INIT ) - Y_INIT;
        let randVX  =   Math.floor( Math.random() * VX_MAX ) + VX_MIN;
        let randVY  =   Math.floor( Math.random() * VY_MAX ) + VY_MIN;
        let randL   =   Math.floor( Math.random() * L_MAX  ) + L_MIN;
        let h_total =   canvas.height+randY; 
        let randX   =   Math.floor( Math.random() * canvas.width ) - h_total*randVX/randVY; //dx=h_tot*vx/vy     
        
        rain[i] = new Drop( randX,
                            randY,
                            randVX,
                            randVY,
                            randL,
                            );
    }

    setInterval(loop,10);
}