import {
  popupZoom,
  zoomClose,
} from './constants';

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


zoomClose.addEventListener('click', () => closePopup(popupZoom));

export {openPopup, closePopup}
