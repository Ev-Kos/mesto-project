import './index.css';
import '../components/modal';
import '../components/utils';
import '../components/card';
import {enableValidation} from '../components/validate';
import {createCard, showCard} from '../components/card';
import {userName,
        userProfession,
        userAvatar} from '../components/constants';
import {getUserInfo, getCards} from '../components/api';

let userInfo = {};

getUserInfo()
  .then((info) => {
    userName.textContent = info.name;
    userProfession.textContent = info.about;
    userAvatar.src = info.avatar;
    return userInfo = info
  });

  getCards()
  .then((cards) => {
    if (cards.length > 0) {
      cards.forEach(card => {
        showCard(createCard(card, userInfo));
      })
    } else {
      let text = document.createElement('p');
      text.textContent = 'Карточки отсутствуют';
      document.querySelector('.elements').before(text);
    }
  })



enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
