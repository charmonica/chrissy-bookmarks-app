//Primary JS file
import api from './api.js';
import store from './store.js';
import bookmarkList from './bookmarksList.js';

function main() {
  console.log('Hi from main');
  api.get()
    .then(result => {
      store.bookmarks = result;
      bookmarkList.render();
    });
  bookmarkList.templateGenerator();
  bookmarkList.addBookmark();
  bookmarkList.deleteButton();
  bookmarkList.submitNewBookmark();
  bookmarkList.backToMain();
  bookmarkList.render();
  bookmarkList.filterValueSet();
  bookmarkList.resetFilter();
  bookmarkList.toggleHidden();
}

$(main);