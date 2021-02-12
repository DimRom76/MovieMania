import { login } from './services/firebase';
import constData from './constData';

export async function submitLogForm(event) {
  event.preventDefault();

  const instance = constData.instance;
  const loginEmailRef = document.querySelector('.email__sign__in');
  const loginPasRef = document.querySelector('.password__sign__in');

  login(loginEmailRef.value, loginPasRef.value);

  instance.close();
  constData.instance = '';
}
