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
  elements
} from './constants';

import {openPopup, closePopup} from './modal';
import {createCard} from './card';

//функция открытия попапа профайла
editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  popupUserName.value = userName.textContent;
  popupUserProfession.value = userProfession.textContent;
});

//функция сохранения и закрытия попапа профайла
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  userName.textContent = popupUserName.value;
  userProfession.textContent = popupUserProfession.value;

  closePopup(popupProfile);
}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

//открытие попапа "новое место"
addButton.addEventListener('click', () => openPopup(popupPlace));

//функция сохранения и закрытия "новое место"
function handlePlaceFormSubmit (evt) {
  evt.preventDefault();

  const element = createCard(popupPlaceName.value, popupPlaceUrl.value);
  elements.prepend(element);

  closePopup(popupPlace);

  evt.target.reset();

  const buttonClose = popupFormPlace.querySelector('.popup__submit-button');
  buttonClose.classList.add('popup__submit-button_inactive');
  buttonClose.setAttribute('disabled','');
}

popupFormPlace.addEventListener('submit', handlePlaceFormSubmit);

