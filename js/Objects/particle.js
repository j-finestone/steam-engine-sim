import Barrier from "./barrier.js";
import Collision from "../Collision.js";
import MapGenerator from "../mapGenorator.js";

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

        this.updateVariables();
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
            let colidedParticle = Collision.circleCollision(this, futureXPos, this.y);
            if (Collision.rectCollision(this, futureXPos, this.y)) {
                this.XVelocity = -this.XVelocity/2;
            } else if (colidedParticle) {

                //Make it bounce of the particle
                this.XVelocity = Collision.particleColisionVelocity(this, colidedParticle[0]).x
                this.YVelocity = Collision.particleColisionVelocity(this, colidedParticle[0]).y

                //Make other particle bounce
                colidedParticle[0].XVelocity = Collision.particleColisionVelocity(colidedParticle[0], this).x
                colidedParticle[0].YVelocity = Collision.particleColisionVelocity(colidedParticle[0], this).y

            } else {
                this.x += Math.sign(this.XVelocity);
            }
            
        }
       /*Calculate new y by looping through each pixel of Yspeed, 
        and if it encounters a barrier, it reverses its speed, and
        if it encounters a particle it reverses both their speed*/ 
        for (let i=0; i<Math.abs(this.YVelocity); i++) {
            let futureYPos = this.y + Math.sign(this.YVelocity);
            let colidedParticle = Collision.circleCollision(this, this.x, futureYPos);
            if (Collision.rectCollision(this, this.x, futureYPos)) {
                this.YVelocity = -this.YVelocity/2;
            } else if (colidedParticle) {

                //Make this particle bounce
                this.XVelocity = Collision.particleColisionVelocity(this, colidedParticle[0]).x
                this.YVelocity = Collision.particleColisionVelocity(this, colidedParticle[0]).y

                //Make other particle bounce
                colidedParticle[0].XVelocity = Collision.particleColisionVelocity(colidedParticle[0], this).x
                colidedParticle[0].YVelocity = Collision.particleColisionVelocity(colidedParticle[0], this).y
                
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

    //Update velocity method
    updateSpeed() {
        //Apply  air resistance
        this.XVelocity *= (1 - this.airResistance);
        this.YVelocity *= (1 - this.airResistance);


        //Apply gravity
        //Only apply gravity if it is not on the ground with velocity facing downwards
        const isGrounded = Collision.rectCollision(this, this.x, this.y+1);
        

        if (!isGrounded) {
            this.YVelocity += this.gravity;
        }

    }


}
export default Particle;