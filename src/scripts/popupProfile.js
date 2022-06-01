import { editButton,
  popupProfile,
  userName,
  userProfession,
  popupUserName,
  popupUserProfession,
  profileClose,
  formElementProfile,
} from './constants';

import {openPopup, closePopup} from './popups';

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
