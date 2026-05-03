// ===== FLOATING HEARTS =====
function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '♥', '💜'];
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 4) + 's';
        heart.style.animationDelay = (Math.random() * 6) + 's';
        container.appendChild(heart);
    }
}

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 4 + 2) + 's';
        p.style.animationDelay = (Math.random() * 4) + 's';
        container.appendChild(p);
    }
}

// ===== DAYS COUNTER =====
function updateDaysCounter() {
    // Set your relationship start date here
    const startDate = new Date('2025-11-21');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const counterEl = document.getElementById('daysCounter');
    let current = 0;
    const step = Math.max(1, Math.floor(diffDays / 60));
    const interval = setInterval(() => {
        current += step;
        if (current >= diffDays) {
            current = diffDays;
            clearInterval(interval);
        }
        counterEl.textContent = current;
    }, 30);
}

// ===== MUSIC PLAYER SIMULATION =====
document.querySelectorAll('.play-btn').forEach((btn, index) => {
    let playing = false;
    let progress = 0;
    let intervalId = null;

    btn.addEventListener('click', () => {
        playing = !playing;
        const icon = btn.querySelector('.play-icon');
        const progressBar = document.getElementById('progress' + (index + 1));

        if (playing) {
            icon.textContent = '⏸';
            intervalId = setInterval(() => {
                progress += 0.5;
                if (progress >= 100) { progress = 0; playing = false; icon.textContent = '▶'; clearInterval(intervalId); }
                progressBar.style.width = progress + '%';
            }, 200);
        } else {
            icon.textContent = '▶';
            clearInterval(intervalId);
        }
    });
});

// ===== SURPRISE MODAL =====
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseModal = document.getElementById('surpriseModal');
const closeModal = document.getElementById('closeModal');

function createFireworks() {
    const container = document.getElementById('fireworks');
    container.innerHTML = '';
    const colors = ['#ff69b4','#ff3c83','#ffb6c1','#ff85c0','#ffd700','#ff6b9d','#87ceeb'];
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'firework-particle';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = '50%';
        p.style.top = '50%';
        const angle = (Math.PI * 2 * i) / 40;
        const dist = Math.random() * 150 + 50;
        p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        p.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(p);
    }
}

surpriseBtn.addEventListener('click', () => {
    surpriseModal.classList.add('active');
    createFireworks();
});

closeModal.addEventListener('click', () => {
    surpriseModal.classList.remove('active');
});

surpriseModal.addEventListener('click', (e) => {
    if (e.target === surpriseModal) surpriseModal.classList.remove('active');
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.music-section, .gallery, .quote-section, .counter-section, .surprise-section, .love-message, .bottom-quote').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// ===== INIT =====
createFloatingHearts();
createParticles();
updateDaysCounter();
