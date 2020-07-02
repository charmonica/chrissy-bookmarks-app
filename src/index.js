//Primary JS file
import api from './api.js';
import store from './store.js';
import bookmarkList from './bookmarks-list.js';

function main() {
  console.log('Hi bitch');
//   api.get()
//     .then(result => {
//       store.pushToStore(result);
//       bookmarkList.render();
//     });
//   bookmarkList.templateGenerator();
  bookmarkList.addBookmark();
  bookmarkList.submitNewBookmark();
  bookmarkList.backToMain();
  bookmarkList.render();
}

$(main);