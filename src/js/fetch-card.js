import axios from 'axios';

export class ApiServer {
  constructor() {
    this.searchName = '';
    this.page = 1;
    this.per_page = 20;
  }
  fetchApi() {
    return axios
      .get(
        `https://pixabay.com/api/?key=31944414-e4d1ae47e500b71f7e7baa805&q=${this.searchName}&image_type=photo&orientation=horizontal&sefesearch=true&page=${this.page}&per_page=${this.per_page}`
      )
      .then(({ data }) => {
        this.incrementPages();
        console.log(this);
        return data.hits;
      });
  }

  incrementPages() {
    this.page += 1;
    this.per_page = 40;
  }

  resetPage() {
    this.page = 1;
    this.per_page = 20;
  }

  get name() {
    return this.searchName;
  }
  set name(newName) {
    this.searchName = newName;
  }
}
