import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import constData from './constData';

export async function getListings() {
  const currentUserId = getCurrentUser();
  return firebase
    .database()
    .ref('users/' + currentUserId + '/userFilms/currentStatusFilm')
    .once('value');
}

export async function getUserName() {
  const currentUserId = getCurrentUser();
  return firebase
    .database()
    .ref('users/' + currentUserId)
    .once('value');
}

export function getCurrentUser() {
  if (firebase.auth().currentUser === null) {
    return null;
  }

  return firebase.auth().currentUser.uid;
}

export function getStatusMovieById(id) {
  if (constData.userData === null) {
    return [];
  }

  const findFilm = constData.userData.find(el => Number(el.id) === Number(id));

  if (findFilm === undefined) {
    return constData.wathedFilms;
  }

  return findFilm;
}

const userData = {
  getListings,
  getCurrentUser,
  getStatusMovieById,
  getUserName,
};

export default userData;
