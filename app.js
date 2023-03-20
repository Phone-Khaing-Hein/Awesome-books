const bookForm = document.querySelector('#bookForm');
const bookList = document.querySelector('#bookList');

class BookStore {
  books = [];
}

const book = new BookStore();

if (localStorage.getItem('books') !== null) {
  book.books = JSON.parse(localStorage.getItem('books'));
} else {
  book.books = [];
}

function showBookList() {
  bookList.innerHTML = '';

  book.books.forEach((b, index) => {
    bookList.innerHTML += `
        <p>${b.title}</p>
        <p>${b.author}</p>
        <button type="button" onclick="removeBook(${index})">Remove</button>
        <hr>
    `;
  });
}

function addBook(title, author) {
  book.books.push({ title, author });
  localStorage.setItem('books', JSON.stringify(book.books));
  bookForm.reset();
  showBookList();
}

function removeBook(id) {
  book.books.splice(id, 1);
  localStorage.setItem('books', JSON.stringify(book.books));
  showBookList();
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = bookForm.title.value;
  const author = bookForm.author.value;
  if (title !== '' && author !== '') {
    addBook(title, author);
  }
});

showBookList();
