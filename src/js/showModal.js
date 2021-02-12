// Модалка открывается например при клике на внизу страницы на Angry Beavers.
// В main.js висит слушатель 26 строка который ее открывает
// При клике в браузере назад, страница перерендаривается  и попадает в Router стр.87 где я и удаляю модалку
// Но при этом событие слушателя на Esc - onEscKeyPress, остается висеть,
// а так как это другое окно то думаю что ссылка на  onEscKeyPress тут совсем другая

// window.addEventListener('unload', function () {
//   if (instance !== '') instance.close();
// });

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

let instance = '';

function onEscKeyPress(event) {
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
    onClose: () => window.removeEventListener('keydown', onEscKeyPress),
  });
  instance.show();
  return instance;
}
