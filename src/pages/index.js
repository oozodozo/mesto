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
  popupDeleteSelector,
  avatarForm,
  popupAvatarSelector,
  avatarSelector,
  avatarEditButton
} from '../utils/constans.js';

// Импорт необходимых компонентов
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api";
import PopupWithDelete from "../components/PopupWithDelete.js";

let userId

const profileValid = new FormValidator(validationConfig, userEditForm); // Экземпляр класса для формы редактирования профиля
const addCardValid = new FormValidator(validationConfig, formAddCard); // Экземпляр класса для формы добавления карточки
const avatarValid = new FormValidator(validationConfig, avatarForm);
const userInfo = new UserInfo({userName: userNameSelector, userAbout: userAboutSelector, userAvatar: avatarSelector});
const popupWithImage = new PopupWithImage(popupZoomImageSelector);
const deletePopup = new PopupWithDelete(popupDeleteSelector);

// Создание экземпляра класса запросов на сервер
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-38',
  headers: {
    authorization: '75746050-6371-4856-a99d-2b542822d433',
    'Content-Type': 'application/json'
  }
});

// Получение имени и описания с сервера
const apiInfo = api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    userId = data._id;
  })
  .catch((err) => {
    console.log(err);
  })

const avatarEditPopup = new PopupWithForm(popupAvatarSelector, (values) => {
  avatarEditPopup.showLoading(true);
  api.updateUserAvatar(values)
    .then((data) => {
      userInfo.setUserAvatar(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarEditPopup.showLoading(false);
      avatarEditPopup.close();
    })
  avatarValid.resetValidation();
});

// Функция отрисовки карточки
const createCard = (data) => {
  const cardElement = new Card({
    data: data,
    handleCardClick: () => {
      popupWithImage.open(data);
    },
    handleCardDelete: () => {
      deletePopup.setSubmitAction(() => {
        deletePopup.showLoading(true);
        api.deleteCard(data._id)
          .then(() => {
            cardElement.deleteCard();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            deletePopup.showLoading(false);
            deletePopup.close();
          })
      })
      deletePopup.open();
    },
    handleLikeClick: () => {
      cardElement.putLike();
    }
  }, '#template-element', api, userId);
  return cardElement.generateCard();
};

// Создание карточек из массива
const initialCardsList = new Section({
  renderer: (data) => {
    initialCardsList.addItem(createCard(data));
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
  popupAddCard.showLoading(true);
  api.addUserCard(values)
    .then((data) => {
      console.log(userId);
      initialCardsList.addItem(createCard(data));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.showLoading(false);
      popupAddCard.close();
    })
  addCardValid.resetValidation();
});

// Создание экземпляра класса popup с обновлением новых данных о пользователе
const popupEditProfile = new PopupWithForm(popupEditSelector, (userData) => {
  popupEditProfile.showLoading(true);
  api.setUserInfo(userData)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.showLoading(false);
      popupEditProfile.close();
    })
});

// Слушатель на кнопку открытия popup добавления фотографии
addElementButton.addEventListener('click', () => {
  addCardValid.resetValidation();
  popupAddCard.showLoading(false);
  popupAddCard.open();
});

// Слушатель на кнопку открытия popup редактирования профиля
profileEditButton.addEventListener('click', () => {
  const {name, about} = userInfo.getUserInfo();
  popupEditProfile.showLoading(false);
  profileValid.resetValidation();
  nameInput.value = name;
  aboutInput.value = about;
  popupEditProfile.open();
});

// Слушатель на кнопку открытия popup редактирования аватара
avatarEditButton.addEventListener('click', () => {
  avatarEditPopup.showLoading(false);
  avatarValid.resetValidation();
  avatarEditPopup.open();
});

popupWithImage.setEventListeners(); // Слушатель на закрытие открытой фотографии
popupAddCard.setEventListeners(); // Слушатель в форме добавления карточки
popupEditProfile.setEventListeners(); // Слушатель в форме редактирования профиля
profileValid.enableValidation(); // Запуск валидации для формы редактирования профиля
addCardValid.enableValidation(); // Запуск валидации для формы добавления карточки
avatarValid.enableValidation(); // Запуск валидации для формы редактирования аватара
avatarEditPopup.setEventListeners(); // Слушатель в форме редактирования аватара
deletePopup.setEventListeners(); // Слушатель в форме удаления картинки
