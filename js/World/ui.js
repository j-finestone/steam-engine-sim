class UI {
    constructor() {
        this.gravitySlider = document.getElementById("gravity");
        this.baseHeatSlider = document.getElementById("base-heat");
        this.fluidViscositySlider = document.getElementById("fluid-viscosity");
        this.airResistanceSlider = document.getElementById("air-resistance");
        this.particleRadiusSlider = document.getElementById("particle-radius");
        this.simulationSpeedSlider = document.getElementById("simulation-speed");
        this.resetButton = document.getElementById("reset-simulation-button");
    }

};

    initializeSliderValues() {
        this.updateSliderValue("gravity", "gravity-value");
        this.updateSliderValue("base-heat", "base-heat-value");
        this.updateSliderValue("fluid-viscosity", "fluid-viscosity-value");
        this.updateSliderValue("air-resistance", "air-resistance-value");
        this.updateSliderValue("particle-radius", "particle-radius-value");
        this.updateSliderValue("simulation-speed", "simulation-speed-value");
    }

    // Function to update slider values
    updateSliderValue(sliderId, valueId) {
        const slider = document.getElementById(sliderId);
        const valueSpan = document.getElementById(valueId);
        valueSpan.textContent = slider.value;
        slider.addEventListener('input', () => {
            valueSpan.textContent = slider.value;
    });


}
export default UI;