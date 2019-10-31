class Book {
  constructor(title, author, pageCount, readYet) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readYet = readYet;
  }
}

let myLibrary;

// If local storage data
if (localStorage.getItem('library')) {
  myLibrary = JSON.parse(localStorage.getItem('library'));
} else {
  // Core library data object
  myLibrary = [
    new Book('The Hobbit', 'J.R.R. Tolkien', 264, 'Read'),
    new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 264, 'Not Read'),
    new Book('Two Towers', 'J.R.R. Tolkien', 264, 'Not Read')
  ];
}

function updateTable() {
  // eslint-disable-next-line no-use-before-define
  render(myLibrary);
}

function deleteRow(id) {
  myLibrary.splice(id, 1);
  updateTable();
}

function updateRow(id) {
  if (myLibrary[id].readYet === 'Read') {
    myLibrary[id].readYet = 'Not Read';
  } else {
    myLibrary[id].readYet = 'Read';
  }
  updateTable();
}

function addToBookLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value, 10);
  const read = document.getElementById('read').value;
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  updateTable(myLibrary);
  document.forms.namedItem('bookform').style.display = 'none';
}

function addlisteners() {
  document.querySelectorAll('.read-btn').forEach((element) => {
    element.addEventListener('click', (event) => {
      const readToggle = parseInt(
        event.srcElement.parentElement.parentElement.firstElementChild
          .innerHTML, 10
      );
      updateRow(readToggle - 1);
    });
  });

  document.querySelectorAll('.delete-btn').forEach((element) => {
    element.addEventListener('click', (event) => {
      const readToggle = parseInt(
        event.srcElement.parentElement.parentElement.firstElementChild
          .innerHTML, 10
      );
      deleteRow(readToggle - 1);
    });
  });
}

function locallystorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function render(myLibraryArray) {
  const element = document.querySelector('#booklist');
  if (typeof (element) !== 'undefined' && element != null) {
    document.querySelector('#booklist').remove();
  }

  const tb = document.createElement('tbody');
  tb.id = 'booklist';
  const table = document.querySelector('table');
  table.append(tb);

  // eslint-disable-next-line no-plusplus
  for (let i = myLibraryArray.length - 1; i >= 0; i--) {
    const row = tb.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    cell1.innerHTML = i + 1;
    cell2.innerHTML = myLibraryArray[i].title;
    cell3.innerHTML = myLibraryArray[i].author;
    cell4.innerHTML = myLibraryArray[i].pageCount;
    cell5.innerHTML = `<button class="btn btn-success read-btn">${myLibraryArray[i].readYet}</button>`;
    cell6.innerHTML = '<button class="btn btn-danger delete-btn">Delete</button>';
  }

  addlisteners();
  locallystorage();
}

document.addEventListener('DOMContentLoaded', () => {
  render(myLibrary);

  document.getElementById('addBook').addEventListener('click', () => {
    document.forms.namedItem('bookform').style.display = 'flex';
  });

  document.getElementById('insertbook').addEventListener('click', () => {
    addToBookLibrary();
  });

  document.getElementById('closeform').addEventListener('click', () => {
    document.forms.namedItem('bookform').style.display = 'none';
  });
});
