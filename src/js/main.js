"use strict"

//hämtar elementen
const dropdownMenuEl = document.getElementById("hamburger");
const menuListEl = document.getElementById("nav-ul");
const stapelEl = document.getElementById("barChart");
const circleEl = document.getElementById("circleChart");
let coursesPrograms = [];

/**
 * Togglar menyn genom att lyssna efter när knappen trycks på.
 */
document.querySelectorAll(".menu-link").forEach(n => n.addEventListener("click", () => {
    dropdownMenuEl.classList.remove("active");
    menuListEl.classList.remove("active");
}))

dropdownMenuEl.addEventListener ("click", () => {
    dropdownMenuEl.classList.toggle("active");
    menuListEl.classList.toggle("active");
})


/**
 * Laddar in diagrammet när sidan startar.
 */
window.onload = () => {
    loadCourses();
}


/**
 * Hämtar datan med ett fetch-anrop.
 * Kallar sen på funktionen som ska skriva ut diagrammet.
 * Skickar ut ett felmeddelande i form av en sträng om något gick fel med anslutningen.
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
 * Sorterar värden "Kurs" och "Program" från varandra och lägger "Kurs" i en egen array.
 * Sorterar arrayen med kurser efter de värden som har flest applicantsTotal.
 * Går igenom arrayen sex gånger för att hitta de sex kurser som flest har sökt till, lägger dem i en egen array.
 * Lägger de sex kurserna i ett stapeldiagram.
 */
function writeOutCourses() {

    //sortera fram vilka värden i coursesProgram som har typen "kurs", lägg dem den nya arrayen courses
    let courses = coursesPrograms.filter((course) => course.type === "Kurs");

    //sortera fram vilka kurser som har flest antal sökande, lägg dessa i den nya arrayen 
    let sortedCourses = courses.sort((courseA, courseB) => courseB.applicantsTotal - courseA.applicantsTotal);

    //array för att lagra de 6 kurser med flest applicantsTotal
    let coursesMostApplicants = [];

    for (let i = 0; i < 6; i++) {
        coursesMostApplicants.push(sortedCourses[i]);
    } 


    let chartNormalizedNames = [];
    let chartData = [];

    //hämtar ut de 6 kurser med flest applicants och lägger in i en ny array ,formatterar namnen
    for (let i = 0; i < 6; i++) {
        const course = coursesMostApplicants[i];

        chartNormalizedNames.push([course.name]);

        chartData.push([course.applicantsTotal]);
    }


    new Chart(stapelEl, { 
        type: "bar",
        data: {
            labels: chartNormalizedNames,
            datasets: [{
                label: "antal sökande till kurser",
                data: chartData,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        callback: function(value, index, ticks) {
                            let label = this.getLabelForValue(value);

                            return (label.length > 20)?
                                    label.substr(0, 20):
                                    label;
                        }
                    }
                }
            }
        }
    });


}

/**
 * Sorterar värden "Kurs" och "Program" från varandra och lägger "Program" i en egen array.
 * Sorterar arrayen med program efter de värden som har flest applicantsTotal.
 * Går igenom arrayen fem gånger för att hitta de fem program som flest har sökt till, lägger dem i en egen array.
 * Lägger de in den fem programen i ett cirkeldiagram.
 */
function writeOutPrograms() {

    //sortera fram vilka värden i coursesPrograms som har typen "programs", lägg dem i nya arrayen programs
    let programs = coursesPrograms.filter((program) => program.type === "Program");

    //sortera fram vilka program som har högst antal
    let sortedPrograms = programs.sort((programA, programB) => programB.applicantsTotal - programA.applicantsTotal);

    //array för att lagra de 5 program som har flest sökande
    let programsMostApplicants = [];

    for(let i = 0; i < 5; i++) {
        programsMostApplicants.push(sortedPrograms[i]);
    }



    //lägg in varje programs namn i varsina arrayer för att kunna lägga in arrayerna som "titel-värden" i cirkeldiagrammet
    let programName1 = [];
    let programName2 = [];
    let programName3 = [];
    let programName4 = [];
    let programName5 = [];
 

    programName1.push(programsMostApplicants[0].name);
    programName2.push(programsMostApplicants[1].name);
    programName3.push(programsMostApplicants[2].name);
    programName4.push(programsMostApplicants[3].name);
    programName5.push(programsMostApplicants[4].name);
   

    //lägg in varje applicantsTotal i varsina arrayer för att kunna lägga in arrayerna som värden "antal-värden" i cirkeldiagrammet
    let programApplicants1 = [];
    let programApplicants2 = [];
    let programApplicants3 = [];
    let programApplicants4 = [];
    let programApplicants5 = [];
 

    programApplicants1.push(programsMostApplicants[0].applicantsTotal);
    programApplicants2.push(programsMostApplicants[1].applicantsTotal);
    programApplicants3.push(programsMostApplicants[2].applicantsTotal);
    programApplicants4.push(programsMostApplicants[3].applicantsTotal);
    programApplicants5.push(programsMostApplicants[4].applicantsTotal);
    


    new Chart(circleEl, {
        type: "pie",
        data: {
            labels: [programName1, programName2, programName3, programName4, programName5],
            datasets: [{
                label: "antal sökande till program",
                data: [programApplicants1, programApplicants2, programApplicants3, programApplicants4, programApplicants5],
                borderWidth: 1
            }]
        },
        options: {
            backgroundColor: ["Red", "Yellow", "Pink", "Green", "Blue", "Purple"]
        }
    });
}