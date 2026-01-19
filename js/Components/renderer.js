//Imports  
import Globals from "../globals.js";

class Renderer {
    spriteComponents = [];
    constructor(self) {
        this.spriteComponents = [];
        this.self = self;
    }

    addSpriteComponent(spriteComponent) {
        this.spriteComponents.push(spriteComponent);
    }

    render() {
        if (!this.self.getComponent("Transform")) {
            console.warn("Renderer has no transform component.");
            return;
        }

        this.spriteComponents.forEach(spriteComponent => {
            spriteComponent.drawSelf(this.self);
            
        });
        //draw origin 
        const transform = this.self.getComponent("Transform");

        //get canvas context
        this.canvas = document.getElementById("fluid-simulation-canvas");
        this.ctx = this.canvas.getContext("2d")
        if (Globals.showPivotPoints && transform) {
            this.ctx.beginPath();
            this.ctx.arc(transform.x, transform.y, Globals.objectPivotPointRadius, 0, 2 * Math.PI);
            this.ctx.fillStyle = Globals.objectPivotPointColor;
            this.ctx.fill();
        }
    }

    step () {
        this.render();
    }
}

export default Renderer;