//Imports
import MapGenerator from './mapGenorator.js';

//Get canvas and context
const canvas = document.getElementById("fluid-simulation-canvas");
const ctx = canvas.getContext("2d");

//Create map 
const mapGenerator = new MapGenerator(ctx, document.getElementById("gravity").value);
const barriers = mapGenerator.generateCup();
const particles = mapGenerator.generateParticles(barriers, document.getElementById("gravity").value);


// Update all slider values
updateSliderValue('base-heat', 'base-heat-value');
updateSliderValue('fluid-viscosity', 'fluid-viscosity-value');
updateSliderValue('air-resistance', 'air-resistance-value');
updateSliderValue('gravity', 'gravity-value');
updateSliderValue('particle-radius', 'particle-radius-value');
updateSliderValue('simulation-speed', 'simulation-speed-value');



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

//Reset Simulation
function resetSimulation() {
    //Delete existing particles and barriers
    particles.length = 0; // Clear existing particles
    barriers.length = 0; // Clear existing barriers

    //Create new map
    const newBarriers = mapGenerator.generateCup();
    barriers.push(...newBarriers); // Add new barriers

    //Create new particles
    const newParticles = mapGenerator.generateParticles(barriers, document.getElementById("gravity").value);
    particles.push(...newParticles); // Add new particles

}


//Game loop
function gameLoop() {   

    //Check for reset button click
    const resetButton = document.getElementById("reset-simulation-button");
    resetButton.onclick = () => {
        resetSimulation(); //Reset simulation
    };

    //Update particle position based on velocity
    for(let particle of particles){
        particle.step();
    }
    render();

    
    let simulationSpeed = document.getElementById("simulation-speed").value;
    
    setTimeout(() => {
        window.requestAnimationFrame(gameLoop);
    }, simulationSpeed);


}
window.requestAnimationFrame(gameLoop);