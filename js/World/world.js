//Imports
import GameObject from "../Objects/gameObject.js";
import Globals from "../globals.js"

//World class - manages all game objects


class World {
    //Static array to hold all game objects in the world
    static gameObjects = [];

    //Constructor - clears old objects and creates new ones
    constructor() {
        Globals.gameObjects = []; 
    }

    //Create a new game object and add it to the world
    static addObject (name) {
        let newObject = new GameObject(name);
        Globals.gameObjects.push(newObject); 
        return newObject;
    }

    //Clear all game objects from the world
    static clearGameObjects() {
        Globals.gameObjects = [];

        }



    step() {
        //run the step function for each component of each game object
        for (const gameObject of Globals.gameObjects) {
            for (const component of gameObject.components) {
                //Only run step if it exists
                if (typeof component.step === 'function') {
                    component.step();
                    
                }
            }
        }

    }
}

export default World;