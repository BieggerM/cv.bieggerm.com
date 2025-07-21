// js/clouds.js

document.addEventListener('DOMContentLoaded', () => {
    const cloudContainer = document.createElement('div');
    cloudContainer.id = 'cloud-container';
    document.body.prepend(cloudContainer);

    const cloudImages = [
        'media/static/clouds/cloud1.png',
        'media/static/clouds/cloud4.png',
        'media/static/clouds/cloud7.png',
        'media/static/clouds/cloud10.png',
        'media/static/clouds/cloud22.png'
    ];

    const clouds = [];

    function createCloud() {
        const cloudEl = document.createElement('img');
        cloudEl.src = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        cloudEl.classList.add('cloud');
        cloudEl.style.position = 'absolute';
        cloudEl.style.top = `${Math.random() * 60 + 10}vh`; // Random vertical position
        cloudEl.style.left = `${Math.random() * 110 - 10}vw`; // Start anywhere from -10vw to 100vw
        cloudEl.style.width = `${Math.random() * 150 + 75}px`; // Random size (toned down)
        cloudEl.style.zIndex = Math.floor(Math.random() * 2) + 1; // Different z-index for parallax layers (closer range)
        cloudEl.style.opacity = 0.8; 
        cloudEl.style.imageRendering = 'pixelated';
        cloudContainer.appendChild(cloudEl);

        const speed = (Math.random() * 0.05 + 0.01) * cloudEl.style.zIndex; 
        const parallaxFactor = (cloudEl.style.zIndex / 10) * 0.07; 

        clouds.push({ el: cloudEl, speed, parallaxFactor, initialLeft: parseFloat(cloudEl.style.left) });
    }

    // Create a few clouds initially
    for (let i = 0; i < 5; i++) {
        createCloud();
    }

    function animateClouds() {
        clouds.forEach(cloud => {
            let currentLeft = parseFloat(cloud.el.style.left);
            currentLeft += cloud.speed * 0.1; // Move cloud

            if (currentLeft > 100) { // If cloud goes off-screen right, reset it to left
                currentLeft = -20 - Math.random() * 30;
                cloud.el.style.top = `${Math.random() * 60 + 10}vh`;
                cloud.el.style.width = `${Math.random() * 100 + 50}px`;
                cloud.speed = (Math.random() * 0.5 + 0.1) * cloud.el.style.zIndex;
            }
            cloud.el.style.left = `${currentLeft}vw`;
        });
        requestAnimationFrame(animateClouds);
    }

    animateClouds();

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        clouds.forEach(cloud => {
            // Adjust vertical position based on scroll for parallax
            cloud.el.style.transform = `translateY(${-scrollY * cloud.parallaxFactor}px)`;
        });
    });
});
