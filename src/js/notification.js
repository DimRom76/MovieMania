import { error, success, info, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
defaults.styling = 'material';
defaults.icons = 'material';
defaults.width = '280px';
defaults.delay = '500';

function errorNotifications(title) {
  error({
    title,
  });
}

function successNotifications(title) {
  success({
    title,
  });
}

function infoNotification(title) {
  info({ title });
}

const notification = {
  errorNotifications,
  successNotifications,
  infoNotification,
};

export default notification;
