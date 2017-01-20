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
};

export default class ApiRepo {
  request(url, method, bodyData) {
    return new Promise(async (fulfill, reject) => {
      await fetch(this.url(url), {
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

        xhr.open(opts.method || 'get', this.url(url));

        for (let k in opts.headers || {}) {
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

  url(url) {
    return apiUrl[apiUrlSelector] + url
  }

  resourceStreamUrl(userId, resourceType, resourceId) {
    return this.url(`/stream/${userId}/${resourceType}/${resourceId}`);
  }
}
