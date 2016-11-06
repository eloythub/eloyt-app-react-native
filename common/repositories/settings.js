import { LocalStorage } from 'ideaStudio/common/localStorage';
import ApiRepo, { RequestMethodType } from './api';

import UsersRepo from './users';
const userRepo = new UsersRepo();

const apiRepo = new ApiRepo;

const accessKey = 'settings_access_key';

export default class SettingsRepo {
  save(key, value) {
    return new Promise(async (fulfill, reject) => {
      let data  = {};
      data[key] = value;

      LocalStorage.save(accessKey, data);

      const userInfo = userRepo.getLoginInfo().then((userInfo) => {
        apiRepo.request(
          '/settings/' + userInfo._id,
          RequestMethodType.patch,
          data
        ).then((res) => {
          fulfill(res.data);
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
          .then((res) => {
            LocalStorage.save(accessKey, res.data);

            fulfill(res.data);
          }, reject);
      }, reject);
    });
  }
}
