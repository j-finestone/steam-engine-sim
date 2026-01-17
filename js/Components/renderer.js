class Renderer {
    spriteComponents = [];
    constructor(transform) {
        this.spriteComponents = [];
        this.transform = transform;
    }

    addSpriteComponent(spriteComponent) {
        this.spriteComponents.push(spriteComponent);
    }

    render() {
        if (!this.transform) {
            console.warn("Renderer has no transform component.");
            return;
        }

        this.spriteComponents.forEach(spriteComponent => {
            spriteComponent.drawSelf(this.transform);
            
        });
    }

    step () {
        render();
    }
}

export default Renderer;