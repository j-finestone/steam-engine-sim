import Globals from "../globals.js";

class MouseFollower {
    
    constructor(self) {
        this.self = self;
    }

    followMouse() {
        // Update the object's position to follow the mouse
        const transform = this.self.getComponent("Transform");
        if (transform) {
            transform.x = Globals.mouseX;
            transform.y = Globals.mouseY;
        }
    }

    step() {
        //Follow the mouse 
        this.followMouse();

        //Check for collision 
        //get collider 
        const collider = this.self.getComponent("Collider");
        const transform = this.self.getComponent("Transform");

        if (collider.isColliding(transform.x, transform.y)) {
            // Perform collision detection or response here
        }
    }


}



export default MouseFollower;  