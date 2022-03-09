export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  // Метод получения разметки карточки
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  // Метод наполнения карточки
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._image = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

  // Метод постановки и удаления лайков
  _putLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  // Метод удаления карточки
  _deleteCard() {
    this._element.closest('.element').remove();
  }

  // Метод установки слушателей на карточку
  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick({
        link: this._link,
        name: this._name
      })
    })

    this._likeButton.addEventListener('click', () => {
      this._putLike();
    })

    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._deleteCard()
    })
  }
}
