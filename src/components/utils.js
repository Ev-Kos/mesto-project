import { editButton,
  popupProfile,
  userName,
  userProfession,
  popupUserName,
  popupUserProfession,
  profileClose,
  formElementProfile,
  popupPlace,
  addButton,
  placeClose,
  popupPlaceName,
  popupPlaceUrl,
  popupFormPlace,
  elements,
  popupZoom,
  zoomClose,
} from './constants';

import {openPopup, closePopup} from './modal';
import {createCard} from './card';

//функция открытия попапа профайла
editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  popupUserName.value = userName.textContent;
  popupUserProfession.value = userProfession.textContent;
});

//функция закрытия попапа профайла
profileClose.addEventListener('click', () => closePopup(popupProfile));

//функция сохранения и закрытия попапа профайла
function formSubmitProfile (evt) {
  evt.preventDefault();

  userName.textContent = popupUserName.value;
  userProfession.textContent = popupUserProfession.value;

  closePopup(popupProfile);
}

formElementProfile.addEventListener('submit', formSubmitProfile);

//открытие и закрытие попапа "новое место"
addButton.addEventListener('click', () => openPopup(popupPlace));

placeClose.addEventListener('click', () => closePopup(popupPlace));

//функция сохранения и закрытия "новое место"
function formSubmitPlace (evt) {
  evt.preventDefault();

  const element = createCard(popupPlaceName.value, popupPlaceUrl.value);
  elements.prepend(element);

  closePopup(popupPlace);

  evt.target.reset();
}

popupFormPlace.addEventListener('submit', formSubmitPlace);

//функция закрытия попапов

zoomClose.addEventListener('click', () => closePopup(popupZoom));

