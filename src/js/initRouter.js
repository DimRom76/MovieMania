import Router from './router';
import main from './main';
import constData from './constData';
import showMovieCard from './showMovieCard';
import interests from './userFilmsByStatus';
import getLocalLanguage from './changeLanguage';
import inputChoice from './inputChoice';

const router = new Router({
  mode: 'hash',
  root: '/',
});

const mainList = document.querySelector('.main_list');
const mainCard = document.querySelector('.main_card');

function clearSearchString() {
  const searchString = document.querySelector('.search__string');
  searchString.value = '';

  const wrapper = document.querySelector('.search__genres');
  const select = wrapper.querySelector('select');
  const getChoicesRemove = wrapper.querySelectorAll('.selected-close');
  getChoicesRemove.forEach(el => inputChoice.removeTokemEl(el));
  const dropdown = wrapper.querySelector('.dropdown-icon');
  dropdown.classList.toggle('active');
  inputChoice.clearAutocompleteList(select);
  const input_search = wrapper.querySelector('.selected-input');
  const languageRu = getLocalLanguage() === constData.Languages.RUSSIAN;
  input_search.setAttribute(
    'placeholder',
    languageRu ? constData.placeholder.RU : constData.placeholder.EN,
  );

  const refs = {
    getByNameRef: document.querySelector('.search_films_name'),
    getByGenresRef: document.querySelector('.search_films_genres'),
    getByActorsRef: document.querySelector('.search_films_actors'),
    searchFilmsBy: document.querySelector('.search__films_by'),
    searchGenres: document.querySelector('.search__genres'),
    searchString: document.querySelector('.search__string'),
  };

  refs.searchFilmsBy.classList.remove('is-hidden');
  refs.searchGenres.classList.add('is-hidden');

  refs.getByNameRef.classList.add('active__search');
  refs.getByGenresRef.classList.remove('active__search');
  refs.getByActorsRef.classList.remove('active__search');

  refs.searchString.focus();
}

function hideCard() {
  mainCard.classList.add('is-hidden');
  mainList.classList.remove('is-hidden');
}

function showUserLists(queryString, page) {
  main.changeUserInterests(constData.userData);
  interests.interestsInnit(queryString, page);
}

router
  .add(/movie\/(.*)/, id => {
    mainList.classList.add('is-hidden');
    mainCard.classList.remove('is-hidden');
    showMovieCard(id);
  })
  .add(/query\/(.*)\/page\/(.*)/, (query, page) => {
    hideCard();
    main.mainInit(constData.queryString.BY_NAME, page, query);
  })
  .add(/actors\/(.*)\/page\/(.*)/, (query, page) => {
    hideCard();
    main.mainInit(constData.queryString.BY_ACTORS, page, query);
  })
  .add(/genres\/(.*)\/page\/(.*)/, (genre, page) => {
    hideCard();
    main.mainInit(constData.queryString.BY_GANRE, page, genre);
  })
  .add(/page\/(.*)/, page => {
    clearSearchString();
    hideCard();
    main.mainInit(constData.queryString.POPULAR, page);
  })
  .add(/favorites\/(.*)/, page => {
    clearSearchString();
    hideCard();
    showUserLists(constData.queryString.FAVORITES, page);
  })
  .add(/watched\/(.*)/, page => {
    clearSearchString();
    hideCard();
    showUserLists(constData.queryString.WATCHED, page);
  })
  .add(/watchedLater\/(.*)/, page => {
    clearSearchString();
    hideCard();
    showUserLists(constData.queryString.WATCHED_LATER, page);
  })
  .add('', () => {
    clearSearchString();
    hideCard();
    main.mainInit();
  });

constData.router = router;
