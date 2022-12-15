import { ApiServer } from './js/fetch-card';
import { renderCards } from './js/render-cards';
import { renderButton } from './js/render-button';
import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('[type="text"]'),
  buttonEl: document.querySelector('[type="submit"]'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.formEl.addEventListener('submit', onInput);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const fetchCard = new ApiServer();

function onInput(e) {
  e.preventDefault();
  fetchCard.name = refs.inputEl.value.trim();

  clearMarkup();

  fetchCard.fetchApi().then(card => {
    console.log(card);

    if (card[0] === undefined) {
      onError();
      removeBtnStyle();
      return;
    }
    if (fetchCard.name === '') {
      onError();
      removeBtnStyle();
      return;
    }

    fetchCard.resetPage();
    refs.galleryEl.insertAdjacentHTML('beforeend', renderCards(card));
    addBtnStyle();
  });
}

function onLoadMore() {
  fetchCard.fetchApi().then(card => {
    refs.galleryEl.insertAdjacentHTML('beforeend', renderCards(card));
  });
}

function addBtnStyle() {
  refs.loadMoreBtn.style.display = 'block';
}

function removeBtnStyle() {
  refs.loadMoreBtn.style.display = 'none';
}

function clearMarkup() {
  refs.galleryEl.innerHTML = '';
}

function onError() {
  clearMarkup();
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
