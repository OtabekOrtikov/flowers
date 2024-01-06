let slideIndex = 0;
showSlide();

function showSlide() {
    let i;
    let slides = document.querySelectorAll(".header-container__bg img");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlide, 6000);
}