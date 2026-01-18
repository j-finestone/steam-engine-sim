class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.canvas = document.getElementById("fluid-simulation-canvas");
        this.ctx = this.canvas.getContext("2d")
    }

    drawSelf(self) {
        //get transform
        const transform = self.getComponent("Transform");

        //Generate square atributes
        const x = transform.x + this.x;
        const y = transform.y + this.y;
        const width = transform.width * this.width;
        const height = transform.height * this.height;

        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

export default Rectangle;