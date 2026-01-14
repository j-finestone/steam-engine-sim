class Collision {

    // Check collision with barriers
    //returns list of barriers collided with
    static checkBarrierCollision(particle, x, y, barriers) {
        let barrierCollisions = [];
        for (let barrier of barriers) {
            if (x > barrier.x - particle.radius && x < barrier.x + barrier.width &&
                y > barrier.y - particle.radius && y < barrier.y + barrier.height) {
                    barrierCollisions.push(barrier);
            }
        }

        //return colliding barriers or false if there are none
        if (barrierCollisions.length > 0) {
            return barrierCollisions;
        } else {
            return false;
        }
    }


    // Check collision with other particles
    //Returns list of particles collided with
    static checkParticleCollision(particle, x, y, particles) {
        for (let i = 0; i < particles.length; i++) {
            if (particles[i] === particle) continue;
            let dx = x - particles[i].x;
            let dy = y - particles[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < particle.radius / 2 + particles[i].radius / 2){
                return particles[i];
            }
        }
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