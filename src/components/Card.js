export default class Card {
  constructor({data, handleCardClick, handleCardDelete, handleLikeClick}, templateSelector, api, userId) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._api = api;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;

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
    this._element.querySelector('.element__like-counter').textContent = this._likes.length;
    if (!(this._ownerId === this._userId)) {
      this._element.querySelector('.element__trash-button').style.display = 'none';
    }
    if (this._likes.find((obj) => this._userId === obj._id)) {
      this._likeButton.classList.add('element__like-button_active');
    }
    return this._element;
  }

  // Метод постановки и удаления лайков
  putLike() {
    const count = this._element.querySelector('.element__like-counter');
    if (!this._likeButton.classList.contains('element__like-button_active')) {
      this._api.putLike(this._id)
        .then((data) => {
          this._likeButton.classList.add('element__like-button_active');
          count.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
        this._api.deleteLike(this._id)
          .then((data) => {
            this._likeButton.classList.remove('element__like-button_active');
            count.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
    }
  }

  // Метод удаления карточки
  deleteCard() {
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
      this._handleLikeClick();
    })

    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._handleCardDelete();
    })
  }
}
