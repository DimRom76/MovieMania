import firebase from '../services/firebase';
import '@firebase/auth';
import refs from './refs';
import regForm from '../templates/registration-form.hbs';
import submitForm from './registration';
import showModal from './showModal';

refs.userLogin.addEventListener('click', checkUser);

function checkUser() {
  firebase.auth().onAuthStateChanged(function () {
    showModal(regForm());
    // refs.registrationOverlayRef.insertAdjacentHTML('afterbegin', regForm());
    const modalRef = document.querySelector('.login-html');
    modalRef.classList.remove('is-hidden');
    const formRef = document.querySelector('.form__submit');

    formRef.addEventListener('submit', submitForm);
  });
}

// firebase
//   .auth()
//   .signOut()
//   .then(() => {
//     // Sign-out successful.
//   })
//   .catch(error => {
//     // An error happened.
//   });
