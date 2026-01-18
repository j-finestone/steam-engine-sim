//UI class - manages all UI elements (static)
class UI {
    //Static properties to store UI elements
    static gravitySlider;
    static baseHeatSlider;
    static fluidViscositySlider;
    static airResistanceSlider;
    static particleRadiusSlider;
    static simulationSpeedSlider;
    static resetButton;

    //Initialize all UI elements
    static initialize() {
        UI.gravitySlider = document.getElementById("gravity");
        UI.baseHeatSlider = document.getElementById("base-heat");
        UI.fluidViscositySlider = document.getElementById("fluid-viscosity");
        UI.airResistanceSlider = document.getElementById("air-resistance");
        UI.particleRadiusSlider = document.getElementById("particle-radius");
        UI.simulationSpeedSlider = document.getElementById("simulation-speed");
        UI.resetButton = document.getElementById("reset-simulation-button");
        
        UI.initializeSliderValues();
    }

    //Initialize slider display values
    static initializeSliderValues() {
        UI.updateSliderValue("gravity", "gravity-value");
        UI.updateSliderValue("base-heat", "base-heat-value");
        UI.updateSliderValue("fluid-viscosity", "fluid-viscosity-value");
        UI.updateSliderValue("air-resistance", "air-resistance-value");
        UI.updateSliderValue("particle-radius", "particle-radius-value");
        UI.updateSliderValue("simulation-speed", "simulation-speed-value");
    }

    //Update slider value display
    static updateSliderValue(sliderId, valueId) {
        const slider = document.getElementById(sliderId);
        const valueSpan = document.getElementById(valueId);
        valueSpan.textContent = slider.value;
        slider.addEventListener('input', () => {
            valueSpan.textContent = slider.value;
        });
    }
}

export default UI;