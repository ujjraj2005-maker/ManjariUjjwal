// ===== FLOATING HEARTS =====
function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    if (!container) return;
    const hearts = ['❤️', '💕', '💙', '💖', '🩵', '💗', '💜', '✨'];
    for (let i = 0; i < 26; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 18 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.animationDelay = (Math.random() * 6) + 's';
        container.appendChild(heart);
    }
}

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const particleColors = [
        'rgba(125, 211, 252, 0.75)',  // Cyan/sky
        'rgba(192, 132, 252, 0.75)',  // Purple/amethyst
        'rgba(244, 114, 182, 0.75)',  // Rose/pink
        'rgba(255, 255, 255, 0.85)'   // Starlight white
    ];
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.background = particleColors[Math.floor(Math.random() * particleColors.length)];
        p.style.boxShadow = `0 0 6px ${p.style.background}`;
        p.style.animationDuration = (Math.random() * 4 + 2) + 's';
        p.style.animationDelay = (Math.random() * 4) + 's';
        container.appendChild(p);
    }
}

// ===== DAYS & TIME COUNTER (LIVE TICKER) =====
function updateDaysCounter() {
    const startDate = new Date(2025, 10, 21, 0, 0, 0); // Nov 21, 2025
    const daysEl = document.getElementById('daysCounter');
    const hoursEl = document.getElementById('hoursCounter');
    const minsEl = document.getElementById('minutesCounter');
    const secsEl = document.getElementById('secondsCounter');

    if (!daysEl) return;

    function renderTime() {
        const now = new Date();
        const diffMs = Math.max(0, now - startDate);

        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    renderTime();
    setInterval(renderTime, 1000);
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

// Photo Collections for Heart Collage
const priorityPhotos = [
    '20260831_113931.jpg',
    '20260831_113939.jpg',
    '20260831_115021.jpg',
    '20260831_115034.jpg',
    '20260831_120546.jpg',
    '20260831_120622.jpg',
    '20260831_131042.jpg',
    '20260831_143454.jpg',
    'WhatsApp Image 2026-03-30 at 09.39.43.jpeg',
    'WhatsApp Image 2026-04-09 at 22.04.15.jpeg',
    'WhatsApp Image 2026-09-02 at 17.19.19.jpeg'
];

const poolPhotos = [
    's1.jpeg', 's2.jpeg', 's3.jpeg', 's4.jpeg', 's5.jpeg',
    's6.jpeg', 's7.jpeg', 's8.jpeg', 's9.jpeg', 's10.jpeg', 's11.jpeg',
    'S10.jpg', 'S11.jpg', 'S12.jpg', 'S13.jpg', 'S14.jpg', 'S16.jpg', 'S17.jpg',
    'A1.jpg', 'A2.jpg', 'A3.jpg', 'A4.jpg', 'A5.jpg', 'A6.jpg', 'A7.jpg', 'A8.jpg', 'A9.jpg', 'A10.jpg',
    '01.jpg', '02.jpg', '1.jpeg', '2.jpeg', '3.jpeg'
];

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function randomizeHeartCollage() {
    if (!heartCollage) return;
    const cells = heartCollage.querySelectorAll('.hc-cell img');
    if (!cells.length) return;

    // Guarantee all priority photos are included, then fill the remaining slots with random photos from the pool
    const neededFromPool = Math.max(0, cells.length - priorityPhotos.length);
    const randomPoolPicks = shuffleArray(poolPhotos).slice(0, neededFromPool);
    const combinedPhotos = shuffleArray([...priorityPhotos, ...randomPoolPicks]);

    cells.forEach((img, i) => {
        if (combinedPhotos[i]) {
            img.src = combinedPhotos[i];
        }
    });
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
    randomizeHeartCollage();
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

// ===== FANTASTIC SORRY & FORGIVENESS EXPERIENCE =====
const sorryBtn = document.getElementById('sorryBtn');
const sorryOverlay = document.getElementById('sorryOverlay');
const sorryCloseBtn = document.getElementById('sorryCloseBtn');
const sorryContent = document.getElementById('sorryContent');
const sorrySuccess = document.getElementById('sorrySuccess');
const forgiveYesBtn = document.getElementById('forgiveYesBtn');
const forgiveNoBtn = document.getElementById('forgiveNoBtn');
const virtualHugBtn = document.getElementById('virtualHugBtn');
const hugEffect = document.getElementById('hugEffect');
const successCloseBtn = document.getElementById('successCloseBtn');

if (sorryBtn && sorryOverlay) {
    let noClickCount = 0;
    const noButtonTexts = [
        "<span>🥺</span> Aise gussa mat raho na meri jaan...",
        "<span>🍫</span> Ek badi wali chocolate pakka dunga!",
        "<span>🍦</span> Aur sath me favourite ice cream treat bhi!",
        "<span>🧸😭</span> Dekho hamara teddy bear bhi rone laga...",
        "<span>🙏</span> Dono kaan pakad ke uth-baith karunga, pakka!",
        "<span>🥺👉👈</span> Tumhare bina Ujjwal ka bilkul man nahi lagta...",
        "<span>🍕</span> Pizza date aur endless pampering pakki!",
        "<span>🥺❤️</span> Sach me itna gussa ho apne Ujjwal se?",
        "<span>🤗</span> Ek pyara sa tight warm hug le lo na please...",
        "<span>✨</span> Gussa chhod do na Madam, smile me sabse pyari lagti ho!",
        "<span>👀</span> Bas ek choti si cute smile de do na?",
        "<span>💌</span> Dekho kitna pyara letter likha hai tumhare liye!",
        "<span>😘</span> Ab toh maan jao na meri pyari jaan",
        "<span>🥰</span> Pata hai na Ujjwal sabse zyada aapse hi pyaar karta hai?",
        "<span>🧸💕</span> Bas ab aur nakhre nahi, maan jao na pleaseee!",
        "<span>🥰</span> Okay fine, ab I forgive you! ❤️",

        "<span>🥺</span> Please na, ab toh gussa chhod do...",
        "<span>❤️</span> Tum naraz hoti ho toh mujhe bilkul achha nahi lagta.",
        "<span>🌸</span> Ek baar smile kar do na, sab theek ho jayega.",
        "<span>🫶</span> Bas ek baar meri baat maan jao please.",
        "<span>🥹</span> Itna bhi kya gussa, apne Ujjwal ko maaf kar do na.",
        "<span>🍫</span> Sorry ke saath chocolate bhi milegi, pakka!",
        "<span>🥺❤️</span> Tumhari smile dekhne ke liye kuch bhi kar lunga.",
        "<span>💗</span> Tum meri favourite ho, isliye mana raha hoon itna.",
        "<span>😚</span> Ab ek baar 'theek hai' bol do na please."
    ];

    function createSorryConfetti() {
        const container = document.getElementById('sorryConfetti');
        if (!container) return;
        container.innerHTML = '';
        const colors = ['#ec4899', '#f43f5e', '#a855f7', '#ffd1dc', '#ff69b4', '#fff', '#fb7185'];
        for (let i = 0; i < 90; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.left = Math.random() * 100 + '%';
            piece.style.width = (Math.random() * 7 + 5) + 'px';
            piece.style.height = (Math.random() * 9 + 8) + 'px';
            piece.style.animationDuration = (Math.random() * 2.5 + 2) + 's';
            piece.style.animationDelay = (Math.random() * 1.5) + 's';
            piece.style.borderRadius = Math.random() > 0.4 ? '50%' : '3px';
            container.appendChild(piece);
        }
    }

    function resetSorryModal() {
        noClickCount = 0;
        if (forgiveNoBtn) {
            forgiveNoBtn.innerHTML = "<span>😤</span> No, still angry";
            forgiveNoBtn.style.transform = 'translate(0, 0)';
            forgiveNoBtn.style.background = '';
            forgiveNoBtn.style.borderColor = '';
        }
        if (sorryContent) sorryContent.style.display = 'block';
        if (sorrySuccess) sorrySuccess.style.display = 'none';
        const confetti = document.getElementById('sorryConfetti');
        if (confetti) confetti.innerHTML = '';
    }

    // Open Sorry Modal
    sorryBtn.addEventListener('click', () => {
        resetSorryModal();
        sorryOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close Modal
    function closeSorryModal() {
        sorryOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (hugEffect) hugEffect.classList.remove('active');
        resetSorryModal();
    }

    if (sorryCloseBtn) sorryCloseBtn.addEventListener('click', closeSorryModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeSorryModal);

    sorryOverlay.addEventListener('click', (e) => {
        if (e.target === sorryOverlay) closeSorryModal();
    });

    // Forgive Yes Action
    function triggerForgiveness() {
        if (sorryContent) sorryContent.style.display = 'none';
        if (sorrySuccess) sorrySuccess.style.display = 'block';
        createSorryConfetti();
    }

    if (forgiveYesBtn) {
        forgiveYesBtn.addEventListener('click', triggerForgiveness);
    }

    // Playful Runaway No Button Action
    if (forgiveNoBtn) {
        forgiveNoBtn.addEventListener('click', () => {
            if (noClickCount < noButtonTexts.length - 1) {
                forgiveNoBtn.innerHTML = noButtonTexts[noClickCount];
                noClickCount++;

                // Cute random dodge wiggle
                const randomX = (Math.random() - 0.5) * 40;
                const randomY = (Math.random() - 0.5) * 20;
                forgiveNoBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.96)`;
                forgiveNoBtn.style.background = 'rgba(236, 72, 153, 0.2)';
                forgiveNoBtn.style.borderColor = 'rgba(236, 72, 153, 0.5)';
            } else {
                // Final stage: turns into forgiveness
                triggerForgiveness();
            }
        });
    }

    // Virtual Hug Action
    if (virtualHugBtn && hugEffect) {
        virtualHugBtn.addEventListener('click', () => {
            hugEffect.classList.add('active');
            createSorryConfetti();
            setTimeout(() => {
                hugEffect.classList.remove('active');
            }, 3600);
        });

        hugEffect.addEventListener('click', () => {
            hugEffect.classList.remove('active');
        });
    }
}

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



// ===== TYPEWRITER EFFECT =====
function setupTypewriter() {
    const el = document.getElementById('typewriterText');
    if (!el) return;

    const quotes = [
        "Even though we are miles apart,\nmy heart beats only for you ❤️",
        "Every love song on this page\nreminds me of your beautiful smile 🥰",
        "You are my today, my tomorrow,\nand my forever 💫",
        "No distance can ever change\nhow deeply I love you 🌸",
        "Forever and always grateful\nto have you in my life, Janu 💕"
    ];

    let quoteIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 65;

    function type() {
        const currentQuote = quotes[quoteIndex];

        if (isDeleting) {
            charIndex--;
            typingSpeed = 35;
        } else {
            charIndex++;
            typingSpeed = 65;
        }

        const displayText = currentQuote.substring(0, charIndex).replace(/\n/g, '<br>');
        el.innerHTML = displayText;

        if (!isDeleting && charIndex === currentQuote.length) {
            typingSpeed = 2800; // Pause to read
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            quoteIndex = (quoteIndex + 1) % quotes.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1200);
}

// ===== INIT =====
createFloatingHearts();
createParticles();
updateDaysCounter();
randomizeHeartCollage();
setupTypewriter();
