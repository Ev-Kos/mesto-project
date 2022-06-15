import { editButton,
  popupProfile,
  userName,
  userProfession,
  popupUserName,
  popupUserProfession,
  formElementProfile,
  popupPlace,
  addButton,
  popupPlaceName,
  popupPlaceUrl,
  popupFormPlace,
  buttonConsent,
  popupConsent
} from './constants';

import {openPopup, closePopup} from './modal';
import {cardForDel} from './card';
import {setUserInfo, addNewCard, deleteCard} from './api';

//функция открытия попапа профайла
editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  popupUserName.value = userName.textContent;
  popupUserProfession.value = userProfession.textContent;
});

function updateUsefInfo(name, about) {
  userName.textContent = name;
  userProfession.textContent = about;
};

//функция сохранения и закрытия попапа профайла
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  updateUsefInfo(popupUserName.value, popupUserProfession.value);
  setUserInfo(popupUserName.value, popupUserProfession.value);

  closePopup(popupProfile);
}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

//открытие попапа "новое место"
addButton.addEventListener('click', () => openPopup(popupPlace));

function inactiveBtnSubmit(popup) {
  const buttonClose = popup.querySelector('.popup__submit-button');
  buttonClose.classList.add('popup__submit-button_inactive');
  buttonClose.setAttribute('disabled','');
}

//функция сохранения и закрытия "новое место"
function handlePlaceFormSubmit (user) {
  const card = {
    name: popupPlaceName.value,
    link: popupPlaceUrl.value
  }
  addNewCard(card, user);
  popupFormPlace.reset();
}

popupFormPlace.addEventListener('submit', handlePlaceFormSubmit);

//уведомление пользователя о процессе загрузки

function renderLoading(isLoading) {
  const buttonSubmit = document.querySelector('.popup_opened').querySelector('.popup__submit-button');
  if (isLoading) {
    buttonSubmit.textContent = 'Сохранение...'
  } else if (buttonSubmit.getElementsById(popupPlace)) {
    buttonSubmit.textContent = 'Создать'
  } else {
    buttonSubmit.textContent = 'Сохранить'
  }
}

//функция закрытия попапа "вы уверены" и удаление карточки

buttonConsent.addEventListener('click', function() {
  deleteCard(cardForDel);
  closePopup(popupConsent);
  const chosenCard = document.querySelector(`#delete`);
  chosenCard.remove();
})

export {renderLoading, inactiveBtnSubmit}
