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
        if (typeof this.self.transform === "transform") return false;
        for (const gameObject of gameObjects) {
            if (gameObject === this.self.transform) continue;
            if (gameObject.transform.depth !== this.self.transform.depth) continue;
            if (x > gameObject.transform.x && x < gameObject.transform.x + gameObject.transform.width &&
                y > gameObject.transform.y && y < gameObject.transform.y + gameObject.transform.height) {
                intersectingObject.push(gameObject);
            }
        }

        //Return the list of objects that intersect with the given coordinates
        if (intersectingObject.length === 0) {return false};
        return intersectingObject;
    }
}

export default BoxCollider;