function checkAnswer(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function inactiveBtnSubmit(button) {
  button.classList.add('popup__submit-button_inactive');
  button.setAttribute('disabled','');
}

function renderLoading(isLoading, buttonSubmit, buttonText='Сохранить') {
  if (isLoading) {
    buttonSubmit.textContent = 'Сохранение...';
  }
  else {
    buttonSubmit.textContent = buttonText;
  }
}

export {inactiveBtnSubmit, checkAnswer, renderLoading}
