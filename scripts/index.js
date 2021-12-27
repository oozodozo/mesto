let popup = document.querySelector('.popup'); //popup
let profileEditButton = document.querySelector('.profile__edit-button'); // кнопка вызова popup
let popupReset = document.querySelector('.popup__reset-button'); // кнопка закрытия popup
let formElement = document.querySelector('.popup__form'); // форма редактирование имени
let nameImput = formElement.querySelector('.popup__user-name'); // input для ввода имени
let jobInput = formElement.querySelector('.popup__user-about'); // input для описание пользователя
let userName = document.querySelector('.profile__title'); // имя пользователья на странице
let userJob = document.querySelector('.profile__description'); // описание пользователя на странице

/* После вашего коментария пересмотрел необходимость вообще использовать if и else в данной функции.
   За счет "toggle" отпадает необходимость усложнять функцию конструкциями if и else. В данной работе
   вызов popup осущетвлен только через кнопку редактирования, поэтому нет необходимости заставлять функцию
   проверять есть ли необходимый класс или нет дважды, потому что toogle делает это сам. */

// Функция на откртие и закрытие popup
function popupToggle () {
    popup.classList.toggle('popup_opened');
    nameImput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

//Функция на сохранение имени и описания
function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameImput.value;
  userJob.textContent = jobInput.value;
  popupToggle();
}

profileEditButton.addEventListener('click', popupToggle); // Кнопка открытия popup
popupReset.addEventListener('click', popupToggle); // Кнопка закрытия popup
formElement.addEventListener('submit', formSubmitHandler); // Кнопка сохранения информации о себе

// Добавил возможность закрывать popup по клику на фон вне формы popup
popup.addEventListener('click', function(event) {
  if (event.target === popup) {
    popup.classList.remove('popup_opened');
  }
});

// Добавил возможность закрывать popup по нажатию клавиши Escape
document.addEventListener('keydown', function(event) {
  if (event.code === 'Escape') {
    popup.classList.remove('popup_opened');
  }
});


