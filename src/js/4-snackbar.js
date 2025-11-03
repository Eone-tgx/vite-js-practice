import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = +refs.form.elements.delay.value;
  const selectedState = refs.form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        timeout: 2000,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Alert',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 2000,
      });
    });

  refs.form.reset();
});
