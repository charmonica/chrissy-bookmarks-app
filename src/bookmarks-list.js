import store from './store.js';
import api from './api.js';

const templateGenerator = function() {
  if (store.addBookmarkForm === true) {
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
      `;} else {
    console.log('Hi bitch the sequel');
    return `
        <section class="header">
          <div class="flex-column">
            <h1>Chrissy's Bookmark App</h1>
            <button class="newBookmark" type="submit" name="new-bookmark" id="new-bookmark">Add Bookmark</button>
            <label for="bookmark-filter">Filter by rating:</label>
            <select name="bookmark-filter" id="bookmark-filter">
              <option value="1">&hearts;</option>
              <option value="2">&hearts;&hearts;</option>
              <option value="3">&hearts;&hearts;&hearts;</option>
              <option value="4">&hearts;&hearts;&hearts;&hearts;</option>
              <option value="5">&hearts;&hearts;&hearts;&hearts;&hearts;</option>
            </select>
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

const submitNewBookmark = function() {
  $('main').on('submit', '.adding-form', function() {
    event.preventDefault();
    const bookmarkName = $('.newBookmarkName').val();
    const bookmarkURL = $('.newBookmarkLink').val();
    const bookmarkRating = $('.newBookmarkRating').val();
    const bookmarkDesc = $('.newBookmarkDesc').val();
    console.log(bookmarkName, bookmarkURL, bookmarkRating, bookmarkDesc);
  })
}

const backToMain = function() {
  $('main').on('click', '.cancelNewBookmark', function() {
    store.addBookmarkForm = false;
    render();
  });
};

const render = function() {
  const currentView = templateGenerator();
  $('main').html(currentView);
};


export default {
  templateGenerator,
  render,
  addBookmark,
  submitNewBookmark,
  backToMain };
