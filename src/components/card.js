import {initialCards} from './initialCards';
import {cardsTemplate, elements,  popupZoom, popupZoomImage, popupConsent} from './constants';
import {openPopup} from './modal';
import {setActiveLike} from './utils';
import {setLike, deleteLike} from './api'

let cardForDel = '';

//функция добавления карточек
//function createCard(name, link, alt=null)
function createCard(card, userInfo) {
  const cardElem = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElem.querySelector('.element__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElem.querySelector('.element__title').textContent = card.name;

  //удаление карточек
  const buttonDelete = cardElem.querySelector('.element__remove-button');

  if (card.owner._id === userInfo._id) {
    buttonDelete.addEventListener('click', function() {
      openPopup(popupConsent);
      cardForDel = card._id;
      cardElem.id = `delete`;
    });
  } else {
    buttonDelete.remove();
  }


  //лайки карточек
  const buttonLike = cardElem.querySelector('.element__like-button');
  const likeCount = cardElem.querySelector('.element__likes-count');

  cardElem.querySelector('.element__likes-count').textContent = card.likes.length;
  setActiveLike(card.likes, userInfo._id, buttonLike);

  buttonLike.addEventListener('click', function() {
    buttonLike.classList.toggle('element__like-button_active');

    if (buttonLike.classList.contains('element__like-button_active')) {
      setLike(card._id, likeCount)
    } else {
      deleteLike(card._id, likeCount)
    }
  });

  //открытие картинки
  cardImage.addEventListener('click', function() {
    openPopup(popupZoom);
    popupZoomImage.src = card.link;
    popupZoomImage.alt = card.name;
    popupZoom.querySelector('.popup__caption').textContent = card.name;
  });

  return cardElem;
}

function showCard(card) {
  elements.append(card);
};

export {createCard, showCard, cardForDel}


