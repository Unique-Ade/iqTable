// Global Variables
const timeTable = {}; // Stores timetable data
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periodsPerDay = 8; // Total periods per day

// Initialize the timetable structure
function initializeTable() {
    days.forEach(day => {
        timeTable[day] = Array(periodsPerDay).fill(null); // Fill each day with null slots
    });
}
initializeTable(); // Initialize when the page loads

// Display the timetable in the DOM
function displayTimeTable() {
    const table = document.getElementById("timeTable");
    table.innerHTML = ""; // Clear any existing content

    // Create header row
    let headerRow = "<tr><th>Day</th>";
    for (let i = 1; i <= periodsPerDay; i++) {
        headerRow += `<th>Period ${i}</th>`;
    }
    headerRow += "</tr>";
    table.innerHTML += headerRow;

    // Create rows for each day
    days.forEach(day => {
        let row = `<tr><td>${day}</td>`;
        timeTable[day].forEach((slot, periodIndex) => {
            const slotValue = slot ? `${slot.subject} (${slot.teacher})` : "";
            row += `<td contenteditable="true" data-day="${day}" data-period="${periodIndex}">${slotValue}</td>`;
        });
        row += "</tr>";
        table.innerHTML += row;
    });

    // Add event listeners to editable cells
    addCellListeners();
}

// Add event listeners for editable timetable cells
function addCellListeners() {
    const cells = document.querySelectorAll("#timeTable td[contenteditable='true']");
    cells.forEach(cell => {
        cell.addEventListener("blur", event => {
            const day = cell.dataset.day;
            const period = parseInt(cell.dataset.period);
            const value = cell.textContent.trim();

            if (value) {
                // Split input into subject and teacher
                const [subject, teacher] = value.split("(").map(str => str.replace(")", "").trim());
                timeTable[day][period] = { subject, teacher };
            } else {
                timeTable[day][period] = null; // Clear slot if empty
            }
        });
    });
}

// Download the timetable as CSV
function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add header row
    csvContent += "Day," + Array.from({ length: periodsPerDay }, (_, i) => `Period ${i + 1}`).join(",") + "\n";

    // Add rows for each day
    days.forEach(day => {
        const row = [day];
        timeTable[day].forEach(slot => {
            row.push(slot ? `${slot.subject} (${slot.teacher})` : "");
        });
        csvContent += row.join(",") + "\n";
    });

    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "timetable.csv");
    document.body.appendChild(link); // Required for some browsers
    link.click();
    document.body.removeChild(link); // Cleanup
}

// Handle adding subjects
function addSubject(event) {
    event.preventDefault();

    // Get input values
    const day = document.getElementById("day").value;
    const period = parseInt(document.getElementById("period").value) - 1; // Convert to 0-indexed
    const subject = document.getElementById("enterSubject").value.trim();
    const teacher = document.getElementById("enterTeacher").value.trim();

    if (!day || period < 0 || !subject || !teacher) {
        alert("All fields are required. Please fill them in correctly.");
        return;
    }

    // Add subject to the timetable
    timeTable[day][period] = { subject, teacher };
    displayTimeTable(); // Refresh the displayed timetable

    // Reset the form
    document.getElementById("addSubjectForm").reset();
}

// Event Listeners
document.getElementById("addSubjectForm").addEventListener("submit", addSubject);
document.getElementById("downloadCSV").addEventListener("click", downloadCSV);

// Display the empty timetable on page load
displayTimeTable();
