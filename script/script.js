const initialCards = [                                                               //массив мест
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    altText: 'Фотография гор Архыза.'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    altText: 'Фотография заснеженного берега реки в Челябинской области'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    altText: 'Фотография домов в Иваново.'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    altText: 'Фотография горы на Камчатке.'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    altText: 'Фотография железнодорожного пути.'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    altText: 'Фотография зимнего берега байкала.'
  }
  ];

const editButton = document.querySelector('.profile__edit-button');                //кнопка открытия попапа
const popupProfile = document.querySelector('#popupProfile');                      //попап редактирования профиля
const popupPlace = document.querySelector('#popupPlace');                          //попап добавления нового места
const popupZoom = document.querySelector('#popupZoom');                            //попап увеличения картинки

function openPopup(popup) {                                                        //функция открытия попапов
  popup.classList.add('popup_opened');
}

const userName = document.querySelector('.profile__name');                         //имя на сайте
const userProfession = document.querySelector('.profile__profession');             //профессия на сайте
const popupUserName = document.querySelector('#popupUserName');                    //поле ввода имени в попапе профайла
const popupUserProfession = document.querySelector('#popupUserProfession');        //поле ввода "о себе" в попапе профайла

editButton.addEventListener('click', function () {                                  //функция открытия попапа профайла
  openPopup(popupProfile);
  popupUserName.value = userName.textContent;
  popupUserProfession.value = userProfession.textContent;
});

const addButton = document.querySelector('.profile__add-button');                  //кнопка открытия попапа новое место

addButton.addEventListener('click', () => openPopup(popupPlace));                  //функция открытия попапа "новое место

const profileClose = document.querySelector('#closeProfile');                      //кнопка закрытия попапа профайла
const placeClose = document.querySelector('#closePlace');                          //кнопка закрытия попапа "новое место"
const zoomClose = document.querySelector('#closeZoom');                            //кнопка закрытия попапа увеличения картинки

function closePopup(popup) {                                                       //функция закрытия попапов
  popup.classList.remove('popup_opened');
}

profileClose.addEventListener('click', () => closePopup(popupProfile));
placeClose.addEventListener('click', () => closePopup(popupPlace));
zoomClose.addEventListener('click', () => closePopup(popupZoom));


const formElementProfile = document.querySelector('#popupFormProfile');             //форма попапа профайла


function formSubmitProfile (evt) {                                                  //функция сохранения и закрытия попапа профайла
  evt.preventDefault();

  userName.textContent = popupUserName.value;
  userProfession.textContent = popupUserProfession.value;

  closePopup(popupProfile);
}

formElementProfile.addEventListener('submit', formSubmitProfile);

const cardsTemplate = document.querySelector('#cardsTemplate').content;               //получение содержимого массива
const elements = document.querySelector('.elements');                                 //секция расположения карточек

function createCard(name, link, alt=null) {                                           //функция добавления карточек
  const card = cardsTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = link;
  card.querySelector('.element__image').alt = alt;
  card.querySelector('.element__title').textContent = name;

  const buttonDelete = card.querySelector('.element__remove-button');                 //удаление карточек

  buttonDelete.addEventListener('click', function() {
    const element = buttonDelete.closest('.element');
    element.remove();
  });

  const buttonLike = card.querySelector('.element__like-button');                     //лайки карточек

  buttonLike.addEventListener('click', function() {
    buttonLike.classList.toggle('element__like-button_active');
  });

  const image = card.querySelector('.element__image');                                //открытие картинки
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

const popupPlaceName = document.querySelector('#popupPlaceName');                     //поле ввода имени нового места
const popupPlaceUrl = document.querySelector('#popupPlaceUrl');                       //поле ввода ссылки на новое место
const popupFormPlace = document.querySelector('#popupFormPlace');                     //форма попапа нового места

function formSubmitPlace (evt) {                                                      //функция сохранения и закрытия попапа карточек
  evt.preventDefault();

  const element = createCard(popupPlaceName.value, popupPlaceUrl.value);
  elements.prepend(element);

  closePopup(popupPlace);

  evt.target.reset();
}

popupFormPlace.addEventListener('submit', formSubmitPlace);
