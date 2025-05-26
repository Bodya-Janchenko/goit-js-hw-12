import { getImagesByQuery, resetPage } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadBtn,
  hideLoadBtn,
  loadMoreBtn,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
let currentQuery = '';

form.addEventListener('submit', async e => {
  e.preventDefault();

  const searchValue = e.currentTarget.elements['search-text'].value.trim();
  if (!searchValue) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = searchValue;
  resetPage();
  clearGallery();
  hideLoadBtn();
  showLoader();

  try {
    const images = await getImagesByQuery(currentQuery);
    createGallery(images);
    if (images.length === 15) {
      showLoadBtn();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong while fetching images!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader();

  try {
    const images = await getImagesByQuery(currentQuery);
    createGallery(images);
    if (images.length < 15) {
      hideLoadBtn();
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
