class GameObject {
    constructor(name) {
        this.name = name;
        this.components = [];
        
        return this;
    }

    addComponent(component) {
        this.components.push(component);
        return component;
    }

    removeComponent(componentName) {
        const index = this.components.findIndex(c => c.constructor.name === componentName);
        if (index !== -1) {
            this.components.splice(index, 1);
        }
    }

    getComponent(componentName) {
        return this.components.find(c => c.constructor.name === componentName);
    }
}

export default GameObject;