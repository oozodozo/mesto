import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
  }

  open(values) {
    super.open();
    this._popupImage.src = values._link;
    this._popupImage.alt = values._name;
    this._popupFigcaption.textContent = values._name;
  }
}
