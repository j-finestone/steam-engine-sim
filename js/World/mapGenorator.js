import World from"./world.js"
import Globals from "../globals.js"

//Import components
import Renderer from "../Components/renderer.js";
import Transform from "../Components/transform.js";
import Circle from "../Components/sprite types/circle.js";
import Rectangle from "../Components/sprite types/rectangle.js";
import Collider from "../Components/collider.js";
import RigidBody from "../Components/rigidBody.js"
import MouseFollower from "../Scripts/mouseFollower.js";

class MapGenerator {
    constructor() {
        this.generateMap();
    }

    generateMap() {
        // Generate initial map layout here 

        // Create cup
        this.generateCup(200, 300, "maroon"); 

        this.generateParticle(200, 250);

        this.generateMouseFollower();

        // Set world reference for all components
        for (const gameObject of Globals.gameObjects) {
            gameObject.start(Globals.gameObjects);
        }

        // Generate collision components for all objects after they're all created
        for (const gameObject of Globals.gameObjects) {
            const collider = gameObject.getComponent("Collider");
            if (collider) {
                collider.generateCollisionComponents(Globals.gameObjects);
            }
        }
    }

    generateMouseFollower() {   
        let mouseFollower = World.addObject("MouseFollower");
        mouseFollower.addComponent(new MouseFollower(mouseFollower));
        mouseFollower.addComponent(new Transform(mouseFollower, 0, 0, 1, 1, 0));
        mouseFollower.addComponent(new Renderer(mouseFollower));
        mouseFollower.addComponent(new Collider(mouseFollower));
        mouseFollower.getComponent("Renderer").addSpriteComponent(new Rectangle(0, 0, 10, 10, 0, "blue"));




    }


    generateCup (x, y, color) {
        let barrier = World.addObject("Barrier");
        barrier.addComponent(new Transform(barrier, x, y, 1, 1, 0));
        barrier.addComponent(new Renderer(barrier));
        barrier.addComponent(new RigidBody(barrier));
        barrier.addComponent(new Collider(barrier));

        // Add sprite components for the barrier

        barrier.getComponent("Renderer").addSpriteComponent(new Rectangle(0, 50, 210, 10, 0, color));
        barrier.getComponent("Renderer").addSpriteComponent(new Rectangle(-100, 0, 10, 100, 0, color));
        barrier.getComponent("Renderer").addSpriteComponent(new Rectangle(100, 0, 10, 100, 0, color));


        return barrier;

    }

    generateParticle(x, y) { 
        let particle = World.addObject("Particle");
        particle.addComponent(new Transform(particle, x, y, 1, 1, 0));
        particle.addComponent(new Renderer(particle));
        particle.addComponent(new Collider(particle));
        particle.addComponent(new RigidBody(particle));
        particle.getComponent("Renderer").addSpriteComponent(new Circle(0, 0, 5, "yellow"));
        particle.addComponent(new Collider(particle));


    }


}

export default MapGenerator;