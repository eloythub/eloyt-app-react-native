import { LocalStorage } from 'ideaStudio/common/localStorage';
import ApiRepo, { RequestMethodType } from './api';

const apiRepo = new ApiRepo;

const credentialAccessKey = 'user_credential_access_key';
const userAccessKey       = 'user_access_key';

export default class UsersRepo {
  doLogin(gateway, userData) {
    return new Promise(async (fulfill, reject) => {
      LocalStorage.save(credentialAccessKey, {
        gateway: gateway,
        userData: userData,
      });

      apiRepo.request('/users/create-or-get', RequestMethodType.put, userData)
        .then((res) => {
          if (res.statusCode === 200) {
            LocalStorage.save(userAccessKey, res.data);
          }

          fulfill(res);
        }, (error) => {
          reject(error);
        });
    });
  }

  getLoginInfo() {
    return LocalStorage.load(userAccessKey);
  }

  getLoginCredential() {
    return LocalStorage.load(credentialAccessKey);
  }

  doLogOut() {
    LocalStorage.unload(userAccessKey);
    LocalStorage.unload(credentialAccessKey);
  }
}
