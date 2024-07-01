let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.image-thumbnail');
    const totalSlides = slides.length;
    if (index >= totalSlides - 3) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    const newTransformValue = -currentIndex * 100 + 'px';
    document.querySelector('.image-list').style.transform = `translateY(${newTransformValue})`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}