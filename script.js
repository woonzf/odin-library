// Global variable
let data = [];

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const addBookBtn = document.querySelector("#addBook");
    const removeBookBtn = document.querySelectorAll("#removeBook");

    // Open add a book dialog
    addBookBtn.addEventListener("click", () => {
        const addBookDialog = document.querySelector("dialog");
        const closeDialogBtn = addBookDialog.querySelector("#close");
        const add = addBookDialog.querySelector("#add");

        addBookDialog.showModal();

        // Close dialog
        closeDialogBtn.addEventListener("click", (e) => {
            e.preventDefault();
            addBookDialog.close();
        })

        // Add the book
        add.addEventListener("click", (e) => {
            const title = addBookDialog.querySelector("#title");
            const author = addBookDialog.querySelector("#author");
            const pages = addBookDialog.querySelector("#pages");
            const read = addBookDialog.querySelector("#read");
            
            console.log(read.value)
            
            data = [title.value, author.value, pages.value];

            if (!data.includes("")) {
                e.preventDefault();
                console.log(data)
                clearData();
                console.log(data)
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
    data = [];
}
