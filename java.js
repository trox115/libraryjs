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
    { title: 'The Hobbit', author: "J.R.R. Tolkien", pageCount: 264, readYet: "Read" },
    { title: 'The Fellowship of the Ring', author: "J.R.R. Tolkien", pageCount: 264, readYet: "Not Read" },

];
function delete_table(){
  $("#booklist tr td").remove();
  render(myLibrary);
}

function render (myLibrary){
  let table = document.getElementById("booklist")

  for (let i = 0; i<myLibrary.length;i++){
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = myLibrary[i].title;
    cell2.innerHTML = myLibrary[i].author;
    cell3.innerHTML = myLibrary[i].pageCount;
    cell4.innerHTML ='<button class="btn btn-success" id="'+i+'" onclick="update_row('+i+')">'+ myLibrary[i].readYet+'</button>';
    cell5.innerHTML = '<button class="btn btn-danger delete" id="'+i+'" onclick="delete_row('+i+')">Delete</button>';
  }
}

render(myLibrary);

document.getElementById("addBook").addEventListener("click", function(){
  document.forms.namedItem("bookform").style.display = "flex";
});

document.getElementById("insertbook").addEventListener("click", function(){
  title = document.getElementById('title').value
  author = document.getElementById('author').value
  pages = parseInt(document.getElementById('pages').value)
  read = document.getElementById('read').value
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  delete_table(myLibrary);
  document.forms.namedItem("bookform").style.display = "none";

});

document.getElementById("closeform").addEventListener("click", function(){
  document.forms.namedItem("bookform").style.display = "none";
});

// function update (array){
//   $("#booklist").append(
//       "<tr>" +
//         "<td>"+array.title+"</td>" +
//         "<td>"+array.author+"</td>" +
//         "<td>"+array.pageCount+"</td>" +
//         "<td>"+array.readYet+"</td>" +
//       "</tr>"
//   );
//
//   }

function delete_row(id){
  myLibrary.splice(id,1);
  delete_table();
}

function update_row(id){
  if (myLibrary[id].readYet ==='Read'){
      myLibrary[id].readYet ='Not Read'
    }else{
      myLibrary[id].readYet ='Read'
    }
  delete_table();
}
