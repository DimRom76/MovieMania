import fetchApi from '../services/apiService';
import getConstData from '../js/constData';

import showMovie from './showMovieList';
import loadMoreBtn from './loadMoreButton';

const refs = {
  btnViewMoreRef: document.querySelector('button[data-action="load more"]'),
};

refs.btnViewMoreRef.addEventListener('click', onPaginationsBtnClick);

function getMovie() {
  fetchApi.setQueryString(getConstData.queryString.POPULAR);
  loadMoreBtn.disable();
  fetchApi.getMovieData().then(({ results }) => {
    if (results.length === 0) loadMoreBtn.btnViewMoreOff();

    fetchApi.incrementPage();
    showMovie(results);
    loadMoreBtn.enable();
  });
}

function onPaginationsBtnClick() {
  getMovie();
}

fetchApi.reset();
getMovie();
