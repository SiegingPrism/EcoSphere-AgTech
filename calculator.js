/* ROI Calculator Logic */

const CROP_DATA = {
    'lettuce': { name: 'Leafy Greens', pricePerLb: 3.50, yieldPerSqFt: 25 }, // High density
    'basil': { name: 'Herbs (Basil)', pricePerLb: 12.00, yieldPerSqFt: 15 },
    'tomatoes': { name: 'Vining Crops', pricePerLb: 2.50, yieldPerSqFt: 40 },
    'tilapia': { name: 'Tilapia (Fish)', pricePerLb: 6.00, yieldPerSqFt: 30 } // For integrated/aqua
};

function calculateROI() {
    const spaceInput = document.getElementById('calc-space').value;
    const cropInput = document.getElementById('calc-crop').value;

    if (!spaceInput || !cropInput) {
        alert('Please fill in all fields');
        return;
    }

    const area = parseFloat(spaceInput);
    const crop = CROP_DATA[cropInput];

    // Simple estimation logic
    const annualYield = area * crop.yieldPerSqFt;
    const grossRevenue = annualYield * crop.pricePerLb;

    // Animate results
    animateValue("result-yield", 0, annualYield, 1000);
    animateValue("result-revenue", 0, grossRevenue, 1000, "$");

    document.getElementById('calculator-results').classList.add('visible');
}

function animateValue(id, start, end, duration, prefix = "") {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = prefix + value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
