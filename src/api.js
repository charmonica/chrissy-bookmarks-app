const BASE_URL = 'https://thinkful-list-api.herokuapp.com/charmonica';

function listApiFetch(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      console.log(res);
      if (!res.ok) {
        error = { code: res.status };
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}

const get = function () {
  return listApiFetch(`${BASE_URL}/bookmarks`);
};

const createNewBookmark = function(title, url, rating, desc) {
  let newBookmark = {
    title: title,
    url: url,
    desc: desc,
    rating: rating
  };

  console.log(newBookmark);
  return listApiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBookmark)
  });
};

const deleteBookmark = function(id) {
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
};

export default {
  get,
  createNewBookmark,
  deleteBookmark
};