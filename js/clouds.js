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

    const parallaxLayers = [
        { zIndex: 1, speed: 0.07, parallaxFactor: 0.03, opacity: 0.7, sizeRange: [150, 250], topRange: [0, 40] }, // Back layer
        { zIndex: 2, speed: 0.1, parallaxFactor: 0.05, opacity: 0.9, sizeRange: [250, 300], topRange: [20, 80] }   // Foreground layer
    ];

    function createCloud(layerIndex) {
        const cloudEl = document.createElement('img');
        const layer = parallaxLayers[layerIndex];

        cloudEl.src = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        cloudEl.classList.add('cloud');
        cloudEl.style.position = 'absolute';
        cloudEl.style.top = `${Math.random() * (layer.topRange[1] - layer.topRange[0]) + layer.topRange[0]}vh`;
        cloudEl.style.left = `${Math.random() * 110 - 10}vw`;
        cloudEl.style.width = `${Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) + layer.sizeRange[0]}px`;
        cloudEl.style.zIndex = layer.zIndex;
        cloudEl.style.opacity = layer.opacity;
        cloudEl.style.imageRendering = 'pixelated';
        cloudContainer.appendChild(cloudEl);

        clouds.push({ el: cloudEl, speed: layer.speed, parallaxFactor: layer.parallaxFactor, initialLeft: parseFloat(cloudEl.style.left) });
    }

    // Create 5 clouds for the back layer (index 0)
    for (let i = 0; i < 5; i++) {
        createCloud(0);
    }

    // Create 2 clouds for the foreground layer (index 1)
    for (let i = 0; i < 3; i++) {
        createCloud(1);
    }

    function animateClouds() {
        clouds.forEach(cloud => {
            let currentLeft = parseFloat(cloud.el.style.left);
            currentLeft += cloud.speed * 0.1; // Move cloud based on its layer's speed

            if (currentLeft > 100) { // If cloud goes off-screen right, reset it to left
                const layer = parallaxLayers.find(l => l.zIndex === parseInt(cloud.el.style.zIndex)); // Find the layer properties
                currentLeft = -20 - Math.random() * 30; // Reset further left to avoid pop-in
                cloud.el.style.top = `${Math.random() * (layer.topRange[1] - layer.topRange[0]) + layer.topRange[0]}vh`;
                cloud.el.style.width = `${Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) + layer.sizeRange[0]}px`;
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
