import constData from './constData';
import pagination from './pagination';
import fetchApi from './services/apiService';
import getMovie from './showMovieList';
import interestsBtnRu from '../templates/header/interestsBtn.hbs';
import interestsBtnEn from '../templates/header/interestsBtnEn.hbs';
import main from './main';
import refs from './refs';
import getLanguage from './changeLanguage';
import message from '../templates/errorMessage.hbs';
import { getCurrentUser } from './getSetUserData';

function userFilmsList(e) {
  if (e.target.textContent === constData.username) {
    return;
  }
  refs.wrapperMenuRef.classList.toggle('menu__list--animate');
  refs.userAccount.classList.toggle('menu__open');
  refs.wrapperMenuRef.innerHTML = '';
  const currentInteres = e.currentTarget.dataset.status;

  fetchApi.setLocation(`#/${currentInteres}/1`);
}

function showTabs(languageRu, status) {
  const tabContainerRef = document.querySelector('.movie__interests__tab');
  if (tabContainerRef !== null) {
    tabContainerRef.remove();
  }

  const listMovies = document.querySelector('.main_list');
  if (languageRu) {
    listMovies.insertAdjacentHTML('afterbegin', interestsBtnRu());
  } else {
    listMovies.insertAdjacentHTML('afterbegin', interestsBtnEn());
  }

  const interestsBtns = document.querySelectorAll(
    '.movie__interests__tablinks',
  );

  interestsBtns.forEach(interestBtn =>
    interestBtn.addEventListener('click', choisenInterest),
  );

  interestsBtns.forEach(el => {
    el.classList.remove('tablinks__active');
    if (el.dataset.status === status) {
      el.classList.toggle('tablinks__active');
    }
    el.children.forEach(child => {
      child.classList.remove('icon_active');
      if (child.dataset.status === status) {
        child.classList.toggle('icon_active');
      }
    });
  });
}

function interestsInnit(status, page) {
  const allFIlms = constData.userData;
  let filterFilmsByStatus = [];
  if (allFIlms !== null) {
    filterFilmsByStatus = allFIlms.filter(el => el[status]);
  }

  const perPage = 20;
  const prevPage = page - 1;

  const filmsPerPage = filterFilmsByStatus.filter((index, el) => {
    return el < page * perPage && el >= prevPage * perPage;
  });

  const languageRu = getLanguage() === constData.Languages.RUSSIAN;

  const currentUserId = getCurrentUser();
  if (currentUserId !== null) {
    showTabs(languageRu, status);
  }

  const messageDiv = document.querySelector('.message');
  if (messageDiv !== undefined && messageDiv !== null) {
    messageDiv.remove();
  }

  if (filmsPerPage.length === 0) {
    main.hidePagination();
    refs.listMovies.innerHTML = '';
    refs.mainContainer.insertAdjacentHTML(
      'beforeend',
      message({
        message: languageRu
          ? 'Вы еще ничего не добавили'
          : 'You have not added anything yet',
      }),
    );
    return;
  }

  fetchApi.setQueryString(status);
  fetchApi.setPage(page);

  main.showPagination();
  pagination.setTotalItems(filterFilmsByStatus.length);
  pagination.reset();
  pagination.movePageTo(page);

  let filmsByLanguage;

  filmsByLanguage = filmsPerPage.map(el => {
    if (languageRu) {
      return {
        title: el.titleRu,
        poster_path: el.posterPathRu,
        vote_average: el.vote_average,
        watched: el.watched,
        watchedLater: el.watchedLater,
        release_date: el.release_date,
        id: el.id,
        favorites: el.favorites,
      };
    } else {
      return {
        title: el.titleEn,
        poster_path: el.posterPathEn,
        vote_average: el.vote_average,
        watched: el.watched,
        watchedLater: el.watchedLater,
        release_date: el.release_date,
        id: el.id,
        favorites: el.favorites,
      };
    }
  });

  getMovie(filmsByLanguage);

  main.changeUserInterests(filmsPerPage);
}

function choisenInterest(e) {
  e.preventDefault();

  const target = e.target;

  if (target.nodeName !== 'BUTTON' && target.nodeName !== 'I') {
    return;
  }

  const currentInteres = e.target.dataset.status;

  if (currentInteres === 'onMain') {
    fetchApi.setLocation(`#/`);
    return;
  }

  fetchApi.setLocation(`#/${currentInteres}/1`);
}

export default { userFilmsList, interestsInnit };
