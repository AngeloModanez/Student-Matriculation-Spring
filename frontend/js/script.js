var students = [
    {
        id: 1,
        name: "Juliana Aguilar",
        email: "juoliveira@gmail.com",
        phone: "(11) 33347-0987",
        course: 1,
        shift: 1
    },
    {
        id: 2,
        name: "Angelo Ferraz",
        email: "bananababy.developer@hotmail.com",
        phone: "(11) 64729-2387",
        course: 2,
        shift: 2
    },
    {
        id: 3,
        name: "Giuseppe Bruni",
        email: "giugiufyrry@gmail.com",
        phone: "(11) 99839-2666",
        course: 3,
        shift: 3
    }
];

var shift = [
    { id: 1, name: "Manhã" },
    { id: 2, name: "Tarde" },
    { id: 3, name: "Noite" }
];
var course = [
    { id: 1, name: "Lobotomia em Duendes" },
    { id: 2, name: "Angular & Bootstrap" },
    { id: 3, name: "Magia Wicca" }
];

loadStudents();

function loadStudents() {
    for (stud of students) {
        addNewRow(stud);
    }
}

function register() {
    var shiftCheck = parseInt(document.querySelector('input[name="radioShift"]:checked').id);

    var stud = {
        id: students.length + 1,
        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        phone: document.getElementById("phone").value,
        course: parseInt(document.getElementById("selectCourse").value),
        shift: shiftCheck
    };

    addNewRow(stud);
    students.push(stud);
    document.getElementById("formStudent").reset();
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

    var courseNode = document.createTextNode(course[stud.course - 1].name);
    cell = newRow.insertCell();
    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(courseNode);

    var shiftNode = document.createTextNode(shift[stud.shift - 1].name);
    cell = newRow.insertCell();
    cell.className = "d-none d-lg-table-cell";
    cell.appendChild(shiftNode);
}