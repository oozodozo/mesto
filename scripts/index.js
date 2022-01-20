const popupEdit = document.querySelector('.popup_edit-profile'); //popup
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка вызова popup
const popupEditReset = document.querySelector('.popup__edit-reset-button'); // кнопка закрытия popup
const userEditForm = document.querySelector('.popup__form'); // форма редактирование имени
const nameInput = userEditForm.querySelector('.popup__user-name'); // input для ввода имени
const jobInput = userEditForm.querySelector('.popup__user-about'); // input для описания пользователя
const userName = document.querySelector('.profile__title'); // имя пользователя на странице
const userJob = document.querySelector('.profile__description'); // описание пользователя на странице
const popupAddElement = document.querySelector('.popup_add-element'); // popup добавление карточки
const addElementButton = document.querySelector('.profile__add-button'); // кнопка открытия popup с добавлением карточки
const popupAddElementReset = document.querySelector('.popup__reset-add-button'); //  кнопка закрытия popupAdd
const popupAddElementSubmit = document.querySelector('.popup__button-element-submit'); // кнопка сохранения
const popupAddTitleInput = document.querySelector('.popup__place-title'); // поле ввода названия фотографии
const popupAddImageLink = document.querySelector('.popup__image-link'); // поле ввода ссылки на фотографию
const elementTemplate = document.querySelector('#template-element').content; // Элемент template для карточек
const elements = document.querySelector('.elements'); // Блок elements
const popupZoomImage = document.querySelector('.popup_zoom-image'); // popup с большой фотографией
const zoomImage = document.querySelector('.popup__image'); // Большая фотография
const imageFigcaption = document.querySelector('.popup__figcaption'); // Подпись под фотографией
const closedButton = popupZoomImage.querySelector('.popup__reset-button'); // Кнопка закрытия popupZoomImage

// Функция закрытия popup по нажатию на ESC
function closePopupKeydownEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция закрытия popup по клику на overlay
function closePopupClickOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',closePopupKeydownEsc); // Слушатель на закрытие по ESC
  document.addEventListener('click', closePopupClickOverlay); // Слушатель на закрытие по overlay

}

// функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // Снимаем слушателя, так как он не нужен без открытого popup
  document.removeEventListener('keydown',closePopupKeydownEsc);
  document.removeEventListener('click', closePopupClickOverlay);
}

// Функция формирования карточки
function createCard (link, name) {
  const elementCard = elementTemplate.cloneNode(true);
  const elementImage = elementCard.querySelector('.element__image');
  elementImage.src = link;
  elementImage.alt = name;
  elementCard.querySelector('.element__title').textContent = name;

  // Открытие большой фотографии
  elementImage.addEventListener('click', function() {
    openBigImage(link, name);
  })

  // Постановка или удаление лайка
  const likeElement = elementCard.querySelector('.element__like-button');
  likeElement.addEventListener('click', function() {
    likeElement.classList.toggle('element__like-button_active');
  });

  // Удаление карточки по нажатию на иконку
  const deleteElement = elementCard.querySelector('.element__trash-button');
  deleteElement.addEventListener('click', function() {
    const deleteCard = deleteElement.closest('.element');
    deleteCard.remove();
  });

  return elementCard;
}

// Функция открытия popup с большой фотографией
function openBigImage(link, name) {
  openPopup(popupZoomImage);
  zoomImage.src = link;
  zoomImage.alt = name;
  imageFigcaption.textContent = name;
}

// Функция добавления карточки на страницу
function insertElement(element) {
  const elementCard = createCard(element.link, element.name);
  elements.prepend(elementCard);
}

// Загрузка 6 карточек из массива
initialCards.forEach(function (item) {
  insertElement(item);
});

// Функция получения текста input в форме редактирования
function receivingInputsPopupEdit() {
  nameInput.value = userName.textContent;
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

//Функция на сохранение имени и описания
function handlePopupEditForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Функция очистки полей ввода в popup добавления карточки
function resetInputsPopupAdd() {
  const addForm = popupAddElement.querySelector('.popup__form');
  addForm.reset();
}

// Кнопка закрытия popupZoomImage
closedButton.addEventListener('click', function() {
  closePopup(popupZoomImage);
});

// Функция деактивации кнопки Отправить при повторном открытии popup
function disabledButtonSubmit(popup) {
  const buttonSubmit = popup.querySelector('.popup__button-submit');
  buttonSubmit.classList.add('popup__button-submit_disabled');
}

// Кнопка закрытия popupZoomImage
closedButton.addEventListener('click', function() {
  closePopup(popupZoomImage);
});

// Функция обнуления ошибок при повторном открытии popup
function resetError(popup) {
  const inputElements = Array.from(popup.querySelectorAll('.popup__input'));
  const errorElements = Array.from(popup.querySelectorAll('.popup__error'));
  // Удаляем подчеркивание ошибки
  inputElements.forEach((inputElement) => {
    if (inputElement.classList.contains('popup__input_type_error')) {
      inputElement.classList.remove('popup__input_type_error');
    }
  });
  // Удаляем активный класс ошибки и ее содержание
  errorElements.forEach((errorElement) => {
    if (errorElement.classList.contains('popup__error_visible')) {
      errorElement.classList.remove('popup__error_visible');
      errorElement.textContent = '';
    }
  });
}

// Кнопка открытия popup редактирования профиля
profileEditButton.addEventListener('click', function() {
  openPopup(popupEdit);
  disabledButtonSubmit(popupEdit);
  resetError(popupEdit);
  receivingInputsPopupEdit();
});

// Кнопка закрытия popup редактирования профиля
popupEditReset.addEventListener('click', function() {
  closePopup(popupEdit);
});

// Кнопка сохранения информации о себе
userEditForm.addEventListener('submit', handlePopupEditForm);

// Кнопка открытия popupAddElement
addElementButton.addEventListener('click', function() {
  openPopup(popupAddElement);
  disabledButtonSubmit(popupAddElement);
  resetError(popupAddElement);
  resetInputsPopupAdd();
});

// Кнопка закрытия popupAddElement
popupAddElementReset.addEventListener('click', function() {
  closePopup(popupAddElement);
});

// Добавление карточки внутри popupAddElement
popupAddElementSubmit.addEventListener('click', function(evt) {
  evt.preventDefault();
  const cardData = {
    link: popupAddImageLink.value,
    name: popupAddTitleInput.value
  }
  insertElement(cardData);
  closePopup(popupAddElement);
});
