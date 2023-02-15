/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */

import BookListPage from './pages/bookList.js';
import addBookForm from './pages/addBookForm.js';
import Contact from './pages/contact.js';

const main = document.querySelector('.main');
const navLinkContainer = document.querySelector('nav ul');

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
    const booklistContainer = document.querySelector('.book-list-container');
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

    booklistContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const id = e.target.getAttribute('id');
        Book.removeBooks(id);
        Book.listAllBooks();
      }
    });
  }
}

const routes = [
  {
    label: 'List',
    page: () => {
      renderHomePage();
    },
  },
  {
    label: 'Add new',
    page: () => {
      renderFormPage();
    },
  },
  {
    label: 'Contact',
    page: () => {
      renderContactPage();
    },
  },
];

function renderRoutes() {
  let routeHtml = '';
  routes.forEach((route) => {
    routeHtml += `
    <li>
      <a href="#">${route.label}</a>
  </li>
    `;
  });

  navLinkContainer.innerHTML = routeHtml;
}

// Displays the home page which list all books
function renderHomePage() {
  main.innerHTML = BookListPage();
  Book.fetchBooksFromStorage();
}

// Displays the add form page which add new book
function renderFormPage() {
  main.innerHTML = addBookForm();
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value;
    const author = form.author.value;
    const newBook = new Book(title, author);
    newBook.addBook();
    newBook.saveToStorage();
    form.reset();
    renderHomePage();
  });
}

// Displays the contact page
function renderContactPage() {
  main.innerHTML = Contact();
}

// remove all active classes from navigation links
function removeAllActiveClasses() {
  const navLinks = document.querySelectorAll('nav ul li');
  navLinks.forEach((link) => {
    link.children[0].classList.remove('active');
  });
}

function findRoute(pagelabel) {
  const route = routes.find((item) => item.label === pagelabel);
  route.page();
}

navLinkContainer.addEventListener('click', (e) => {
  if (e.target.matches('li a')) {
    e.preventDefault();
    findRoute(e.target.textContent);
    removeAllActiveClasses();
    e.target.classList.add('active');
    sessionStorage.setItem('page', e.target.textContent);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  renderRoutes();
  const currentPage = sessionStorage.getItem('page');

  if (currentPage) {
    findRoute(currentPage);
  } else {
    renderHomePage();
  }
});
