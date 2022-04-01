const popup = document.querySelectorAll('.popup');                               //переменная попапа
const popupUserName = document.querySelector('#popupUserName');                  //поле ввода имени в попапе профайла
const popupUserProfession = document.querySelector('#popupUserProfession');      // поле ввода "о себе" в попапе профайла
const submitProfile = document.querySelector('#submitProfile');                  //кнопка сохранения в попапе профайла
const closeProfile = document.querySelector('#closeProfile');                    //кнопка закрытия попапа профайла
const closePlace = document.querySelector('#closePlace');                        //кнопка закрытия попапа "новое место"
const placeName = document.querySelector('#placeName');                          //поле ввода имени нового места
const placeUrl = document.querySelector('#placeUrl');                            //поле ввода ссылки на новое место
const submitPlace = document.querySelector('#submitPlace');                      //кнопка сохранения в попапе "новое место"
const editButton = document.querySelector('.profile__edit-button');              //кнопка открытия попапа
const addButton = document.querySelector('.profile__add-button');                //кнопка закрытия попапа

editButton.addEventListener('click', function () {                               //функция открытия попапа профайла
  popup[0].classList.add('popup_opened');

  const userName = document.querySelector('.profile__name');
  popupUserName.value = userName.textContent;

  const userProfession = document.querySelector('.profile__profession');
  popupUserProfession.value = userProfession.textContent;
});

addButton.addEventListener('click', function () {                                //функция открытия попапа "новое место"
  popup[1].classList.add('popup_opened');
});


function closePopup(element) {                                                   //функция закрытия попапа профайла
  element.classList.remove('popup_opened');
}

closeProfile.addEventListener('click', closePopup.bind(closeProfile, popup[0]));
closePlace.addEventListener('click', closePopup.bind(null, popup[1]));

