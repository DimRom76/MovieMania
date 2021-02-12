import interestsMarkUp from '../templates/userInterests.hbs';

export function showInterests(data) {
  const interestsContainerLists = document.querySelectorAll(
    '.status__film__js',
  );

  interestsContainerLists.forEach(interestsContainer => {
    data.map(el => {
      if (Number(el.id) === Number(interestsContainer.dataset.container)) {
        interestsContainer.innerHTML = '';
        interestsContainer.insertAdjacentHTML('beforeend', interestsMarkUp(el));
      }
    });
  });
}

export function showInterestsOnCard(data) {
  const interestsContainerLists = document.querySelectorAll(
    '.status__film__js',
  );

  interestsContainerLists.forEach(interestsContainer => {
    if (Number(data.id) === Number(interestsContainer.dataset.container)) {
      interestsContainer.innerHTML = '';
      interestsContainer.insertAdjacentHTML('beforeend', interestsMarkUp(data));
    }
  });
}

export function clearInterests() {
  const data = {
    favorites: false,
    watched: false,
    watchedLater: false,
  };

  const interestsContainerLists = document.querySelectorAll(
    '.status__film__js',
  );

  interestsContainerLists.forEach(interestsContainer => {
    data.id = interestsContainer.dataset.container;

    interestsContainer.innerHTML = '';
    interestsContainer.insertAdjacentHTML('beforeend', interestsMarkUp(data));
  });
}

const interests = { showInterests, showInterestsOnCard, clearInterests };

export default interests;
