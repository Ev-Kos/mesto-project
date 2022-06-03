import {popups} from './constants';

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened');
    }
  })
}

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//закрытие по клику на оверлэй

popups.forEach(function(popup) {
   popup.addEventListener('click', function(evt) {
     if (evt.target.classList.contains('popup')) {
       closePopup(popup);
     }
   })
 });

export {openPopup, closePopup}
