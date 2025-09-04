import axios from 'axios';

const API_URL = 'https://pixabay.com';
const API_KEY = '22701944-f8f056c666d70ac6de5e1d35b';
// const API_KEY = 'test-wrong-key';

export default async function getImagesByQuery(query, page) {
  axios.defaults.baseURL = API_URL;
  // ['id', 'pageURL', 'type', 'tags', 'previewURL', 'previewWidth', 'previewHeight', 'webformatURL', 'webformatWidth',
  // 'webformatHeight', 'largeImageURL', 'imageWidth', 'imageHeight', 'imageSize', 'views', 'downloads', 'collections',
  // 'likes', 'comments', 'user_id', 'user', 'userImageURL', 'noAiTraining', 'isAiGenerated', 'isGRated', 'isLowQuality', 'userURL']
  try {
    const response = await axios.get('/api', {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        q: query,
        page: page,
        per_page: 15, //Accepted values: 3 - 200
      },
    });
    // console.log(response);
    //     data
    // hits: (20) [{…}, {…}, ...]
    // total: 10929
    // totalHits: 500
    return response;
  } catch {
    err => {
      throw err;
    };
  }
}
