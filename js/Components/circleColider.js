import Globals from "../globals.js"
import BoxCollider from "./boxColdier.js"

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

            //Loop through all colliders of the other object
            for (const otherCollider of gameObejct.getComponent("Collider").collisionComponents) {
                
                //Check collisions with rectangles
                if (otherCollider instanceof BoxCollider) {
                    otherCollider.calculateGlobalPosition();
                    // Check collision between circle and rotated box
                    if (this.checkCircleBoxCollisionAt(x, y, otherCollider, selfTransform, otherTransform)) {
                        intersectingObject.push(gameObejct);
                        break;
                    }
                }
                
                // Check collision with other circle colliders
                if (otherCollider instanceof CircleCollider) {
                    otherCollider.calculateGlobalPosition();
                    const dx = x - otherCollider.globalX;
                    const dy = y - otherCollider.globalY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < this.radius + otherCollider.radius) {
                        intersectingObject.push(gameObejct);
                        break;
                    }
                }
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

    // Check collision between circle (at x, y position) and a rotated rectangle
    checkCircleBoxCollisionAt(x, y, boxCollider, selfTransform, otherTransform) {
        // Calculate circle's global position at x, y
        const cos = Math.cos(selfTransform.rotation);
        const sin = Math.sin(selfTransform.rotation);
        const rotationOffsetX = this.x * cos - this.y * sin;
        const rotationOffsetY = this.x * sin + this.y * cos;
        const circleX = x + rotationOffsetX;
        const circleY = y + rotationOffsetY;
        const circleRadius = this.radius * selfTransform.width; // Scale radius
        
        // Get the box center
        const boxCenterX = boxCollider.globalX;
        const boxCenterY = boxCollider.globalY;
        const boxRotation = otherTransform.rotation;
        
        // Translate circle center to box's local space (unrotate it)
        const dx = circleX - boxCenterX;
        const dy = circleY - boxCenterY;
        const boxCos = Math.cos(-boxRotation); // Negative to unrotate
        const boxSin = Math.sin(-boxRotation);
        const localX = dx * boxCos - dy * boxSin;
        const localY = dx * boxSin + dy * boxCos;
        
        // Find closest point on the (unrotated) box to the circle
        const hw = boxCollider.scaledWidth / 2;
        const hh = boxCollider.scaledHeight / 2;
        const closestX = Math.max(-hw, Math.min(hw, localX));
        const closestY = Math.max(-hh, Math.min(hh, localY));
        
        // Check distance from circle center to closest point
        const distX = localX - closestX;
        const distY = localY - closestY;
        const distanceSquared = distX * distX + distY * distY;
        
        return distanceSquared < (circleRadius * circleRadius);
    }
}

export default CircleCollider;