//import './index.css';

// Импорт необходимых переменных
import {
  aboutInput,
  addElementButton,
  formAddCard,
  initialCards,
  nameInput,
  popupZoomImageSelector,
  profileEditButton,
  userAboutSelector,
  userEditForm,
  userNameSelector,
  validationConfig,
  containerSelector,
  popupAddElementSelector,
  popupEditSelector
} from '../utils/constans.js';

// Импорт необходимых компонентов
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";


const profileValid = new FormValidator(validationConfig, userEditForm); // Экземпляр класса для формы редактирования профиля
const addCardValid = new FormValidator(validationConfig, formAddCard); // Экземпляр класса для формы добавления карточки
const userInfo = new UserInfo({userName: userNameSelector, userAbout: userAboutSelector});
const popupWithImage = new PopupWithImage(popupZoomImageSelector);

// Функция отрисовки карточки
const createCard = (data) => {
  return new Card({
    data: data,
    handleCardClick: () => {
      popupWithImage.open(data);
    }
  }, '#template-element');
};

// Создание карточек из массива initialCards
const initialCardsList = new Section({
  data: initialCards,
  renderer: (element) => {
    const card = createCard(element);
    const cardElement = card.generateCard();
    initialCardsList.addItem(cardElement);
  }
}, containerSelector);

// Создание новой карточки из формы добавления
const popupAddCard = new PopupWithForm(popupAddElementSelector, (values) => {
  const card = createCard(values);
  const cardElement = card.generateCard();
  initialCardsList.addItem(cardElement);
  addCardValid.resetValidation();
});

// Создание экземпляра класса popup с сохранением новых данных о пользователе в функции
const popupEditProfile = new PopupWithForm(popupEditSelector, () => {
  userInfo.setUserInfo(nameInput, aboutInput);
});

// Слушатель на кнопку открытия popup добавления фотографии
addElementButton.addEventListener('click', () => {
  addCardValid.resetValidation();
  popupAddCard.open();
});

// Слушатель на кнопку открытия popup редактирования профиля
profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profileValid.resetValidation();
  nameInput.value = userData.name;
  aboutInput.value = userData.info;
  popupEditProfile.open();
});

initialCardsList.renderItems(); // Добавление первых 6-ти карточек на страницу
popupWithImage.setEventListeners(); // Слушатель на закрытие открытой фотографии
popupAddCard.setEventListeners(); // Слушатель в форме добавления карточки
popupEditProfile.setEventListeners(); // Слушатель в форме редактирования профиля
profileValid.enableValidation(); // Запуск валидации для формы редактирования профиля
addCardValid.enableValidation(); // Запуск валидации для формы добавления карточки
