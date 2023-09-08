const carousel = document.querySelector('.carousel');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const itemWidth = document.querySelector('.carousel-item').offsetWidth + 10; // 10px for the gap (INVALID IF THE GAP IS CHANGED)

let currentIndex = 0;

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carousel.children.length;
    updateCarousel();
});

function updateCarousel() {
    const translateX = -currentIndex * itemWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
}
