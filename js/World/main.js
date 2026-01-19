//Imports
import World from "./world.js"
import UI from "./ui.js"
import Globals from "../globals.js";
import MapGenerator from "./mapGenorator.js"


//Get canvas and context
Globals.canvas = document.getElementById("fluid-simulation-canvas");
Globals.ctx = Globals.canvas.getContext("2d");


//Create a new world instance
let world;

function startSimulation() {

    UI.initialize();

    World.clearGameObjects();
    world = new World();
    let mapGenerator = new MapGenerator(); //Generate map
    for (const gameObject of Globals.gameObjects) {
        for (const component of gameObject.components) {
            if (typeof component.start === "function") {
                component.start();
            }
        }
    }
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
    Globals.ctx.clearRect(0, 0, Globals.canvas.width, Globals.canvas.height);

    //Draw background
    Globals.ctx.fillStyle = "lightgray";
    Globals.ctx.fillRect(0, 0, Globals.canvas.width, Globals.canvas.height);

    //draw all game objects
    world.step();
    
    //allows you to slow down or speed up the simulation
    setTimeout(() => {
        window.requestAnimationFrame(simLoop);
    }, 1000 / 60);


}
startSimulation();