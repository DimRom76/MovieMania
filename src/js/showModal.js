import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

let instance = '';

function onEscKeyPress(event) {
  console.log(event);
  console.log(instance);
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    instance.close();
  }
}

function onShowModal() {
  window.addEventListener('keydown', onEscKeyPress);
}

export default function modalShow(html) {
  instance = basicLightbox.create(html, {
    onShow: () => onShowModal(),
    onClose: window.removeEventListener('keydown', onEscKeyPress),
  });
  // instance.element().insertAdjacentHTML('beforeend', '<p>After placeholder</p>')
  instance.show();
  return instance;
}
