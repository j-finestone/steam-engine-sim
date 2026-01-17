class RigidBody{
    constructor(mass = 1, velocity = {x: 0, y: 0}) {
        this.mass = mass;
        this.velocity = velocity;
    }
}

export default RigidBody;