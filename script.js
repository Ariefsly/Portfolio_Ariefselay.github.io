// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll sections active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Remove toggle icon and navbar when click navbar link
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Typed js animation
const typed = new Typed('.multiple-text', {
    strings: ['UI/UX Designer', 'Frontend Developer'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1000,
    loop: true
});

// Smoke cursor effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9999';
document.body.appendChild(canvas);

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const particles = [];
let mouse = { x: -100, y: -100 };

function createParticles(x, y) {
    for (let i = 0; i < 3; i++) { // Menambah jumlah partikel per gerakan
        particles.push(new Particle(x, y));
    }
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    createParticles(mouse.x, mouse.y);
});

window.addEventListener('touchmove', (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    createParticles(mouse.x, mouse.y);
}, { passive: true });

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 5; // Ukuran bervariasi
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 1) * 2; // Bergerak ke atas lebih dinamis
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;

        // Campuran dua warna (indigo dan cyan) untuk efek keren
        this.color = Math.random() > 0.5 ? 'rgba(79, 70, 229, ' : 'rgba(14, 165, 233, ';
        this.waveAngle = Math.random() * Math.PI * 2;
    }
    update() {
        // Efek meliuk-liuk (gelombang organik)
        this.x += this.speedX + Math.sin(this.waveAngle) * 0.5;
        this.y += this.speedY;
        this.waveAngle += 0.1;

        this.size += 0.3; // Membesar perlahan seperti asap sungguhan
        this.life -= this.decay;
    }
    draw() {
        if (this.life <= 0) return;

        ctx.globalAlpha = this.life * 0.15; // Opacity diturunkan drastis agar sangat tipis dan samar
        ctx.globalCompositeOperation = 'lighter'; // Efek glowing dipertahankan tapi lebih halus

        let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, this.color + '0.5)'); // Intensitas warna di pusat partikel juga dikurangi
        gradient.addColorStop(0.5, this.color + '0.2)');
        gradient.addColorStop(1, this.color + '0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = 'source-over'; // Kembalikan efek blending ke standar
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();

// =====================================
// Scroll Reveal — Intersection Observer
// =====================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Hanya trigger sekali (tidak hilang lagi saat scroll naik)
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,       // Muncul saat 12% elemen terlihat
    rootMargin: '0px 0px -40px 0px'  // Offset sedikit dari bawah viewport
});

revealElements.forEach(el => revealObserver.observe(el));

// =====================================
// Projects Slider Navigation
// =====================================
const slider = document.getElementById('projects-slider');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');

if (slider && prevBtn && nextBtn) {
    const scrollAmount = 350; // Width of card + gap (320px + 30px = 350px)
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Hide/Show arrow buttons based on scroll position for premium feel
    const toggleButtons = () => {
        const isScrollable = slider.scrollWidth > slider.clientWidth;
        if (!isScrollable) {
            prevBtn.style.opacity = '0';
            prevBtn.style.pointerEvents = 'none';
            nextBtn.style.opacity = '0';
            nextBtn.style.pointerEvents = 'none';
            return;
        }
        
        if (slider.scrollLeft > 10) {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        } else {
            prevBtn.style.opacity = '0';
            prevBtn.style.pointerEvents = 'none';
        }
        
        const isAtEnd = Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth - 10;
        if (isAtEnd) {
            nextBtn.style.opacity = '0';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    };
    
    slider.addEventListener('scroll', toggleButtons);
    window.addEventListener('resize', toggleButtons);
    
    // Initial check (using setTimeout to ensure DOM is fully laid out)
    setTimeout(toggleButtons, 200);
}
