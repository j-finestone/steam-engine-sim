import Motion from "../motion.js";
import PhysicsObject from "./physicsObject.js";

//A barrier is a rectangular object that particles cannot pass through
export default class Barrier extends PhysicsObject {
    //Constructor
    constructor(x, y, width, height, YConstrained = true) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.XConstrained = false; //If we allow the barrier to move horizontally or not
        this.YConstrained = YConstrained; //If we allow the barrier to move vertically or not
        this.shape = "rectangle";
    }

    //draw barrier method
    drawBarrier(ctx) {
        ctx.fillStyle = "brown";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}
