// Global variables accessible throughout the application
export default {
    gameObjects: [],
    canvas: null,
    ctx: null,
    
    // Physics constants
    gravity: 9.8,
    
    // Simulation settings
    timeScale: 1.0,
    isPaused: false,

    //Debugging
    showPivotPoints: true,
    spriteComponentPivotPointRadius: 5,
    objectPivotPointRadius: 5,
    spritePivotPointColor: "rgba(119, 119, 119, 0.55)",
    objectPivotPointColor: "rgba(55, 55, 55, 0.35)",

    
    // Add more global variables as needed
};
