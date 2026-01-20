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


    generateCollisionComponents() {  
        this.collisionComponents = [];
   
        const renderer = this.self.getComponent("Renderer");
        
        if (renderer == false) return; //Dont make a colider if it doesnt have a renderer

        //Loop over every sprite componenet
        for (const spriteComponent of renderer.spriteComponents) {

            //Add the relevent collider for each sprite component
            if (spriteComponent instanceof Circle) {
                this.collisionComponents.push(new CircleCollider(this.self, spriteComponent));
                //console.log("Added CircleCollider:", this.collisionComponents[this.collisionComponents.length - 1]);
            }

            if (spriteComponent instanceof Rectangle) {
                this.collisionComponents.push(new BoxCollider(this.self, spriteComponent));
                //console.log("Added BoxCollider:", this.collisionComponents[this.collisionComponents.length - 1]);
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

        return collisionObjects.length > 0 ? collisionObjects : false;

    }


    start() {

        this.generateCollisionComponents();

            for (const component of this.collisionComponents) {
            if (typeof component.calculateGlobalPosition === "function") {
                component.calculateGlobalPosition();
            }
        }
    }

    step() {
        for (const component of this.collisionComponents) {
            if (typeof component.showBoundingBox === "function") {
                //component.showBoundingBox();
            }
        }
    }
        
    
}
export default Collider;