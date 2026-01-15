import Barrier from "./barrier.js";
import Collision from "../Collision.js";
import MapGenerator from "../mapGenorator.js";
import Motion from "../motion.js";

//Particle class
class Particle { 
    //Variables
    XVelocity = 0;
    YVelocity = 0;
    
    //Constructor
    constructor(x, y, heat) {
        this.x = x;
        this.y = y;
        this.heat = heat;
        this.shape = "circle";
        this.radius = 5;

        this.updateVariables();
    }
    

    //move particle method
    step() {
        //Functions
        this.updateVariables();
        Motion.updateSpeed(this);
        Motion.applySpeed(this);

    }

    //Draw particle method
    drawParticle(ctx) {
        ctx.fillStyle = `rgb(${this.heat}, ${0}, ${255 - this.heat})`;
        ctx.beginPath();
        
        //Draw circle at the particle's position
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    deleteParticle() {
        const index = MapGenerator.particles.indexOf(this);
        if (index > -1) {
            MapGenerator.particles.splice(index, 1);
        }
    }

    
    //Update variables method
    updateVariables() {
        //Update angle
        this.angle = Math.atan2(this.Yvelocity, this.Xvelocity);
        this.airResistance = Number(document.getElementById("air-resistance").value);
        this.viscosity = Number(document.getElementById("fluid-viscosity").value);
        this.radius = Number(document.getElementById("particle-radius").value);
        this.gravity = Number(document.getElementById("gravity").value);
    }

}
export default Particle;