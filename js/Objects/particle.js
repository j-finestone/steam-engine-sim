import Barrier from "./barrier.js";
import Collision from "../Collision.js";
import MapGenerator from "../mapGenorator.js";
import Motion from "../motion.js";

//Particle class
class Particle { 
    //Static simulation variables (updated globally in main.js)
    static gravity = 0.1;
    static airResistance = .1;
    static viscosity = 0.5;
    static radius = 10;
    
    //Variables
    XVelocity = 0;
    YVelocity = 0;
    
    //Constructor
    constructor(x, y, heat) {
        this.x = x;
        this.y = y;
        this.heat = heat;
        this.shape = "circle";
    }
    

    //move particle method
    step() {
        //Functions
        Motion.updateVelocity(this);
        Motion.applyVelocity(this);

    }

    //Draw particle method
    drawParticle(ctx) {
        ctx.fillStyle = `rgb(${this.heat}, ${0}, ${255 - this.heat})`;
        ctx.beginPath();
        
        //Draw circle at the particle's position
        ctx.arc(this.x, this.y, Particle.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    deleteParticle() {
        const index = MapGenerator.particles.indexOf(this);
        if (index > -1) {
            MapGenerator.particles.splice(index, 1);
        }
    }

}
export default Particle;