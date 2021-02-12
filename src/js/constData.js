const CONST_DATA = {
  queryString: {
    BY_NAME: 'search',
    BY_ACTORS: 'actors',
    BY_GANRE: 'discover',
    POPULAR: 'popular',
    FAVORITES: 'favorites',
    WATCHED: 'watched',
    WATCHED_LATER: 'watchedLater',
  },
  instance: '',
  router: '',
  username: '',
  wathedFilms: {
    favorites: false,
    watchedLater: false,
    watched: false,
  },
  userData: [],
  Languages: {
    RUSSIAN: 'ru-RU',
    ENGLISH: 'en-EN',
  },
  placeholder: { RU: `3 жанра`, EN: `3 genre` },
};

export default CONST_DATA;
