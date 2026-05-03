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

// ===== REAL MUSIC PLAYER =====
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

function setupPlayer(playerNum) {
    const audio = document.getElementById('audio' + playerNum);
    const playBtn = document.getElementById('playBtn' + playerNum);
    const icon = playBtn.querySelector('.play-icon');
    const progressFill = document.getElementById('progress' + playerNum);
    const progressBar = document.getElementById('progressBar' + playerNum);
    const timeDisplay = document.getElementById('time' + playerNum);
    const otherNum = playerNum === 1 ? 2 : 1;

    // Play / Pause
    playBtn.addEventListener('click', () => {
        const otherAudio = document.getElementById('audio' + otherNum);
        const otherIcon = document.getElementById('playBtn' + otherNum).querySelector('.play-icon');

        if (audio.paused) {
            // Pause the other player first
            if (!otherAudio.paused) {
                otherAudio.pause();
                otherIcon.textContent = '▶';
            }
            audio.play();
            icon.textContent = '⏸';
        } else {
            audio.pause();
            icon.textContent = '▶';
        }
    });

    // Update progress bar & time as audio plays
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const pct = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = pct + '%';
            timeDisplay.textContent = formatTime(audio.currentTime);
        }
    });

    // Click on progress bar to seek
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = clickX / rect.width;
        audio.currentTime = pct * audio.duration;
    });

    // When song ends, reset
    audio.addEventListener('ended', () => {
        icon.textContent = '▶';
        progressFill.style.width = '0%';
        timeDisplay.textContent = '0:00';
    });
}

setupPlayer(1);
setupPlayer(2);

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
