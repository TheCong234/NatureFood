
// carousel
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const newTransformValue = -currentIndex * 100 + '%';
    document.querySelector('.carousel').style.transform = `translateX(${newTransformValue})`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// category list
let categoryIndex = 0;
let newPosition = 0;

function transformCategory(index){
    const list = document.querySelector('.category-list');
    const category = document.querySelector('.category');

    categoryIndex += index;
    newPosition = categoryIndex * 300 + 'px';

    const rect = list.getBoundingClientRect();
    const parentWidth = category.offsetWidth;
    
    if(index === 1 && rect.left > 79){
        newPosition = 0;
        categoryIndex = 0;
    }
    if(index === -1 && rect.right <= parentWidth){
        categoryIndex -= index;
        newPosition = categoryIndex * 300 + 'px';
    }

    list.style.transform = `translateX(${newPosition})`;
    
}

function nextCategory(){
    transformCategory(-1);
}

function prevCategory(){
    transformCategory(1);
}