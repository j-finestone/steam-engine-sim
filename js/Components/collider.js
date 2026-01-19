import Circle from "./sprite types/circle.js";
import Rectangle from "./sprite types/rectangle.js";
import CircleCollider from "./circleColider.js";
import BoxCollider from "./boxColdier.js";
import Globals from "../globals.js";

//Add this component to an object to enable collision detection
class Collider {
    collisionComponents = [];
    constructor(self) {
        this.self = self;
        this.gameObjects = null;
    }

    // Set reference to world game objects
    start(gameObjects) {
        this.gameObjects = gameObjects;
    }

    generateCollisionComponents() {  
        this.collisionComponents = [];
        for (const worldObejct of Globals.gameObjects) {

            const renderer = worldObejct.getComponent("Renderer");

            if (renderer == false) continue; //Dont make a colider if it doesnt have a renderer

            //Loop over every sprite componenet
            for (const spriteComponent of renderer.spriteComponents) {

                //Add the relevent collider for each sprite component
                if (spriteComponent instanceof Circle) {
                    this.collisionComponents.push(new CircleCollider(this.self, spriteComponent));
                }

                if (spriteComponent instanceof Rectangle) {
                    this.collisionComponents.push(new BoxCollider(this.self, spriteComponent));
                }
                console.log("Added collision component:", this.collisionComponents[this.collisionComponents.length - 1]);

            }
            
        }
    }

    isColliding(x, y) {
        let collisionObjects = [];
        for (const component of this.collisionComponents) {
            if (component.intersects(x, y, this.gameObjects)) {
                collisionObjects.push(component);
            }
        }
        //display to console when coliding
        if (collisionObjects.length > 0) {
            console.log("Collision objects:", collisionObjects);
        }
        return collisionObjects.length > 0 ? collisionObjects : false;

    }
    start() {

        this.generateCollisionComponents(this.gameObjects);
    }

    step() {
    
    }
        
    
}
export default Collider;