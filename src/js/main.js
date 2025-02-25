"use strict"

/* get elements */
const dropdownMenuEl = document.getElementById("hamburger");
const menuListEl = document.getElementById("nav-ul");


/* toggles menu */
dropdownMenuEl.addEventListener("click", () => {
    dropdownMenuEl.classList.toggle("active");
    menuListEl.classList.toggle("active");
})

.document.querySelectorAll(".menu-link").forEach(n => n.addEventListener("click", () => {
    dropdownMenuEl.classList.remove("active");
    menuListEl.classList.remove("active");
}))