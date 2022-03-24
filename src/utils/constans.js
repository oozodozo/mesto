const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка открытия popup редактирования профиля
const userEditForm = document.querySelector('.popup__form'); // форма редактирование пользователя
const nameInput = userEditForm.querySelector('.popup__user-name'); // input имени пользователя
const aboutInput = userEditForm.querySelector('.popup__user-about'); // input описания пользователя
const popupAddElement = document.querySelector('.popup_add-element'); // popup добавление карточки
const addElementButton = document.querySelector('.profile__add-button'); // кнопка открытия popup с добавлением карточки
const formAddCard = popupAddElement.querySelector('.popup__form'); // Форма popup добавления фотографии
const popupAvatarEdit = document.querySelector('.popup_edit-avatar');
const avatarForm = popupAvatarEdit.querySelector('.popup__form');
const avatarEditButton = document.querySelector('.profile__avatar-button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Переменные с селекторами
const userNameSelector = '.profile__title';
const userAboutSelector = '.profile__description';
const popupZoomImageSelector = '.popup_zoom-image';
const containerSelector = '.elements';
const popupAddElementSelector = '.popup_add-element';
const popupEditSelector = '.popup_edit-profile';
const popupDeleteSelector = '.popup_delete-element';
const popupAvatarSelector = '.popup_edit-avatar';
const avatarSelector = '.profile__avatar';

// Экспорт необходимых переменных
export {
  aboutInput,
  addElementButton,
  formAddCard,
  nameInput,
  popupZoomImageSelector,
  profileEditButton,
  userAboutSelector,
  userEditForm,
  userNameSelector,
  validationConfig,
  containerSelector,
  popupAddElementSelector,
  popupEditSelector,
  popupDeleteSelector,
  avatarForm,
  popupAvatarSelector,
  avatarSelector,
  avatarEditButton
}
