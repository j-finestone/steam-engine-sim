class BoxCollider {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }


    isColliding(x, y) {
        if (x > this.x && x < this.x + this.width &&
            y > this.y && y < this.y + this.height) {
            return true;
        }
        return false;
    }
}

export default BoxCollider;