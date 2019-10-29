// Book class
class Book {
  constructor(title, author, pageCount, readYet) {
      this.title = title
      this.author = author
      this.pageCount = pageCount
      this.readYet = readYet
  }
}

let myLibrary;

// If local storage data
if (localStorage.getItem('library')){
  myLibrary = JSON.parse(localStorage.getItem('library'));
}else{
  // Core library data object
  myLibrary = [
  new Book('The Hobbit', "J.R.R. Tolkien", 264, "Read"),
  new Book('The Fellowship of the Ring', "J.R.R. Tolkien", 264, "Not Read" ),
  new Book('Two Towers', "J.R.R. Tolkien", 264, "Not Read" )
];

}


function update_table(){
  document.querySelector("#booklist").remove();
  render(myLibrary);
}

function render (myLibrary){
  let tb = document.createElement('tbody');
  tb.id = "booklist"
  let table = document.querySelector('table');
  table.append(tb);
  

  for (let i = myLibrary.length-1 ; i >= 0; i-- ){
    let row = tb.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    cell1.innerHTML = i+1;
    cell2.innerHTML = myLibrary[i].title;
    cell3.innerHTML = myLibrary[i].author;
    cell4.innerHTML = myLibrary[i].pageCount;
    cell5.innerHTML ='<button class="btn btn-success read-btn">'+ myLibrary[i].readYet+'</button>';
    cell6.innerHTML = '<button class="btn btn-danger delete-btn">Delete</button>';
  }

  addlisteners();
  locallystorage();
}

render(myLibrary);

document.getElementById("addBook").addEventListener("click", function(){
  document.forms.namedItem("bookform").style.display = "flex";
});

document.getElementById("insertbook").addEventListener("click", function(){
  let title = document.getElementById('title').value
  let author = document.getElementById('author').value
  let pages = parseInt(document.getElementById('pages').value)
  let read = document.getElementById('read').value
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  update_table(myLibrary);
  document.forms.namedItem("bookform").style.display = "none";

});

document.getElementById("closeform").addEventListener("click", function(){
  document.forms.namedItem("bookform").style.display = "none";
});

function addlisteners(){
  document.querySelectorAll('.read-btn').forEach((element)=>{
    element.addEventListener("click", (event)=>{
      let read_toggle = parseInt(event.srcElement.parentElement.parentElement.firstElementChild.innerHTML);
      update_row(read_toggle-1);
    });
  });
  
  document.querySelectorAll('.delete-btn').forEach((element)=>{
    element.addEventListener("click", (event)=>{
      let read_toggle = parseInt(event.srcElement.parentElement.parentElement.firstElementChild.innerHTML);
      delete_row(read_toggle-1);
    });
  });
}


function delete_row(id){
  myLibrary.splice(id,1);
  update_table();
}

function update_row(id){
  if (myLibrary[id].readYet ==='Read'){
      myLibrary[id].readYet ='Not Read'
    }else{
      myLibrary[id].readYet ='Read'
    }
  update_table();
}

function locallystorage(){
  localStorage.setItem("library", JSON.stringify(myLibrary))
}

