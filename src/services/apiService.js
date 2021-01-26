import getLanguage from '../js/language-localstorage';
import getConstData from '../js/constData';

const LANGUAGE = `&language=${getLanguage()}`;
const API_KEY = '?api_key=fb4eca5dd3545235e4fd6796c70d4d40';
const MAIN_URL = 'https://api.themoviedb.org/3/';
// https://api.themoviedb.org/3/trending/movie/day?api_key=fb4eca5dd3545235e4fd6796c70d4d40
// ЖАНРЫ;
// https://api.themoviedb.org/3/genre/movie/list?api_key=fb4eca5dd3545235e4fd6796c70d4d40

//api.themoviedb.org/3/discover/movie?api_key=fb4eca5dd3545235e4fd6796c70d4d40&language=en-US&sort_by=popularity.desc&with_genres=Western&page=1
//api.themoviedb.org/3/discover/movie?api_key=fb4eca5dd3545235e4fd6796c70d4d40&language=en-US&with_genres=14&sort_by=popularity.desc
//http://api.themoviedb.org/3/discover/movie?api_key=fb4eca5dd3545235e4fd6796c70d4d40&language=en-US&with_genres=14,1&page=1

// получить сразу и видео и картинки к фильму
// https://api.themoviedb.org/3/movie/157336?api_key=fb4eca5dd3545235e4fd6796c70d4d40&append_to_response=videos,images

//ссылка на картинку
//'https://image.tmdb.org/t/p/w500/путь'
//если нет картинки надо чтото поставить!!!!!

async function fetchTrending() {
  const res = await fetch(
    `${MAIN_URL}movie/popular${API_KEY}${LANGUAGE}&page=${this.page}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  // console.log(res.json());
  return res.json();
}
async function fetchMovieByGanres(ganres) {
  // ganres - список id жанров через запятую без пробелов

  const res = await fetch(
    `${MAIN_URL}discover/movie${API_KEY}${LANGUAGE}&with_genres=${ganres}&page=${this.page}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchSearchMovie(query) {
  const res = await fetch(
    `${MAIN_URL}search/movie${API_KEY}${LANGUAGE}&query=${query}&page=${this.page}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res.json();
}

function getMovieData(param = '') {
  const queryString = getConstData.queryString;

  if (this.queryString === queryString.BY_NAME) {
    return this.fetchSearchMovie(param);
  }
  if (this.queryString === queryString.BY_GANRE) {
    return this.fetchMovieByGanres(param);
  }
  if (this.queryString === queryString.POPULAR) {
    return this.fetchTrending();
  }

  return null;
}

async function fetchGanres() {
  const res = await fetch(`${MAIN_URL}genre/movie/list${API_KEY}${LANGUAGE}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchMovieId(id) {
  const res = await fetch(`${MAIN_URL}movie/${id}${API_KEY}${LANGUAGE}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchVideosId(id) {
  const res = await fetch(`${MAIN_URL}movie/${id}/videos${API_KEY}${LANGUAGE}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchCreditsId(id) {
  const res = await fetch(
    `${MAIN_URL}movie/${id}/credits${API_KEY}${LANGUAGE}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

async function fetchReviewsId(id) {
  const res = await fetch(
    `${MAIN_URL}movie/${id}/reviews${API_KEY}${LANGUAGE}`,
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

const fetchApi = {
  page: 1,
  queryString: '',
  fetchTrending, //популярные (1 страница)
  fetchSearchMovie, //поиск по названия (нужно передавать название)
  fetchMovieByGanres,
  //**список фильмов согласно выбраных жанров(айди жанровчерез запятую)*/
  getMovieData,

  fetchMovieId, //получить фильм по id
  fetchCreditsId, //список актеров (для получение нужен id фильма)
  fetchReviewsId, //обзоры (для получение нужен id фильма)
  fetchVideosId, //трейлеры (для получение нужен id фильма)
  fetchGanres, //полный список жанров

  reset() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  setQueryString(newQueryString) {
    this.queryString = newQueryString;
  },
};

export default fetchApi;
