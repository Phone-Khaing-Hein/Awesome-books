const bookForm = document.querySelector('#bookForm');
const bookList = document.querySelector('#bookList');
let books;

if (localStorage.getItem('books') !== null) {
  books = JSON.parse(localStorage.getItem('books'));
} else {
  books = [];
}

function showBookList() {
  bookList.innerHTML = '';

  books.forEach((b, index) => {
    bookList.innerHTML += `
        <p>${b.title}</p>
        <p>${b.author}</p>
        <button type="button" onclick="removeBook(${index})">Remove</button>
        <hr>
    `;
  });
}

function addBook(title, author) {
  books.push({ title, author });
  localStorage.setItem('books', JSON.stringify(books));
  bookForm.reset();
  showBookList();
}

function removeBook(id) {
  books.splice(id, 1);
  localStorage.setItem('books', JSON.stringify(books));
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
