import { LocalStorage } from 'eloyt/common/localStorage';

import ApiRepo, { RequestMethodType } from './api';

const apiRepo = new ApiRepo;

export default class StreamRepo {
  fetchProducedResources(userId, offset) {
    return new Promise(async (fulfill, reject) => {
      apiRepo.request(`/stream/produce/${userId}/${offset}`, RequestMethodType.get)
        .then((res) => {
          if (res.statusCode !== 200) {
            return reject();
          }

          fulfill(res);
        }, (error) => {
          reject(error);
        });
    });
  }
}
