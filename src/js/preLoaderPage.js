const loader = document.querySelector('.preloader');
const pagePreloader = document.querySelector('.page-preloader');

function deletePreloader() {
  loader.remove();
  pagePreloader.remove();
}

setTimeout(() => {
  deletePreloader();
}, 5000);
