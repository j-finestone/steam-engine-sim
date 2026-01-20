class RigidBody{


    constructor(self, mass = 1, velocity = {x: 0, y: 0}) {
        this.self = self;
        this.mass = mass;
        this.velocity = velocity;
        
    }
    
    step() {

        this.self.getComponent("Transform").rotation += .01;


    }



}


export default RigidBody;