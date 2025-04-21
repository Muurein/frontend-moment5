"use strict"

/* get elements */
const dropdownMenuEl = document.getElementById("hamburger");
const menuListEl = document.getElementById("nav-ul");
const stapelEl = document.getElementById("barChart");
let coursesPrograms = [];

document.querySelectorAll(".menu-link").forEach(n => n.addEventListener("click", () => {
    dropdownMenuEl.classList.remove("active");
    menuListEl.classList.remove("active");
}))

/* toggles menu */
dropdownMenuEl.addEventListener ("click", () => {
    console.log("clicked");
    dropdownMenuEl.classList.toggle("active");
    menuListEl.classList.toggle("active");
})



window.onload = () => {
    loadCourses();

    /*if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            console.log(`Latitude: ${latitude}`);
            console.log(`Longitude: ${longitude}`);
        }, function (error) {
            console.error("Fel vid hämtning av position:", error.message);
        });
    } else {
        console.error("Geolokalisering stöds inte av din webbläsare");
    }*/
}



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
        coursesPrograms = await dataFetch.json();

        //kallar på funktionen som ska skriva ut kurserna till diagrammet - FUNKAR
        //console.table(courses);
        
        //kallar på funktionen som ska skriva ut kurserna
        writeOutCourses(coursesPrograms);
        writeOutPrograms(coursesPrograms);

    } catch (error) {
        //till utvecklare
        console.error(error);

        //till användare
        document.getElementById("error").innerHTML = "<p>Något blev fel med anslutningen. Försök igen senare!</p>"
    }
}

/**
 * 
 * Sorterar värden "Kurs" och "Program" från varandra och lägger "Kurs" i en egen array
 * Sorterar arrayen med kurser efter de värden som har flest applicantsTotal
 * Går igenom arrayen sex gånger för att hitta de sex kurser som flest har sökt till, lägger dem i en egen array
 * Lägger de sex kurserna i ett stapeldiagram
 */
function writeOutCourses() {

    //sortera fram vilka värden i coursesProgram som har typen "kurs", lägg dem den nya arrayen courses
    let courses = coursesPrograms.filter((course) => course.type === "Kurs");

    //sortera fram vilka kurser som har högst antal sökande, lägg dessa i den nya arrayen 
    let sortedCourses = courses.sort((courseA, courseB) => courseB.applicantsTotal - courseA.applicantsTotal);

    //array för att lagra de 6 kurser med flest applicantsTotal
    let coursesMostApplicants = [];

    for (let i = 0; i < 6; i++) {
        coursesMostApplicants.push(sortedCourses[i]);
    } 

    //randomiserar de sorterade värdena så stapeldiagrammet blir roligare att titta på - BLIR FÖR ROLIGT TA BORT??
    coursesMostApplicants.sort(() => Math.random() - 0.5);

    console.table(coursesMostApplicants); //lägg in varje värde i egen array?

    //lägg in varje kursnamn i varsina arrayer för att kunna lägga in arrayerna som värden i x-axeln i stapeldiagrammet
    let courseName1 = [];
    let courseName2 = [];
    let courseName3 = [];
    let courseName4 = [];
    let courseName5 = [];
    let courseName6 = [];

    courseName1.push(coursesMostApplicants[0].name);
    courseName2.push(coursesMostApplicants[1].name);
    courseName3.push(coursesMostApplicants[2].name);
    courseName4.push(coursesMostApplicants[3].name);
    courseName5.push(coursesMostApplicants[4].name);
    courseName6.push(coursesMostApplicants[5].name);

    
    //lägg in varje applicantsTotal i varsina arrayer för att kunna lägga in arrayerna som värden i y-axeln i stapeldiagrammet
    let courseApplicants1 = [];
    let courseApplicants2 = [];
    let courseApplicants3 = [];
    let courseApplicants4 = [];
    let courseApplicants5 = [];
    let courseApplicants6 = [];

    courseApplicants1.push(coursesMostApplicants[0].applicantsTotal);
    courseApplicants2.push(coursesMostApplicants[1].applicantsTotal);
    courseApplicants3.push(coursesMostApplicants[2].applicantsTotal);
    courseApplicants4.push(coursesMostApplicants[3].applicantsTotal);
    courseApplicants5.push(coursesMostApplicants[4].applicantsTotal);
    courseApplicants6.push(coursesMostApplicants[5].applicantsTotal);

    

    new Chart(stapelEl, { //varför står det "1399, null" i resultaten när man hovrar på staplarna????
        type: "bar",
        data: {
            labels: [courseName1, courseName2, courseName3, courseName4, courseName5, courseName6],
            datasets: [{
                label: "antal sökande",
                data: [courseApplicants1, courseApplicants2, courseApplicants3, courseApplicants4, courseApplicants5, courseApplicants6],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}

function writeOutPrograms() {
    
}