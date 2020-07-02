const BASE_URL = 'https://thinkful-list-api.herokuapp.com/charmonica/bookmarks';

const get = function () {
  return fetch(BASE_URL)
    .then(response => response.json())
    .then(result => {
      return result;
    });
};

export default {get};