import { ApiServer } from './js/fetch-card';
import { renderCards } from './js/render-cards';
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

async function onInput(e) {
  e.preventDefault();

  fetchCard.searchName = refs.inputEl.value.trim();
  fetchCard.resetPage();
  clearMarkup();

  fetchCard.fetchApi().then(card => {
    console.log(card);

    if (card.length === 0) {
      onEnd();
      removeBtnStyle();
      return;
    }

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

    if (card.length > 0) {
      addBtnStyle();
      onSuccess();
    }

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

function onSuccess() {
  Notiflix.Notify.success('You found page!!');
}

function onEnd() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function onError() {
  removeBtnStyle();
  clearMarkup();
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
