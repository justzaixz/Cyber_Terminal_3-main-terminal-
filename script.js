// Define commandInput and terminalOutput first
const terminalOutput = document.getElementById('terminal-output');
const commandInput = document.getElementById('command-input');

// Initialize terminal with a welcome message
terminalOutput.innerHTML = '<p>Starting..<br> <br> Type "list" to see where you would like to start.</p>';

// Focus on the input field when the page loads
commandInput.focus();

// Commands terminal with actual commands (ikik im so cool)
const bootCyberOS = () => {
    terminalOutput.innerHTML += "<p>Loading system files...</p>";
    setTimeout(() => {
        terminalOutput.innerHTML += "<p>Initializing modules...</p>";
    }, 1000);
    setTimeout(() => {
        terminalOutput.innerHTML += "<p>System Ready!</p>";
    }, 2000);

    setTimeout(() => {
    window.location.href = ""; // i'll change this to the next website soon
    }, 3000);
};

const commands = {
    list: () => {
        terminalOutput.innerHTML += '<p>Available commands: games, articles, videos, clear, errorlist </p>';
    },
    games: () => {
        terminalOutput.innerHTML += '<p>Redirecting to games..<br><br><br><br></p><p style="color:yellow">Error.. {1349}=> CHECK ERROR LIST </p>';
    },
    errorlist: () => {
        terminalOutput.innerHTML += `<p style="color:yellow;">Insert error number.</p>`;
    },
    clear: () => {
        terminalOutput.innerHTML = '<p>Starting..<br> <br> Type "list" to see where you would like to start.</p>';
    },
    start: () => {
        terminalOutput.innerHTML += `<p>Are you sure you want to get started? <br> Type "yes" or "no".</p>`;
    },
    yes: () => {
        terminalOutput.innerHTML = "<p><b> Booting Cyber-OS... </b></p>";
        bootCyberOS(); // Call the function here
    },
    no: () => {
        terminalOutput.innerHTML = "<p>Available commands: help, hello, date, clear, start, yes</p>";
    },

    1349: () => {
        terminalOutput.innerHTML = '<p style="color:yellow">Error 1349<br><br><br> Recieved due to attempt in starting a game without a lesson.<br><br> After each video or article, you will be able to play a game corresponding to that topic.. <br><br>Type "clear" to go back';
    }
};


// Keydown event to highlight keys on the virtual keyboard
document.addEventListener('keydown', (event) => {
    const keyElement = document.getElementById(event.code);
    if (keyElement) {
        keyElement.classList.add('lit');
    }

    // Prevent default behavior for Backspace if not focused on an input field
    if (event.key === 'Backspace' && document.activeElement !== commandInput) {
        event.preventDefault();
    }
});

// Keyup event to remove highlighting from keys
document.addEventListener('keyup', (event) => {
    const keyElement = document.getElementById(event.code);
    if (keyElement) {
        keyElement.classList.remove('lit');
    }
});

// Handle Enter key and execute commands
commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission behavior

        const commandText = commandInput.value.trim();
        terminalOutput.innerHTML += `<p>$ ${commandText}</p>`;

        const parts = commandText.split(' ');
        const commandName = parts[0];
        const args = parts.slice(1);

        if (commands[commandName]) {
            commands[commandName](args);
        } else {
            terminalOutput.innerHTML += `<p>Command not found: ${commandName}</p>`;
        }

        // Clear input and scroll to bottom of terminal
        commandInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// Function to update time and date
function updateDateTime() {
    var currentdate = new Date();
    var dateString = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
    var timeString = currentdate.getHours().toString().padStart(2, '0') + ":" +
                     currentdate.getMinutes().toString().padStart(2, '0') + ":" +
                     currentdate.getSeconds().toString().padStart(2, '0');

    // Select the elements AFTER DOM has loaded
    const startupLines = document.querySelectorAll('.startup-line');

    if (startupLines.length > 0) {
        startupLines[0].textContent = "System Time: " + timeString;
        if (startupLines.length > 1) {
            startupLines[1].textContent = "System Date: " + dateString;
        }
    }
}

// Ensure the function runs after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
});







// Create a container div for the globe
const globeContainer = document.createElement("div");
globeContainer.id = "globe-container";
document.body.appendChild(globeContainer);

// Create renderer and append to container
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha for transparency
renderer.setSize(300, 300); // Match the container size
globeContainer.appendChild(renderer.domElement);

// Set up the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio = 1 (square canvas)
camera.position.z = 5;

// Load texture for the globe (a black globe with dots)
const textureLoader = new THREE.TextureLoader();
const globeTexture = textureLoader.load('gEarth.png'); //image is here

// Create a sphere (globe)
const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshBasicMaterial({ map: globeTexture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005; // Slow rotation
    renderer.render(scene, camera);
}
animate();





const ctx = document.getElementById('networkTrafficChart').getContext('2d');

const trafficData = {
    labels: Array(10).fill(""),
    datasets: [{
        label: "Network Traffic (MB/s)",
        borderColor: "rgba(0, 255, 204, 0.2)", 
        borderWidth: 2,
        fill: false,
        data: Array(10).fill(0)
    }]
};

const trafficChart = new Chart(ctx, {
    type: 'line',
    data: trafficData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false, // Added this line
        scales: {
            x: {
                grid: {
                    color: "rgba(0, 255, 204, 0.2)",
                    lineWidth: 1,
                    borderDash: [5, 5]
                },
                ticks: { display: false }
            },
            y: {
                grid: {
                    color: "rgba(0, 255, 204, 0.2)",
                    lineWidth: 1,
                    borderDash: [5, 5]
                },
                ticks: { display: false }
            }
        },
        elements: {
            line: { tension: 0.3 },
            point: { radius: 0 }
        },
        plugins: {
            legend: { display: false }
        }
    }
});

// Function to update the graph with new data
function updateTraffic() {
    const newTrafficValue = (Math.random() * 100).toFixed(2); // Simulate random network data

    trafficData.datasets[0].data.shift(); // Remove first element
    trafficData.datasets[0].data.push(newTrafficValue); // Add new data

    trafficChart.update();
}

// Update traffic data every second
setInterval(updateTraffic, 1000);






// Initialize Chart.js graphs for CPU and Memory
const cpuCtx = document.getElementById("cpuChart").getContext("2d");
const memoryCtx = document.getElementById("memoryChart").getContext("2d");

const createChart = (ctx) => new Chart(ctx, {
    type: "line",
    data: {
        labels: Array(20).fill(""),
        datasets: [{
            label: "",
            data: Array(20).fill(0),
            borderColor: "#0f0",
            borderWidth: 1,
            fill: false,
            pointRadius: 0
        }]
    },
    options: {
        animation: false,
        scales: { x: { display: false }, y: { display: false } },
        plugins: { legend: { display: false } }
    }
});

const cpuChart = createChart(cpuCtx);
const memoryChart = createChart(memoryCtx);

// Simulated system stats (Replace with real data fetching)
function updateStats() {
    const cpuUsage = Math.random() * 100;
    const memoryUsage = Math.random() * 100;

    cpuChart.data.datasets[0].data.shift();
    cpuChart.data.datasets[0].data.push(cpuUsage);
    cpuChart.update();

    memoryChart.data.datasets[0].data.shift();
    memoryChart.data.datasets[0].data.push(memoryUsage);
    memoryChart.update();

    document.getElementById("uptime").textContent = "TIME: " + new Date().toLocaleTimeString();
}

// Simulate processes
function updateProcesses() {
    const processes = [
        { name: "electron", usage: Math.random() * 20 },
        { name: "Discord", usage: Math.random() * 15 },
        { name: "gnome-shell", usage: Math.random() * 10 }
    ];
    
    const processList = document.getElementById("process-list");
    processList.innerHTML = processes.map(p => `<li>${p.name} <span>${p.usage.toFixed(1)}%</span></li>`).join("");
}

setInterval(updateStats, 1000);
setInterval(updateProcesses, 3000);
