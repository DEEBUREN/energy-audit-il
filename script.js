// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Initialize charts
    initializeCharts();

    // Tab switching for calculator
    initializeTabs();

    // Intersection Observer for fade-in animations
    observeElements();

    // Contact form handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Initialize Charts
function initializeCharts() {
    // Energy Distribution Chart
    const energyCtx = document.getElementById('energyChart');
    if (energyCtx) {
        new Chart(energyCtx, {
            type: 'doughnut',
            data: {
                labels: ['Air Conditioner', 'Computers', 'Ceiling Fans', 'Lights', 'Water Pump'],
                datasets: [{
                    data: [2160, 1800, 432, 270, 180],
                    backgroundColor: [
                        '#27ae60',
                        '#2ecc71',
                        '#16a085',
                        '#1abc9c',
                        '#3498db'
                    ],
                    borderColor: 'white',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });
    }

    // Monthly Trend Chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Monthly Energy Consumption (kWh)',
                    data: [4842, 4756, 4923, 5234, 5567, 5891, 6234, 6156, 5423, 4789, 4634, 4923],
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#27ae60',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return value + ' kWh';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Tab Switching
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const calculatorContents = document.querySelectorAll('.calculator-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            calculatorContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// Calculation Functions with Validation
function validateInputs(inputs) {
    for (let input of inputs) {
        if (input.value === '' || input.value === null) {
            alert('Please fill in all fields');
            input.focus();
            return false;
        }
        if (parseFloat(input.value) < 0) {
            alert('Values cannot be negative');
            input.focus();
            return false;
        }
        if (parseFloat(input.value) === 0) {
            alert('Values must be greater than 0');
            input.focus();
            return false;
        }
    }
    return true;
}

// Fan Energy Calculation
function calculateFanEnergy() {
    const inputs = [
        document.getElementById('fanNumber'),
        document.getElementById('fanPower'),
        document.getElementById('fanHours'),
        document.getElementById('fanDays')
    ];

    if (!validateInputs(inputs)) return;

    const number = parseFloat(document.getElementById('fanNumber').value);
    const power = parseFloat(document.getElementById('fanPower').value);
    const hours = parseFloat(document.getElementById('fanHours').value);
    const days = parseFloat(document.getElementById('fanDays').value);

    // Formula: Energy (kWh) = (Number × Power × Hours × Days) / 1000
    const energy = (number * power * hours * days) / 1000;
    const cost = energy * 6; // ₹6 per kWh

    document.getElementById('fanEnergyResult').textContent = energy.toFixed(2);
    document.getElementById('fanCostResult').textContent = '₹' + cost.toFixed(2);
    document.getElementById('fanResult').classList.remove('hidden');

    // Scroll to result
    document.getElementById('fanResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Light Energy Calculation
function calculateLightEnergy() {
    const inputs = [
        document.getElementById('lightNumber'),
        document.getElementById('lightPower'),
        document.getElementById('lightHours'),
        document.getElementById('lightDays')
    ];

    if (!validateInputs(inputs)) return;

    const number = parseFloat(document.getElementById('lightNumber').value);
    const power = parseFloat(document.getElementById('lightPower').value);
    const hours = parseFloat(document.getElementById('lightHours').value);
    const days = parseFloat(document.getElementById('lightDays').value);

    const energy = (number * power * hours * days) / 1000;
    const cost = energy * 6;

    document.getElementById('lightEnergyResult').textContent = energy.toFixed(2);
    document.getElementById('lightCostResult').textContent = '₹' + cost.toFixed(2);
    document.getElementById('lightResult').classList.remove('hidden');

    document.getElementById('lightResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// AC Energy Calculation
function calculateACEnergy() {
    const inputs = [
        document.getElementById('acNumber'),
        document.getElementById('acPower'),
        document.getElementById('acHours'),
        document.getElementById('acDays')
    ];

    if (!validateInputs(inputs)) return;

    const number = parseFloat(document.getElementById('acNumber').value);
    const power = parseFloat(document.getElementById('acPower').value);
    const hours = parseFloat(document.getElementById('acHours').value);
    const days = parseFloat(document.getElementById('acDays').value);

    const energy = (number * power * hours * days) / 1000;
    const cost = energy * 6;

    document.getElementById('acEnergyResult').textContent = energy.toFixed(2);
    document.getElementById('acCostResult').textContent = '₹' + cost.toFixed(2);
    document.getElementById('acResult').classList.remove('hidden');

    document.getElementById('acResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Custom Energy Calculation
function calculateCustomEnergy() {
    const inputs = [
        document.getElementById('customLoad'),
        document.getElementById('customNumber'),
        document.getElementById('customPower'),
        document.getElementById('customHours'),
        document.getElementById('customDays')
    ];

    if (!validateInputs(inputs)) return;

    const loadName = document.getElementById('customLoad').value;
    const number = parseFloat(document.getElementById('customNumber').value);
    const power = parseFloat(document.getElementById('customPower').value);
    const hours = parseFloat(document.getElementById('customHours').value);
    const days = parseFloat(document.getElementById('customDays').value);

    const energy = (number * power * hours * days) / 1000;
    const cost = energy * 6;

    document.getElementById('customResultName').textContent = loadName;
    document.getElementById('customEnergyResult').textContent = energy.toFixed(2);
    document.getElementById('customCostResult').textContent = '₹' + cost.toFixed(2);
    document.getElementById('customResult').classList.remove('hidden');

    document.getElementById('customResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Contact Form Handler
function handleContactForm(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Intersection Observer for animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Keyboard shortcut for easy navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelector('.hamburger')?.classList.remove('active');
        document.querySelector('.nav-menu')?.classList.remove('active');
    }
});