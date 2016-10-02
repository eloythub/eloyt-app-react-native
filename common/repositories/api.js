const apiUrl = {
  dev: 'http://73d3b182.ngrok.io',
  production: 'api.idea-studio.eloyt.com',
};

export const RequestMethodType = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  put: 'PUT',
}

export default class ApiRepo {
  request(url, method, bodyData) {
    return new Promise(async (fulfill, reject) => {
      await fetch(apiUrl.dev + url, {
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
