const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages
  this.isRead = isRead;
}

//Method to toggle the read status
Book.prototype.toggleReadStatus = function() {
  this.isRead = !this.isRead;
}

//Adding a book to the array Library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

//Remove book from the library
function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1); //Remove the book at the given index
  displayBooks();
}

//Display books in library 
function displayBooks() {
  const librayDiv = document.getElementById('library');
  librayDiv.innerHTML = '',

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.isRead ? 'Yes' : 'No'}</p>
      <button class="toggle-read-btn" data-index=${index}>Toggle Read Status</button>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    librayDiv.appendChild(bookCard);
  });

  // Attach event listeners to the remove buttons
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
    const index = event.target.getAttribute('data-index');
    removeBookFromLibrary(index); //Call the remove function
    });
  });

  //Attach event listeners to the toggle read statusbuttons
  const toggleReadButtons = document.querySelectorAll('.toggle-read-btn');
  toggleReadButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      myLibrary[index].toggleReadStatus(); //Toggle the read Status
      displayBooks(); //Refresh the library display
    });
  });
}

// Show Book Form Modal
const newBookButton = document.getElementById('newBookBtn');
const bookFormDialog = document.getElementById('bookFormDialog');
newBookButton.addEventListener('click', () => {
  bookFormDialog.showModal();
});

// Close Modal and Cancel Button
const cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click', () => {
  bookFormDialog.close();
});

// Book Submission
const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent from refreshing the page

  // Get form input values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;

  // Add the new book to the library
  addBookToLibrary(title, author, pages, isRead);

  // Close the model and reset the form
  bookFormDialog.close();
  bookForm.reset();

displayBooks();

});


addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, false);
addBookToLibrary('1984', 'George Orwell', 328, true);

displayBooks();