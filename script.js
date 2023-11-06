// Global variable
let library = [];

// Pre-populate some books
const data1 = ["Harry Potter", "JK Rowling", "100", false, generateId()];
addBookToLibrary(data1);
const data2 = ["Harry Potter 2", "JK Rowling", "200", true, generateId()];
addBookToLibrary(data2);

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const addBookBtn = document.querySelector("#addBook");
    const libraryDiv = document.querySelector(".library");
    const lastCard = libraryDiv.querySelector("#card-add");

    populateCards(libraryDiv, lastCard);

    // Open add a book dialog
    addBookBtn.addEventListener("click", () => {
        const addBookDialog = document.querySelector("dialog");
        const closeDialogBtn = addBookDialog.querySelector("#close");
        const add = addBookDialog.querySelector("#add");

        addBookDialog.showModal();

        // Close dialog
        closeDialogBtn.addEventListener("click", (e) => {
            e.preventDefault();
            clearInputs();
            addBookDialog.close();
        })

        // Add the book
        add.addEventListener("click", (e) => {
            const title = addBookDialog.querySelector("#title");
            const author = addBookDialog.querySelector("#author");
            const pages = addBookDialog.querySelector("#pages");
            const read = addBookDialog.querySelector("#read");
            const id = generateId();

            const data = [title.value, author.value, +pages.value, read.checked, id];

            if (!data.includes("") && !+pages.value < 1) {
                e.preventDefault();
                addBookToLibrary(data);
                addCard(data, libraryDiv, lastCard);
                clearInputs();
                addBookDialog.close();
            }
        })
    })
})

// Functions
// Clear input values
const clearInputs = () => {
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}

// Book constructor
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

// Generate book ID
function generateId() {
    if (library.length === 0) return 1;

    let ids = [];
    for (book of library) {
        ids.push(book.id);
    }

    return Math.max(...ids) + 1;
}

// Add book to library
function addBookToLibrary(data) {
    const book = new Book(data[0], data[1], data[2], data[3], data[4]);
    library.push(book);
}

// Remove book from library
function removeBookFromLibrary(id) {
    const index = library.findIndex(book => book.id === id);
    library.splice(index, 1);
}

// Add book card
function addCard(data, div, card) {
    const newBook = document.createElement("div");
    newBook.classList.add("card");

    const bookTitle = document.createElement("div");
    bookTitle.classList.add("title");
    bookTitle.textContent = data[0];

    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("author");

    const author1 = document.createElement("div");
    author1.textContent = "by";

    const author2 = document.createElement("div");
    author2.textContent = data[1];

    bookAuthor.append(author1, author2);

    const bookPages = document.createElement("div");
    bookPages.classList.add("pages");
    bookPages.textContent = data[2] + " pages";

    const bookRead = document.createElement("button");
    bookRead.classList.add("toggleRead");
    bookRead.setToBool(data[3]);

    bookRead.addEventListener("click", () => {
        const index = library.findIndex(book => book.id === data[4]);
        library[index].read = !library[index].read;
        bookRead.setToBool(library[index].read);
    })

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBook");
    
    const removeBtnImg = document.createElement("img");
    removeBtnImg.src = "images/book-remove-outline-custom.png";
    removeBtnImg.alt = "Remove Book";

    removeBtn.appendChild(removeBtnImg);

    removeBtn.addEventListener("click", () => {
        removeBookFromLibrary(data[4]);
        div.removeChild(newBook);
    })

    newBook.append(bookTitle, bookAuthor, bookPages, bookRead, removeBtn);
    div.insertBefore(newBook, card);
}

// Create new object prototype to set toggleRead class
Object.prototype.setToBool = function (bool) {
    const btnClass = this.classList;
    if (btnClass.contains("true")) btnClass.remove("true");
    else if (btnClass.contains("false")) btnClass.remove("false");
    
    if (bool) {
        btnClass.add("true");
        this.textContent = "✓ Read";
    } else {
        btnClass.add("false");
        this.textContent = "✖ Read";
    }
}

// Populate book cards
function populateCards(div, card) {
    for (book of library) {
        const data = [book.title, book.author, book.pages, book.read, book.id];
        addCard(data, div, card);
    }
}
