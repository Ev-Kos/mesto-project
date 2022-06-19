import {cardsTemplate} from './constants';

let cardForDel = '';

function createCard(card, userInfo, zoomImage, openPopupConsent, setLikeLogic, deleteLikeLogic) {
  const cardElem = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElem.querySelector('.element__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElem.querySelector('.element__title').textContent = card.name;
  cardElem.id = card._id;

  const buttonLike = cardElem.querySelector('.element__like-button');
  const likeCount = cardElem.querySelector('.element__likes-count');
  const buttonDelete = cardElem.querySelector('.element__remove-button');

  if (card.owner._id === userInfo._id) {
    buttonDelete.addEventListener('click', function () {
      openPopupConsent();
      cardForDel = cardElem;
    })
  } else {
    buttonDelete.remove();
  }

  likeCount.textContent = card.likes.length;

  function setActiveLike(likes, userId, likeElem) {
    likes.forEach(function(elem) {
      if (elem._id === userId) {
        likeElem.classList.add('element__like-button_active')
        return;
      }
    });
  }

  setActiveLike(card.likes, userInfo._id, buttonLike);

  buttonLike.addEventListener('click', function() {
    if (buttonLike.classList.contains('element__like-button_active')) {
      deleteLikeLogic(card._id, likeCount, buttonLike);
    } else {
      setLikeLogic(card._id, likeCount, buttonLike);
    }
  })

  cardImage.addEventListener('click', function () {
    zoomImage(card.name, card.link);
  })
  return cardElem;
}

function removeCard(element) {
  element.remove();
}



export {createCard, cardForDel, removeCard}


