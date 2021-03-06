import store from './store.js';
import api from './api.js';

const templateGenerator = function() {
  if (store.addBookmarkForm === true) {
    console.log('addBookmark is true!');
    return `
      <section class="header">
        <div class="flex-column">
          <h1>Chrissy's Bookmark App</h1>
        </div>
      </section>
      <form class="adding-form">
        <label for="new-bookmark-name">Name:</label>
        <input class="newBookmarkName" type="text" id="new-bookmark-name" name="new-bookmark-name">
        <select class="newBookmarkRating" name="new-bookmark-rating" id="new-bookmark-rating">
          <option value="1">&hearts;</option>
          <option value="2">&hearts;&hearts;</option>
          <option value="3">&hearts;&hearts;&hearts;</option>
          <option value="4">&hearts;&hearts;&hearts;&hearts;</option>
          <option value="5">&hearts;&hearts;&hearts;&hearts;&hearts;</option>
        </select>
        <label for="new-bookmark-link">URL:</label>
        <input class="newBookmarkLink" type="text" id="new-bookmark-link" name="new-bookmark-link">
        <label for="new-bookmark-desc">Description:</label>
        <textarea class="newBookmarkDesc" id="new-bookmark-desc" name="new-bookmark-desc" rows="4"></textarea>
        <button class="submitNewBookmark" type="submit" name="submit-new-bookmark" id="submit-new-bookmark">Submit</button>
        <button class="cancelNewBookmark" type="submit" name="cancel-new-bookmark" id="cancel-new-bookmark">Cancel</button>
      </form>
      `} else {
      console.log('Hi the sequel');
      return `
        <section class="header">
          <div class="flex-column">
            <h1>Chrissy's Bookmark App</h1>
            <button class="newBookmark" type="submit" name="new-bookmark" id="new-bookmark">Add Bookmark</button>
            <label for="bookmark-filter">Filter by rating:</label>
            <select class="bookmarkFilter" name="bookmark-filter" id="bookmark-filter">
              <option value="0">Filter Bookmarks</option>
              <option value="1">&hearts;</option>
              <option value="2">&hearts;&hearts;</option>
              <option value="3">&hearts;&hearts;&hearts;</option>
              <option value="4">&hearts;&hearts;&hearts;&hearts;</option>
              <option value="5">&hearts;&hearts;&hearts;&hearts;&hearts;</option>
            </select>
            <button class="resetFilter" type="submit" name="reset-filter" id="reset-filter">Reset Filter</button>
          </div>
        </section>
  `};
};

const addBookmark = function() {
  $('main').on('click', '.newBookmark', function() {
    store.addBookmarkForm = true;
    render();
  });
};

const deleteButton = function() {
  $('main').on('click', '.deleteBookmark', function() {
    console.log('delete is called' + event.target.id);
    // const id = getItemIdFromElement(event.target.id);
    const id = event.target.id;
    console.log(id);
    api.deleteBookmark(id)
      .then(() => {
        store.findToDelete(id);
        render();
      });
  });
};

const submitNewBookmark = function() {
  $('main').on('submit', '.adding-form', function() {
    event.preventDefault();
    const bookmarkName = $('.newBookmarkName').val();
    const bookmarkURL = $('.newBookmarkLink').val();
    const bookmarkRating = $('.newBookmarkRating').val();
    let bookmarkDesc = '';
    if ($('.newBookmarkDesc')) {
      bookmarkDesc = $('.newBookmarkDesc').val();
      console.log(bookmarkName, bookmarkURL, bookmarkRating, bookmarkDesc);
    }
    api.createNewBookmark(bookmarkName, bookmarkURL, bookmarkRating, bookmarkDesc)
      .then((newSubmit) => {
        store.pushToStore(newSubmit);
        store.addBookmarkForm=false;
        render();
      });
  });
};

const toggleHidden = function() {
  $('main').on('click', '.expandBookmark', function() {
    let id = $(event.target).closest('section').attr('id');
    $(`#${id}-expandedInfo`).toggleClass('hidden');
    console.log('expandBookmark fired');
  });
};

const bookmarkItem = function(bookmark) {
  return `
  <section id="${bookmark.id}" class="single-bookmark">
    <div class="bookmark-info">
      <p class="bookmark-name">${bookmark.title}</p>
      <p class="bookmark-rating">${bookmark.rating}</p>
      <button class="deleteBookmark" type="submit" name="delete-bookmark" id="${bookmark.id}">Delete</button>
      <button class="expandBookmark" type="submit" name="expand-bookmark" id="${bookmark.id}">Toggle Details</button>
      <div class="hidden" id="${bookmark.id}-expandedInfo">
        <p class="bookmark-description">${bookmark.desc}</p>
        <a href="${bookmark.url}" id="bookmark-url">Visit</a>
      </div>
    </div>
  </section>
`};

function generateBookmarks(bookmarks) {
  console.log('generate bookmarks ran');
  const items = bookmarks.map((item) => bookmarkItem(item));
  console.log(items.join(''));
  return items.join('');
}

function filterValueSet() {
  console.log('filter set!');
  $('main').on('change', '.bookmarkFilter', function() {
    console.log('Selector changed!');
    store.setFilter($(event.target).val());
    render();
  });
  console.log('handleFilterChange ran!');
}

const resetFilter = function() {
  $('main').on('click', '.resetFilter', function() {
    store.filterValue = 0;
    render();
  });
};

const backToMain = function() {
  $('main').on('click', '.cancelNewBookmark', function() {
    store.addBookmarkForm = false;
    render();
  });
};

const render = function() {
  console.log('bookmarks.render called!');
  // Filter item list by STORE minRating value
  let bookmarks = [...store.bookmarks];
  console.log(bookmarks);
  // if (store.STORE.minRating) {
  //   bookmarks = bookmarks.filter(item => item.rating >= store.STORE.minRating);
  //   console.log(store.STORE);
  // }
  // render the shopping list in the DOM
  if (store.filterValue) {
    bookmarks = bookmarks.filter(item => item.rating >= store.filterValue);
    console.log(store.STORE);
  }
  const bookmarksString=generateBookmarks(bookmarks);
  const currentView=templateGenerator();
  $('main').html(`${currentView}${bookmarksString}`);
  // insert that HTML into the DOM
  console.log('bookmarks.render ran!');
}

// const render = function() {
//   const currentView = templateGenerator();
//   $('main').html(currentView);
// };


export default {
  templateGenerator,
  bookmarkItem,
  render,
  addBookmark,
  deleteButton,
  submitNewBookmark,
  backToMain,
  filterValueSet,
  resetFilter,
  toggleHidden
};
