import Globals from "../globals.js"
import CircleCollider from "./circleColider.js";
class BoxCollider {
    constructor(self, spriteComponent) {
        this.self = self;
        this.x = spriteComponent.x;
        this.y = spriteComponent.y;
        this.width = spriteComponent.width;
        this.height = spriteComponent.height;

    }
    calculateGlobalPosition() {
        const transform = this.self.getComponent("Transform");
        if (!transform) return;
        
        // Apply rotation to the offset
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);
        const rotatedOffsetX = this.x * cos - this.y * sin;
        const rotatedOffsetY = this.x * sin + this.y * cos;
        
        this.globalX = transform.x + rotatedOffsetX;
        this.globalY = transform.y + rotatedOffsetY;
        
        // Scale the dimensions
        this.scaledWidth = this.width * transform.width;
        this.scaledHeight = this.height * transform.height;
    }


    intersects(x, y) {

        let intersectingObject = [];
        const selfTransform = this.self.getComponent("Transform");
        if (!selfTransform) return false;
        this.calculateGlobalPosition();
        
        //Loops through all game objects to check for collision
        for (const gameObject of Globals.gameObjects) {
            //Dont check with objects that shouldnt be checked
            if (gameObject === this.self) continue;
            const otherTransform = gameObject.getComponent("Transform");
            if (!otherTransform) continue;
            if (otherTransform.depth !== selfTransform.depth) continue;

            //Get other collider
            const otherCollider = gameObject.getComponent("Collider");
            if (!otherCollider || !otherCollider.collisionComponents) continue;
            
            //checks collision
            for (const otherComponent of otherCollider.collisionComponents) {
                // Skip if checking the same collision component
                if (otherComponent === this) continue;
                
                if (otherComponent instanceof BoxCollider) {
                    //Makes sure the other box's position is updated
                    otherComponent.calculateGlobalPosition()

                    //Use SAT to see if rotated boxes are colliding at position (x, y)
                    if (this.checkRotatedBoxCollisionAt(x, y, otherComponent, selfTransform, otherTransform)) {
                        intersectingObject.push(gameObject);
                        break; //You dont need to check if multiple shapes collided

                    }
                }

                if (otherComponent instanceof CircleCollider) {
                    //Makes sure the other circle's position is updated
                    otherComponent.calculateGlobalPosition();

                    //Check collision between rotated box and circle
                    if (this.checkRotatedBoxCircleCollisionAt(x, y, otherComponent, selfTransform, otherTransform)) {
                        intersectingObject.push(gameObject);
                        break; 
                    }
                }
            }       
            
        }
        return intersectingObject.length > 0 ? intersectingObject : false;
    }

    //#region Rect collision Detection
    checkRotatedBoxCollisionAt(x, y, other, selfTransform, otherTransform) {

        //step 1: Get the 4 corners of each rotated object
        //Use x, y for this object's position, other uses its current position
        const corners1 = this.getRotatedCornersAt(x, y, selfTransform)
        const corners2 = other.getRotatedCornersAt(other.globalX, other.globalY, otherTransform)
        
        // Debug visualization: Draw corner points and outline
        if (Globals.showPivotPoints) {
            // Draw outline of object at mouse position (lime green)
            Globals.ctx.strokeStyle = "lime";
            Globals.ctx.lineWidth = 2;
            Globals.ctx.beginPath();
            Globals.ctx.moveTo(corners1[0].x, corners1[0].y);
            Globals.ctx.lineTo(corners1[1].x, corners1[1].y);
            Globals.ctx.lineTo(corners1[2].x, corners1[2].y);
            Globals.ctx.lineTo(corners1[3].x, corners1[3].y);
            Globals.ctx.closePath();
            Globals.ctx.stroke();
            
            // Draw corners as dots
            Globals.ctx.fillStyle = "lime";
            corners1.forEach(c => {
                Globals.ctx.fillRect(c.x - 3, c.y - 3, 6, 6);
            });
            
            // Draw outline of other object (orange)
            Globals.ctx.strokeStyle = "orange";
            Globals.ctx.lineWidth = 2;
            Globals.ctx.beginPath();
            Globals.ctx.moveTo(corners2[0].x, corners2[0].y);
            Globals.ctx.lineTo(corners2[1].x, corners2[1].y);
            Globals.ctx.lineTo(corners2[2].x, corners2[2].y);
            Globals.ctx.lineTo(corners2[3].x, corners2[3].y);
            Globals.ctx.closePath();
            Globals.ctx.stroke();
            
            // Draw corners as dots
            Globals.ctx.fillStyle = "orange";
            corners2.forEach(c => {
                Globals.ctx.fillRect(c.x - 3, c.y - 3, 6, 6);
            });
        }

        //Step 2 get the axes to test (perpendicular to each edge)
        //I need to test 4 in total, 2 from each rectangle. (one per pair of parallel edges)
        const axes = [
            ...this.getAxes(corners1),
            ...other.getAxes(corners2)
        ]

        //Step 3: test each axis
        for (const axis of axes) {
            //Project both rectangles onto this axis (flatten them onto a line)
            const proj1 = this.projectOntoAxis(corners1, axis);
            const proj2 = this.projectOntoAxis (corners2, axis);

            //Check if the projections overlap on this axis
            //If they dont overlap, we found a seperate axis, meaning no collision
            if (proj1.max < proj2.min || proj2.max < proj1.min) {
                return false; //seperate axis found = shapes not colliding
            }
        }
        return true; //No axes are seperate, meaning there is a collision
    }

    //Calculate corners at a specific x, y position
    getRotatedCornersAt(x, y, transform) {
        //get sin and cos (use to rotate point around center)
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);
        
        
        // Center is at the transform position plus rotated sprite offset
        const centerX = x;
        const centerY = y;

        // Always calculate fresh scaled dimensions
        const hw = (this.width * transform.width) / 2;
        const hh = (this.height * transform.height) / 2;

        //Calculate the 4 corners by rotating the half-width/height offsets
        return [
            // Top-left corner
            {x: centerX + (-hw * cos - -hh * sin), y: centerY + (-hw * sin + -hh * cos)},
            // Top-right corner
            {x: centerX + (hw * cos - -hh * sin), y: centerY + (hw * sin + -hh * cos)},
            // Bottom-right corner
            {x: centerX + (hw * cos - hh * sin), y: centerY + (hw * sin + hh * cos)},
            // Bottom-left corner
            {x: centerX + (-hw * cos - hh * sin), y: centerY + (-hw * sin + hh * cos)}
        ];
    }

    //Get the perpendicular axes to test for the SAT
    //We only need 2 axes per rectangle (one for each pair of parallel edges)
    getAxes(corners) {
        //For each edge, we get the perpendicular direction 
        //If edge goes from A to B. perpendicular is (-dy, dx), where dx=b.x-A.x, dy=.y-A.y
        return [
            //axis perpendicular to the edge from the corner 0 to the corner 1 (top-edge)
            {x: corners[1].y - corners[0].y, y: -(corners[1].x - corners[0].x)},
            //Axis perpendicular to edge from corner 1 to corner 2 (right edge)
            {x: corners[2].y - corners[1].y, y: -(corners[2].x - corners[1].x)}
        ]
    }

    //Projects all corners onto an axis, and find the nim/max range
    //this "flattens" the shape onto a line to see how far it extends along the axis 
    projectOntoAxis(corners, axis) {
        //Dot product projects a point onto an axis (tells you how far along the axis the point is)
        const dots = corners.map(c => c.x * axis.x + c.y * axis.y);

        //Return the range: minimum to maximum projection
        //If two shapes ranges dont overlap, theyre separated on this axis
        return {min: Math.min(...dots), max: Math.max(...dots)};
    }

    //#endregion

    //#region Box-Circle collision Detection
    
    // Check collision between a rotated rectangle and a circle
    checkRotatedBoxCircleCollisionAt(x, y, circleCollider, selfTransform, otherTransform) {
        // Get the circle's position and radius
        const circleX = circleCollider.globalX;
        const circleY = circleCollider.globalY;
        const circleRadius = circleCollider.radius * otherTransform.width; // Scale radius
        
        // Calculate the box center at the given position
        const cos = Math.cos(selfTransform.rotation);
        const sin = Math.sin(selfTransform.rotation);
        const rotatedOffsetX = this.x * cos - this.y * sin;
        const rotatedOffsetY = this.x * sin + this.y * cos;
        const boxCenterX = x + rotatedOffsetX;
        const boxCenterY = y + rotatedOffsetY;
        
        // Translate circle center to box's local space (unrotate it)
        const dx = circleX - boxCenterX;
        const dy = circleY - boxCenterY;
        const localX = dx * cos + dy * sin;
        const localY = -dx * sin + dy * cos;
        
        // Find closest point on the (unrotated) box to the circle
        const hw = (this.width * selfTransform.width) / 2;
        const hh = (this.height * selfTransform.height) / 2;
        const closestX = Math.max(-hw, Math.min(hw, localX));
        const closestY = Math.max(-hh, Math.min(hh, localY));
        
        // Check distance from circle center to closest point
        const distX = localX - closestX;
        const distY = localY - closestY;
        const distanceSquared = distX * distX + distY * distY;
        
        return distanceSquared < (circleRadius * circleRadius);
    }
    
    //#endregion

}

export default BoxCollider;