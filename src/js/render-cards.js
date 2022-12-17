export function renderCards(cards) {
  const markup = cards
    .map(
      card =>
        `<div class="photo-card">
     <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
            <b>Likes</b>
            ${card.likes}
        </p>
        <p class="info-item">
            <b>Views</b>
            ${card.views}
        </p>
        <p class="info-item">
            <b>Comments</b>
            ${card.comments}
        </p>
        <p class="info-item">
            <b>Downloads</b>
            ${card.downloads}
        </p>
    </div>
</div>`
    )
    .join(' ');
  // console.log(markup);
  return markup;
}
