import { LocalStorage } from 'ideaStudio/common/localStorage';

const accessKey = 'user_access_key';

export default class UsersRepo {
  doLogin(gateway, userData) {
    LocalStorage.save(accessKey, {
      gateway: gateway,
      userData: userData,
    });
  }

  getLoginInfo() {
    return LocalStorage.load(accessKey);
  }

  doLogOut() {
    return LocalStorage.unload(accessKey);
  }
}
