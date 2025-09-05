import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
} from './js/render-functions';

const formNode = document.querySelector('.form');
const paginationBtn = document.getElementById('pagination');

let page = 1;
let input = '';
let currentScrollPosition = 0;

currentScrollPosition = formNode.getBoundingClientRect().height;

paginationBtn.addEventListener('click', () => {
  page += 1;
  drawGallery(input, page);

  let cardSize = document
    .querySelector('.gallery-card')
    .getBoundingClientRect();
  currentScrollPosition += 2 * cardSize.height;
  window.scrollBy({
    top: currentScrollPosition,
    left: 0,
    behavior: 'smooth',
  });
});

formNode.addEventListener('submit', evt => {
  evt.preventDefault();
  showLoader();
  clearGallery();
  page = 1;
  currentScrollPosition = formNode.getBoundingClientRect().bottom;
  const formData = new FormData(evt.currentTarget);
  input = formData.get('search-text');

  if (input.trim() === '') {
    iziToast.error({
      title: 'Hey!',
      message: 'Input is empty!',
      position: 'topRight',
    });
    setTimeout(hideLoader, 300);
    hideLoadMoreButton();
    return;
  }
  drawGallery(input, page);
  // evt.currentTarget.reset();
});

async function drawGallery(input, page) {
  const response = await getImagesByQuery(input, page);
  try {
    const totalPages = Math.ceil(
      response.data.totalHits / response.config.params.per_page
    );
    console.log(
      response.data.totalHits,
      '-->',
      response.config.params.per_page * page,
      page
    );
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Sorry!',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    }

    if (response.data.hits.length !== 0) {
      createGallery(response.data.hits);
    } else
      iziToast.info({
        title: 'Sorry!',
        message:
          'Sorry, there are no images matching your search query. Please try again!!',
        position: 'topRight',
      });
    setTimeout(hideLoader, 300);
  } catch (err) {
    setTimeout(hideLoader, 300);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
}
