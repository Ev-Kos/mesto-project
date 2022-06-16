import {renderLoading, inactiveBtnSubmit} from './utils';
import {popupProfile, popupPlace} from './constants';
import {closePopup} from './modal';
import {showCard, createCard} from './card';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'cb3d9f20-e882-44f9-862b-5c98290433e7',
    'Content-Type': 'application/json'
  }
}

//Загрузка информации о пользователе с сервера

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result
  })
  .catch((err) => {
    console.log(err);
  });
}

//Загрузка карточек с сервера

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result
  })
  .catch((err) => {
    console.log(err);
  });
}

//Редактирование профиля

function setUserInfo(name, about) {
  fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
  })
  .then((res) => {
    renderLoading(true);
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false);
  })
  .finally(() => {
    closePopup(popupProfile)
  })
  .finally(() => {
    inactiveBtnSubmit(popupProfile)
  })
}

//Добавление новой карточки

function addNewCard(card, user) {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then((res) => {
    if (res.ok) {
      renderLoading(true);
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .then((result) => {
    showCard(createCard(result, user))
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false);
  })
  .finally(() => {
    closePopup(popupPlace)
  })
  .finally(() => {
    inactiveBtnSubmit(popupPlace)
  })
}

//Удаление карточки

function deleteCard(id) {
  fetch(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((err) => {
    console.log(err);
  })
}

//Постановка и снятие лайка

function setLike(cardId, likeCount) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .then((data) => {
    likeCount.textContent = data.likes.length
  })
  .catch((err) => {
    console.log(err);
  })
}

function deleteLike(cardId, likeCount) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .then((data) => {
    likeCount.textContent = data.likes.length
  })
  .catch((err) => {
    console.log(err);
  })
}

export {getUserInfo, getCards, setUserInfo, addNewCard, deleteCard, setLike, deleteLike}



