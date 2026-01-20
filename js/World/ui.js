import Globals from "../globals.js";

//UI class - manages all UI elements (static)
class UI {
    // Static properties to store slider values
    static baseHeat ;
    static fluidViscosity;
    static airResistance;
    static gravity;
    static particleRadius;
    static simulationSpeed;

    //Inputs
    static mouseX = 0;
    static mouseY = 0;



    // Initialize UI and attach event listeners to sliders
    static initialize() {
        
        // Base Heat
        const baseHeatSlider = document.getElementById('base-heat');
        const baseHeatValue = document.getElementById('base-heat-value');
        baseHeatSlider.addEventListener('input', (e) => {
            UI.baseHeat = parseFloat(e.target.value);
            baseHeatValue.textContent = UI.baseHeat;
        });

        // Fluid Viscosity
        const viscositySlider = document.getElementById('fluid-viscosity');
        const viscosityValue = document.getElementById('fluid-viscosity-value');
        viscositySlider.addEventListener('input', (e) => {
            UI.fluidViscosity = parseFloat(e.target.value);
            viscosityValue.textContent = UI.fluidViscosity;
        });

        // Air Resistance
        const airResistanceSlider = document.getElementById('air-resistance');
        const airResistanceValue = document.getElementById('air-resistance-value');
        airResistanceSlider.addEventListener('input', (e) => {
            UI.airResistance = parseFloat(e.target.value);
            airResistanceValue.textContent = UI.airResistance.toFixed(4);
        });

        // Gravity
        const gravitySlider = document.getElementById('gravity');
        const gravityValue = document.getElementById('gravity-value');
        gravitySlider.addEventListener('input', (e) => {
            UI.gravity = parseFloat(e.target.value);
            gravityValue.textContent = UI.gravity.toFixed(3);
        });

        // Particle Radius
        const particleRadiusSlider = document.getElementById('particle-radius');
        const particleRadiusValue = document.getElementById('particle-radius-value');
        particleRadiusSlider.addEventListener('input', (e) => {
            UI.particleRadius = parseFloat(e.target.value);
            particleRadiusValue.textContent = UI.particleRadius;
        });

        // Simulation Speed
        const simulationSpeedSlider = document.getElementById('simulation-speed');
        const simulationSpeedValue = document.getElementById('simulation-speed-value');
        simulationSpeedSlider.addEventListener('input', (e) => {
            UI.simulationSpeed = parseFloat(e.target.value);
            simulationSpeedValue.textContent = UI.simulationSpeed;
        });

        // Reset Button
        const resetButton = document.getElementById('reset-simulation-button');
        resetButton.addEventListener('click', () => {
            // Call reset function if it exists in global scope
            if (typeof window.resetSimulation === 'function') {
                window.resetSimulation();
            }
        });


        //Input tracking
        const canvas = document.getElementById('fluid-simulation-canvas');   
        canvas.addEventListener('mousemove', (e) => {
            const canvasBoundingBox = canvas.getBoundingClientRect();
            Globals.mouseX = e.clientX - canvasBoundingBox.left;
            Globals.mouseY = e.clientY - canvasBoundingBox.top;

        });
        
    }
}

export default UI;