import SimpleLightbox from 'simplelightbox';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
  overlayOpacity: 0.8,
  showCounter: false,
});

const refs = {
  galleryList: document.querySelector('.gallery'),
  loader: document.querySelector('#loader'),
};

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `<a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" />
        <div class="image-info">
          <p><strong>Likes:</strong> ${image.likes}</p>
          <p><strong>Views:</strong> ${image.views}</p>
          <p><strong>Comments:</strong> ${image.comments}</p>
          <p><strong>Downloads:</strong> ${image.downloads}</p>
        </div>
      </a>`;
    })
    .join('');

  refs.galleryList.innerHTML = markup;

  lightbox.refresh();
}

export function clearGallery() {
  refs.galleryList.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.remove('hidden');
}

export function hideLoader() {
  refs.loader.classList.add('hidden');
}
