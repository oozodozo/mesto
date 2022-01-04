const popupEdit = document.querySelector('.popup_edit-profile'); //popup
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка вызова popup
const popupEditReset = document.querySelector('.popup__edit-reset-button'); // кнопка закрытия popup
const formElement = document.querySelector('.popup__form'); // форма редактирование имени
const nameImput = formElement.querySelector('.popup__user-name'); // input для ввода имени
const jobInput = formElement.querySelector('.popup__user-about'); // input для описания пользователя
const userName = document.querySelector('.profile__title'); // имя пользователя на странице
const userJob = document.querySelector('.profile__description'); // описание пользователя на странице
const popupAddElement = document.querySelector('.popup_add-element'); // popup добавление карточки
const addElementButton = document.querySelector('.profile__add-button'); // кнопка открытия popup с добавлением карточки
const popupAddElementReset = document.querySelector('.popup__reset-add-button'); //  кнопка закрытия popupAdd
const popupAddElementSubmit = document.querySelector('.popup__button-element-submit'); // кнопка сохранения
const popupAddTitleImput = document.querySelector('.popup__place-title'); // поле ввода названия фотографии
const popupAddImageLink = document.querySelector('.popup__image-link'); // поле ввода ссылки на фотографию
const elementTemplate = document.querySelector('#template-element').content; // Элемент template для карточек
const elements = document.querySelector('.elements'); // Блок elements
const popupZoomImage = document.querySelector('.popup_zoom-image'); // popup с большой фотографией
const zoomImage = document.querySelector('.popup__image'); // Большая фотография
const imageFigcaption = document.querySelector('.popup__figcaption'); // Подпись под фотографией

// Массив первых 6-ти карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция формирования карточки
function addElement (link, name) {
  const elementCard = elementTemplate.cloneNode(true);
  elementCard.querySelector('.element__image').src = link;
  elementCard.querySelector('.element__image').alt = name;
  elementCard.querySelector('.element__title').textContent = name;
  return elementCard;
}
// Функция добавления карточки на страницу
function insertElement(element) {
  const elementCard = addElement(element.link, element.name);
  elements.prepend(elementCard);
}

// Загрузка 6 карточек из массива
initialCards.forEach(function (item) {
  const elementPhotoCard = addElement(item.link, item.name);
  elements.prepend(elementPhotoCard);
});

// Открытие/закрытие popupAddElement
function popupAddToggle () {
  popupAddElement.classList.toggle('popup_opened');
  popupAddImageLink.value = '';
  popupAddTitleImput.value = '';
}

// Добавление карточки из popup
popupAddElementSubmit.addEventListener('click', function(evt){
  evt.preventDefault();
  const createUserElement = {
    link: popupAddImageLink.value,
    name: popupAddTitleImput.value
  }
  insertElement(createUserElement);
  popupAddToggle();
});

// Функция на открытие и закрытие popupEdit
function popupEditToggle () {
  popupEdit.classList.toggle('popup_opened');
  nameImput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

//Функция на сохранение имени и описания
function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameImput.value;
  userJob.textContent = jobInput.value;
  popupEditToggle();
}

profileEditButton.addEventListener('click', popupEditToggle); // Кнопка открытия popup
popupEditReset.addEventListener('click', popupEditToggle); // Кнопка закрытия popup
formElement.addEventListener('submit', formSubmitHandler); // Кнопка сохранения информации о себе
addElementButton.addEventListener('click', popupAddToggle); // Кнопка открытия popupAddElement
popupAddElementReset.addEventListener('click', popupAddToggle); // Кнопка закрытия popupAddElement

// Добавил возможность закрывать popupEdit по клику на фон вне формы popup
popupEdit.addEventListener('click', function(event) {
  if (event.target === popupEdit) {
    popupEdit.classList.remove('popup_opened');
  }
});

// Добавил возможность закрывать popupEdit по нажатию клавиши Escape
document.addEventListener('keydown', function(event) {
  if (event.code === 'Escape') {
    popupEdit.classList.remove('popup_opened');
  }
});

// Добавил возможность закрывать popupEdit по клику на фон вне формы popup
popupAddElement.addEventListener('click', function(event) {
  if (event.target === popupAddElement) {
    popupAddElement.classList.remove('popup_opened');
  }
});

// Добавил возможность закрывать popupAddElement по нажатию клавиши Escape
document.addEventListener('keydown', function(event) {
  if (event.code === 'Escape') {
    popupAddElement.classList.remove('popup_opened');
  }
});

// Функция удаления карточки
function deleteElement(evt) {
  if (evt.target.matches('.element__trash-button')) {
    const cardDelete = evt.target.closest('.element');
    cardDelete.remove();
  }
}

// Повесил слушателя на весь блок elements для отслеживания всех кнопок delete
elements.addEventListener('click', deleteElement);

// Функция постановки/удаления лайка
function likeElement(evt) {
  if (evt.target.matches('.element__like-button')) {
    evt.target.classList.toggle('element__like-button_active');
  }
}

// Повесил слушателя на весь блок elements что бы отслеживать все лайки
elements.addEventListener('click', likeElement);

// Функция открытия popup с большой фотографией
function popupBigImage(evt) {
  if (evt.target.matches('.element__image')) {
    popupZoomImage.classList.add('popup_opened');
    const imageZoom = evt.target;
    const figcaption = imageZoom.nextElementSibling;
    zoomImage.src = imageZoom.src;
    zoomImage.alt = figcaption.textContent;
    imageFigcaption.textContent = figcaption.textContent;
  }
  // Повесил слушателя для закрытия popup через кнопку reset и по клику на overlay
  popupZoomImage.addEventListener('click', function(evt) {
    if (evt.target.matches('.popup__reset-button') || evt.target.matches('.popup_zoom-image')) {
      popupZoomImage.classList.remove('popup_opened');
    }
  });
  // Повесил слушателя что бы закрывать popup по нажатию esc
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape') {
      popupZoomImage.classList.remove('popup_opened');
    }
  });
}
// Повесил слушателя на весь блок elements что бы открывать popup по клику на картинку
elements.addEventListener('click', popupBigImage);
