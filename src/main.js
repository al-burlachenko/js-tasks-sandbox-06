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
paginationBtn.addEventListener('click', () => {
  page += 1;
  console.log(input, page);
  drawGallery(input, page);
});

formNode.addEventListener('submit', evt => {
  evt.preventDefault();
  showLoader();
  clearGallery();
  page = 1;
  const formData = new FormData(evt.currentTarget);
  input = formData.get('search-text');

  if (input.trim() === '') {
    iziToast.error({
      title: 'Hey!',
      message: 'Input is empty!',
      position: 'topRight',
    });
    hideLoader();
    return;
  }
  drawGallery(input, page);
  evt.currentTarget.reset();
});

function drawGallery(input, page) {
  getImagesByQuery(input, page)
    .then(response => {
      // console.log(response);
      const totalPages = Math.ceil(
        response.data.total / response.config.params.per_page
      );
      if (page < totalPages) {
        showLoadMoreButton();
      } else hideLoadMoreButton();

      if (response.data.hits.length !== 0) {
        createGallery(response.data.hits);
      } else
        iziToast.info({
          title: 'Sorry!',
          message:
            'Sorry, there are no images matching your search query. Please try again!!',
          position: 'topRight',
        });
      hideLoader();
    })
    .catch(err => {
      hideLoader();
      console.log(err);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    });
}
