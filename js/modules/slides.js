function slides() {
  //slides
  const slides = document.querySelectorAll('.offer__slide'),
  next = document.querySelector('.offer__slider-next'),
  prev = document.querySelector('.offer__slider-prev'),
  total = document.querySelector('#total'),
  current = document.querySelector('#current');

let index = 1;
showSlide(index);

if (slides.length < 10) {
total.textContent = `0${slides.length}`;
} else {
total.textContent = slides.length;
}

function showSlide(n) {
if (n > slides.length) {
index = 1;
}

if (n < 1) {
index = slides.length;
}

slides.forEach(slide => slide.style.display = 'none');
slides[index-1].style.display = 'block';

if (index < 10) {
current.textContent = `0${index}`;
} else {
current.textContent = index;
}
}

function plusSlide(n) {
showSlide(index += n);
}

next.addEventListener('click', () => {
plusSlide(1);
});

prev.addEventListener('click', () => {
plusSlide(-1);
});
}

export default slides;