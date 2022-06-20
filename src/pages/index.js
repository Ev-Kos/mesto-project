import './index.css';
import {getCards, getUserInfo, deleteCard, deleteLike, setLike, addNewCard, setUserInfo, newAvatar} from '../components/api';
import {createCard, cardForDel, removeCard, changeLikeCount} from '../components/card';
import {enableValidation} from '../components/validate';
import {inactiveBtnSubmit, renderLoading} from '../components/utils';
import {openPopup, closePopup} from '../components/modal';
import {userName,
        userProfession,
        userAvatar,
        editButton,
        popupProfile,
        popupUserName,
        popupUserProfession,
        addButton,
        popupPlace,
        formElementProfile,
        popupFormPlace,
        elements,
        popupNewAvatar,
        popupFormAvatar,
        buttonConsent,
        popupConsent,
        buttonAvatarEdit,
        buttonPlaceSubmit,
        buttonProfileSubmit,
        popupZoomImage,
        popupZoomCaption,
        buttonAvatarSubmit,
        popupAvatarUrl,
        popups} from '../components/constants';

let userInfo = [];

Promise.all([getUserInfo(), getCards()])
.then(data => {
  userName.textContent = data[0].name;
  userProfession.textContent = data[0].about;
  userAvatar.src = data[0].avatar;

  if (data[1].length > 0) {
    data[1].forEach(card => {
      showCard(createCard(card, data[0], zoomImage, openPopupConsent, setLikeLogic, deleteLikeLogic));
    })
  } else {
    const text = document.createElement('p');
    text.textContent = 'Извините, фотографии отсутствуют';
    document.querySelector('.elements').before(text);
    }
    return userInfo = data[0]
  })
  .catch(err => {
    console.log(err);
  })

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

//валидация

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});


//открытие и сохранение попапа профайла
editButton.addEventListener('click', function () {
  popupUserName.value = userName.textContent;
  popupUserProfession.value = userProfession.textContent;
  openPopup(popupProfile);
});

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

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

//открытие и сохранение попапа Новое место
addButton.addEventListener('click', () => openPopup(popupPlace));

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

popupFormPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handlePlaceFormSubmit(userInfo);
})

//открытие и сохранение попапа аватара
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

buttonAvatarEdit.addEventListener('click', function() {
  openPopup(popupNewAvatar);
})

popupFormAvatar.addEventListener('submit', handlerAvatarFormSubmit)

//открытие и сохранение попапа Вы уверены
function openPopupConsent () {
    openPopup(popupConsent);
}

buttonConsent.addEventListener('click', function() {
  deleteCard(cardForDel.id)
  .then(() => {
    removeCard(cardForDel);
    closePopup(popupConsent);
  })
  .catch(err => {
    console.log(err);
  })
})

//функция вставления карточки
function showCard(card) {
  elements.prepend(card);
};

//функция отображения информации о пользователе при редактировании
function updateUsefInfo(name, about) {
  userName.textContent = name;
  userProfession.textContent = about;
};

//функции работы с запросами лайков
function deleteLikeLogic(id, count, button) {
    deleteLike(id)
    .then((data) => {
      changeLikeCount(count, data.likes.length, button);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function setLikeLogic(id, count, button) {
    setLike(id)
    .then((data) => {
      changeLikeCount(count, data.likes.length, button);
    })
    .catch(err => {
      console.log(err);
    })
  }

//открытие попапа большой картинки
  function zoomImage(name, link) {
    popupZoomImage.src = link;
    popupZoomImage.alt = name;
    popupZoomCaption.textContent = name;
    openPopup(popupZoom);
  };



export {showCard, zoomImage, updateUsefInfo, openPopupConsent, setLikeLogic, deleteLikeLogic}



