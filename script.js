let slides = document.querySelectorAll(".slide");
let dotsContainer = document.querySelector(".dots");
let current = 0;
let slideTimer;

// Create dots
slides.forEach((_, index) => {
  let dot = document.createElement("span");
  dot.classList.add("dot");
  dot.onclick = () => showSlide(index);
  dotsContainer.appendChild(dot);
});

let dots = document.querySelectorAll(".dot");

function showSlide(index) {

  clearTimeout(slideTimer);

  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  current = index;

  let activeSlide = slides[index];
  let video = activeSlide.querySelector("video");

  if(video){
    video.currentTime = 0;
    video.play();

    video.onloadedmetadata = function(){
      let duration = Math.max(6000, video.duration * 1000);
      slideTimer = setTimeout(nextSlide, duration);
    };
  } else {
    slideTimer = setTimeout(nextSlide, 5000);
  }
}

function nextSlide(){
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide(){
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

showSlide(0);