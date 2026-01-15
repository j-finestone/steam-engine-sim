import Collision from './Collision.js';
import Particle from './Objects/particle.js';

class Motion {

    //Update velocity method
    static updateVelocity(object) {
        //Apply air resistance
        object.XVelocity *= (1 - Particle.airResistance);
        object.YVelocity *= (1 - Particle.airResistance);


        //Apply gravity
        //Only apply gravity if it is not on the ground with velocity facing downwards
        const isGrounded = Collision.isColliding(object, object.x, object.y+1);
        
        //Round velocities to prevent micro-vibrations
        if (isGrounded) {
            if (Math.abs(object.YVelocity) < 0.4) {
                object.YVelocity = 0;
            }
            if (Math.abs(object.XVelocity) < 0.1) {
                object.XVelocity = 0;
            }
        }


        if (!isGrounded) {
            object.YVelocity += Particle.gravity;
        }
    }

    //Makes object move based on velocity
    static applySpeed(object) {
        //Calculate new position

        /*Calculate new by looping through each pixel of Xspeed, 
        and if it encounters a barrier, it reverses its speed
        and if it encounters a particle it reverses both their speed*/
        for (let i=0; i<Math.abs(object.XVelocity); i++) {
            let futureXPos = object.x + Math.sign(object.XVelocity);
            let collidedObject = Collision.isColliding(object, futureXPos, object.y);
            if (collidedObject!=false) {

                //Make object react to collision
                Collision.onParticleCollision(object, collidedObject[0]);
                
            } else {
                object.x += Math.sign(object.XVelocity);
            }
            
        }
       /*Calculate new y by looping through each pixel of Yspeed, 
        and if it encounters a barrier, it reverses its speed, and
        if it encounters a particle it reverses both their speed*/ 
        for (let i=0; i<Math.abs(object.YVelocity); i++) {
            let futureYPos = object.y + Math.sign(object.YVelocity);
            let collidedObject = Collision.isColliding(object, object.x, futureYPos);
            if (collidedObject!==false) {
                if (collidedObject[0].shape === "rectangle") {
                    //Make it bounce off the rectangle
                    object.YVelocity = -object.YVelocity/2;

                } else if (collidedObject[0].shape === "circle") {
    
                    //Make this particle bounce
                    Collision.onParticleCollision(object, collidedObject[0]);
                }

            } else {
                object.y += Math.sign(object.YVelocity);
            }
        }

    }



}

export default Motion;