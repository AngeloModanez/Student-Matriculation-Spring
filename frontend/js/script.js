var students = [];
var courses = [];
var period = [
    { id: 1, name: "Manhã" },
    { id: 2, name: "Tarde" },
    { id: 3, name: "Noite" }
];

loadStudents();
loadCourses();

function loadStudents() {
    $.getJSON("http://localhost:8080/students", (response) => {
        students = response;
        for (let stud of response) {
            addNewRow(stud);
        }
    });
}

function loadCourses() {
    $.ajax({
        url: "http://localhost:8080/courses",
        type: "GET",
        async: false,
        success: (response) => {
            courses = response;
            for (var course of courses) {
                document.getElementById("selectCourse").innerHTML += `<option value=${course.id}>${course.name}</option>`
            }
        }
    });
}

function register() {
    var shiftCheck = parseInt(document.querySelector('input[name="radioShift"]:checked').id);

    var stud = {
        id: students.length + 1,
        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        phone: document.getElementById("phone").value,
        idCourse: document.getElementById("selectCourse").value,
        period: shiftCheck
    };

    $.ajax({
        url: "http://localhost:8080/students",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(stud),
        success: (student) => {
            addNewRow(student);
            students.push(student);
            document.getElementById("formStudent").reset();
        }
    });
}

function addNewRow(stud) {
    var table = document.getElementById("studentTable");
    var newRow = table.insertRow();
    var cell = null;

    var idNode = document.createTextNode(stud.id);
    newRow.insertCell().appendChild(idNode);

    var nameNode = document.createTextNode(stud.name);
    newRow.insertCell().appendChild(nameNode);

    var emailNode = document.createTextNode(stud.email);
    cell = newRow.insertCell();
    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(emailNode);

    var phoneNode = document.createTextNode(stud.phone);
    cell = newRow.insertCell();
    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(phoneNode);

    var courseNode = document.createTextNode(courses[stud.idCourse - 1].name);
    cell = newRow.insertCell();
    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(courseNode);

    var shiftNode = document.createTextNode(period[stud.period - 1].name);
    cell = newRow.insertCell();
    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(shiftNode);
}