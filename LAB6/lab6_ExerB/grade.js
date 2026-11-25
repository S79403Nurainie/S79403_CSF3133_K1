// =========================================================================
// PART 1: LIST OF ERRORS FOUND AND FIXED
// =========================================================================
// Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="return checkMark()", causing the form to reload and the result to disappear immediately.
// Error 2 (grade.html, Line 17): Wrong function name casing 'showtable()' instead of 'showTable()'.
// Error 3 (grade.html, Line 19): Wrong script file name 'grades.js' instead of 'grade.js'.
// Error 4 (grade.js, Line 5): Used assignment operator '=' instead of comparison '===' in 'if (name = "")'.
// Error 5 (grade.js, Line 9): Wrong function name casing 'isNan()' instead of 'isNaN()'.
// Error 6 (grade.js, Line 14): Used logical AND '&&' instead of logical OR '||' in 'if (mark < 0 && mark > 100)', allowing invalid marks like 150.
// Error 7 (grade.js, Line 28): Wrong method casing 'getElementByID' instead of 'getElementById'.
// Error 8 (grade.js, Line 30): Wrong method casing 'getElementByID' and British spelling 'style.colour' instead of 'style.color'.
// Error 9 (grade.js, Line 31): Returned 'true' instead of 'false', causing the form to submit/refresh and wipe out the displayed result.
// Error 10 (grade.js, Line 38): Loop started at 'i = 1' instead of 'i = 0', skipping the first row (Grade A) in the table.
// =========================================================================

// Function to validate inputs, calculate grade, and display results
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Check if Name is empty
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2 (Step 5): Check if Mark field is empty
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check if Mark is a valid number
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert mark to integer and check range 0 - 100
    mark = parseInt(mark);
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade based on mark
    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Display result message
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = name + " got grade " + grade;

    // Part 2 (Step 6): Set result text color according to grade
    if (grade === "A" || grade === "B") {
        resultElement.style.color = "green";
    } else if (grade === "C") {
        resultElement.style.color = "orange";
    } else {
        resultElement.style.color = "red";
    }

    // Part 2 (Step 8): Display date and time when grade was checked
    document.getElementById("checkedTime").innerHTML = "Checked on: " + Date();

    // Return false to prevent form submission and keep result on screen
    return false;
}

// Part 2 (Step 7): Function to generate a random whole number from 0 to 100
function generateRandomMark() {
    let randomNum = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomNum;
}

// Function to display the grade reference table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    
    // Added table headers for clean structure
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
    
    // Loop starts at index 0 so Grade A is included
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    
    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
