import Pagination from 'tui-pagination';

import refs from './refs';

const paganation = new Pagination(refs.paginationRef, {
  totalItems: 10000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
});

export default paganation;
