import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { showLoadBtn } from './render-functions';

let page = 1;
const perPage = 15;

export const resetPage = () => {
  page = 1;
};

export const getImagesByQuery = async query => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '50285738-1ed6c89d653294dbf28cfa2b7',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    const hits = response.data.hits;

    if (hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return [];
    }

    if (page > 1) {
      showLoadBtn();
    }

    page += 1;
    return hits;
  } catch (error) {
    console.log('The server did not return any images:', error);
    return [];
  }
};
