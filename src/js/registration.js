import firebase from '../services/firebase';
import 'firebase/database';

export default function submitForm(event) {
  event.preventDefault();
  const usernameRef = document.querySelector('.username');
  const passwordRef = document.querySelector('.password');
  const emailRef = document.querySelector('.email');

  firebase
    .auth()
    .createUserWithEmailAndPassword(emailRef.value, passwordRef.value)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      //   console.log(user.uid);
      //   user.displayName = usernameRef.value;
      //   console.log(user.displayName);
      function writeUserData(userId, name) {
        firebase
          .database()
          .ref('users/' + userId)
          .set({
            username: name,
          });
      }

      writeUserData(user.uid, usernameRef.value);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}
