// Book class: represents a book, grid
class Book {
  constructor(title, author, pages, checkbox) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.checkbox = checkbox;
  }
}

let books = JSON.parse(window.localStorage.getItem('books')) || [];
const form = document.querySelector('#form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const checkbox = document.querySelector('#checkbox');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
})

function addBook(event){
  const book = new Book(title.value, author.value, pages.value, checkbox.checked)
  books.push(book);

  title.value = '';
  author.value = '';
  pages.value = '';
  checkbox.checked = false;

  saveOnLocalStorage();
}

function saveOnLocalStorage(){
  window.localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

function displayBooks(){
  books = JSON.parse(window.localStorage.getItem('books'));
  document.querySelector('#bookshelf').innerHTML = '';

  books.forEach((book, index, booklist) => {
    const li = document.createElement('li');
    li.classList.add('bookitem');
    if(book.checkbox){
      li.classList.add('checked');
    }

    const bookTitle = document.createElement('span');
    bookTitle.classList.add('booktitle', 'bk')
    bookTitle.innerText = 'Title: ' + book.title; //<span class="booktitle bk"> innerText -> book.title</span>

    const bookAuthor = document.createElement('span');
    bookAuthor.classList.add('bookauthor', 'bk');
    bookAuthor.innerText = 'Author: ' + book.author;

    const bookPages = document.createElement('span');
    bookPages.classList.add('bookpages', 'bk');
    bookPages.innerText = 'Pages: ' + book.pages;

    const isRead = document.createElement('input');
    isRead.type = 'checkbox';
    isRead.checked = book.checkbox;
    isRead.addEventListener('change', () => {
      booklist[index].checkbox = !booklist[index].checkbox;
      saveOnLocalStorage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deletebutton');
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', () => {
      books.splice(index, 1);
      saveOnLocalStorage();
    });

    li.append(bookTitle, bookAuthor, bookPages, isRead, deleteButton); //childs of li
    document.querySelector('#bookshelf').appendChild(li);
  });
};

if(books.length > 0) displayBooks();