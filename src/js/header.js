import firebase from '@firebase/app';
import '@firebase/auth';
import fetchApi from './services/apiService';
import refs from './refs';
import constData from './constData';
import userMenuRu from '../templates/header/dropDownMenu.hbs';
import userMenuEn from '../templates/header/dropDownMenuEn.hbs';
import userFilmsList from './userFilmsByStatus';
import getLanguage from './changeLanguage';
import main from './main';

refs.userAccount.addEventListener('click', openDropDownMenu);

function openDropDownMenu() {
  if (refs.userAccount.classList.contains('menu__open')) {
    refs.wrapperMenuRef.innerHTML = '';
    refs.userAccount.classList.toggle('menu__open');
    refs.wrapperMenuRef.classList.toggle('menu__list--animate');
    return;
  }

  const languageRu = getLanguage() === constData.Languages.RUSSIAN;

  if (languageRu) {
    const username = constData.username;
    refs.wrapperMenuRef.insertAdjacentHTML(
      'beforeend',
      userMenuRu({ username }),
    );
    refs.userAccount.classList.toggle('menu__open');
  } else {
    const username = constData.username;

    refs.wrapperMenuRef.insertAdjacentHTML(
      'beforeend',
      userMenuEn({ username }),
    );
    refs.userAccount.classList.toggle('menu__open');
  }

  document.body.addEventListener('click', closeDropDownMenu);

  const userMenuRefs = {
    logOutRef: document.querySelector('.user__logout'),
    userInterests: document.querySelectorAll('.user__item__js'),
  };

  userMenuRefs.userInterests.forEach(interes =>
    interes.addEventListener('click', userFilmsList.userFilmsList),
  );

  refs.wrapperMenuRef.classList.toggle('menu__list--animate');
  userMenuRefs.logOutRef.addEventListener('click', logOut);
}

function logOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      refs.userAccount.classList.remove('menu__open');
      refs.wrapperMenuRef.classList.remove('menu__list--animate');
      refs.wrapperMenuRef.innerHTML = '';
      constData.userData = [];
      main.changeUserInterests(constData.userData);
    })
    .catch(error => {
      console.log(error);
    });
  refs.userLogin.classList.remove('is-hidden');
  refs.userAccount.classList.add('is-hidden');
}

refs.headerLogoLink.addEventListener('click', onClickMainLink);
refs.homeRef.addEventListener('click', onClickMainLink);

function onClickMainLink(e) {
  e.preventDefault();
  fetchApi.setLocation('#/');
}

function closeDropDownMenu() {
  const getMenuAttribute = refs.containerMenuRef.getAttribute('aria-expanded');
  if (getMenuAttribute === 'false') {
    refs.containerMenuRef.setAttribute('aria-expanded', true);
  } else {
    refs.containerMenuRef.setAttribute('aria-expanded', false);
    refs.wrapperMenuRef.innerHTML = '';
    refs.userAccount.classList.remove('menu__open');
    refs.wrapperMenuRef.classList.remove('menu__list--animate');
    document.body.removeEventListener('click', closeDropDownMenu);
  }
}
