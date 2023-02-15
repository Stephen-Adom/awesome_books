/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */

const booklistContainer = document.querySelector('.book-list-container');
const form = document.querySelector('form');

class Book {
  static booklists = [];

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    Book.booklists.push({
      id: Book.booklists.length + 1,
      title: this.title,
      author: this.author,
    });
    Book.listAllBooks();
  }

  static removeBooks(id) {
    Book.booklists = Book.booklists.filter((book) => book.id !== Number(id));
    localStorage.setItem('bookLists', JSON.stringify(Book.booklists));
  }

  saveToStorage() {
    localStorage.setItem('bookLists', JSON.stringify(Book.booklists));
  }

  static fetchBooksFromStorage() {
    if (localStorage.getItem('bookLists')) {
      Book.booklists = JSON.parse(localStorage.getItem('bookLists'));
    } else {
      Book.booklists = [];
    }
    Book.listAllBooks();
  }

  static listAllBooks() {
    let booklistHtml = '';
    if (Book.booklists.length) {
      Book.booklists.forEach((book) => {
        booklistHtml = `${booklistHtml}<div class="book-info">
        <p>"${book.title}" by ${book.author}</p>
        <button type="button"  id="${book.id}"title="remove book">Remove</button>
      </div>`;
      });
      booklistContainer.innerHTML = booklistHtml;
    } else {
      booklistContainer.innerHTML = '<h3>No Books Available!!</h3>';
    }
  }
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
  Book.fetchBooksFromStorage();
});

booklistContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const id = e.target.getAttribute('id');
    Book.removeBooks(id);
    Book.listAllBooks();
  }
});
