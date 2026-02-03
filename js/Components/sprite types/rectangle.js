//Imports  
import Globals from "../../globals.js";

class Rectangle {
    constructor(parent, x, y, width, height, rotation, color) {
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.color = color;

        this.canvas = document.getElementById("fluid-simulation-canvas");
        this.ctx = this.canvas.getContext("2d")
    }

    drawSelf(self) {
        //get transform
        const transform = self.getComponent("Transform");

        // Rotate the sprite component's offset around the transform origin
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);
        const rotatedOffsetX = this.x * cos - this.y * sin;
        const rotatedOffsetY = this.x * sin + this.y * cos;



        //Generate square atributes
        const x = transform.x + rotatedOffsetX;
        const y = transform.y + rotatedOffsetY;
        const width = transform.width * this.width;
        const height = transform.height * this.height;
        const rotation = transform.rotation + this.rotation;



        //Rotate canvas so everything is drawn relative to the pivot point
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);

        this.ctx.beginPath();
        this.ctx.rect(-width/2, -height/2, width, height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();


        this.ctx.restore();

        //draw pivot origin
        if (Globals.showPivotPoints) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, Globals.spriteComponentPivotPointRadius, 0, 2 * Math.PI);
            this.ctx.fillStyle = Globals.spritePivotPointColor;
            this.ctx.fill();
        }

        
    }
}

export default Rectangle;