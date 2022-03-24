export default class UserInfo {
  constructor(userSelectors) {
    this._userName = document.querySelector(userSelectors.userName);
    this._userAbout = document.querySelector(userSelectors.userAbout);
    this._userAvatar = document.querySelector(userSelectors.userAvatar);
  }

  // Получение имени и описания пользователя со страницы
  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }
    return this._userData;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userAbout.textContent = userData.about;
    this.setUserAvatar(userData);
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }
}
