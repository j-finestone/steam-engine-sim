//Import classes
import Particle from './Old Objects/particle.js';
import Barrier from './Old Objects/barrier.js';
import Collision from './Collision.js';
//MapGenerator  class
class MapGenerator {
    static barriers = [];
    static particles = [];

    constructor(ctx, gravity) {
        this.ctx = ctx;
        this.gravity = gravity;
    }
    
    generateMap() {

        //Generate cup
        MapGenerator.barriers = this.generateCup();
        //Generate particles
        MapGenerator.particles = this.generateParticles(MapGenerator.barriers, this.gravity);
    }



    generateCup() {
        //Create engine map
        MapGenerator.barriers = [];
        

        //Genorate particle container
        MapGenerator.barriers.push(new Barrier(200, 250, 10, 100, true)) 
        MapGenerator.barriers.push(new Barrier(370, 250, 10, 100, true))
        MapGenerator.barriers.push(new Barrier(200, 350, 170, 10, true));

        //Generate map (water canister, and pipe)


        return MapGenerator.barriers;

     
        
    }


    //Generate Particles
    generateParticles() {
        MapGenerator.particles = [];
        let iterations = 0
        for(let i = 0; i < 50; i++) {
            let x = Math.random() * (370 - 200) + 200;
            let y = Math.random() * 250;
            MapGenerator.particles.push(new Particle(x, y, 100));

           //Prevent particles from spawning inside barriers or particle
           if (Collision.isRectCollision(MapGenerator.particles[i], x, y) || Collision.isCircleCollision(MapGenerator.particles[i], x, y)) {
                MapGenerator.particles[i].deleteParticle();
                i--;
           }
           iterations++;
           if (iterations > 1000) {
                console.error("Too many iterations while generating particles");
                break;
           }
        }
        return MapGenerator.particles;
    }
    
}

export default MapGenerator;
