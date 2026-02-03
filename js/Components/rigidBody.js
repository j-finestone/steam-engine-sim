class RigidBody{

    //variables 

    constructor(self, mass = 1, velocity = {x: 1, y: 0}) {
        this.self = self;
        this.mass = mass;
        this.velocity = velocity;
        this.angularVelocity = 0.1;

        this.lock = {x: false, y: false};
        this.useGravity = true;
        this.drag = 0.1;
        this.angularDrag = 0.1;
        this.bounciness = 0.5;
        this.friction = 0.3;
        
    }

    start () {
        this.transform = this.self.getComponent("Transform");
        this.collider = this.self.getComponent("Collider");



    }
    
    step() {

        this.move(this.velocity.x, this.velocity.y);




    }

    applyForce(force) {
        this.velocity.x += force.x / this.mass;
        this.velocity.y += force.y / this.mass;
    }

    applyTorque(torque) {
        this.angularVelocity += torque / this.mass;
    }


    //Moves the object in the direction givven taking collision into account
    move(x, y) {

        if(this.collider) {
            const collision = this.collider.isColliding(x, y);
            //console.log("Collision detected from " + this.self.name , collision);
            if(collision>=0) {
                //Loop through every pixel to move it in the direction of the collision
                for (let i = 0; i < Math.abs(x); i++) {
                    const stepX = Math.sign(x);
                    if(!this.collider.isColliding(this.transform.x + stepX, this.transform.y)) {
                        this.transform.x += stepX;
                    } else {
                        break;
                    }
                }
                for (let i = 0; i < Math.abs(y); i++) {
                    const stepY = Math.sign(y);
                    if(!this.collider.isColliding(this.transform.x, this.transform.y + stepY)) {
                        this.transform.y += stepY;
                    } else {
                        break;
                    }
                }
            }
        } else {
            console.warn("No collider found for", this.self);

        }

    }


}


export default RigidBody;