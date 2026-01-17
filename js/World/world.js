//Imports
import Renderer from "../Components/renderer.js";
import BoxCollider from "../Components/boxColdier.js";
import RigidBody from "../Components/Rigidbody.js";
import Transform from "../Components/transform.js";
import Circle from "../Components/sprite types/circle.js";
import Rectangle from "../Components/sprite types/rectangle.js";
import GameObject from "../Objects/gameObject.js";

//World class - manages all game objects
class World {
    //Static array to hold all game objects in the world
    static gameObjects = [];

    //Constructor - clears old objects and creates new ones
    constructor() {
        World.gameObjects = []; 
        World.createGameObjects();
    }

    //Create a new game object and add it to the world
    static createObject (name) {
        let newObject = new GameObject(name);
        World.gameObjects.push(newObject); 
        return newObject;
    }

    //Clear all game objects from the world
    static clearGameObjects() {
        World.gameObjects = [];
    }

    //Create all the initial game objects for the scene
    static createGameObjects() {
        //Create test square
        let testSquare = World.createObject("test square")
        
        //Add components

        //Add test square
        testSquare.addComponent(new Transform(100, 100, 1, 1, 0));
        testSquare.addComponent(new Renderer(testSquare.getComponent("Transform")));
        testSquare.getComponent("Renderer").addSpriteComponent(new Rectangle(0, 0, 100, 100, "red"));
    }

    //Render all game objects that have a renderer
    render() {
        for (const gameObject of World.gameObjects) {
            if (gameObject.getComponent("Renderer")) { 
                gameObject.getComponent("Renderer").render();
            }
        }
    }
}

export default World;