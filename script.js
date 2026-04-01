
let startDate = new Date("2025-11-21");
let today = new Date();

let diffTime = today - startDate;
let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

document.getElementById("days").innerText = days + " days 💙";


let messages = [
    "Even though we are miles apart, my heart beats only for you ❤️",
    "I miss you every single day... 😢",
    "Distance can’t break what we have 💞",
    "You are always in my thoughts 🌙",
    "One day, no more distance... only us ❤️"
];

let msgIndex = 0;
let charIndex = 0;

function typeEffect() {
    let currentText = messages[msgIndex];

    if (charIndex < currentText.length) {
        document.getElementById("typing").innerHTML += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        
        setTimeout(() => {
            document.getElementById("typing").innerHTML = "";
            charIndex = 0;
            msgIndex = (msgIndex + 1) % messages.length;
            typeEffect();
        }, 2000);
    }
}

function startTyping() {
    document.getElementById("typing").innerHTML = "";
    charIndex = 0;
    typeEffect();
}

typeEffect();

function showMessage() {
    let messages = [
        "No matter the distance, I will always choose you ❤️",
        "You are my favorite notification 💌",
        "Distance means nothing when you mean everything 🌍❤️",
        "I miss you more every day 😢❤️",
        "Forever us, no matter how far 💫",
        "I Love You Januuuuuuuu😘😘😘😘😘"
    ];

    let randomIndex = Math.floor(Math.random() * messages.length);

    document.getElementById("surprise").innerText = messages[randomIndex];
}


// Generate hearts 
setInterval(createHeart, 300);


const emojis = ["❤️", "💖", "💘", "💞", "💕", "🥰", "😍", "💓", "🌸", "✨","😉","😗","😘","🤗","🤩","🫀"];

function createFloatingEmoji() {
    const container = document.querySelector(".floating-container");

    const emoji = document.createElement("div");
    emoji.classList.add("floating");

    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    
    emoji.style.left = Math.random() * 100 + "vw";

  
    emoji.style.fontSize = (20 + Math.random() * 30) + "px";

    
    emoji.style.animationDuration = (5 + Math.random() * 5) + "s";

    container.appendChild(emoji);

    
    setTimeout(() => {
        emoji.remove();
    }, 10000);
}


setInterval(createFloatingEmoji, 500);
