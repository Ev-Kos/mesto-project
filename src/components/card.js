import {cardsTemplate} from './constants';
import {setLike, deleteLike} from './api';

let cardForDel = '';

function createCard(card, userInfo, zoomImage, DelBtn) {
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
    buttonDelete.addEventListener('click', function() {
      DelBtn();
      cardForDel = cardElem;
    });
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
        deleteLike(card._id)
          .then((data) => {
            likeCount.textContent = data.likes.length;
            buttonLike.classList.remove('element__like-button_active');
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        setLike(card._id)
          .then((data) => {
            likeCount.textContent = data.likes.length;
            buttonLike.classList.add('element__like-button_active');
          })
          .catch(err => {
            console.log(err);
          })
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


