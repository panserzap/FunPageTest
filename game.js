document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const container = document.querySelector('.button-container');
    const gameContainer = document.querySelector('.game-container');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    let yesBtnScale = 1; // Initial scale for the Yes button
    let noBtnScale = 1;  // Initial scale for the No button
    let shakeIntensity = 0.2; // Initial shake intensity

    noBtn.addEventListener('click', () => {
        const containerRect = container.getBoundingClientRect();
        const noBtnRect = noBtn.getBoundingClientRect();
        const scaledWidth = noBtnRect.width * noBtnScale;
        const scaledHeight = noBtnRect.height * noBtnScale;

        let newTop, newLeft;
        do {
            newTop = Math.random() * (containerRect.height - scaledHeight);
            newLeft = Math.random() * (containerRect.width - scaledWidth);
        } while (
            Math.abs(newTop - (noBtnRect.top - containerRect.top)) < 50 ||
            Math.abs(newLeft - (noBtnRect.left - containerRect.left)) < 50
        );

        // Ensure the button stays within the container bounds
        newTop = Math.max(0, Math.min(newTop, containerRect.height - scaledHeight));
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - scaledWidth));

        noBtn.style.top = `${newTop}px`;
        noBtn.style.left = `${newLeft}px`;

        // Make the No button slightly smaller
        noBtnScale -= 0.01;
        noBtn.style.transform = `scale(${noBtnScale})`;

        // Increase the size of the Yes button smoothly
        yesBtnScale += 0.1;
        yesBtn.style.transform = `scale(${yesBtnScale})`;

        // Add and remove animation class for smooth animation
        yesBtn.classList.add('animate-yes-btn');
        setTimeout(() => {
            yesBtn.classList.remove('animate-yes-btn');
        }, 500); // Duration of the animation

        // Lock buttons and start animations
        document.body.classList.add('locked-buttons');
        gameContainer.classList.add('shake');
        overlay.style.opacity = 1;

        // Increase shake intensity and duration
        shakeIntensity += 0.1;
        gameContainer.style.animationDuration = `${shakeIntensity}s`;
        document.body.style.animationDuration = `${shakeIntensity}s`;

        setTimeout(() => {
            gameContainer.classList.remove('shake');
            overlay.style.opacity = 0;
            document.body.classList.remove('locked-buttons');
        }, shakeIntensity * 1000); // Duration of the animation
    });

    yesBtn.addEventListener('mouseover', () => {
        yesBtn.style.backgroundColor = '#66bb6a';
    });

    yesBtn.addEventListener('mouseout', () => {
        yesBtn.style.backgroundColor = '#4CAF50';
    });

    yesBtn.addEventListener('click', () => {
        createConfetti();
        playCelebrationSound();
        hideButtonsAndText();
        showCelebrationMessage();
    });

    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.classList.add('confetti-container');
        document.body.appendChild(confettiContainer);

        const colors = ['#FF0D72', '#0DCFF5', '#0DFF72', '#F538FF', '#FF8E0D', '#FF3232'];
        const confettiCount = 300;
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;

            if (i % 4 === 0) {
                // Top confetti
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = `-10px`;
                confetti.style.animationName = 'confetti-fall-top';
            } else if (i % 4 === 1) {
                // Left confetti
                confetti.style.left = `-10px`;
                confetti.style.top = `${Math.random() * 100}%`;
                confetti.style.animationName = 'confetti-fall-left';
            } else if (i % 4 === 2) {
                // Right confetti
                confetti.style.right = `-10px`;
                confetti.style.top = `${Math.random() * 100}%`;
                confetti.style.animationName = 'confetti-fall-right';
            } else {
                // Bottom confetti
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.bottom = `-10px`;
                confetti.style.animationName = 'confetti-fall-bottom';
            }

            confettiContainer.appendChild(confetti);
        }
    }

    function playCelebrationSound() {
        const audio = new Audio('celebration.mp3');
        audio.play();
    }

    function hideButtonsAndText() {
        container.style.display = 'none';
        const heading = gameContainer.querySelector('h1');
        heading.style.display = 'none';
    }

    function showCelebrationMessage() {
        const hexMessage = "4920746f6c6420796120746861742043656c73697573206973206265747465722120446f20796f75206c696b652077696e653f"; // Hexadecimal message
        const message = document.createElement('div');
        message.classList.add('celebration-message');
        message.textContent = hexMessage;
        document.body.appendChild(message);
    }

    function hexToString(hex) {
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    }
});
