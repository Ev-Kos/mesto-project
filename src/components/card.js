import {initialCards} from './initialCards';
import {cardsTemplate, elements,  popupZoom} from './constants';
import {openPopup} from './modal';

//функция добавления карточек
function createCard(name, link, alt=null) {
  const card = cardsTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = link;
  card.querySelector('.element__image').alt = alt;
  card.querySelector('.element__title').textContent = name;

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
  const image = card.querySelector('.element__image');
  image.addEventListener('click', function() {
    openPopup(popupZoom);
    popupZoom.querySelector('.popup__image').src = link;
    popupZoom.querySelector('.popup__image').alt = alt;
    popupZoom.querySelector('.popup__caption').textContent = name;
  });

  return card;
}

initialCards.forEach(function(item) {
  const card = createCard(item.name, item.link, item.altText);
  elements.append(card);
});

export {createCard}


