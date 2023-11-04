// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const addBook = document.querySelector("#addBook");
    const removeBook = document.querySelectorAll("#removeBook");

    // Add a book
    addBook.addEventListener("click", () => {
        console.log("add")
    })

    // Remove book
    removeBook.forEach(button => {
        button.addEventListener("click", () => {
            console.log("remove")
        })
    })
})
