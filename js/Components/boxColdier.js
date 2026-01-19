import Globals from "../globals.js"
class BoxCollider {
    constructor(self, spriteComponent) {
        this.self = self;
        this.x = spriteComponent.x;
        this.y = spriteComponent.y;
        this.width = spriteComponent.width;
        this.height = spriteComponent.height;
    }


    intersects(x, y) {
        let intersectingObject = [];
        const selfTransform = this.self.getComponent("Transform");
        if (!selfTransform) return false;
        
        for (const gameObject of Globals.gameObjects) {
            if (gameObject === this.self) continue;
            
            const otherTransform = gameObject.getComponent("Transform");
            if (!otherTransform) continue;
        
            if (otherTransform.depth !== selfTransform.depth) continue;
            
            // AABB collision detection - check if rectangles overlap
            // Using the sprite component offsets stored in this collider
            const selfLeft = x ;
            const selfRight = selfLeft + this.width;
            const selfTop = y ;
            const selfBottom = selfTop + this.height;
            
            const otherLeft = otherTransform.x;
            const otherRight = otherLeft + otherTransform.width;
            const otherTop = otherTransform.y;
            const otherBottom = otherTop + otherTransform.height;
            
            // Check if boxes overlap
            if (selfLeft < otherRight && selfRight > otherLeft &&
                selfTop < otherBottom && selfBottom > otherTop) {
                intersectingObject.push(gameObject);
            }
        }

        //Return the list of objects that intersect with the given coordinates
        if (intersectingObject.length === 0) {return false};
        return intersectingObject;
    }
}

export default BoxCollider;