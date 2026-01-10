class Particle {

    //Asign properties
    airResistance = 0;
    viscosity = 0.5;
    radius = 5

    //Variables
    Xvelocity = 0; 
    Yvelocity = 0;
    XSpeed = 0;
    YSpeed = .01;
    angle = Math.atan2(this.Yvelocity, this.Xvelocity);
    barriers = [];

    //Constructor
    constructor(x, y, heat, barriers) {
        this.x = x;
        this.y = y;
        this.heat = heat;
        this.barriers = barriers;
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
        and if ot encounters a barrier, it reverses its speed*/
        for (let i=0; i<Math.abs(this.XSpeed); i++) {
            if (!this.colidingWithBarrier(newX + Math.sign(this.XSpeed), this.y)) {
                newX += Math.sign(this.XSpeed);
            } else {
                this.XSpeed = -this.XSpeed;
            }
        }
       /*Calculate new y by looping through each pixel of Yspeed, 
        and if ot encounters a barrier, it reverses its speed*/ 
        for (let i=0; i<Math.abs(this.YSpeed); i++) {
            if (!this.colidingWithBarrier(this.x, newy + Math.sign(this.YSpeed))) {
                newy += Math.sign(this.YSpeed);
            } else {
                this.YSpeed = -this.YSpeed;
            }
        }

        //Apply new positions
        this.x = newX;
        this.y = newy;
    }

    //Coliding with barriar
    colidingWithBarrier(particleX, particleY) {
        
        for (let barrier of this.barriers) {
            if (particleX > barrier.x + this.radius&& particleX < barrier.x + this.radius+ barrier.width &&
                particleY > barrier.y-this.radius && particleY < barrier.y + barrier.height+this.radius) {
                return true;
            }
        }
        return false;
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
        this.YSpeed += 0.1;

    }


}
export default Particle;