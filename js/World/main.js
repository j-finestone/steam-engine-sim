//Imports
import World from "./world.js"
import UI from "./ui.js"
import Globals from "../globals.js";

import Renderer from "../Components/renderer.js";
import Transform from "../Components/transform.js";
import Circle from "../Components/sprite types/circle.js";
import Rectangle from "../Components/sprite types/rectangle.js";
import Collider from "../Components/collider.js";

//Get canvas and context
Globals.canvas = document.getElementById("fluid-simulation-canvas");
Globals.ctx = Globals.canvas.getContext("2d");


//Create a new world instance
let world;

function startSimulation() {

    UI.initialize();

    World.clearGameObjects();
    world = new World();
    createGameObjects();
    window.requestAnimationFrame(simLoop);

}

    //Create all the initial game objects for the scene
    function createGameObjects() {
        //CREATE OBJECTS

        //Create test square
        createBarrier(200, 200, 200, 200, "maroon");


        //Create test circle
        let testCircle = World.addObject("test circle")
        testCircle.addComponent(new Transform(testCircle, 200, 200, 1, 1, 0));
        testCircle.addComponent(new Renderer(testCircle));
        testCircle.getComponent("Renderer").addSpriteComponent(new Circle(0, 0, 50, "navy"));
        testCircle.addComponent(new Collider(testCircle));

        // Set world reference for all components
        for (const gameObject of Globals.gameObjects) {
            gameObject.start(Globals.gameObjects);
        }

        // Generate collision components for all objects after they're all created
        for (const gameObject of Globals.gameObjects) {
            const collider = gameObject.getComponent("Collider");
            if (collider) {
                collider.generateCollisionComponents(Globals.gameObjects);
            }
        }
    }

    function createBarrier (x, y, w, h, color) {
        let barrier = World.addObject("Barrier");
        barrier.addComponent(new Transform(barrier, x, y, 1, 1, 0));
        barrier.addComponent(new Renderer(barrier));
        barrier.getComponent("Renderer").addSpriteComponent(new Rectangle(1, 1, w, h, color));
        barrier.addComponent(new Collider(barrier));

        return barrier;

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