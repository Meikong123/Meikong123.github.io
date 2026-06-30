let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');

function getSlidesPerView() {
    if (window.innerWidth <= 560) {
        return 1;
    }

    if (window.innerWidth <= 900) {
        return 2;
    }

    return 4;
}

function showSlide() {
    if (!slider || slides.length === 0) {
        return;
    }

    const totalSlides = slides.length;
    const slidesPerView = getSlidesPerView();
    const maxSlideIndex = Math.max(totalSlides - slidesPerView, 0);

    if (slideIndex > maxSlideIndex) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = maxSlideIndex;
    }

    const offset = -slideIndex * (100 / slidesPerView);
    slider.style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
    slideIndex--;
    showSlide();
}

function nextSlide() {
    slideIndex++;
    showSlide();
}

showSlide();
window.addEventListener('resize', showSlide);
