import './index.css';
import {getCards, getUserInfo, deleteCard} from '../components/api';
import {showCard, createCard, cardForDel} from '../components/card';
import {enableValidation} from '../components/validate';
import {openPopup,
        handleProfileFormSubmit,
        handlePlaceFormSubmit,
        handlerAvatarFormSubmit,
        closePopup} from '../components/modal';
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
        buttonAvatarEdit,
        popupNewAvatar,
        popupFormAvatar,
        buttonConsent,
        popupConsent} from '../components/constants';


let userInfo = [];

Promise.all([getUserInfo(), getCards()])
.then(data => {
  userName.textContent = data[0].name;
  userProfession.textContent = data[0].about;
  userAvatar.src = data[0].avatar;

  if (data[1].length > 0) {
    data[1].forEach(card => {
      showCard(createCard(card, data[0]));
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

popupFormPlace.addEventListener('submit', handlePlaceFormSubmit);

const app = document.querySelector('.profile__avatar-overlay');

app.addEventListener('click', function() {
  openPopup(popupNewAvatar);
})

popupFormAvatar.addEventListener('submit', handlerAvatarFormSubmit)

buttonConsent.addEventListener('click', function() {
  deleteCard(cardForDel.id)
  .then(() => {
    cardForDel.remove();
    closePopup(popupConsent);
  })
  .catch(err => {
    console.log(err);
  })
})




