import {
  popupZoom,
  zoomClose,
} from './constants';

import {closePopup} from './popups';

//функция закрытия попапов

zoomClose.addEventListener('click', () => closePopup(popupZoom));
