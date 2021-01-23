import { SERVER_HOST, SERVER_PORT } from "@env"

const url = `http://${SERVER_HOST}${SERVER_PORT ? `:${SERVER_PORT}` : ''}`;

function parseJSON(response) {
  return new Promise(async (resolve) => {
    let body;
    try {
      body = await response.json();
    } catch {
      body = {};
    }
    resolve({status: response.status, body});
  })
}

function checkStatus(response) {
  if(response.status >= 200 && response.status < 300) {
    return response.body;
  }
  throw new Error(response.body.error);
}

function request(path, options) {
  if(!SERVER_HOST) {
    console.error('SERVER_HOST environment variable must be set in a .env file at the root level of this repository.');
  }
  return fetch(`${url}${path}`, options)
    .then(parseJSON)
    .then(checkStatus);
}

function getRequestOptions(type, payload) {
  if (type === 'get' || type === 'delete') {
    return {
      method: type,
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      },
    };
  }
  return {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
    body: JSON.stringify(payload),
  };
}

export { request, getRequestOptions };