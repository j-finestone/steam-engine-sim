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

        collisionObjects = World.gameObjects;
        for (const gameObejct of collisionObjects ) {
            if (gameObejct === this.self) continue;
            if (gameObejct.depth !== this.transform.depth) continue;
            const dx = x - gameObejct.transform.x;
            const dy = y - gameObejct.transform.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.transform.width / 2 + gameObejct.transform.width / 2) {
                intersectingObject.push(gameObejct);
            }
        }

        //Return the list of objects that intersect with the given coordinates
        if (intersectingObject.length === 0) {return false};
        return intersectingObject;
    }
}

export default CircleCollider;