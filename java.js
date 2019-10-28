// Book class
class Book {
    constructor(title, author, pageCount, readYet) {
        this.title = title
        this.author = author
        this.pageCount = pageCount
        this.readYet = readYet
    }

}

// Core library data object
let myLibrary = [
    { title: 'The Hobbit', author: "J.R.R. Tolkien", pageCount: 264, readYet: false },
    { title: 'The Fellowship of the Ring', author: "J.R.R. Tolkien", pageCount: 264, readYet: true },

];


function render (myLibrary){
  let table = document.getElementById("booklist")

  for (var i =0; i<myLibrary.length;i++){
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = myLibrary[i].title;
    cell2.innerHTML = myLibrary[i].author;
    cell3.innerHTML = myLibrary[i].pageCount;
    cell4.innerHTML = convertToWords(myLibrary[i].readYet);

  }
  document.write('</table>')
}

function convertToWords(boolean){
  if (boolean == false){
    return 'Not read';
  }
  return 'Read'
}

render(myLibrary);

document.getElementById("addBook").addEventListener("click", function(){
  document.forms.namedItem("bookform").style.display = "flex";
});

document.getElementById("insertbook").addEventListener("click", function(){
  title = document.getElementById('title').value
  let book = new Book(title, "author", 123, false);
  myLibrary.push(book);
  console.log(myLibrary);
  render(myLibrary);
});

document.getElementById("closeform").addEventListener("click", function(){
  document.forms.namedItem("bookform").style.display = "none";
});
