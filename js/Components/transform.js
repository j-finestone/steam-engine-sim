class Transform {
    constructor(self, x, y, width, height, rotation) {
        this.self = self;
        this.x = x;
        this.y = y;
        this.depth = 0;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
    }
}

export default Transform;