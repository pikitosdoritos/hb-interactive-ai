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

    // --- Background Music Logic ---
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    let isMusicPlaying = false;

    bgMusic.volume = 0.4;

    function updateMusicButtonState(playing) {
        isMusicPlaying = playing;
        if (playing) {
            musicBtn.innerHTML = '<span id="music-icon">🔊</span> Music On';
        } else {
            musicBtn.innerHTML = '<span id="music-icon">🎵</span> Music Off';
        }
    }

    // Try to autoplay via JS on load
    bgMusic.play().then(() => {
        updateMusicButtonState(true);
    }).catch((e) => {
        console.log("Autoplay blocked. Waiting for interaction.");
    });

    // Fallback: Start on first interaction anywhere on screen if not playing
    const startMusicFallback = () => {
        if (!isMusicPlaying) {
            bgMusic.play().then(() => updateMusicButtonState(true)).catch(e => console.log(e));
        }
    };
    
    window.addEventListener('click', startMusicFallback, { once: true });
    window.addEventListener('touchstart', startMusicFallback, { once: true });
    window.addEventListener('keydown', startMusicFallback, { once: true });

    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent triggering the body click above at the same time
        if (isMusicPlaying) {
            bgMusic.pause();
            updateMusicButtonState(false);
        } else {
            bgMusic.play().then(() => updateMusicButtonState(true)).catch(e => console.log("Audio play failed:", e));
        }
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

    // --- Magic Generator ---
    const generateBtn = document.getElementById('generate-btn');
    const generatorDisplay = document.getElementById('generator-display');

    const wishes = [
        "Нехай кожен день буде сповнений магії! ✨",
        "Ти здатна на неймовірні речі! 🌟",
        "Сьогодні твій день — насолоджуйся кожною миттю! 🎂",
        "Твоя усмішка робить світ світлішим! 💖",
        "Попереду в тебе стільки цікавих пригод! 🗺️",
        "Завжди вір у себе, бо ти — унікальна! 🌈",
        "Нехай твої мрії збуваються швидше, ніж ти їх загадуєш! 🚀",
        "Навколо тебе завжди відбуваються дива! 🦋"
    ];

    generateBtn.addEventListener('click', () => {
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        
        generatorDisplay.textContent = randomWish;
        generatorDisplay.classList.remove('hidden');
        generatorDisplay.classList.remove('animate-pop');
        // Trigger reflow to restart animation
        void generatorDisplay.offsetWidth;
        generatorDisplay.classList.add('animate-pop');
        
        // Little stars
        fireConfetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#cbaacb', '#ffb7b2', '#9dbad5', '#ffd700'] 
        });
    });

    // --- Personal Message Fireworks ---
    const personalMessage = document.getElementById('personal-message');
    let msgFireworksInterval;

    personalMessage.addEventListener('mouseenter', (e) => {
        // Only trigger if not already firing
        if (msgFireworksInterval) return;
        
        const duration = 2000;
        const end = Date.now() + duration;

        msgFireworksInterval = setInterval(() => {
            if (Date.now() > end) {
                clearInterval(msgFireworksInterval);
                msgFireworksInterval = null;
                return;
            }
            // Small bursts from the edges of the screen
            confetti({
                particleCount: 10,
                angle: 60,
                spread: 55,
                origin: { x: 0.2, y: 0.4 },
                colors: ['#ffb7b2', '#ffd700']
            });
            confetti({
                particleCount: 10,
                angle: 120,
                spread: 55,
                origin: { x: 0.8, y: 0.4 },
                colors: ['#cbaacb', '#9dbad5']
            });
        }, 200);
    });

    personalMessage.addEventListener('mouseleave', () => {
        if (msgFireworksInterval) {
            clearInterval(msgFireworksInterval);
            msgFireworksInterval = null;
        }
    });

    // --- Magical Mouse Trail ---
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.85) { // Throttle trail density
            const star = document.createElement('div');
            star.textContent = ['✨', '⭐', '💖', '🪄'][Math.floor(Math.random() * 4)];
            star.style.position = 'fixed';
            star.style.left = (e.clientX - 10) + 'px';
            star.style.top = (e.clientY - 10) + 'px';
            star.style.pointerEvents = 'none';
            star.style.fontSize = (Math.random() * 10 + 10) + 'px';
            star.style.opacity = '0.8';
            star.style.zIndex = '9999';
            star.style.transition = 'all 1s ease-out';
            document.body.appendChild(star);
            
            // Wait for next frame to trigger transition
            requestAnimationFrame(() => {
                star.style.transform = `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 + 25}px) scale(0)`;
                star.style.opacity = '0';
            });
            
            setTimeout(() => star.remove(), 1000);
        }
    });

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
