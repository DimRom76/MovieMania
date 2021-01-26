import movieMarkup from '../templates/movieMarkup.hbs';
import showMovieCard from './showMovieCard';
// import handlebars from 'handlebars';

const refs = {
  listMovies: document.querySelector('.list_movies'),
};

refs.listMovies.addEventListener('click', onCardClick);

function onCardClick(e) {
  e.preventDefault();

  if (e.target.dataset.id === undefined) {
    return;
  }

  if (e.target.nodeName === 'BUTTON') {
    return;
  }
  //   console.dir(e.target.nodeName);
  showMovieCard(e.target.dataset.id);
}

// handlebars.registerHelper('stringifyFunc', function (fn) {
//   return fn;
// });

export default function showMovie(data) {
  refs.listMovies.insertAdjacentHTML('beforeend', movieMarkup(data));
  //return markup;
}
