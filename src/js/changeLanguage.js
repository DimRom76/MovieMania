import refs from './refs';
import constData from './constData';
import findFilm from './findFilm';

refs.language.addEventListener('click', ChangeLanguage);

removeClassForLanguage();
setClassForLanguage();

function setClassForLanguage() {
  const savedTheme = localStorage.getItem('language');

  if (savedTheme === constData.Languages.RUSSIAN) {
    refs.languageRu.classList.add('active__language');
    refs.language.classList.add(constData.Languages.RUSSIAN);
  }
  if (savedTheme === constData.Languages.ENGLISH) {
    refs.languageEn.classList.add('active__language');
    refs.language.classList.add(constData.Languages.ENGLISH);
  }

  if (savedTheme === null) {
    refs.languageRu.classList.add('active__language');
    refs.language.classList.add(constData.Languages.RUSSIAN);
    localStorage.setItem('language', constData.Languages.RUSSIAN);
  }
}

function removeClassForLanguage() {
  refs.languageEn.classList.remove('active__language');
  refs.languageRu.classList.remove('active__language');
  refs.language.classList.remove(constData.Languages.RUSSIAN);
  refs.language.classList.remove(constData.Languages.ENGLISH);
}

function ChangeLanguage(e) {
  let currentLanguage;

  if (e.target.tagName !== 'P') {
    return;
  }

  if (e.target.classList.contains('active__language')) {
    console.log('click');
    return;
  }

  if (!e.target.classList.contains('active__language')) {
    removeClassForLanguage();
    e.target.classList.add('active__language');
    currentLanguage = e.target.dataset.lang;
  }

  refs.language.classList.add(currentLanguage);
  localStorage.setItem('language', currentLanguage);
  constData.router.render();
  findFilm.createGanresList();
  findFilm.showFindHeader();
}

export default function getLocalLanguage() {
  return localStorage.getItem('language');
}
