import Barrier from "./barrier.js";
import Collision from "../Collision.js";

//Particle class
class Particle {

    //Asign properties
    airResistance = 0;
    viscosity = 0.5;
    radius = 10
    gravity = 0.1

    //Variables
    XVelocity = 0;
    YVelocity = 0;
    angle = Math.atan2(this.Yvelocity, this.Xvelocity);
    barriers = [];

    //Constructor
    constructor(x, y, heat, barriers, particles) {
        this.x = x;
        this.y = y;
        this.heat = heat;
        this.barriers = barriers;
        this.particles = particles;
    }
    

    //move particle method
    step() {
        //Functions
        this.updateVariables();
        this.updateSpeed();
        this.applySpeed();

    }

    //Functions
    //Makes particle move based on velocity
    applySpeed() {
        //Calculate new position

        /*Calculate new by looping through each pixel of Xspeed, 
        and if it encounters a barrier, it reverses its speed
        and if it encounters a particle it reverses both their speed*/
        for (let i=0; i<Math.abs(this.XVelocity); i++) {
            let futureXPos = this.x + Math.sign(this.XVelocity);
            let colidedParticle = Collision.checkParticleCollision(this, futureXPos, this.y, this.particles);
            if (Collision.checkBarrierCollision(this, futureXPos, this.y, this.barriers)) {
                this.XVelocity = -this.XVelocity;
            } else if (colidedParticle) {
                this.XVelocity = Collision.particleColisionVelocity(this, colidedParticle).x
                this.YVelocity = Collision.particleColisionVelocity(this, colidedParticle).y
            } else {
                this.x += Math.sign(this.XVelocity);
            }
            
        }
       /*Calculate new y by looping through each pixel of Yspeed, 
        and if ot encounters a barrier, it reverses its speed, and
        if it encounters a particle it reverses both their speed*/ 
        for (let i=0; i<Math.abs(this.YVelocity); i++) {
            let futureYPos = this.y + Math.sign(this.YVelocity);
            let colidedParticle = Collision.checkParticleCollision(this, this.x, futureYPos, this.particles);
            if (Collision.checkBarrierCollision(this, this.x, futureYPos, this.barriers)) {
                this.YVelocity = -this.YVelocity;
            } else if (colidedParticle) {

                this.XVelocity = Collision.particleColisionVelocity(this, colidedParticle).x
                this.YVelocity = Collision.particleColisionVelocity(this, colidedParticle).y
            } else {
                this.y += Math.sign(this.YVelocity);
            }
        }

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
        const index = this.particles.indexOf(this);
        if (index > -1) {
            this.particles.splice(index, 1);
        }
    }

    
    //Update variables method
    updateVariables() {
        //Update angle
        this.angle = Math.atan2(this.Yvelocity, this.Xvelocity);
        this.airResistance = document.getElementById("air-resistance").value;
        this.viscosity = document.getElementById("fluid-viscosity").value;
        this.radius = document.getElementById("particle-radius").value;
        this.gravity = document.getElementById("gravity").value;
    }

    //Update velocity method
    updateSpeed() {
        //Apply  air resistance
        this.XVelocity *= (1 - this.airResistance);
        this.YVelocity *= (1 - this.airResistance);


        //Apply gravity
        this.YVelocity += this.gravity*2;


    }


}
export default Particle;