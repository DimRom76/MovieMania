import refs from './refs';
import loginRegFormEn from '../templates/loginRegFormEn.hbs';
import loginRegFormRu from '../templates/loginRegFormRu.hbs';

import {
  googleAuthorization,
  facebookAuthorization,
  twitterAuthorization,
  githubAuthorization,
} from './services/firebase';

import submitRegForm from './submitRegForm';
import { submitLogForm } from './submitLogForm';
import constData from './constData';
import showModal from './showModal';
import getLanguage from './changeLanguage';

refs.userLogin.addEventListener('click', checkUser);

function checkUser() {
  const languageRu = getLanguage() === constData.Languages.RUSSIAN;
  if (languageRu) {
    constData.instance = showModal(loginRegFormRu());
  } else {
    constData.instance = showModal(loginRegFormEn());
  }
  const modalRef = document.querySelector('.login-html');
  modalRef.classList.remove('is-hidden');
  const signInRef = document.querySelector('.sign-in');
  const signUpRef = document.querySelector('.sign-up');
  const regFormRef = document.querySelector('.form__sign__up');
  const loginFormRef = document.querySelector('.form__sing__in');
  const googleRegRef = document.querySelector('.google_login');
  const gitHubRegRef = document.querySelector('.github_login');
  const facebookRegRef = document.querySelector('.facebook_login');
  const twitterRegRef = document.querySelector('.twitter_login');

  signInRef.checked = true;
  loginFormRef.addEventListener('submit', submitLogForm);

  signUpRef.addEventListener('click', () => {
    signUpRef.checked = true;
    signInRef.checked = false;
    regFormRef.addEventListener('submit', submitRegForm);
    loginFormRef.removeEventListener('submit', submitLogForm);
  });

  signInRef.addEventListener('click', () => {
    signInRef.checked = true;
    signUpRef.checked = false;
    loginFormRef.addEventListener('submit', submitLogForm);
    regFormRef.removeEventListener('submit', submitRegForm);
  });

  googleRegRef.addEventListener('click', () => {
    setInstanse(loginFormRef, regFormRef);

    googleAuthorization();
  });

  gitHubRegRef.addEventListener('click', () => {
    setInstanse(loginFormRef, regFormRef);

    githubAuthorization();
  });

  facebookRegRef.addEventListener('click', () => {
    setInstanse(loginFormRef, regFormRef);

    facebookAuthorization();
  });

  twitterRegRef.addEventListener('click', () => {
    setInstanse(loginFormRef, regFormRef);

    twitterAuthorization();
  });
}

function setInstanse(loginFormRef, regFormRef) {
  const instance = constData.instance;

  instance.close();
  constData.instance = '';
  loginFormRef.removeEventListener('submit', submitLogForm);
  regFormRef.removeEventListener('submit', submitRegForm);
}

export default checkUser;
