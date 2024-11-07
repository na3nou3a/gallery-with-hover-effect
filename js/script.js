// ========================= VARIABLES ==========================
const gallery = document.querySelector('.gallery');
const shadow = document.querySelector('.shadow');
const numOfImages = 16;
let isExtanded = false;
// ========================= EVENTS ==========================
gallery.addEventListener('mouseenter', addChange);
gallery.addEventListener('mouseleave', removeChange);
gallery.addEventListener('mousemove', handleMouseMoveEvent);
document.body.addEventListener('click', handleBodyClickEvent);
// ========================= FUNCTIONS ==========================
function createGallery() {
  for (let i = 0; i < numOfImages; i++) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'img-wrapper';
    const img = document.createElement('img');
    img.className = 'img';
    img.src = `images/img-${i + 1}.jpg`;
    img.addEventListener('click', extandImg);
    imageWrapper.appendChild(img);
    gallery.appendChild(imageWrapper);
  }
}
function addChange() {
  gallery.classList.add('change');
}
function removeChange() {
  gallery.classList.remove('change');
}
function handleMouseMoveEvent(e) {
  let top = e.clientY - gallery.getBoundingClientRect().top;
  let left = e.clientX - gallery.getBoundingClientRect().left;

  shadow.style.top = `${top}px`;
  shadow.style.left = `${left}px`;
}
function extandImg(e) {
  e.stopPropagation();
  const wrapper = document.querySelector('.gallery-wrapper');
  const bigImage = document.createElement('img');
  bigImage.className = 'big-img';
  bigImage.src = e.target.src;
  wrapper.appendChild(bigImage);

  const images = gallery.querySelectorAll('.img');
  images.forEach((img) => img.removeEventListener('click', extandImg));
  gallery.classList.add('low-opacity');
  gallery.removeEventListener('mouseenter', addChange);
  gallery.removeEventListener('mouseleave', removeChange);
  gallery.removeEventListener('mousemove', handleMouseMoveEvent);

  isExtanded = true;
}
function handleBodyClickEvent(e) {
  const bigImage = document.querySelector('.big-img');
  if (e.target !== bigImage && isExtanded) {
    const wrapper = document.querySelector('.gallery-wrapper');
    wrapper.removeChild(bigImage);

    const images = gallery.querySelectorAll('.img');
    images.forEach((img) => img.addEventListener('click', extandImg));
    gallery.classList.remove('low-opacity');
    gallery.addEventListener('mouseenter', addChange);
    gallery.addEventListener('mouseleave', removeChange);
    gallery.addEventListener('mousemove', handleMouseMoveEvent);

    isExtanded = false;
  }
}
// strat
createGallery();
