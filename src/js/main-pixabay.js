import { getImagesByQuery } from './pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.pixabay-form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  clearGallery();

  const query = e.target.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Alert',
      message: 'Enter text',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  showLoader();

  getImagesByQuery(query)
    .then(response => {
      hideLoader();

      if (response.length === 0) {
        iziToast.error({
          title: 'Sorry',
          message: 'Nothing was found',
          position: 'topRight',
          timeout: 3000,
        });
        return;
      }

      iziToast.success({
        title: 'Success',
        message: `Successfully searched images of ${query}`,
        position: 'topRight',
        timeout: 3000,
      });

      createGallery(response);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error.message,
        position: 'topRight',
        timeout: 3000,
      });
    });

  e.target.reset();
});
