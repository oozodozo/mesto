export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Перебор массива из data функцией из renderer
  renderItems(arr) {
    arr.reverse().forEach(item => {
      this._renderer(item);
    });
  }

  // Добавление элемента в секцию
  addItem(element) {
    this._container.prepend(element);
  }
}
