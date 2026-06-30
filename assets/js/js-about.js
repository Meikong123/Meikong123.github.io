const supportButton = document.getElementById('support-meikio');
const supportMessage = document.getElementById('message-meikio');
const supportSound = document.getElementById('support-sound');
const supportCountKey = 'meikongSupportCount';
const supportBaseCount = 76798;

function getSupportCount() {
    const storedCount = Number(localStorage.getItem(supportCountKey));
    return Number.isFinite(storedCount) && storedCount >= supportBaseCount ? storedCount : supportBaseCount;
}

function setSupportCount(count) {
    localStorage.setItem(supportCountKey, String(count));
}

function updateSupportMessage(text = '') {
    if (supportMessage) {
        supportMessage.textContent = text;
    }
}

function createParticles(button) {
    const numParticles = 10;
    const particleSize = 5;
    const buttonRect = button.getBoundingClientRect();

    for (let index = 0; index < numParticles; index += 1) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${particleSize}px`;
        particle.style.height = `${particleSize}px`;
        particle.style.backgroundColor = '#2f5fd0';
        particle.style.position = 'fixed';
        particle.style.left = `${buttonRect.left + Math.random() * buttonRect.width - particleSize / 2}px`;
        particle.style.top = `${buttonRect.top + Math.random() * buttonRect.height - particleSize / 2}px`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '3000';
        document.body.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const distance = 28 + Math.random() * 42;
        const targetX = distance * Math.cos(angle);
        const targetY = distance * Math.sin(angle);

        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${targetX}px, ${targetY}px)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out',
            fill: 'forwards'
        });

        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

if (supportButton && supportMessage) {
    updateSupportMessage();

    supportButton.addEventListener('click', function () {
        if (supportSound) {
            supportSound.play();
        }

        const nextCount = getSupportCount() + 1;
        setSupportCount(nextCount);
        updateSupportMessage(`十分感谢您的支持，这是第 ${nextCount} 份祝福`);

        this.disabled = true;
        this.textContent = '已支持';
        this.classList.add('animate-scale');

        setTimeout(() => {
            this.classList.remove('animate-scale');
        }, 300);

        setTimeout(() => {
            this.style.opacity = '0.72';
        }, 500);

        supportMessage.classList.add('animate-blink');
        setTimeout(() => {
            supportMessage.classList.remove('animate-blink');
        }, 2000);

        createParticles(this);
    });
}

const scaleStyle = document.createElement('style');
scaleStyle.textContent = `
.animate-scale {
    animation: scaleAnimation 0.3s ease;
}

@keyframes scaleAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.08); }
    100% { transform: scale(1); }
}
`;
document.head.appendChild(scaleStyle);

const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
.animate-blink {
    animation: blinkAnimation 1s ease infinite;
}

@keyframes blinkAnimation {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}
`;
document.head.appendChild(blinkStyle);

function openDialog(author) {
    window.location.href = `dialog.html?author=${author}`;
}
