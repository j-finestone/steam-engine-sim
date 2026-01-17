import MapGenerator from './mapGenorator.js';
import Particle from './Objects/particle.js';

class Collision {

    // Check collision with barriers
    //returns list of barriers collided with
    static isRectCollision(x, y) {
        let rectCollisions = [];
        for (let barrier of MapGenerator.barriers) {

            //Skip checking collision with itself if its a barrier
            if (barrier === this) continue;

            //Check for collision
            if (x + Particle.radius > barrier.x && x - Particle.radius < barrier.x + barrier.width &&
            y + Particle.radius > barrier.y && y - Particle.radius < barrier.y + barrier.height) {
                rectCollisions.push(barrier);
            }
        }

        //return colliding barriers or false if there are none
        if (rectCollisions.length > 0) {
            return rectCollisions;
        } else {
            return false;
        }
    }

    //Check if object1, and its possition, and gets all particles it is colliding with
    static isColliding(object1, x, y) {

        let collidedObjects = [];
        //For circle colliding with an object
        if (object1.shape === "circle") {
            
            //Check for circle collisions
            let collidingCircles = Collision.isCircleCollision(object1, x, y);
            if (collidingCircles !== false) {
                collidedObjects.push(...collidingCircles);
            }
            //Check for rect Collisions
            let collidingRectangles = Collision.isRectCollision(x, y);
            if (collidingRectangles !== false) {
                collidedObjects.push(...collidingRectangles);
            }

        } else if (object1.shape === "rectangle") {
            
            let collidingRectangles = Collision.isRectCollision(object1, x, y);
            if (collidingRectangles !== false) {
                collidedObjects.push(...collidingRectangles);
            }
        }

        if (collidedObjects.length > 0) {
            return collidedObjects;
        } else {
            return false;
        }
    }

    // Check collision with other particles
    //Returns list of particles collided with
    static isCircleCollision(particle, x, y) {
        let collidedParticles = [];
        for (let i = 0; i < MapGenerator.particles.length; i++) {
            if (MapGenerator.particles[i] === particle) continue;
            let dx = x - MapGenerator.particles[i].x; //x distance between the two particles
            let dy = y - MapGenerator.particles[i].y; //y distance between the two particles
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < Particle.radius * 2) { 
                collidedParticles.push(MapGenerator.particles[i]);
            }
        }
        if (collidedParticles.length>0) {
            return collidedParticles;
        } else {
            return false;
        }
    }

    //When a two objects collide
    static onParticleCollision(object1, object2) {
        //Calculate new velocities after collision

        if (object1.shape === "rectangle") {
            //Make it bounce off the rectangle
            object1.XVelocity = -object1.XVelocity/2;
            object1.YVelocity = -object1.YVelocity/2;


        } 
        if (object1.shape === "circle") {
            //Make object react to collision
            if (object2.shape === "circle") {
                Collision.resolveCircleCollision(object1, object2);
            }
            if (object2.shape === "rectangle") {
                //Make it bounce off the rectangle
                object1.XVelocity = -object1.XVelocity/2;
                object1.YVelocity = -object1.YVelocity/2;
            }
        }


    }

    // Resolve collision between two circles
    static resolveCircleCollision(circle1, circle2) {

        const newVelocity1 = Collision.particleColisionVelocity(circle1, circle2);
        const newVelocity2 = Collision.particleColisionVelocity(circle2, circle1);

        circle1.XVelocity = newVelocity1.x;
        circle1.YVelocity = newVelocity1.y;
        circle2.XVelocity = newVelocity2.x;
        circle2.YVelocity = newVelocity2.y;
    }





    //When a particle colides with another particle 
    static particleColisionVelocity(particle1, particle2) {
        /*
        Calculates the relitive position of the two coliding particles 
        (normalX/normalY), then normalizes it (normalUnitX/normalUnitY).
        Then it calculates the relitive velocity between the two particles.
        After, it calculates the velocity along the normal (angle the particle is going)
        by multiplying the relitive velocities by the normal unit vector (velocityAlongNormal).
        Finally, it calculates the new velocity for particle 1 by subtracting
        the velocity along the normal from its current velocity.
        */
        //get their reletive positions
        const normalX = particle1.x - particle2.x;
        const normalY = particle1.y - particle2.y;
        const dist = Math.sqrt(normalX*normalX + normalY*normalY) //Distance between particles

        //Normalized Relitive positions
        const normalUnitX = normalX / dist;
        const normalUnitY = normalY / dist;


        //Get relitive velocities
        const relitiveVelocityX = particle1.XVelocity-particle2.XVelocity;
        const relitiveVelocityY = particle1.YVelocity-particle2.YVelocity;
        const velocityAlongNormal = relitiveVelocityX * normalUnitX + relitiveVelocityY * normalUnitY;

        //Calculate new Velocities
  
        const newVelocityX = particle1.XVelocity - velocityAlongNormal * normalUnitX;
        const newVelocityY = particle1.YVelocity - velocityAlongNormal * normalUnitY; 


        //Returns new velocity for particle 1
        return {x: newVelocityX, y: newVelocityY};

    }
}

export default Collision;