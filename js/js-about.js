// 获取支持按钮、消息元素和音频元素
const supportButton = document.getElementById('support-meikio');
const supportMessage = document.getElementById('message-meikio');
const supportSound = document.getElementById('support-sound');

// 为支持按钮添加点击事件监听器
supportButton.addEventListener('click', function () {
    // 播放音效
    supportSound.play();

    // 显示感谢消息
    supportMessage.textContent = '十分感谢您的支持';
    // 禁用按钮，防止重复点击
    this.disabled = true;
    this.style.backgroundColor = '#ccc';
    this.textContent = '已支持';

    // 添加一个短暂的缩放动画效果
    this.classList.add('animate-scale');
    setTimeout(() => {
        this.classList.remove('animate-scale');
    }, 300);

    // 透明度变化的过渡效果
    this.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        this.style.opacity = '0.6';
    }, 500);

    // 消息闪烁动画
    supportMessage.classList.add('animate-blink');
    setTimeout(() => {
        supportMessage.classList.remove('animate-blink');
    }, 2000);

    // 动态粒子效果
    createParticles(this);
});

// 定义缩放动画关键帧
const scaleStyle = document.createElement('style');
scaleStyle.textContent = `
.animate-scale {
    animation: scaleAnimation 0.3s ease;
}

@keyframes scaleAnimation {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
`;
document.head.appendChild(scaleStyle);

// 定义消息闪烁动画关键帧
const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
.animate-blink {
    animation: blinkAnimation 1s ease infinite;
}

@keyframes blinkAnimation {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
`;
document.head.appendChild(blinkStyle);

// 创建动态粒子效果的函数
function createParticles(button) {
    const numParticles = 10;
    const particleSize = 5;
    const buttonRect = button.getBoundingClientRect();

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${particleSize}px`;
        particle.style.height = `${particleSize}px`;
        particle.style.backgroundColor = '#007BFF';
        particle.style.position = 'absolute';
        particle.style.left = `${buttonRect.left + Math.random() * buttonRect.width - particleSize / 2}px`;
        particle.style.top = `${buttonRect.top + Math.random() * buttonRect.height - particleSize / 2}px`;
        document.body.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 50;
        const targetX = buttonRect.left + buttonRect.width / 2 + distance * Math.cos(angle);
        const targetY = buttonRect.top + buttonRect.height / 2 + distance * Math.sin(angle);

        particle.animate([
            { transform: `translate(0, 0)`, opacity: 1 },
            { transform: `translate(${targetX - buttonRect.left - buttonRect.width / 2}px, ${targetY - buttonRect.top - buttonRect.height / 2}px)`, opacity: 0 }
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

// 点击头像跳转到对话页面的函数
function openDialog(author) {
    window.location.href = 'dialog.html?author=' + author;
}
