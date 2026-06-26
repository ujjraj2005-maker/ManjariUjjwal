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

// ===== SURPRISE EXPERIENCE =====
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseOverlay = document.getElementById('surpriseOverlay');
const surpriseCloseBtn = document.getElementById('surpriseCloseBtn');
const phaseCollage = document.getElementById('phaseCollage');
const phaseBlessings = document.getElementById('phaseBlessings');
const blessingTriggerBtn = document.getElementById('blessingTriggerBtn');
const heartCollage = document.getElementById('heartCollage');

// Confetti burst effect
function createConfetti() {
    const container = document.getElementById('surpriseConfetti');
    container.innerHTML = '';
    const colors = ['#ff69b4','#ff3c83','#ffb6c1','#ffd700','#ff6b9d','#87ceeb','#ff85c0','#fff','#e91e8c','#f7a8d8'];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = Math.random() * 100 + '%';
        piece.style.width = (Math.random() * 6 + 5) + 'px';
        piece.style.height = (Math.random() * 8 + 8) + 'px';
        piece.style.animationDuration = (Math.random() * 2.5 + 2) + 's';
        piece.style.animationDelay = (Math.random() * 2) + 's';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        container.appendChild(piece);
    }
}

// Reveal heart collage cells one by one
function revealHeartCollage() {
    const cells = heartCollage.querySelectorAll('.hc-cell');
    cells.forEach((cell, i) => {
        setTimeout(() => {
            cell.classList.add('revealed');
        }, i * 120);
    });
    // Show "Tap for Blessings" after all cells revealed
    setTimeout(() => {
        blessingTriggerBtn.classList.add('visible');
    }, cells.length * 120 + 600);
}

// Reveal blessings one by one
function revealBlessings() {
    const title = phaseBlessings.querySelector('.blessings-title');
    const items = phaseBlessings.querySelectorAll('.blessing-item');
    const bear = phaseBlessings.querySelector('.blessing-bear');

    setTimeout(() => title.classList.add('revealed'), 300);

    items.forEach((item, i) => {
        setTimeout(() => {
            item.classList.add('revealed');
        }, 700 + i * 550);
    });

    // Show bear after all blessings
    setTimeout(() => {
        bear.classList.add('revealed');
    }, 700 + items.length * 550 + 400);

    // Show finale section (big heart + cute close button)
    const finale = phaseBlessings.querySelector('.finale-section');
    if (finale) {
        setTimeout(() => {
            finale.classList.add('revealed');
        }, 700 + items.length * 550 + 1200);
    }
}

// Reset all surprise states
function resetSurprise() {
    heartCollage.querySelectorAll('.hc-cell').forEach(c => c.classList.remove('revealed'));
    blessingTriggerBtn.classList.remove('visible');
    const bTitle = phaseBlessings.querySelector('.blessings-title');
    if (bTitle) bTitle.classList.remove('revealed');
    phaseBlessings.querySelectorAll('.blessing-item').forEach(b => b.classList.remove('revealed'));
    const bBear = phaseBlessings.querySelector('.blessing-bear');
    if (bBear) bBear.classList.remove('revealed');
    phaseCollage.classList.remove('active');
    phaseBlessings.classList.remove('active');
    const finale = phaseBlessings.querySelector('.finale-section');
    if (finale) finale.classList.remove('revealed');
    document.getElementById('surpriseConfetti').innerHTML = '';
}

// Open surprise
surpriseBtn.addEventListener('click', () => {
    surpriseOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    resetSurprise();
    phaseCollage.classList.add('active');
    createConfetti();
    setTimeout(revealHeartCollage, 700);
});

// Transition to blessings
blessingTriggerBtn.addEventListener('click', () => {
    phaseCollage.classList.remove('active');
    phaseBlessings.classList.add('active');
    surpriseOverlay.scrollTop = 0;
    createConfetti();
    revealBlessings();
});

// Close surprise
function closeSurprise() {
    surpriseOverlay.classList.remove('active');
    document.body.style.overflow = '';
    resetSurprise();
}

surpriseCloseBtn.addEventListener('click', closeSurprise);
const cuteCloseBtn = document.getElementById('cuteCloseBtn');
if (cuteCloseBtn) cuteCloseBtn.addEventListener('click', closeSurprise);
surpriseOverlay.addEventListener('click', (e) => {
    if (e.target === surpriseOverlay) closeSurprise();
});

// ===== SORRY MODAL =====
const sorryBtn = document.getElementById('sorryBtn');
const sorryOverlay = document.getElementById('sorryOverlay');
const sorryCloseBtn = document.getElementById('sorryCloseBtn');

sorryBtn.addEventListener('click', () => {
    sorryOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

sorryCloseBtn.addEventListener('click', () => {
    sorryOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

sorryOverlay.addEventListener('click', (e) => {
    if (e.target === sorryOverlay) {
        sorryOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
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
