const popups = document.querySelectorAll('.popup');                                 //переменная попапа
const editButton = document.querySelector('.profile__edit-button');                //кнопка открытия попапа

editButton.addEventListener('click', function () {                                 //функция открытия попапа профайла
  popups[0].classList.add('popup_opened');

  popupUserName.value = userName.textContent;
  popupUserProfession.value = userProfession.textContent;
});

const addButton = document.querySelector('.profile__add-button');                  //кнопка закрытия попапа

addButton.addEventListener('click', function () {                                  //функция открытия попапа "новое место"
  popups[1].classList.add('popup_opened');
});


const closeProfile = document.querySelector('#closeProfile');                      //кнопка закрытия попапа профайла
const closePlace = document.querySelector('#closePlace');                          //кнопка закрытия попапа "новое место"
const submitProfile = document.querySelector('#submitProfile');                    //кнопка сохранения в попапе профайла
const submitPlace = document.querySelector('#submitPlace');                        //кнопка сохранения в попапе "новое место"
const closeZoom = document.querySelector('#closeZoom');

function closePopup(element) {                                                     //функция закрытия попапов
  element.classList.remove('popup_opened');
}

closeProfile.addEventListener('click', closePopup.bind(null, popups[0]));
closePlace.addEventListener('click', closePopup.bind(null, popups[1]));
submitProfile.addEventListener('click', closePopup.bind(null, popups[0]));
submitPlace.addEventListener('click', closePopup.bind(null, popups[1]));
closeZoom. addEventListener('click', closePopup.bind(null, popups[2]));

const userName = document.querySelector('.profile__name');                         //имя на сайте
const userProfession = document.querySelector('.profile__profession');             //профессия на сайте
const popupUserName = document.querySelector('#popupUserName');                    //поле ввода имени в попапе профайла
const popupUserProfession = document.querySelector('#popupUserProfession');        //поле ввода "о себе" в попапе профайла
const formElement = document.querySelector('#popupFormProfile');                   //форма попапа профайла


function formSubmitProfile (evt) {                                                 //функция сохранения попапа профайла
  evt.preventDefault();

  userName.textContent = popupUserName.value;
  userProfession.textContent = popupUserProfession.value;
}

formElement.addEventListener('submit', formSubmitProfile);

const initialCards = [                                                             //массив мест
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

const cardsTemplate = document.querySelector('#cardsTemplate').content;
const elements = document.querySelector('.elements');

initialCards.forEach(function(item) {                                                //добавление карточек из нового массива
  const element = cardsTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__image').alt = item.altText;
  element.querySelector('.element__title').textContent = item.name;
  elements.append(element);
})

const popupPlaceName = document.querySelector('#popupPlaceName');                     //поле ввода имени нового места
const popupPlaceUrl = document.querySelector('#popupPlaceUrl');                       //поле ввода ссылки на новое место
const popupFormPlace = document.querySelector('#popupFormPlace');                     //форма попапа нового места

function formSubmitPlace (evt) {                                                      //функция добавления карточек
  evt.preventDefault();

  const element = cardsTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = popupPlaceUrl.value;
  element.querySelector('.element__title').textContent = popupPlaceName.value;
  elements.prepend(element);

  const deleteButton = element.querySelector('.element__remove-button');              //удаление добавленной пользователем карточки
  delCard(deleteButton);

  const likeButton = element.querySelector('.element__like-button');                  //лайк добавленных пользователем карточек
  likeCard(likeButton);

  const allImage = element.querySelector('.element__image');
  zoomImage(allImage)
}

popupFormPlace.addEventListener('submit', formSubmitPlace);

const deleteButtons = document.querySelectorAll('.element__remove-button');            //кнопки удаления карточки

deleteButtons.forEach(function(button) {                                               //удаление карточек
  delCard(button);
})

function delCard(button) {
  button.addEventListener('click', function() {
    const element = button.closest('.element');
    element.remove();
  })
}

const likeButtons = document.querySelectorAll('.element__like-button');                //кнопки лайков

likeButtons.forEach(function(button) {                                                 //лайки карточек
  likeCard(button);
})

function likeCard(button) {
  button.addEventListener('click', function() {
    button.classList.toggle('element__like-button_active');
  })
}

const allImages = document.querySelectorAll('.element__image')

function zoomImage(image) {
  image.addEventListener('click', function() {
    popups[2].classList.add('popup_opened')
    popups[2].querySelector('.popup__image').src = image.src;
    popups[2].querySelector('.popup__caption').textContent = image.alt;
  })
}

allImages.forEach(function(image) {
  zoomImage(image)
})
