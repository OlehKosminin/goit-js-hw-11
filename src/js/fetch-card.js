import axios from 'axios';

export function fetchCard(name) {
  return axios
    .get(
      `https://pixabay.com/api/?key=31944414-e4d1ae47e500b71f7e7baa805&q=${name}&image_type=photo&orientation=horizontal&sefesearch=true`
    )
    .then(({ data }) => data);
}
