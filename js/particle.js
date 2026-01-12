import Barrier from "./barrier.js";

//Particle class
class Particle {

    //Asign properties
    airResistance = 0;
    viscosity = 0.5;
    radius = 10
    gravity = 0.1

    //Variables
    Xvelocity = 0; 
    Yvelocity = 0;
    XSpeed = 0;
    YSpeed = 0;
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
        //Varriables
        let newX=this.x;
        let newy=this.y;

        //Apply velocity to speed
        this.XSpeed += this.Xvelocity;
        this.YSpeed += this.Yvelocity;

        //Calculate new position

        /*Calculate new by looping through each pixel of Xspeed, 
        and if it encounters a barrier, it reverses its speed
        and if it encounters a particle it reverses both their speed*/
        let futureXPos = newX + Math.sign(this.XSpeed);
        let colidedParticle = this.colidingWithParticle(this.x, futureXPos);
        for (let i=0; i<Math.abs(this.XSpeed); i++) {
            let futureXPos = newX + Math.sign(this.XSpeed);
            if (this.colidingWithBarrier(futureXPos, this.y)) {
                this.XSpeed = -this.XSpeed;
            } else if (colidedParticle) {
                this.XSpeed = -this.XSpeed;
                colidedParticle.XSpeed = -colidedParticle.XSpeed;
            } else {
                newX += Math.sign(this.XSpeed);
            }
            
        }
       /*Calculate new y by looping through each pixel of Yspeed, 
        and if ot encounters a barrier, it reverses its speed, and
        if it encounters a particle it reverses both their speed*/ 
        for (let i=0; i<Math.abs(this.YSpeed); i++) {
            let futureYPos = newy + Math.sign(this.YSpeed);
            let colidedParticle = this.colidingWithParticle(this.x, futureYPos);
            if (this.colidingWithBarrier(this.x, futureYPos)) {
                this.YSpeed = -this.YSpeed;
            } else if (colidedParticle) {
                this.YSpeed = -this.YSpeed;
                colidedParticle.YSpeed = -colidedParticle.YSpeed;
            } else {
                newy += Math.sign(this.YSpeed);
            }
        }

        //Apply new positions
        this.x = newX;
        this.y = newy;
    }

    //Coliding with barriar
    colidingWithBarrier(particleX, particleY) {
        
        for (let barrier of this.barriers) {
            if (particleX > barrier.x - this.radius && particleX < barrier.x + barrier.width &&
                particleY > barrier.y - this.radius && particleY < barrier.y + barrier.height) {
                return true;
            }
        }
        return false;
    }
    //Coliding with other particles
    colidingWithParticle(x, y) {
        //Loop through all particles
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i] === this) continue;
            //Makes sure distance between particles is less than sum of their radii
            let dx = x - this.particles[i].x;
            let dy = y - this.particles[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.radius / 2 + this.particles[i].radius / 2){
                return this.particles[i];
            } 
        }
        return false 
    }


    //Draw particle method
    drawParticle(ctx) {
        ctx.fillStyle = `rgb(${this.heat}, ${0}, ${255 - this.heat})`;
        ctx.beginPath();
        
        //Draw circle at the particle's position
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
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
        this.XSpeed *= (1 - this.airResistance);
        this.YSpeed *= (1 - this.airResistance);

        //Apply velocity
        this.XSpeed += this.Xvelocity;
        this.YSpeed += this.Yvelocity;

        //Apply gravity
        this.YSpeed += this.gravity*2;

    }


}
export default Particle;