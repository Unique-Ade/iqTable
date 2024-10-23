//collect input values and create an object of subjects
//keys - Subject, Teacher and periodsPerWeek:.

//Function that stores input values as subject


let subjects = [];
function subjectData() {
    //subject name
    let subjectName = document.querySelector('#enter_subject').value;
    //Subject Teacher name
    let teachertName = document.querySelector('#enter_name').value;
    //No of periods per week
    let periodsPerWeek = document.querySelector('#enter_periods').value;
    if (subjectName && teachertName && periodsPerWeek) {
        const subject = {
            subject: subjectName,
            teacher: teachertName,
            periodsPerWeek: parseInt(periodsPerWeek)
        }
        subjects.push(subject);
        console.log(subjects);
    } else {
        alert("All inputs must be filled");
    } 

}

//Function that generates time slot for subjects per day.

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periodsPerDay = 8;
let timeTable = {};

days.forEach((day) => {
    timeTable[day] = new Array(periodsPerDay).fill(null);
})

// console.log(timeTable);

//Assigning Subjects to Timetable randomly considering the total periods per week for each subject.

//Note : Total Periods = 40 per week
//     : Total subjectsPeriods must be <= 40
//     : Total SubjectPeriods > 40 === Error Message : Maximum Subjects per week periods exceeded.

const assignSubjects = () => {
    subjects.forEach((subject) => {

        let iteration = 0;
        while (iteration < subject.periodsPerWeek) {
            let randomDay = days[Math.floor(Math.random() * days.length)];
            let randomPeriod = Math.floor(Math.random() * periodsPerDay);

            if (!timeTable[randomDay][randomPeriod]) {
                timeTable[randomDay][randomPeriod] = {
                    subject: subject.subject,
                    teacher: subject.teacher
                }
            }
            iteration++;
           
        }
    });
    console.log(timeTable);
}