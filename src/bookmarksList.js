/* eslint-disable no-console */
import store from './store.js';
import api from './api.js';

const errorMessage = function(error) {
  return `
  <p>Something went wrong, ${error}!</p>
  `;
};

function renderError(message) {
  console.log('renderError ran!')
  console.log(message);
  const html = errorMessage(message);
  $('.error').html(html);
}

const templateGenerator = function() {
  if (store.addBookmarkForm === true) {
    console.log('addBookmark is true!');
    return `
    <header class="flex-wrapper">
      <section class="title">
          <h1>Chrissy's Bookmark App</h1>
      </section>
    </header>
    <div class="error flex-wrapper"></div>
      <form class="newbookmark-form flex-wrapper">
              <label for="new-bookmark-name">Name:</label>
              <input class="newBookmarkName" type="text" id="new-bookmark-name" name="new-bookmark-name" aria-label="New Bookmark Name" required>
            <select class="newBookmarkRating" name="new-bookmark-rating" id="new-bookmark-rating" aria-label="Select Rating" required>
              <option value="0">Rating</option>
              <option value="1">&hearts;</option>
              <option value="2">&hearts;&hearts;</option>
              <option value="3">&hearts;&hearts;&hearts;</option>
              <option value="4">&hearts;&hearts;&hearts;&hearts;</option>
              <option value="5">&hearts;&hearts;&hearts;&hearts;&hearts;</option>
            </select>
          </div>
          <div class="description-label"
            <label for="new-bookmark-desc">Description:</label>
          </div>
          <div class="description-entry">
            <textarea class="newBookmarkDesc" id="new-bookmark-desc" name="new-bookmark-desc" rows="4" placeholder="Description" aria-label="Enter Description"></textarea>
          </div>
          <div class="URL-label">
            <label for="new-bookmark-link">URL:</label>
          </div>
          <div class="URL-content">
            <input class="newBookmarkLink" type="text" id="new-bookmark-link" name="new-bookmark-link" aria-label="Type URL" required>
          </div>
          <div class="new-bookmark-buttons flex-row">
            <button class="submitNewBookmark" type="submit" name="submit-new-bookmark" id="submit-new-bookmark" aria-label="Submit">Submit</button>
            <button class="cancelNewBookmark" type="submit" name="cancel-new-bookmark" id="cancel-new-bookmark" aria-label="Cancel">Cancel</button>
          </div>
        </form>
      `} else {
    console.log('Hi the sequel');
    return `
      <header class="flex-wrapper flex-column">
        <section class="title">
            <h1>Chrissy's Bookmark App</h1>
        </section>
      </header>
        <div class="error"></div>
        <section class="flex-wrapper flex-row borderless">
            <div class="add-bookmark-button">
              <button class="newBookmark" type="submit" name="new-bookmark" id="new-bookmark">Add Bookmark</button>
            </div>
            <div class="filter-select flex-column">
              <label for="bookmark-filter">Filter by rating:</label>
              <select class="bookmarkFilter" name="bookmark-filter" id="bookmark-filter">
                <option value="0">Filter Bookmarks</option>
                <option value="1">&hearts;</option>
                <option value="2">&hearts;&hearts;</option>
                <option value="3">&hearts;&hearts;&hearts;</option>
                <option value="4">&hearts;&hearts;&hearts;&hearts;</option>
                <option value="5">&hearts;&hearts;&hearts;&hearts;&hearts;</option>
              </select>
            </div>
            <div class="filter-reset">
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
    const id = event.target.id;
    console.log(id);
    api.deleteBookmark(id)
      .then(() => {
        store.findToDelete(id);
        render();
      })
      .catch(err => renderError(err.message));
  });
};

const submitNewBookmark = function() {
  $('main').on('click', '.submitNewBookmark', function() {
    console.log('submit fired')
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
      })
      .catch(err => renderError(err.message));
  });
};

const toggleDetailedViewOn = function() {
  $('main').on('click', '.expandBookmark', function() {
    let id = $(event.target).closest('ul').attr('id');
    console.log(id);
    store.findById(id).detailedView = true;
    console.log('expandBookmark fired');
    console.log(store.bookmarks);
    render();
  });
};

const toggleDetailedViewOff = function() {
  $('main').on('click', '.collapseBookmark', function() {
    let id = $(event.target).closest('ul').attr('id');
    store.findById(id).detailedView = false;
    console.log('expandBookmark fired');
    console.log(store.bookmarks);
    render();
  });
};

const bookmarkItem = function(bookmark) {
  let hearts = '';
  for (let i = 0; i < bookmark.rating; i++) {
    hearts += '&hearts;';
  }
  return `
  <ul id="${bookmark.id}" class="single-bookmark">
    <div class="bookmark-info">
      <div class="rating-title">
        <p class="bookmark-name">${bookmark.title}</p>
        <p class="bookmark-rating">${hearts}</p>
      </div>
      <div class="bookmark-buttons flex-column">
        <button class="deleteBookmark" type="submit" name="delete-bookmark" id="${bookmark.id}">Delete</button>
        <button class="expandBookmark" type="submit" name="expand-bookmark" id="${bookmark.id}">Toggle Details</button>
      </div>
    </div>
  </ul>
`};

const detailedBookmarkItem = function(bookmark) {
  let hearts = '';
  for (let i = 0; i < bookmark.rating; i++) {
    hearts += '&hearts;';
  }
  return `
    <ul id="${bookmark.id}" class="expanded-bookmark">
    <div class="bookmark-info">
      <div class="rating-title">
        <p class="bookmark-name">${bookmark.title}</p>
        <p class="bookmark-rating">${hearts}</p>
      </div>
      <div class="bookmark-buttons flex-column">
        <button class="deleteBookmark" type="submit" name="delete-bookmark" id="${bookmark.id}">Delete</button>
        <button class="collapseBookmark" type="submit" name="collapse-bookmark" id="${bookmark.id}">Toggle Details</button>
      </div>
      <div class="hidden" id="${bookmark.id}-expandedInfo">
        <p class="bookmark-description">${bookmark.desc}</p>
        <a href="${bookmark.url}" id="bookmark-url">Visit</a>
      </div>
    </div>
</ul>
`}

function generateBookmarks(bookmarks) {
  console.log('generate bookmarks ran');
  const items = bookmarks.map((item) => 
    item.detailedView === true
      ? detailedBookmarkItem(item)
      : bookmarkItem(item));
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
  let bookmarks = [...store.bookmarks];
  console.log(bookmarks);
  if (store.filterValue) {
    bookmarks = bookmarks.filter(item => item.rating >= store.filterValue);
    console.log(store.STORE);
  }
  const bookmarksString=generateBookmarks(bookmarks);
  const currentView=templateGenerator();
  $('main').html(`${currentView}${bookmarksString}`);
  console.log('bookmarks.render ran!');
};

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
  toggleDetailedViewOn,
  toggleDetailedViewOff,
  renderError
};
