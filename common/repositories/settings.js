import { LocalStorage } from 'ideaStudio/common/localStorage';
import ApiRepo, { RequestMethodType } from './api';

import UsersRepo from './users';
const userRepo = new UsersRepo();

const apiRepo = new ApiRepo;

const accessKey = 'settings_access_key';

export default class SettingsRepo {
  save(key, value) {
    return new Promise(async (fulfill, reject) => {
      LocalStorage.save(accessKey, {
        key: value,
      });

      const userInfo = userRepo.getLoginInfo().then((userInfo) => {
        apiRepo.request('/settings/' + userInfo._id, RequestMethodType.patch, {
          key: value,
        }).then((data) => {
          fulfill(data);
        }, reject);
      }, reject);
    });
  }

  load() {
    return LocalStorage.load(accessKey);
  }

  cleanUp() {
    return LocalStorage.unload(accessKey);
  }

  loadFromServer() {
    return new Promise(async (fulfill, reject) => {
      userRepo.getLoginInfo().then((userInfo) => {
        apiRepo.request('/settings/' + userInfo._id, RequestMethodType.get)
          .then((data) => {
            LocalStorage.save(accessKey, data);

            fulfill();
          }, reject);
      }, reject);
    });
  }
}
