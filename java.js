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
    new Book('Two Towers', 'J.R.R. Tolkien', 264, 'Not Read'),
  ];
}


function updateTable() {
  document.querySelector('#booklist').remove();
  render(myLibrary);
}

function render(myLibrary) {
  const tb = document.createElement('tbody');
  tb.id = 'booklist';
  const table = document.querySelector('table');
  table.append(tb);


  for (let i = myLibrary.length - 1; i >= 0; i--) {
    const row = tb.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    cell1.innerHTML = i + 1;
    cell2.innerHTML = myLibrary[i].title;
    cell3.innerHTML = myLibrary[i].author;
    cell4.innerHTML = myLibrary[i].pageCount;
    cell5.innerHTML = '<button class="btn btn-success read-btn">'+ myLibrary[i].readYet + '</button>';
    cell6.innerHTML = '<button class="btn btn-danger delete-btn">Delete</button>';
  }

  addlisteners();
  locallystorage();
}

render(myLibrary);

document.getElementById('addBook').addEventListener('click', function() {
  document.forms.namedItem('bookform').style.display = 'flex';
});

document.getElementById('insertbook').addEventListener('click', function() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').value;
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  updateTable(myLibrary);
  document.forms.namedItem('bookform').style.display = 'none';

});

document.getElementById('closeform').addEventListener('click', function() {
  document.forms.namedItem('bookform').style.display = 'none';
});

function addlisteners() {
  document.querySelectorAll('.read-btn').forEach((element) => {
    element.addEventListener('click', (event) => {
      const read_toggle = parseInt(event.srcElement.parentElement.parentElement.firstElementChild.innerHTML);
      updateRow(read_toggle-1);
    });
  });

  document.querySelectorAll('.delete-btn').forEach((element) => {
    element.addEventListener('click', (event) => {
      const read_toggle = parseInt(event.srcElement.parentElement.parentElement.firstElementChild.innerHTML);
      deleteRow(read_toggle-1);
    });
  });
}


function deleteRow(id) {
  myLibrary.splice(id,1);
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

function locallystorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}
