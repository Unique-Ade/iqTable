//collect input values and create an object of subjects
//keys - Subject, Teacher and periodsPerWeek:.


const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periodsPerDay = 8;
let timeTable = {};

//Iterating through days of the week array
days.forEach((day) => {
    timeTable[day] = new Array(periodsPerDay).fill(null);
});

//Function that stores input values as subject

let subjects = [];
let errors = {
    error1: "All input fields must be filled",
    error2: "Maximum slots Exceeded",
};

let errorParent = document.querySelector(".errorMessages");

function subjectData() {
    //subject name
    let subjectName = document.querySelector("#enter_subject").value;
    //Subject Teacher name
    let teachertName = document.querySelector("#enter_name").value;
    //No of periods per week
    let periodsPerWeek = document.querySelector("#enter_periods").value;

    if (subjectName && teachertName && periodsPerWeek) {
        subjects.push( {
            subject: subjectName,
            teacher: teachertName,
            periodsPerWeek: parseInt(periodsPerWeek),
        });
        console.log(subjects);
    } else {
        let errorMessage1 = errors["error1"];
        let errorContent = document.querySelector(".errorMessage");
        errorContent.textContent = errorMessage1;

        //    //Error disappear function;
        setTimeout(() => {
            errorContent.textContent = "";
        }, 5000);
    }
}



// console.log(timeTable);

//Assigning Subjects to Timetable randomly considering the total periods per week for each subject.

//Note : Total Periods = 40 per week
//     : Total subjectsPeriods must be <= 40
//     : Total SubjectPeriods > 40 === Error Message : Maximum Subjects per week periods exceeded.
//let currentSlotsUsed = No of slots filled:
let totalSlots = 40;
let filledSlots;
let availableSlots;

const assignSubjects = () => {
    subjects.forEach((subject) => {
        let iteration = 0;
        while (iteration < subject.periodsPerWeek) {
            let randomDay = days[Math.floor(Math.random() * days.length)];
            let randomPeriod = Math.floor(Math.random() * periodsPerDay);

            if (!timeTable[randomDay][randomPeriod]) {
                timeTable[randomDay][randomPeriod] = {
                    subject: subject.subject,
                    teacher: subject.teacher,
                };
            }
            iteration++;
        }
    });
    console.log(timeTable);
};

//Function to Assign Daily Constraints 
let dailyLimit =()=>{
    const maxSubjectsPerDay = 5;

    days.forEach((day)=>{
         let count = 0;
         for(let period = 0; period < periodsPerDay; period++){
             if(timeTable[day][period] !== null){
                count++;
                if(count > maxSubjectsPerDay){
                    timeTable[day][period] = null;
                }
             }
         }
    })
}







//Function to display TimeTable

let displayTimeTable = () => {
    let table = document.getElementById('table');
    //creating table rows and appending to it.

    table.innerHTML = "";
    //let row1 = document.createElement('tr');
    let row1 = "<tr><th>Period/Day</th>";
    days.forEach((day) => {
        row1 += `<th> ${day} </th>`;
    })
    row1 += "</tr>";
    table.innerHTML += row1;

    //creating other rows
    for (let period = 1; period < 9; period++) {
        let otherRows = `<tr><th>Period: ${period}<th>`;
        let toBeAlloted = timeTable[day][period];
            if (toBeAlloted) {
                otherRows += `<td> ${toBeAlloted.subject} (${toBeAlloted.teacher}) </td>`;
            }
            else {
                otherRows += "<td> </td>";
            }
        otherRows += timeTable;
        otherRows += "</tr>";
        table.innerHTML += otherRows;
    //     days.forEach((day) => {
            

           
    //    // })
     }


    assignSubjects();
    //console.log(table.textContent);
}
