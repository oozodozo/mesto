
![Логотип проекта](./src/images/logo.svg)

### Яндекс.Практикум

---

## Описание:

Одностраничный сайт позволяющий делиться своими фотографиями, ставить лайки и редактировать информацию о себе.
  С возможностью открывать фотографии в большом размере.
  Все формы на странице имеют проверку на валидность.
___
  Используются классы в JavaScript:
###### {class Card}
  Данный класс управляет карточками на странице. Имеет приватные методы для работы внутри класса. И один публичный отвечающий за отрисовку разметки новой карточки.

###### {class FormValidator}
  Данный класс управляет валидацией всех форм на странице. Имеет приватные методы для установки правил валидации. И один публичный для включения валидации на странице.
###### {class Popup} {class PopupWithForm} {class PopupWithImage}
  Данные классы управляют всем содержимом popup. Наследуют методы у родителя - class Popup. Так же дополняют их своими методами, для более гибкой работы.
###### {class Section}
  Данный класс отвечает исключительно за добавление новых карточек на страницу.
###### {class UserInfo}
  Данный класс отвечает за сохранение информации внутри popup редактирования профиля.
  ___

  Все файлы собираются за счет Webpack.

 Адаптирован на разрешения от **320px** до **1280px**.
 Свыше 1280px - сайт остается в этом размере, но расположен в центре страницы.

 Разрабатывался по макету Figma.

 ---

## Написан на:

![Логотип](https://i.ibb.co/5M9WzQ7/icon-120px-js-html-css.png)

---

## Применялось:

+ **Flexbox**
+ **Grid Layout**
+ **БЭМ струтура**
+ **Медиазапросы**
+ **Относительные величины**
+ **JavaScript** *для создания интерактивных форм*
+ **JavaScript** *для управления элементами DOM*
+ **Webpack** *для сборки проекта*

---

## В планах:

+ Развить проект добавив больше интерактивности за счет JavaScript

---

---

 По всем вопросам можно написать мне на почту:
 **<oozo1101@gmail.com>**
