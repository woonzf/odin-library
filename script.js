// Global variable
let library = [];

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const addBookBtn = document.querySelector("#addBook");
    const removeBookBtn = document.querySelectorAll(".removeBook");

    // Open add a book dialog
    addBookBtn.addEventListener("click", () => {
        const addBookDialog = document.querySelector("dialog");
        const closeDialogBtn = addBookDialog.querySelector("#close");
        const add = addBookDialog.querySelector("#add");

        addBookDialog.showModal();

        // Close dialog
        closeDialogBtn.addEventListener("click", (e) => {
            e.preventDefault();
            clearData();
            addBookDialog.close();
        })

        // Add the book
        add.addEventListener("click", (e) => {
            const title = addBookDialog.querySelector("#title");
            const author = addBookDialog.querySelector("#author");
            const pages = addBookDialog.querySelector("#pages");
            const read = addBookDialog.querySelector("#read");
            
            const data = [title.value, author.value, +pages.value, read.checked];

            if (!data.includes("") && !+pages.value < 1) {
                e.preventDefault();

                const libraryDiv = document.querySelector(".library");
                const lastCard = libraryDiv.querySelector("#card-add");
                const book = new Book(data[0], data[1], data[2], data[3]);
                
                // Create card
                const newBook = document.createElement("div");
                newBook.classList.add("card");

                const bookTitle = document.createElement("div");
                bookTitle.textContent = data[0];

                const removeBtn = document.createElement("button");
                removeBtn.classList.add("removeBook");
                
                const removeBtnImg = document.createElement("img");
                removeBtnImg.src = "images/book-remove-outline-custom.png";
                removeBtnImg.alt = "Remove Book";

                removeBtn.appendChild(removeBtnImg);
                newBook.append(bookTitle, removeBtn);
                libraryDiv.insertBefore(newBook, lastCard);

                library.push(book);
                console.log(library)
                clearData();
                addBookDialog.close();
            }
        })
    })

    // Remove book
    removeBookBtn.forEach(button => {
        button.addEventListener("click", () => {
            console.log("remove")
        })
    })
})

// Functions
// Clear input values and data
const clearData = () => {
    title.value = "";
    author.value = "";
    pages.value = "";
}

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}
