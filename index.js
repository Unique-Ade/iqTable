//collect input values and create an object of subjects
//keys - Subject, Teacher and Frequency.

//Function that stores input values as subject


let subject = [];
function subjectData() {


    //subject name
    let subjectName = document.querySelector('#enter_subject').value;
    //Subject Teacher name
    let teachertName = document.querySelector('#enter_name').value;
    //No of periods per week
    let periodsPerWeek = document.querySelector('#enter_periods').value;
    if (subjectName && teachertName && periodsPerWeek) {
        const subjects = {
            subject: subjectName,
            teacher: teachertName,
            periods: parseInt(periodsPerWeek)
        }
        subject.push(subjects);
        //console.log(subject);
    } else {
        alert("All inputs must be filled");
    }

}