const bookForm = document.querySelector('#bookForm');
const bookList = document.querySelector('#bookList');

class BookStore {
  books = [];

  title = '';

  author = '';

  set title(title) {
    this.title = title;
  }

  set author(author) {
    this.author = author;
  }

  showBookList(bookList) {
    bookList.innerHTML = '';

    this.books.forEach((b, index) => {
      bookList.innerHTML += `
        <tr class="p-2 align-middle">
          <td>"${b.title}" by ${b.author}</td>
          <td><button class="btn btn-danger float float-end" type="button" onclick="remove(${index})">Remove</button></td>
        </tr>
    `;
    });
  }

  addBook(bookList) {
    this.books.push({ title: this.title, author: this.author });
    localStorage.setItem('books', JSON.stringify(this.books));
    bookForm.reset();
    this.showBookList(bookList);
  }

  removeBook(id, bookList) {
    this.books.splice(id, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBookList(bookList);
  }
}

const bookStore = new BookStore();

if (localStorage.getItem('books') !== null) {
  bookStore.books = JSON.parse(localStorage.getItem('books'));
} else {
  bookStore.books = [];
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  bookStore.title = bookForm.title.value;
  bookStore.author = bookForm.author.value;
  if (bookStore.title !== '' && bookStore.author !== '') {
    bookStore.addBook(bookList);
  }
});

function remove(id) {
  bookStore.removeBook(id, bookList);
}

bookStore.showBookList(bookList);
