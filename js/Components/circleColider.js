import Globals from "../globals.js"

class CircleCollider {

    constructor(self, spriteComponent) {
        this.self = self;
        this.transform = spriteComponent.transform;
        this.x = spriteComponent.x;
        this.y = spriteComponent.y;
        this.radius = spriteComponent.radius;
    }

    //Returns the first world object that intersects with the given coordinates
    intersects(x, y) {
        this.calculateGlobalPosition();


        let intersectingObject = [];
        const selfTransform = this.self.getComponent("Transform");
        for (const gameObejct of Globals.gameObjects ) {

            //Skip collision with self
            if (gameObejct === this.self) continue;

            const otherTransform = gameObejct.getComponent("Transform");
            if (!otherTransform) continue;

            const dx = x - otherTransform.x;
            const dy = y - otherTransform.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < selfTransform.width / 2 + otherTransform.width / 2) {
                intersectingObject.push(gameObejct);
            }
        }

        //Return the list of objects that intersect with the given coordinates
        if (intersectingObject.length === 0) {return false};
        return intersectingObject;
    }

    calculateGlobalPosition() {
        const transform = this.self.getComponent("Transform");

        //Account for bounding box rotation
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);
        
        const rotationOffsetX = this.x*cos - this.y*sin;
        const rotationOffsetY = this.x*sin + this.y*cos;

        if (!transform) return;
        this.globalX = transform.x + rotationOffsetX;
        this.globalY = transform.y + rotationOffsetY;
    }

    showBoundingBox() {
        this.calculateGlobalPosition();
        const transform = this.self.getComponent("Transform");
        if (!transform) return;

        Globals.ctx.save();
        Globals.ctx.translate(this.globalX, this.globalY);
        Globals.ctx.rotate(transform.rotation);


        Globals.ctx.beginPath();
        Globals.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        Globals.ctx.strokeStyle = "red";
        Globals.ctx.stroke();

        Globals.ctx.restore(); // Restore the context to its original state
    }
}

export default CircleCollider;