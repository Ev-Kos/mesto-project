import {popups} from './constants';

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//закрытие попапов на esc

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//закрытие по клику на оверлэй и крестик

popups.forEach(function(popup) {
   popup.addEventListener('mousedown', function(evt) {
     if (evt.target.classList.contains('popup')) {
       closePopup(popup);
     }
     if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
   })
 });

export {openPopup, closePopup}
