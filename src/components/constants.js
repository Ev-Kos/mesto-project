const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popupProfile');
const popupPlace = document.querySelector('#popupPlace');
const popupZoom = document.querySelector('#popupZoom');
const popupConsent = document.querySelector('#popupConsent');
const buttonConsent = popupConsent.querySelector('.popup__submit-button');
const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__profession');
const userAvatar = document.querySelector('.profile__avatar');
const popupUserName = document.querySelector('#popupUserName');
const popupUserProfession = document.querySelector('#popupUserProfession');
const addButton = document.querySelector('.profile__add-button');
const formElementProfile = document.querySelector('#popupFormProfile');
const cardsTemplate = document.querySelector('#cardsTemplate').content;
const elements = document.querySelector('.elements');
const popupPlaceName = document.querySelector('#popupPlaceName');
const popupPlaceUrl = document.querySelector('#popupPlaceUrl');
const popupFormPlace = document.querySelector('#popupFormPlace');
const popups = document.querySelectorAll('.popup');
const popupZoomImage = popupZoom.querySelector('.popup__image');
const popupNewAvatar = document.querySelector('#popupNewAvatar');
const buttonAvatarSubmit = popupNewAvatar.querySelector('.popup__submit-button');
const buttonAvatarEdit = document.querySelector('.profile__avatar-edit-button');
const popupFormAvatar = document.querySelector('#popupFormNewAvatar');
const popupAvatarUrl = document.querySelector('#popupAvatarUrl');

export {
  editButton,
  popupProfile,
  popupPlace,
  popupZoom,
  userName,
  userProfession,
  popupUserName,
  popupUserProfession,
  userAvatar,
  addButton,
  formElementProfile,
  cardsTemplate,
  elements,
  popupPlaceName,
  popupPlaceUrl,
  popupFormPlace,
  popups,
  popupZoomImage,
  popupConsent,
  buttonConsent,
  popupNewAvatar,
  buttonAvatarSubmit,
  buttonAvatarEdit,
  popupAvatarUrl,
  popupFormAvatar
}
