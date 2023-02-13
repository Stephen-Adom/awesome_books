const booklists = [{title:"title1", author:"author1" }, {title:"title2", author:"author2"}];

const booklistContainer = document.querySelector('.book-list-container');

function listAllBooks(){
let booklistHtml = "";
booklists.forEach(book=>{ 
   booklistHtml = booklistHtml +  `<div class="book-info">
    <p>${book.title}</p>
    <p>${book.author}</p>
    <button type="button" title="remove book">Remove</button>
  </div>`
})
booklistContainer.innerHTML = booklistHtml;
}
listAllBooks();


