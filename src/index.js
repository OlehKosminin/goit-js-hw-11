import { fetchCard } from './js/fetch-card';
import { renderCards } from './js/render-cards';
import Notiflix from 'notiflix';

// fetchCard('cat').then(cat => {
//   cat.hits.map(cat => {
//     console.log(cat.id);
//   });
// });

// fetchCard('cat').then(result => {
//   console.log(result);
//   result.hits.map(result => {
//     console.log(result.webformatURL);
//     console.log(result.largeImageURL);
//   });
// });

const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('[type="text"]'),
  buttonEl: document.querySelector('[type="submit"]'),
  galleryEl: document.querySelector('.gallery'),
};

refs.formEl.addEventListener('submit', onInput);

let searchCard = '';

function onInput(e) {
  e.preventDefault();

  searchCard = refs.inputEl.value.trim();
  console.log(searchCard);
}

fetchCard(searchCard)
  .then(resp => resp.hits)
  .then(card => {
    if (searchCard === '') {
      clearMarkup();
      return;
    }

    // const markup = renderCards(card);

    // refs.galleryEl.innerHTML('beforeend', markup);
    refs.galleryEl.insertAdjacentHTML('beforeend', renderCards(card));
  });

function clearMarkup() {
  refs.galleryEl.innerHTML = '';
}

function onError() {
  clearMarkup();
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
