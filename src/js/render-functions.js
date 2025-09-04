import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
const ul = document.querySelector('.gallery');
const paginationBtn = document.getElementById('pagination');

let gallery;
// paginationBtn.addEventListener('click', () => {});
function createGallery(images) {
  const galleryItems = images
    .map(element => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = element;
      return `<li class="gallery-card">
        <a class="img-link" href="${largeImageURL}">
          <div class="img-wrap"><img src="${webformatURL}" alt="${tags}" /></div>
             <ul class="gallery-item-stats">
                 <li class="gallery-item-stats-item">Likes <span>${likes}</span></li>
                 <li class="gallery-item-stats-item">Views <span>${views}</span></li>
                <li class="gallery-item-stats-item">Comments <span>${comments}</span></li>
                 <li class="gallery-item-stats-item">Downloads <span>${downloads}</span></li>
            </ul>
        </a>
    </li>`;
    })
    .join('');

  ul.insertAdjacentHTML('beforeend', galleryItems);

  if (!gallery) {
    gallery = new SimpleLightbox('.gallery a', {
      /* options */
    });
  }
  gallery.refresh();
}

function clearGallery() {
  if (ul) ul.innerHTML = '';
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoadMoreButton() {
  paginationBtn.classList.add('visible');
}
// Ця функція нічого не приймає, Нічого не повертає.
// повинна додавати клас для відображення
// кнопки Load more.
function hideLoadMoreButton() {
  paginationBtn.classList.remove('visible');
}
// Ця функція нічого не приймає, Нічого не повертає.
// повинна прибирати клас для відображення
// кнопки Load more.

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
};
