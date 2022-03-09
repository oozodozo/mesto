export default class UserInfo {
  constructor(userSelectors) {
    this._userName = document.querySelector(userSelectors.userName);
    this._userAbout = document.querySelector(userSelectors.userAbout);
  }

  // Получение имени и описания пользователя со страницы
  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      info: this._userAbout.textContent
    }
    return this._userData;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.nameUser;
    this._userAbout.textContent = userData.aboutUser;
  }
}
