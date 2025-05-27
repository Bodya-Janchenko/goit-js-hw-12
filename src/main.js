import { getImagesByQuery } from './js/pixabay-api.js';
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
let currentPage;

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
  currentPage = 1;

  clearGallery();
  hideLoadBtn();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );

    if (hits.length === 0) {
      iziToast.info({
        message: 'No images found for your query.',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
    const imageEl = document.querySelector('.image-card');
    if (imageEl) {
      const rect = imageEl.getBoundingClientRect();
      const scrollOffset = rect.height * 2;

      window.scrollBy({
        top: scrollOffset,
        behavior: 'smooth',
      });
    }

    if (document.querySelectorAll('.image-card').length < totalHits) {
      showLoadBtn();
    } else {
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to fetch images!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader();

  try {
    currentPage += 1;
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );

    createGallery(hits);
    const imageEl = document.querySelector('.image-card');
    if (imageEl) {
      const rect = imageEl.getBoundingClientRect();
      const scrollOffset = rect.height * 2;

      window.scrollBy({
        top: scrollOffset,
        behavior: 'smooth',
      });
    }

    const totalShown = document.querySelectorAll('.image-card').length;
    if (totalShown >= totalHits) {
      hideLoadBtn();
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
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
