import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const LOCALE_STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const formData = { email: '', message: '' };

function initForm() {
  const data = JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY));

  refs.form.elements.email.value = data?.email || '';
  refs.form.elements.message.value = data?.message || '';
}

initForm();

refs.form.addEventListener('input', e => {
  formData.email = e.currentTarget.elements.email.value;
  formData.message = e.currentTarget.elements.message.value;
  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(formData));
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  if (!email || !message) {
    Toastify({
      text: 'Fill please all fields',
      duration: 3000,
      style: {
        background: 'tomato',
      },
    }).showToast();
    return;
  }

  Toastify({
    text: 'Submit is successfuly',
    duration: 3000,

    style: {
      background: '#6163dd',
    },
  }).showToast();

  console.log(formData);
  localStorage.removeItem(LOCALE_STORAGE_KEY);
  // formData.email = '';
  // formData.message = '';
  refs.form.reset();
});
