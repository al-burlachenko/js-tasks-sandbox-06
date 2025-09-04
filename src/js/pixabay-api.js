import axios from 'axios';

const API_URL = 'https://pixabay.com';
const API_KEY = '22701944-f8f056c666d70ac6de5e1d35b';

export default function getImagesByQuery(query) {
  axios.defaults.baseURL = API_URL;
  return axios
    .get('/api', {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        q: query,
      },
    })
    .then(response => {
      // console.log(response);
      return response.data;
    })
    .catch(err => {
      throw err;
    });
}
