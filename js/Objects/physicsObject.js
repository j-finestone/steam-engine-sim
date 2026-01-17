import Motion from "../motion.js";

//PhysicsObject - Base class for all physics-enabled objects
class PhysicsObject {
    //Common properties
    x = 0;
    y = 0;
    XVelocity = 0;
    YVelocity = 0;
    XConstrained = false;
    YConstrained = false;
    shape = "circle";
    width = 0;
    height = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //Step method - applies physics
    step() {
        Motion.updateVelocity(this);
        Motion.applyVelocity(this);
    }
}

export default PhysicsObject;