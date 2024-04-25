const slider = document.querySelector(".slider"),
firstImg = slider.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".fullSlider i");

let isDragStart = false,isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = slider.scrollWidth - slider.clientWidth;
    arrowIcons[0].style.display = slider.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = slider.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        slider.scrollLeft += icon.id =="left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons, 60)
    })
})

const autoSlide = () =>{
    if(slider.scrollLeft == (slider.scrollWidth - slider.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(slider.scrollLeft > prevScrollLeft){
        return slider.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    slider.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;


}
const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true
    slider.classList.add("dragging")
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false
    slider.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
    
}

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("touchstart", dragStart);

slider.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);

slider.addEventListener("mouseup", dragStop);
slider.addEventListener("mouseleave", dragStop);
slider.addEventListener("touchleave", dragStop);


document.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    const mainContent = document.querySelector("main");
    const testimonialContainer = document.querySelector(".testimonials-container");

    const mainContentHeight = mainContent.offsetHeight;
    const testimonialContainerTop = testimonialContainer.offsetTop;

    if (window.scrollY > mainContentHeight && window.scrollY < testimonialContainerTop) {
        // Between main content and testimonial container
        if (!header.classList.contains("scrolled")) {
            header.classList.add("scrolled");
        }
    } else if (window.scrollY <= mainContentHeight && header.classList.contains("scrolled")) {
        // Before or at main content
        header.classList.remove("scrolled");
    } else if (window.scrollY >= testimonialContainerTop && header.classList.contains("scrolled")) {
        // After testimonial container
        header.classList.remove("scrolled");
    }
});

