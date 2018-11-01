// var canvas = document.getElementById('canvas'); 
// var ctx = canvas.getContext('2d'); 
// window.ctx = ctx


// shim layer with setTimeout fallback 
// shim layer with setTimeout fallback 
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.getElementById('canvas');
var particles = [];
var tick = 0;
function loop() {
    window.requestAnimFrame(loop);
    createParticles();
    updateParticles();
    killParticles();
    drawParticles();
}
window.requestAnimFrame(loop);

function createParticles() {
    //check on every 10th tick check 
    if (tick % 10 == 0) {
        //add particle if fewer than 100 
        if (particles.length < 100) {
            particles.push({
                x: Math.random() * canvas.width, //between 0 and canvas width 
                y: 0,
                speed: 2 + Math.random() * 3, //between 2 and 5 
                radius: 5 + Math.random() * 5, //between 5 and 10 
                color: "white",
            });
        }
    }
}

function updateParticles() {
    for (var i in particles) {
        var part = particles[i];
        part.y += part.speed;
    }
}

function killParticles() {
    for (var i in particles) {
        var part = particles[i];
        if (part.y > canvas.height) {
            part.y = 0;
        }
    }
}

function drawParticles() {
    var c = canvas.getContext('2d');
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (var i in particles) {
        var part = particles[i];
        c.beginPath();
        c.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
        c.closePath();
        c.fillStyle = part.color;
        c.fill();
    }
} 