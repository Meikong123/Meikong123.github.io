let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const slidesPerView = 4;
function showSlide() {
    const totalSlides = slides.length;
    
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }
    const offset = -slideIndex * (100 / slidesPerView);
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
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
