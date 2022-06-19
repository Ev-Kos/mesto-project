import {popups,
        buttonProfileSubmit,
        popupUserName,
        popupUserProfession,
        popupProfile,
        popupPlaceName,
        popupPlaceUrl,
        buttonPlaceSubmit,
        popupFormPlace,
        buttonAvatarSubmit,
        popupAvatarUrl,
        userAvatar,
        popupNewAvatar,
        popupFormAvatar,
        popupZoomImage,
        popupZoom,
        popupPlace,
        popupZoomCaption} from './constants';
import {renderLoading, inactiveBtnSubmit} from './utils';
import {setUserInfo, addNewCard, newAvatar} from './api';
import {createCard} from './card';
import {showCard, updateUsefInfo, openPopupConsent, setLikeLogic, deleteLikeLogic} from '../pages/index';

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

 //функция сохранения и закрытия попапа профайла
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  renderLoading(true, buttonProfileSubmit);

  setUserInfo(popupUserName.value, popupUserProfession.value)
    .then((res) => {
      updateUsefInfo(popupUserName.value, popupUserProfession.value);
      closePopup(popupProfile);
      inactiveBtnSubmit(buttonProfileSubmit);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, buttonProfileSubmit);
    })
}

//функция сохранения и закрытия "новое место"
function handlePlaceFormSubmit(user) {
  const card = {
    name: popupPlaceName.value,
    link: popupPlaceUrl.value
  }
  renderLoading(true, buttonPlaceSubmit);

  addNewCard(card, user)
  .then(result => {
    showCard(createCard(result, user, zoomImage, openPopupConsent, setLikeLogic, deleteLikeLogic));
    inactiveBtnSubmit(buttonPlaceSubmit);
    closePopup(popupPlace);
    popupFormPlace.reset();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, buttonPlaceSubmit, 'Создать');
  })
}

//функция сохранения и закрытия аватара
function handlerAvatarFormSubmit(e) {
  e.preventDefault();
  renderLoading(true, buttonAvatarSubmit);
  newAvatar(popupAvatarUrl.value)
    .then(result => {
      userAvatar.src = result.avatar;
      closePopup(popupNewAvatar);
      inactiveBtnSubmit(buttonAvatarSubmit);
      popupFormAvatar.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, buttonAvatarSubmit);
    })
}

function zoomImage(name, link) {
  popupZoomImage.src = link;
  popupZoomImage.alt = name;
  popupZoomCaption.textContent = name;
  openPopup(popupZoom);
};


export {
  openPopup,
  closePopup,
  handleProfileFormSubmit,
  handlePlaceFormSubmit,
  handlerAvatarFormSubmit,
  zoomImage
  }
