document.addEventListener('DOMContentLoaded', () => {
    // --- Confetti on Load ---
    setTimeout(() => {
        fireConfetti();
    }, 500);

    // --- Generate Floating Background Elements ---
    const bgContainer = document.getElementById('floating-bg');
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.className = 'bg-shape';
        
        // Randomize size, position, and animation duration
        const size = Math.random() * 100 + 50;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${Math.random() * 100}vw`;
        shape.style.top = `${Math.random() * 100}vh`;
        shape.style.animationDuration = `${Math.random() * 10 + 10}s`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        
        bgContainer.appendChild(shape);
    }

    // --- Background Music Toggle ---
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    let isMusicPlaying = false;

    // Try setting volume lower so it's not too loud
    bgMusic.volume = 0.4;

    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicIcon.textContent = '🎵';
            musicBtn.innerHTML = '<span id="music-icon">🎵</span> Music Off';
        } else {
            // Browsers require interaction before playing audio
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            musicIcon.textContent = '🔊';
            musicBtn.innerHTML = '<span id="music-icon">🔊</span> Music On';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // --- Generate Cake Candles ---
    const candlesContainer = document.getElementById('candles');
    for (let i = 0; i < 10; i++) { // 10th birthday!
        const candle = document.createElement('div');
        candle.className = 'candle';
        
        const flame = document.createElement('div');
        flame.className = 'flame';
        
        candle.appendChild(flame);
        candlesContainer.appendChild(candle);
    }

    // --- Blow Out Candles ---
    const blowBtn = document.getElementById('blow-candles-btn');
    let candlesBlown = false;

    blowBtn.addEventListener('click', () => {
        if (candlesBlown) return;
        
        const flames = document.querySelectorAll('.flame');
        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.classList.add('out');
                
                // Add smoke effect
                const smoke = document.createElement('div');
                smoke.className = 'smoke';
                flame.parentElement.appendChild(smoke);
                
                // Remove smoke element after animation
                setTimeout(() => smoke.remove(), 2000);
            }, index * 100); // Stagger blowing out
        });
        
        candlesBlown = true;
        blowBtn.textContent = 'Yay! 🎂';
        blowBtn.disabled = true;
        blowBtn.style.opacity = '0.7';
        
        // Trigger small confetti
        setTimeout(() => fireConfetti({ particleCount: 50, spread: 60 }), 1000);
    });

    // --- Gift Box Logic ---
    const openGiftBtn = document.getElementById('open-gift-btn');
    const giftBox = document.getElementById('gift-box');
    const giftSurprise = document.getElementById('gift-surprise');

    openGiftBtn.addEventListener('click', () => {
        giftBox.classList.toggle('opened');
        giftSurprise.classList.remove('hidden');
        
        if (giftBox.classList.contains('opened')) {
            openGiftBtn.textContent = 'Close Gift 🎁';
            fireConfetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        } else {
            openGiftBtn.textContent = 'Open Your Gift 🎁';
            giftSurprise.classList.add('hidden');
        }
    });

    giftBox.addEventListener('click', () => {
        openGiftBtn.click();
    });

    // --- Make a Wish ---
    const wishInput = document.getElementById('wish-input');
    const makeWishBtn = document.getElementById('make-wish-btn');
    const wishDisplay = document.getElementById('wish-display');

    makeWishBtn.addEventListener('click', processWish);
    wishInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processWish();
    });

    function processWish() {
        const text = wishInput.value.trim();
        if (text) {
            wishDisplay.textContent = `✨ "${text}" ✨`;
            wishDisplay.classList.remove('hidden');
            wishDisplay.classList.remove('animate-pop');
            // Trigger reflow to restart animation
            void wishDisplay.offsetWidth;
            wishDisplay.classList.add('animate-pop');
            
            wishInput.value = '';
            
            // Little stars from the wish
            fireConfetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.8 },
                colors: ['#FFD700', '#ffffff'] // Gold and white
            });
        }
    }

    // --- Web Audio API for Pop Sound ---
    let audioCtx;
    function playPopSound() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    }

    // --- Balloons Logic ---
    const balloonsContainer = document.getElementById('balloons-container');
    const balloonColors = ['#ffb7b2', '#cbaacb', '#9dbad5', '#ffd1dc', '#fff0f5'];
    
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Randomize color
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.backgroundColor = color;
        // The bottom triangle needs border-bottom-color to match
        
        const styleId = `balloon-style-${Math.random().toString(36).substr(2, 9)}`;
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.innerHTML = `.${styleId}::after { border-bottom-color: ${color}; }`;
        document.head.appendChild(styleEl);
        balloon.classList.add(styleId);

        // Randomize horizontal position
        balloon.style.left = `${Math.random() * 90}vw`;
        
        // Randomize animation duration slightly
        balloon.style.animationDuration = `${Math.random() * 5 + 10}s`;

        // Create string
        const string = document.createElement('div');
        string.className = 'balloon-string';
        balloon.appendChild(string);

        // Add to DOM
        balloonsContainer.appendChild(balloon);

        // Remove element and style after animation
        balloon.addEventListener('animationend', () => {
            balloon.remove();
            styleEl.remove();
        });

        // Click to pop
        balloon.addEventListener('click', (e) => {
            playPopSound();
            
            // Pop effect
            confetti({
                particleCount: 15,
                spread: 40,
                origin: { 
                    x: e.clientX / window.innerWidth, 
                    y: e.clientY / window.innerHeight 
                },
                colors: [color],
                disableForReducedMotion: true
            });
            
            balloon.remove();
            styleEl.remove();
        });
    }

    // Spawn balloons periodically
    setInterval(createBalloon, 3000);
    // Initial balloons
    setTimeout(createBalloon, 500);
    setTimeout(createBalloon, 1500);

    // --- Secret Easter Egg ---
    const secretStar = document.getElementById('secret-star');
    secretStar.addEventListener('click', () => {
        // Massive fireworks
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    });

    // Helper for basic confetti
    function fireConfetti(options = {}) {
        const defaultOptions = {
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        };
        confetti(Object.assign({}, defaultOptions, options));
    }
});
