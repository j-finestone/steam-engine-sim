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
}

export default CircleCollider;