//Imports  
import Globals from "../../globals.js";
class Circle {


    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.canvas = document.getElementById("fluid-simulation-canvas");
        this.ctx = this.canvas.getContext("2d")
    }

    drawSelf(self) {
        const transform = self.getComponent("Transform");

        const x = transform.x + this.x;
        const y = transform.y + this.y;
        const radius = transform.width * this.radius;

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

        //draw pivot origin
        if (Globals.showPivotPoints) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, Globals.spriteComponentPivotPointRadius, 0, 2 * Math.PI);
            this.ctx.fillStyle = Globals.spritePivotPointColor;
            this.ctx.fill();
        }
    }

}

export default Circle;

   
