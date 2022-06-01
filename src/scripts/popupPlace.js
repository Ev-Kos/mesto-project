import {
  popupPlace,
  addButton,
  placeClose,
  popupPlaceName,
  popupPlaceUrl,
  popupFormPlace,
  elements
} from './constants';

import {openPopup, closePopup} from './popups';
import {createCard} from './createCard';

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
