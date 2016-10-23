import { LocalStorage } from 'ideaStudio/common/localStorage';
import ApiRepo, { RequestMethodType } from './api';

const apiRepo = new ApiRepo;

const accessKey = 'user_access_key';

export default class UsersRepo {
  doLogin(gateway, userData) {
    return new Promise(async (fulfill, reject) => {
      LocalStorage.save(accessKey, {
        gateway: gateway,
        userData: userData,
      });

      apiRepo.request('/users/create-or-get', RequestMethodType.put, userData)
        .then((data) => {
          fulfill(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getLoginInfo() {
    return LocalStorage.load(accessKey);
  }

  doLogOut() {
    return LocalStorage.unload(accessKey);
  }
}
