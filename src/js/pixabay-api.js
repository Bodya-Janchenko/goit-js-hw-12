import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const perPage = 15;

export const getImagesByQuery = async (query, page = 1) => {
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

    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  }
};
