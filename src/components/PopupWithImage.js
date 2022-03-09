import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Открытие popup с большой фотографией
  open(values) {
    super.open();
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
    this._popupImage.src = values.link;
    this._popupImage.alt = values.name;
    this._popupFigcaption.textContent = values.name;
  }
}
