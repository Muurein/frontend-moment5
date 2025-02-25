"use strict"

/* get elements */
const dropdownMenuEl = document.getElementById("hamburger");
const menuListEl = document.getElementById("nav-ul");
const stapelEl = document.getElementById("stapelChart");
let courses = [];

window.onload = () => {
    loadCourses();
}

/* toggles menu */
dropdownMenuEl.addEventListener("click", () => {
    dropdownMenuEl.classList.toggle("active");
    menuListEl.classList.toggle("active");
})

.document.querySelectorAll(".menu-link").forEach(n => n.addEventListener("click", () => {
    dropdownMenuEl.classList.remove("active");
    menuListEl.classList.remove("active");
}))


/* CHARTS */



/**
 * ladda in diagrammet när sidan startar
 */


/**
 * Hämtar datan med ett fetch-anrop
 * Kallar sen på funktionen som ska skriva ut diagrammet
 */
async function loadCourses() {
    try {
        //ajax-anrop
        const dataFetch = await fetch("https://studenter.miun.se/~mallar/dt211g/");
    

        //väntar på svar och konverterar det sen till json
        //lagrar den datan i global array
        courses = await dataFetch.json();

        //kallar på funktionen som ska skriva ut kurserna till diagrammet
        console.table(courses);
        //writeOutCourses;
    } catch (error) {
        //till utvecklare
        console.error(error);

        //till användare
        document.getElementById("error").innerHTML = "<p>Något blev fel med anslutningen. Försök igen senare!</p>"
    }
}

function writeOutCourses() {
    console.log("dataFetch");
}