import fetchApi from './services/apiService';

import message from '../templates/errorMessage.hbs';
import pageLoader from '../templates/pageLoader.hbs';
import team from '../templates/team.hbs';

import getLocalLanguage from './changeLanguage';
import constData from './constData';
import pagination from './pagination';
import showMovie from './showMovieList';
import showModal from './showModal';
import { getStatusMovieById } from './getSetUserData';
import interests from './showUserInterest';
import modalShow from './showModal';

import noPosterImg from '../images/no-movie.jpg';

import baevers from '../images/3_beavers.jpg';
import dagget from '../images/Daggett.png';
import norb from '../images/Norb.jpg';
import treeflower from '../images/treeflower.jpg';

import refs from './refs';

refs.paginationRef.addEventListener('click', onPaginationsBtnClick);
refs.footerTeam.addEventListener('click', onTeamClick);

let instance = '';

function onTeamClick() {
  modalShow(team({ baevers, dagget, norb, treeflower }));
}

function onPaginationsBtnClick() {
  const currentPage = pagination.getCurrentPage();
  fetchApi.setPage(currentPage);
  const queryString = fetchApi.getQueryString();
  const param = fetchApi.getParam();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  switch (queryString) {
    case constData.queryString.BY_NAME:
      fetchApi.setLocation(`#/query/${param}/page/${currentPage}`);
      break;
    case constData.queryString.BY_ACTORS:
      fetchApi.setLocation(`#/actors/${param}/page/${currentPage}`);
      break;
    case constData.queryString.BY_GANRE:
      fetchApi.setLocation(`#/genres/${param}/page/${currentPage}`);
      break;
    case constData.queryString.FAVORITES:
      fetchApi.setLocation(`#/favorites/${currentPage}`);
      break;
    case constData.queryString.WATCHED:
      fetchApi.setLocation(`#/watched/${currentPage}`);
      break;
    case constData.queryString.WATCHED_LATER:
      fetchApi.setLocation(`#/watсhedLater/${currentPage}`);
      break;
    default:
      fetchApi.setLocation(`#/page/${currentPage}`);
  }
}

function showPagination() {
  refs.paginationRef.classList.remove('is-hidden');
}

function hidePagination() {
  refs.paginationRef.classList.add('is-hidden');
}

function getMovie() {
  const currentLanguageRu = getLocalLanguage() === constData.Languages.RUSSIAN;
  instance = showModal(
    pageLoader({
      languageRu: currentLanguageRu,
    }),
  );
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  const messageDiv = document.querySelector('.message');
  if (messageDiv !== undefined && messageDiv !== null) messageDiv.remove();

  fetchApi
    .getMovieData()
    .then(({ results, total_results }) => {
      showPagination();
      pagination.setTotalItems(Number(total_results));
      pagination.reset();
      pagination.movePageTo(fetchApi.getPage());

      results.map(el => {
        if (el.poster_path === null) {
          el.poster_path = noPosterImg;
        } else {
          el.poster_path = 'https://image.tmdb.org/t/p/w500' + el.poster_path;
        }

        el.release_date =
          el.release_date === undefined ? '' : el.release_date.slice(0, 4);

        return el;
      });

      showMovie(results);
      return results;
    })
    .then(filmInformation => {
      changeUserInterests(filmInformation);
      checkInformation(filmInformation);
    })
    .catch(error => {
      hidePagination();
      refs.mainContainer.innerHTML = '';
      refs.mainContainer.insertAdjacentHTML('beforeend', message(error));
    })
    .finally(() => {
      if (instance !== '') instance.close();
    });
}

function checkInformation(filmInformation) {
  const currentLanguageRu = getLocalLanguage() === constData.Languages.RUSSIAN;
  if (filmInformation.length === 0) {
    hidePagination();
    refs.mainContainer.insertAdjacentHTML(
      'beforeend',
      message({
        message: currentLanguageRu ? 'Ничего не найдено' : 'Nothing found',
      }),
    );
    return;
  }
}

function changeUserInterests(filmInformation) {
  interests.clearInterests();
  if (filmInformation === null) {
    return;
  }

  filmInformation.map(el => {
    const statusMovieById = getStatusMovieById(el.id);

    el.favorites = statusMovieById['favorites'];
    el.watched = statusMovieById['watched'];
    el.watchedLater = statusMovieById['watchedLater'];

    return el;
  });

  interests.showInterests(filmInformation);
}

function mainInit(
  setQueryString = constData.queryString.POPULAR,
  page = 1,
  param = '',
) {
  fetchApi.setQueryString(setQueryString);
  fetchApi.setPage(page);
  fetchApi.setParam(param);

  const tabContainerRef = document.querySelector('.movie__interests__tab');
  if (tabContainerRef !== null) {
    tabContainerRef.remove();
  }
  pagination.movePageTo(page);
  getMovie();
}

window.addEventListener('unload', function () {
  if (instance !== '') instance.close();
});

export default {
  mainInit,
  getMovie,
  changeUserInterests,
  checkInformation,
  showPagination,
  hidePagination,
};
