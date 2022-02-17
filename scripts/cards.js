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

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // Метод получения разметки карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // Метод наполнения карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }


  // Метод открытия popup с большой фотографией
  _openBigImage() {
    openPopup(popupZoomImage);
    zoomImage.src = this._link;
    zoomImage.alt = this._name;
    imageFigcaption.textContent = this._name;
  }

  // Метод постановки и удаления лайков
  _putLike() {
    this._element
    .querySelector('.element__like-button')
    .classList.toggle('element__like-button_active');
  }

  // Метод удаления карточки
  _deleteCard() {
    this._element.closest('.element').remove();
  }

  // Метод установки слушателей на карточку
  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openBigImage();
    })

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._putLike();
    })

    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._deleteCard()
    })
  }
}
