export default class UserInfo {
  constructor(userSelectors) {
    this._userName = document.querySelector(userSelectors.userName);
    this._userAbout = document.querySelector(userSelectors.userAbout);
  }

  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      info: this._userAbout.textContent
    }
    return this._userData;
  }

  setUserInfo(inputUserName, inputUserAbout) {
    this._userName.textContent = inputUserName.value;
    this._userAbout.textContent = inputUserAbout.value;
  }
}
