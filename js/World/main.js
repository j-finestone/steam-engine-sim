//Imports
import World from "./world.js"
import UI from "./ui.js"
//Get canvas and context
const canvas = document.getElementById("fluid-simulation-canvas");
const ctx = canvas.getContext("2d");
let world;

function startSimulation() {

    UI.initialize();

    World.clearGameObjects();
    world = new World();
    window.requestAnimationFrame(simLoop);

}


//Reset Simulation
function resetSimulation() {
    World.clearGameObjects();
    world = new World();
}

//Game loop
function simLoop() {   

    //Render
    //Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw background
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw all game objects
    world.render();
    

    //allows you to slow down or speed up the simulation
    setTimeout(() => {
        window.requestAnimationFrame(simLoop);
    }, 1000 / 60);


}
startSimulation();