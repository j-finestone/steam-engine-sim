//Import classes
import Particle from './Objects/particle.js';
import Barrier from './Objects/barrier.js';
import Collision from './collision.js';


//MapGenerator  class
class MapGenerator {
    constructor(ctx, gravity) {
        this.ctx = ctx;
        this.gravity = gravity;
    }
    
    generateMap() {

        //Generate cup
        const barriers = this.generateCup();
        //Generate particles
        this.generateParticles(barriers, this.gravity);
    }



    generateCup() {
        //Create map (cup)
        const barriers = [new Barrier(200, 250, 10, 100),
            new Barrier(370, 250, 10, 100),
            new Barrier(200, 350, 170, 10),];
        return barriers;
    }


    //Generate Particles
    generateParticles(barriers, gravity) {
        const particles = [];
        let iterations = 0
        for(let i = 0; i < 25; i++) {
            let x = Math.random() * (370 - 200) + 200;
            let y = Math.random() * 250;
            particles.push(new Particle(x, y, 100, barriers, particles, gravity));

           //Prevent particles from spawning inside barriers or particle
           if (Collision.checkBarrierCollision(particles[i], x, y, barriers) || Collision.checkParticleCollision(particles[i], x, y, particles)) {
                particles[i].deleteParticle();
                i--;
           }
           iterations++;
           if (iterations > 1000) {
                console.error("Too many iterations while generating particles");
                break;
           }
        }
        return particles;
    }
    
}

export default MapGenerator;
