//Imports
import Particle from './particle.js';
import Barrier from './barrier.js';

//Get canvas and context
const canvas = document.getElementById("fluid-simulation-canvas");
const ctx = canvas.getContext("2d");

//Create objects
const barriers = [new Barrier(0, 200, 700, 20)];
const particle1 = new Particle(50, 50, 100, barriers);

//Assign veriables about properties of the particles


 //Background
ctx.fillStyle = "lightgrey";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//Draw the particle
particle1.drawParticle(ctx);

//render 
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Redraw background
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //draw barriers
    for (let barrier of barriers) {
        barrier.drawBarrier(ctx);
    }
    //Draw particle
    particle1.drawParticle(ctx);
}


//Game loop
function gameLoop() {
    //Update particle position based on velocity
    particle1.step();
    render();
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);