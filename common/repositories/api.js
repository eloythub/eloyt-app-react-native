const apiUrl = {
  dev: 'http://127.0.0.1:8090',
  staging: 'http://api.eloyt.com',
};

const apiUrlSelector = 'staging';

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
      await fetch(apiUrl[apiUrlSelector] + url, {
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

  postWithProgress(url, opts={}, onProgress, afterSend) {
    return new Promise((fulfill, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(opts.method || 'get', apiUrl[apiUrlSelector] + url);

        for (var k in opts.headers || {}) {
          xhr.setRequestHeader(k, opts.headers[k]);
        }

        xhr.onload = e => fulfill(e.target);

        xhr.onerror = reject;

        if (xhr.upload && onProgress) {
            xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
        }

        xhr.send(opts.body);

        afterSend(xhr);
    });
  }

}
