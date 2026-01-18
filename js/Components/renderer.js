class Renderer {
    spriteComponents = [];
    constructor(self) {
        this.spriteComponents = [];
        this.self = self;
    }

    addSpriteComponent(spriteComponent) {
        this.spriteComponents.push(spriteComponent);
    }

    render() {
        if (!this.self.getComponent("Transform")) {
            console.warn("Renderer has no transform component.");
            return;
        }

        this.spriteComponents.forEach(spriteComponent => {
            spriteComponent.drawSelf(this.self);
            
        });
    }

    step () {
        render();
    }
}

export default Renderer;