var students = [];
var courses = [];
var periods = [];

loadStudents();
loadCourses();
loadPeriods();

function loadStudents() {
    $.getJSON("http://localhost:8080/students",
        (response) => {
            students = response;
            for (let student of students) {
                addNewRow(student);
            }
        })
}

function loadCourses() {
    $.ajax({
        url: "http://localhost:8080/courses",
        type: "GET",
        async: false,
        success: (response) => {
            courses = response
            for (let course of courses) {
                document.getElementById("selectCourse").innerHTML += `<option value=${course.id}>${course.name}</option>`
            }
        }
    })
}

function loadPeriods() {
    $.ajax({
        url: "http://localhost:8080/periods",
        type: "GET",
        async: false,
        success: (response) => {
            periods = response;
            for (let period of periods) {
                document.getElementById("selectPeriod").innerHTML +=
                    `<div class="form-check">
                        <input class="form-check-input" type="radio"
                            name="radioShift"
                            id="${period.id}"
                            value="${period.id}"
                            required>
                        <label class="form-check-label" for="${period.id}">
                            ${period.name}
                        </label>
                    </div>`;
            }
        }
    })
}

function register() {
    const student = {
        id: students.length + 1,
        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        phone: document.getElementById("inputPhone").value,
        idCourse: parseInt(document.getElementById("selectCourse").value),
        idPeriod: parseInt(document.querySelector("input[name='radioShift']:checked").id)
    };

    $.ajax({
        url: "http://localhost:8080/students",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(student),
        success: (student) => {
            addNewRow(student);
            students.push(student);
            document.getElementById("formStudent").reset();
        }
    })
}

function addNewRow(student) {
    var table = document.getElementById("studentTable");
    var newRow = table.insertRow();
    var cell = null;

    var idNode = document.createTextNode(student.id);
    newRow.insertCell().appendChild(idNode);

    var nameNode = document.createTextNode(student.name);
    newRow.insertCell().appendChild(nameNode);

    var emailNode = document.createTextNode(student.email);
    cell = newRow.insertCell();
    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(emailNode);

    var phoneNode = document.createTextNode(student.phone);
    cell = newRow.insertCell();
    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(phoneNode);

    var courseNode = document.createTextNode(courses[student.idCourse - 1].name);
    cell = newRow.insertCell();
    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(courseNode);

    var periodNode = document.createTextNode(periods[student.idPeriod - 1].name);
    cell = newRow.insertCell();
    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(periodNode);
}