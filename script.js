const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  menuButton.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const zoomImages = [...document.querySelectorAll('.zoomable')];
let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  const image = zoomImages[currentImageIndex];
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  const figure = image.closest('figure');
  const caption = figure?.querySelector('figcaption')?.textContent.trim();
  lightboxCaption.textContent = caption || image.alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImage.src = '';
}
function showImage(step) {
  const next = (currentImageIndex + step + zoomImages.length) % zoomImages.length;
  openLightbox(next);
}
zoomImages.forEach((image, index) => image.addEventListener('click', () => openLightbox(index)));
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', () => showImage(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => showImage(1));
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(-1);
  if (event.key === 'ArrowRight') showImage(1);
});

// Replace each PASTE_GOOGLE_DRIVE_LINK... value in index.html with its own shareable PDF link.
document.querySelectorAll('.document-card').forEach(card => {
  card.addEventListener('click', event => {
    if (card.getAttribute('href').startsWith('PASTE_GOOGLE_DRIVE_LINK_')) {
      event.preventDefault();
      alert('Bitte fügen Sie zuerst den passenden Google-Drive-Link für dieses Dokument in index.html ein.');
    }
  });
});
