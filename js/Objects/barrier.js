//A barrier is a rectangular object that particles cannot pass through
export default class Barrier {

    //variables
    constructor(x, y, width, height, YConstrained) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.XVelocity = 0;
        this.YVelocity = 0;

        this.YConstrained = YConstrained; //If we allow the barrier to move vertically or not

        this.shape = "rectangle";
    }


    //Step 
    step() {
        Motion.updateSpeed(this);
        Motion.applySpeed(this);
    }

    //draw barrier method
    drawBarrier(ctx) {
        ctx.fillStyle = "brown";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}
