class BoxCollider {
    constructor(self, spriteComponent) {
        this.self = self;
        this.x = spriteComponent.x;
        this.y = spriteComponent.y;
        this.width = spriteComponent.width;
        this.height = spriteComponent.height;
    }


    intersects(x, y, gameObjects) {
        let intersectingObject = [];
        const selfTransform = this.self.getComponent("Transform");
        if (!selfTransform) return false;
        
        for (const gameObject of gameObjects) {
            if (gameObject === this.self) continue;
            
            const otherTransform = gameObject.getComponent("Transform");
            if (!otherTransform) continue;
            
            if (otherTransform.depth !== selfTransform.depth) continue;
            
            if (x > otherTransform.x && x < otherTransform.x + otherTransform.width &&
                y > otherTransform.y && y < otherTransform.y + otherTransform.height) {
                intersectingObject.push(gameObject);
            }
        }

        //Return the list of objects that intersect with the given coordinates
        if (intersectingObject.length === 0) {return false};
        return intersectingObject;
    }
}

export default BoxCollider;