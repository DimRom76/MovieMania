import { registration } from './services/firebase';

import constData from './constData';

export default function submitRegForm(event) {
  event.preventDefault();

  const instance = constData.instance;

  const userNameRef = document.querySelector('.username__sign__up');
  const passwordRef = document.querySelector('.password__sign__up');
  const emailRef = document.querySelector('.email__sign__up');

  registration(emailRef.value, passwordRef.value, userNameRef.value);

  instance.close();
  constData.instance = '';
}
