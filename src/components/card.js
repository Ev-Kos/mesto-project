import {initialCards} from './initialCards';
import {cardsTemplate, elements,  popupZoom, popupZoomImage} from './constants';
import {openPopup} from './modal';

//функция добавления карточек
//function createCard(name, link, alt=null)
function createCard(cards = {}, alt=null) {
  const card = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  card.querySelector('.element__title').textContent = cards.name;

  //удаление карточек
  const buttonDelete = card.querySelector('.element__remove-button');

  buttonDelete.addEventListener('click', function() {
    const element = buttonDelete.closest('.element');
    element.remove();
  });

  //лайки карточек
  const buttonLike = card.querySelector('.element__like-button');

  buttonLike.addEventListener('click', function() {
    buttonLike.classList.toggle('element__like-button_active');
  });

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

export {createCard, showCard}


