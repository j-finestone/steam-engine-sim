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

        //Rotate the spritescomponent ofset around the transform's rotation
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);
        const rotatedOffsetX = this.x * cos - this.y * sin;
        const rotatedOffsetY = this.x * sin + this.y * cos;

        const x = transform.x + rotatedOffsetX;
        const y = transform.y + rotatedOffsetY;
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

   
