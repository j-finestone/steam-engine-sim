//Imports
import MapGenerator from './mapGenorator.js';

//Get canvas and context
const canvas = document.getElementById("fluid-simulation-canvas");
const ctx = canvas.getContext("2d");

//Get all UI elements globally
const uiElements = {
    gravity: document.getElementById("gravity"),
    baseHeat: document.getElementById("base-heat"),
    fluidViscosity: document.getElementById("fluid-viscosity"),
    airResistance: document.getElementById("air-resistance"),
    particleRadius: document.getElementById("particle-radius"),
    simulationSpeed: document.getElementById("simulation-speed"),
    resetButton: document.getElementById("reset-simulation-button")
};

//Create map 
const mapGenerator = new MapGenerator(ctx, uiElements.gravity.value);
mapGenerator.generateMap();

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
    for (let barrier of MapGenerator.barriers) {
        barrier.drawBarrier(ctx);
    }
    //Draw particles
    for(let particle of MapGenerator.particles){
        particle.drawParticle(ctx);
    }
}

//Reset Simulation
function resetSimulation() {
    //Delete existing particles and barriers
    MapGenerator.particles.length = 0; // Clear existing particles
    MapGenerator.barriers.length = 0; // Clear existing barriers

    //Regenerate map
    mapGenerator.generateMap();
}


//Setup reset button
uiElements.resetButton.onclick = () => {
    resetSimulation(); //Reset simulation
};

//Game loop
function gameLoop() {   

    //Update particle position based on velocity
    for(let particle of MapGenerator.particles){
        particle.step();
    }
    render();

    
    let simulationSpeed = uiElements.simulationSpeed.value;
    
    setTimeout(() => {
        window.requestAnimationFrame(gameLoop);
    }, simulationSpeed);


}
window.requestAnimationFrame(gameLoop);