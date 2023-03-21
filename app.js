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

// version 3
const listLink = document.querySelector('#list');
const addLink = document.querySelector('#add');
const contactLink = document.querySelector('#contact');
const bookListComponent = document.querySelector('#bookListComponent');
const addBookComponent = document.querySelector('#addBookComponent');
const contactComponent = document.querySelector('#contactComponent');

function hide(element) {
  element.classList.remove('display-block');
  element.classList.add('display-none');
}

function show(element) {
  element.classList.remove('display-none');
  element.classList.add('display-block');
}

[listLink, addLink, contactLink].forEach((l) => {
  l.addEventListener('click', () => {
    if (l.id === 'list') {
      show(bookListComponent);
      hide(addBookComponent);
      hide(contactComponent);
    } else if (l.id === 'add') {
      show(addBookComponent);
      hide(bookListComponent);
      hide(contactComponent);
    } else {
      show(contactComponent);
      hide(addBookComponent);
      hide(bookListComponent);
    }
  });
});
