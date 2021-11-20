//Book Class Constructor
class Book {
  constructor(
    title, 
    author, 
    pages,
    status
    ) {
      this.title = title
      this.author = author
      this.pages = pages
      this.status = status
    }
}
//Push the data saved in LocalStorage to myLibrary Array, we also parse it because we have stringified it before
//Parse does the opposite of Stringify, it puts Strings inside Objects in an Array
  let myLibrary = JSON.parse(localStorage.getItem(`myLibrary`)) || [ 
    {title: 'Game of Thrones',
      author: 'George R. R. Martin',
      pages: '694',
      status: true}, 
    {title: 'Sapiens. Da Animali a Dei',
      author: 'Yuval Noah Harari',
      pages: '539',
      status: false},
    {title: '1984',
      author: 'George Orwell',
      pages: '333',
      status: false}]

 //Function that opens the form to add a new book
function openForm() {
  form.reset() //clears the form inputs
  document.getElementById('modal').classList.add('active')
  document.getElementById('overlay').classList.add('active')
}
 
//Function that closes the form
function closeForm() {
  document.getElementById('modal').classList.remove('active')
  document.getElementById('overlay').classList.remove('active')
  event.preventDefault() //stops the page from refreshing
}

function addBookToArray() { //Get input from the Form and add it as a new Object inside myLibrary Array
  let title = document.getElementById('title').value
  let author = document.getElementById('author').value
  let pages = document.getElementById('pages').value
  let status = document.getElementById('status').checked
  newBook = new Book(title, author, pages, status)
  myLibrary.push(newBook)
  createBookCard(myLibrary, libraryGrid) //passes myLibrary Array into libraryGrid div and returns it as a string inside the HTML
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary)) //passes Objects from myLibrary Array to localStorage as strings inside an array so it doesn't show as "[Object object]" string
  updateStats()
  closeForm()
  event.preventDefault()
}

function createBookCard(books = [], libraryGrid) {
  libraryGrid.innerHTML = books.map((book, i) => {
    return `
      <div id="bookCard" class="${i}" data-index="${i}" onclick="toggleStatus()">
        <button id="deleteBook" data-index="${i}" onclick="deleteBook(myLibrary, 1)">&times</button>
        <div id="titleCard">${book.title}</div>
        <div id="cardDiv">
          <p id="authorCard">By: <span class="bold">${book.author}</span></p> 
          <p id="pagesCard">Number of pages: <span class="bold">${book.pages}</span></p>
        </div>
        <div id="statusCard"><label for="checkboxCard${i}">Mark as read: </label>
          <input type="checkbox" data-index="${i}" id="checkboxCard${i}" ${book.status ? 'checked' : 'unchecked'}>
        </div>
      </div>
         `;
  }).join('')
}

//Toggle the book's status and save it to localStorage
function toggleStatus() {
  if (!event.target.matches('input')) return; //If click target doesn't match an input element then the function will return, this ensures that the function works only when we click on the checkbox and not on the Book Card
  let index = event.target.dataset.index
  myLibrary[index].status = !myLibrary[index].status
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary))
  updateStats()
  // updateColor()
}

// function updateColor() {
// TO ADD

//Removes a Book from Library
function deleteBook() {
  bookCard = event.target.dataset.index
  myLibrary.splice(bookCard, 1)
  console.log(myLibrary)
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary))
  createBookCard(myLibrary, libraryGrid)
  updateStats()
}

//Deletes all Books from Library
function deleteAllBooks() {
  myLibrary = []
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary))
  createBookCard(myLibrary, libraryGrid)
  updateStats()
}

//Updates Information about the Library
function updateStats() {
  let booksTotal = document.getElementById('booksTotal')
  let booksToRead = document.getElementById('booksToRead')
  let booksFinished = document.getElementById('booksFinished')
  booksTotal.innerHTML = myLibrary.length
  booksToRead.innerHTML = myLibrary.filter(books => {return books.status == false}).length
  booksFinished.innerHTML = myLibrary.filter(books => {return books.status == true}).length
}

//Create Book Cards on page reload
createBookCard(myLibrary, libraryGrid)
updateStats()
