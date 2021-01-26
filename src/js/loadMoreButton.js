const refs = {
  btnViewMoreRef: document.querySelector('button[data-action="load more"]'),
  labelViewMore: document.querySelector('.label.spinner'),
  spinerViewMore: document.querySelector('.spinner-border'),
};

export default {
  enable() {
    refs.btnViewMoreRef.disable = false;
    refs.labelViewMore.textContent = 'See more';
    refs.spinerViewMore.classList.add('is-hidden');
    refs.btnViewMoreRef.classList.remove('is-hidden');
  },

  disable() {
    refs.btnViewMoreRef.disable = true;
    refs.labelViewMore.textContent = 'Loading...';
    refs.spinerViewMore.classList.remove('is-hidden');
  },

  btnViewMoreOff() {
    refs.btnViewMoreRef.style.display = 'none';
  },
};
