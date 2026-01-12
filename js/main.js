//Imports
import Particle from './particle.js';
import Barrier from './barrier.js';

//Get canvas and context
const canvas = document.getElementById("fluid-simulation-canvas");
const ctx = canvas.getContext("2d");

//Create map (cup)

const barriers = [new Barrier(200, 250, 10, 100),
    new Barrier(370, 250, 10, 100),
    new Barrier(200, 350, 170, 10),];


//Create particles
const particles = [];
for(let i = 0; i < 50; i++){
    let x = Math.random() * (370 - 200) + 200;
    let y = Math.random() * 250;
    particles.push(new Particle(x, y, 100, barriers, particles, gravity));
}


// Update all slider values
updateSliderValue('base-heat', 'base-heat-value');
updateSliderValue('fluid-viscosity', 'fluid-viscosity-value');
updateSliderValue('air-resistance', 'air-resistance-value');
updateSliderValue('gravity', 'gravity-value');
updateSliderValue('particle-radius', 'particle-radius-value');

 //Background
ctx.fillStyle = "lightgrey";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Function to update slider values
function updateSliderValue(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueSpan = document.getElementById(valueId);
    valueSpan.textContent = slider.value;
    slider.addEventListener('input', () => {
        valueSpan.textContent = slider.value;
    });
}




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
    //Draw particles
    for(let particle of particles){
        particle.drawParticle(ctx);
    }
}


//Game loop
function gameLoop() {
    //Update particle position based on velocity
    for(let particle of particles){
        particle.step();
    }
    render();
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);