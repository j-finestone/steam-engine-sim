//Imports
import Renderer from "../Components/renderer.js";
import BoxCollider from "../Components/boxColdier.js";
import RigidBody from "../Components/Rigidbody.js";
import Transform from "../Components/transform.js";
import Circle from "../Components/sprite types/circle.js";
import Rectangle from "../Components/sprite types/rectangle.js";
import GameObject from "../Objects/gameObject.js";
import CircleCollider from "../Components/circleColider.js";

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
        //CREATE OBJECTS

        //Create test square
        World.createBarrier(200, 200, 200, 200, "maroon");


        //Create test circle
        let testCircle = World.createObject("test circle")
        testCircle.addComponent(new Transform(testCircle, 200, 200, 1, 1, 0));
        testCircle.addComponent(new Renderer(testCircle));
        testCircle.addComponent(new CircleCollider(testCircle, 100, 100));
        testCircle.getComponent("Renderer").addSpriteComponent(new Circle(0, 0, 50, "navy"));
    }

    static createBarrier (x, y, w, h, color) {
        let barrier = World.createObject("Barrier");
        barrier.addComponent(new Transform(barrier, x, y, 1, 1, 0));
        barrier.addComponent(new BoxCollider(barrier));
        barrier.addComponent(new Renderer(barrier));
        barrier.getComponent("Renderer").addSpriteComponent(new Rectangle(1, 1, w, h, color));

        return barrier;

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