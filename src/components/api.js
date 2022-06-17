import {checkAnswer} from './utils';

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
  .then(res => checkAnswer(res))
}

//Загрузка карточек с сервера

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => checkAnswer(res))
}

//Редактирование профиля

function setUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => checkAnswer(res))
}

//Добавление новой карточки

function addNewCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(res => checkAnswer(res))
}

//Удаление карточки

function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers
  })
  .then(res => checkAnswer(res))
}

//Постановка и снятие лайка

function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => checkAnswer(res))
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkAnswer(res))
}

//Обновление аватара пользователя

function newAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => checkAnswer(res))
}

export {
  getUserInfo,
  getCards,
  setUserInfo,
  addNewCard,
  deleteCard,
  setLike,
  deleteLike,
  newAvatar}



