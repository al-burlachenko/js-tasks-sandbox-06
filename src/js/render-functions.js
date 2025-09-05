import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
const ul = document.querySelector('.gallery');
const paginationBtn = document.getElementById('pagination');

let gallery;

function waitForImagesToLoad(container) {
  const images = container.querySelectorAll('img');
  return Promise.all(
    Array.from(images).map(
      img =>
        new Promise(resolve => {
          if (img.complete)
            // true if the image has completely loaded; otherwise, the value is false
            resolve();
          else {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // don’t block if broken
          }
        })
    )
  );
}

async function createGallery(images) {
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
          <div class="img-wrap"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></div>
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

  await waitForImagesToLoad(ul);

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

function hideLoadMoreButton() {
  paginationBtn.classList.remove('visible');
}

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
};
