import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a');

export const createGallery = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="image-card">
      <a href="${largeImageURL}" target="_blank">
        <img src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="card-info">
        <span><strong>Likes</strong><br>${likes}</span>
        <span><strong>Views</strong><br>${views}</span>
        <span><strong>Comments</strong><br>${comments}</span>
        <span><strong>Downloads</strong><br>${downloads}</span>
      </div>
    </div>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const clearGallery = () => {
  galleryContainer.innerHTML = '';
};

const loader = document.querySelector('.loader');
export const showLoader = () => {
  loader.style.display = 'flex';
};
export const hideLoader = () => {
  loader.style.display = 'none';
};

export const loadMoreBtn = document.querySelector('.btn-load-more');
export const showLoadBtn = () => {
  loadMoreBtn.style.display = 'flex';
};
export const hideLoadBtn = () => {
  loadMoreBtn.style.display = 'none';
};
