import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '48830775-40ff68ea61f2bc47ba43ee541',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export function getImagesByQuery(query) {
  return instance
    .get('', { params: { q: query } })
    .then(res => res.data.hits)
    .catch(error => {
      throw error;
    });
}
