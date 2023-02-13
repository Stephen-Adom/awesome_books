const booklistContainer = document.querySelector('.book-list-container');
const form = document.querySelector('form');

const booklists = [
  { title: 'title1', author: 'author1' },
  { title: 'title2', author: 'author2' },
];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = form.title;
  const author = form.author;
  if (title.length && author.length) {
    const newBook = new Book(title, author);
    console.log(newBook);
  }
});

function listAllBooks() {
  let booklistHtml = '';
  booklists.forEach((book) => {
    booklistHtml = `${booklistHtml}<div class="book-info">
    <p>${book.title}</p>
    <p>${book.author}</p>
    <button type="button" title="remove book">Remove</button>
  </div>`;
  });
  booklistContainer.innerHTML = booklistHtml;
}
listAllBooks();
