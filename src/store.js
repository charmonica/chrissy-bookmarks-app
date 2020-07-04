const bookmarks= [];
const addBookmarkForm= false;
const filterValue= 0;
let error = 'Something went wrong!';


const pushToStore = function(result) {
  this.bookmarks.push(result);
};

const findToDelete = function(id) {
  console.log(this);
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
  console.log(this.bookmarks);
};

const findById = function (id) {
  return this.bookmarks.find((currentItem) => currentItem.id === id);
};

function setFilter(value) {
  this.filterValue = value;
}

export default {
  pushToStore,
  findById,
  setFilter,
  findToDelete,
  bookmarks,
  addBookmarkForm,
  filterValue,
  error
};