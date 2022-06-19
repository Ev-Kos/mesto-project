import './index.css';
import {getCards, getUserInfo, deleteCard, deleteLike, setLike} from '../components/api';
import {createCard, cardForDel, removeCard} from '../components/card';
import {enableValidation} from '../components/validate';
import {openPopup,
        handleProfileFormSubmit,
        handlePlaceFormSubmit,
        handlerAvatarFormSubmit,
        closePopup,
        zoomImage} from '../components/modal';
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
        buttonAvatarEdit} from '../components/constants';

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

//валидация

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

editButton.addEventListener('click', function () {
  popupUserName.value = userName.textContent;
  popupUserProfession.value = userProfession.textContent;
  openPopup(popupProfile);
});

addButton.addEventListener('click', () => openPopup(popupPlace));

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

popupFormPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handlePlaceFormSubmit(userInfo);
})

buttonAvatarEdit.addEventListener('click', function() {
  openPopup(popupNewAvatar);
})

popupFormAvatar.addEventListener('submit', handlerAvatarFormSubmit)


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

function showCard(card) {
  elements.prepend(card);
};


function updateUsefInfo(name, about) {
  userName.textContent = name;
  userProfession.textContent = about;
};


function deleteLikeLogic(id, count, button) {
    deleteLike(id)
    .then((data) => {
      count.textContent = data.likes.length;
      button.classList.remove('element__like-button_active')
    })
    .catch(err => {
      console.log(err);
    })
  }

  function setLikeLogic(id, count, button) {
    setLike(id)
    .then((data) => {
      count.textContent = data.likes.length;
      button.classList.add('element__like-button_active');
    })
    .catch(err => {
      console.log(err);
    })
  }


export {showCard, updateUsefInfo, openPopupConsent, setLikeLogic, deleteLikeLogic}



