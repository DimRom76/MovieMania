import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import wathedData from './constData';
import { getCurrentUser } from './getSetUserData';
import main from './main';
import getLanguage from './changeLanguage';
import fetchApi from './services/apiService';
import checkUser from './checkUser';

function setStatusFilm(movieId, status) {
  let getUserData = wathedData.userData;

  let currentStatusFilm = addFilm(getUserData, movieId, status);

  wathedData.userData = currentStatusFilm;

  let addFilmFirstTime = currentStatusFilm[currentStatusFilm.length - 1];

  if (
    addFilmFirstTime.posterPathEn === '' ||
    addFilmFirstTime.posterPathRu === ''
  ) {
    let language = '';
    let languageRu = getLanguage() === wathedData.Languages.RUSSIAN;
    if (languageRu) {
      language = wathedData.Languages.ENGLISH;
    } else {
      language = wathedData.Languages.RUSSIAN;
    }

    fetchApi.fetchMovieId(addFilmFirstTime.id, language).then(el => {
      let currentFilm;

      if (el.poster_path === null) {
        el.poster_path = noPosterImg;
      } else {
        el.poster_path = 'https://image.tmdb.org/t/p/w500' + el.poster_path;
      }

      if (language === wathedData.Languages.RUSSIAN) {
        currentFilm = {
          ...addFilmFirstTime,
          posterPathRu: el.poster_path,
          titleRu: el.title,
        };
      }
      if (language === wathedData.Languages.ENGLISH) {
        currentFilm = {
          ...addFilmFirstTime,
          posterPathEn: el.poster_path,
          titleEn: el.title,
        };
      }

      let currentStatusFilm = wathedData.userData.map(el => {
        if (el.id === currentFilm.id) {
          return { ...currentFilm };
        }
        return el;
      });

      wathedData.userData = currentStatusFilm;

      const currentUserId = getCurrentUser();

      firebase
        .database()
        .ref(/users/ + currentUserId + /userFilms/)
        .set({ currentStatusFilm });
    });
  }

  if (
    location.hash.includes('favorites') ||
    location.hash.includes('watched')
  ) {
    wathedData.router.render();
  }

  main.changeUserInterests(wathedData.userData);

  const currentUserId = getCurrentUser();

  firebase
    .database()
    .ref(/users/ + currentUserId + /userFilms/)
    .set({ currentStatusFilm });
}

export function filmStatus(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'I') {
    return;
  }

  const currentUserId = getCurrentUser();

  if (currentUserId) {
    const idFilm = e.target.dataset.id;
    const statusFilm = e.target.dataset.status;

    setStatusFilm(idFilm, statusFilm);
  } else {
    checkUser();
  }
}

function addFilm(getUserData, movieId, status) {
  if (getUserData === null) {
    getUserData = [];
  }

  let newWatchedData = getUserData.find(el => {
    return el.id === movieId;
  });

  if (newWatchedData === undefined) {
    newWatchedData = { id: movieId, ...wathedData.wathedFilms };
  }

  const userMovieKeys = Object.keys(newWatchedData);

  userMovieKeys.forEach(el => {
    if (el === status) {
      newWatchedData[status] = !newWatchedData[status];
    }
  });

  let indexNumber = getUserData.findIndex(el => {
    return el.id === movieId;
  });

  if (indexNumber === -1) {
    getUserData.push(newWatchedData);
  } else {
    getUserData.splice(indexNumber, 1, newWatchedData);
  }

  const filmAtribute = addInfoToFilm(movieId);

  const filmInfo = getUserData.map(el => {
    if (Number(el.id) === Number(filmAtribute.id)) {
      if (!el.hasOwnProperty('posterPathEn')) {
        let posterPathRu = '';
        let posterPathEn = '';
        let titleRu = '';
        let titleEn = '';
        if (getLanguage() === wathedData.Languages.RUSSIAN) {
          posterPathRu = filmAtribute.poster;
          titleRu = filmAtribute.title;
        }
        if (getLanguage() === wathedData.Languages.ENGLISH) {
          posterPathEn = filmAtribute.poster;
          titleEn = filmAtribute.title;
        }
        return {
          ...el,
          posterPathRu: posterPathRu,
          posterPathEn: posterPathEn,
          titleRu: titleRu,
          titleEn: titleEn,
          vote_average: filmAtribute.vote,
          release_date: filmAtribute.release,
        };
      }
      return el;
    }
    return el;
  });

  return filmInfo;
}

function addInfoToFilm(filmId) {
  const films = document.querySelectorAll('.card');
  const findCurrentFilm = Object.values(films);

  const currentFilm = findCurrentFilm.find(film => {
    if (filmId === film.dataset.id) {
      return film;
    }
  });

  return currentFilm.dataset;
}
