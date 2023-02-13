/* eslint-disable class-methods-use-this */

const booklistContainer = document.querySelector('.book-list-container');
const form = document.querySelector('form');

let booklists = [];

function listAllBooks() {
  let booklistHtml = '';
  if (booklists.length) {
    booklists.forEach((book) => {
      booklistHtml = `${booklistHtml}<div class="book-info">
      <p>${book.title}</p>
      <p>${book.author}</p>
      <button type="button" title="remove book">Remove</button>
    </div>`;
    });
    booklistContainer.innerHTML = booklistHtml;
  } else {
    booklistContainer.innerHTML = '<h3>No Books Available!!</h3>';
  }
}
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    booklists.push({
      id: booklists.length + 1,
      title: this.title,
      author: this.author,
    });
    listAllBooks();
  }

  saveToStorage() {
    localStorage.setItem('bookLists', JSON.stringify(booklists));
  }
}

function fetchBooksFromStorage() {
  if (localStorage.getItem('bookLists')) {
    booklists = JSON.parse(localStorage.getItem('bookLists'));
  } else {
    booklists = [];
  }

  listAllBooks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = form.title.value;
  const author = form.author.value;
  if (title.length && author.length) {
    const newBook = new Book(title, author);
    newBook.addBook();
    newBook.saveToStorage();
    form.reset();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  fetchBooksFromStorage();
});
