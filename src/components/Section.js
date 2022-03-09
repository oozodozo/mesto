export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Перебор массива из data функцией из renderer
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  // Добавление элемента в секцию
  addItem(element) {
    this._container.prepend(element);
  }
}
