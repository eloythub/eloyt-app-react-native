import { create } from 'apisauce';

const apiUrl = {
  dev: 'http://127.0.0.1:8090',
  staging: 'http://api.eloyt.com',
};

export const RequestMethodType = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  put: 'PUT',
  patch: 'PATCH',
}

export default class ApiRepo {
  request(url, method, bodyData) {
    return new Promise(async (fulfill, reject) => {
      await fetch(apiUrl.staging + url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
      })
        .then((response) => response.json())
        .then((responseData) => {
          fulfill(responseData);
        })
        .catch((error) => {
          reject(error.message)
        });
    });
  }
}
