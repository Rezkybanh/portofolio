// Inisialisasi canvas dan konteks
const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

// Atur ukuran canvas
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Atur titik-titik
const points = [];
const numPoints = 100;

// Fungsi untuk membuat titik dengan posisi dan kecepatan acak
function createPoint() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
    };
}

// Tambahkan titik-titik ke array
for (let i = 0; i < numPoints; i++) {
    points.push(createPoint());
}

// Fungsi untuk mengupdate posisi titik
function updatePoints() {
    points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        // Pantulkan titik jika mencapai tepi canvas
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
    });
}

// Fungsi untuk menggambar titik dan garis antar titik
function drawGalaxy() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar garis antara titik-titik yang berdekatan
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }
    }

    // Gambar titik-titik
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    });
}

// Loop animasi
function animateGalaxy() {
    updatePoints();
    drawGalaxy();
    requestAnimationFrame(animateGalaxy);
}
animateGalaxy();
