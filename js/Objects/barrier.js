//A barrier is a rectangular object that particles cannot pass through
export default class Barrier {

    //Static properties
    static shape = "rectangle";
    
    //variables
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    //draw barrier method
    drawBarrier(ctx) {
        ctx.fillStyle = "brown";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}
