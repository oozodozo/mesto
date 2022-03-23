import './index.css';

// Импорт необходимых переменных
import {
  aboutInput,
  addElementButton,
  containerSelector,
  formAddCard,
  nameInput,
  popupAddElementSelector,
  popupEditSelector,
  popupZoomImageSelector,
  profileEditButton,
  userAboutSelector,
  userEditForm,
  userNameSelector,
  validationConfig,
  avatar
} from '../utils/constans.js';

// Импорт необходимых компонентов
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api";

const profileValid = new FormValidator(validationConfig, userEditForm); // Экземпляр класса для формы редактирования профиля
const addCardValid = new FormValidator(validationConfig, formAddCard); // Экземпляр класса для формы добавления карточки
const userInfo = new UserInfo({userName: userNameSelector, userAbout: userAboutSelector});
const popupWithImage = new PopupWithImage(popupZoomImageSelector);

// Создание экземпляра класса запросов на сервер
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-38',
  headers: {
    authorization: '75746050-6371-4856-a99d-2b542822d433',
    'Content-Type': 'application/json'
  }
});

// Функция отрисовки карточки
const createCard = (data) => {
  const cardElement = new Card({
    data: data,
    handleCardClick: () => {
      popupWithImage.open(data);
    }
  }, '#template-element');
  return cardElement.generateCard();
};

// Создание карточек из массива
const initialCardsList = new Section({
  renderer: (element) => {
    initialCardsList.addItem(createCard(element));
  }
}, containerSelector);

// Загрузка картинок с сервера
const initialCards = api.getCards()
  .then((data) => {
    initialCardsList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  })

// Создание новой карточки из формы добавления
const popupAddCard = new PopupWithForm(popupAddElementSelector, (values) => {
  api.addUserCard(values)
    .then((data) => {
      initialCardsList.addItem(createCard(data));
    })
    .catch((err) => {
      console.log(err);
    })
  addCardValid.resetValidation();
});

// Создание экземпляра класса popup с обновлением новых данных о пользователе
const popupEditProfile = new PopupWithForm(popupEditSelector, (userData) => {
  api.setUserInfo(userData)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
});

// Слушатель на кнопку открытия popup добавления фотографии
addElementButton.addEventListener('click', () => {
  addCardValid.resetValidation();
  popupAddCard.open();
});

// Слушатель на кнопку открытия popup редактирования профиля
profileEditButton.addEventListener('click', () => {
  const {name, about} = userInfo.getUserInfo();
  profileValid.resetValidation();
  nameInput.value = name;
  aboutInput.value = about;
  popupEditProfile.open();
});

// Получение имени и описания с сервера
const apiUserInfo = api.getUserInfo()
  .then((data) => {
    console.log(data);
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  })

popupWithImage.setEventListeners(); // Слушатель на закрытие открытой фотографии
popupAddCard.setEventListeners(); // Слушатель в форме добавления карточки
popupEditProfile.setEventListeners(); // Слушатель в форме редактирования профиля
profileValid.enableValidation(); // Запуск валидации для формы редактирования профиля
addCardValid.enableValidation(); // Запуск валидации для формы добавления карточки
