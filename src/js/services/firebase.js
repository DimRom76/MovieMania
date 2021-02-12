import firebase from '@firebase/app';
import '@firebase/analytics';
import '@firebase/auth';
import refs from '../refs';
import { getListings } from '../getSetUserData';
import constData from '../constData';
import interests from '../showUserInterest';
import main from '../main';
import notification from '../notification';
import getLanguage from '../changeLanguage';
import { getUserName } from '../getSetUserData';
import fetchApi from './apiService';

var firebaseConfig = {
  apiKey: 'AIzaSyDxhL1yChcVJg9Bh5SNQIDffedtmC-aqsQ',
  authDomain: 'filmo-mania.firebaseapp.com',
  databaseURL: 'https://filmo-mania-default-rtdb.firebaseio.com',
  projectId: 'filmo-mania',
  storageBucket: 'filmo-mania.appspot.com',
  messagingSenderId: '344881823410',
  appId: '1:344881823410:web:f403c34ee2c35adf5653ab',
  measurementId: 'G-EBY8MDBS7Y',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

async function addUser({ user }, username) {
  try {
    const { uid, email } = user;
    const db = firebase.database();
    const users = db.ref('users');
    users.child(uid).set({ email: email, username: username });
    const languageRu = language();
    notificationsReg(languageRu);
  } catch {
    console.error('user add failed');
  }
}

export async function registration(email, password, username) {
  try {
    const auth = firebase.auth();
    const user = await auth.createUserWithEmailAndPassword(email, password);
    await addUser(user, username);
    fetchApi.setLocation('#/');
  } catch {
    const languageRu = language();
    notifications(languageRu);
  }
}

export async function login(email, password) {
  try {
    const auth = firebase.auth();
    await auth.signInWithEmailAndPassword(email, password);
    getUserName().then(snapshot => {
      const userInfo = snapshot.val();
      const languageRu = language();
      constData.username = userInfo.username;
      notificationLogin(languageRu, userInfo);
    });

    refs.userLogin.classList.add('is-hidden');
    refs.userAccount.classList.remove('is-hidden');
  } catch {
    const languageRu = language();
    errorNotify(languageRu);
  }
}

async function userExists(user) {
  try {
    const { uid } = user;
    const db = firebase.database();
    const users = db.ref('users/');
    const dataSnapshot = await users.once('value');
    const data = dataSnapshot.val();
    if (!data.hasOwnProperty(uid)) {
      await addUserGogleReg(user, user.displayName);
    } else {
      const getUser = await db.ref('users/' + uid).once('value');
      const userInfo = getUser.val();
      const languageRu = language();
      notificationLogin(languageRu, userInfo);
    }
  } catch {
    const languageRu = language();
    notifications(languageRu);
  }
}

async function addUserGogleReg(user, username) {
  try {
    const { uid, email } = user;
    const db = firebase.database();
    const users = db.ref('users');
    users.child(uid).set({ email: email, username: username });
    const languageRu = language();
    notificationsReg(languageRu);
  } catch {
    console.error('user add failed');
  }
}

export function googleAuthorization() {
  const provider = new firebase.auth.GoogleAuthProvider();
  getProvider(provider);
}

export function facebookAuthorization() {
  const provider = new firebase.auth.FacebookAuthProvider();
  getProvider(provider);
}

export function githubAuthorization() {
  const provider = new firebase.auth.GithubAuthProvider();
  getProvider(provider);
}

export function twitterAuthorization() {
  const provider = new firebase.auth.TwitterAuthProvider();
  getProvider(provider);
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    getListings().then(snapshot => {
      constData.userData = snapshot.val();

      if (
        window.location.href.includes('watched') ||
        window.location.href.includes('favorites')
      ) {
        constData.router.render();
      } else {
        main.changeUserInterests(constData.userData);
      }
    });
    if (user.displayName !== null) {
      constData.username = user.displayName;
    }
    if (user.displayName === null) {
      getUserName().then(snapshot => {
        const userInfo = snapshot.val();
        constData.username = userInfo.username;
      });
    }

    refs.userLogin.classList.add('is-hidden');
    refs.userAccount.classList.remove('is-hidden');
  } else {
    interests.clearInterests();
    refs.userLogin.classList.remove('is-hidden');
    refs.userAccount.classList.add('is-hidden');
  }
});

function notifications(languageRu) {
  if (languageRu) {
    notification.errorNotifications(
      'Пользователь с таким e-mail уже существует',
    );
  } else {
    notification.errorNotifications('User with this e-mail already exists');
  }
}

function notificationsReg(languageRu) {
  if (languageRu) {
    notification.successNotifications('Вы успешно зарегестрировались');
  } else {
    notification.successNotifications('You have successfully registered');
  }
}

function notificationLogin(languageRu, userInfo) {
  if (languageRu) {
    notification.successNotifications(`Вы вошли как ${userInfo.username}`);
  } else {
    notification.successNotifications(`You are signed as ${userInfo.username}`);
  }
}

function errorNotify(languageRu) {
  if (languageRu) {
    notification.errorNotifications(
      'Пользователя с таким e-mail не существует',
    );
  } else {
    notification.errorNotifications('User with this e-mail no exists');
  }
}

function language() {
  const languageRu = getLanguage() === constData.Languages.RUSSIAN;
  return languageRu;
}

function getProvider(provider) {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      userExists(result.user);
    })
    .catch(function (error) {
      console.log(error);
      const languageRu = language();
      if (languageRu) {
        notification.infoNotification('Отменено пользователем');
      } else {
        notification.infoNotification('Canceled by user');
      }
    });
}

const authorization = {
  googleAuthorization,
  facebookAuthorization,
  twitterAuthorization,
  githubAuthorization,
};

export default authorization;
