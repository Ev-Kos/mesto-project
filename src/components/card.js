import {initialCards} from './initialCards';
import {cardsTemplate, elements,  popupZoom, popupZoomImage, popupConsent} from './constants';
import {openPopup} from './modal';

let cardForDel = '';

//функция добавления карточек
//function createCard(name, link, alt=null)
function createCard(cards = {}, userInfo) {
  const card = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  card.querySelector('.element__title').textContent = cards.name;

  //удаление карточек
  const buttonDelete = card.querySelector('.element__remove-button');

  if (cards.owner._id === userInfo._id) {
    buttonDelete.addEventListener('click', function() {
      openPopup(popupConsent);
      cardForDel = cards._id;
      card.id = `delete`;
    });
  } else {
    buttonDelete.remove();
  }


  //лайки карточек
  const buttonLike = card.querySelector('.element__like-button');

  buttonLike.addEventListener('click', function() {
    buttonLike.classList.toggle('element__like-button_active');
  });

  const likeCount = card.querySelector('.element__likes-count');
  likeCount.textContent = cards.likes.length;

  //открытие картинки
  cardImage.addEventListener('click', function() {
    openPopup(popupZoom);
    popupZoomImage.src = link;
    popupZoomImage.alt = alt;
    popupZoom.querySelector('.popup__caption').textContent = name;
  });

  return card;
}

function showCard(card) {
  elements.append(card);
};

export {createCard, showCard, cardForDel}


