import "./style.css";

type Subject = {
  id: number;
  name: string;
};

type User = {
  id: string;
  password: string;
  name: string;
  img: string;
  type: string;
};

type Mark = {
  mark: string;
  professor: Professor;
  student: Student;
  subject: string;
};
type Student = {
  name: string;
  username: string;
  id: string;
  password: string;
  departmentId: string;
};

type Professor = {
  name: string;
  username: string;
  professorId: string;
  img: string;
  password: string;
};

type Select = {
  department: string;
  subject: string;
};
type department = {
  name: string;
  departmentId: string;
  id: string;
  professorId: string;
  subject: Subject[];
  student: Student[];
  professor: Professor[];
};

type State = {
  students: Student[];
  professors: Professor[];
  user: User;
  subjects: Subject[];
  departments: department[];
  mark: Mark[];
  alertMessage: string;
  select: Select;
  studentMark: string;
};

let state: State = {
  students: [],
  professors: [],
  user: {
    id: "",
    name: "",
    img: "",
    password: "",
    type: "",
  },
  alertMessage: "",
  mark: [],
  select: {
    department: "",
    subject: "",
  },
  subjects: [],
  departments: [],
  studentMark: "",
};

function getStudentMark() {
  fetch(
    `http://localhost:3005/departments?name=${state.select.department}&professorId=${state.user.id}&_expand=student`
  )
    .then((resp) => resp.json())
    .then((data) => {
      state.mark = data;
      render();
    });
}

function getSubjectsfromServer() {
  fetch("http://localhost:3005/subjects")
    .then((res) => res.json())
    .then((data) => {
      state.subjects = data;
      render();
    });
}
getSubjectsfromServer();

function getDepartmentfromServer() {
  fetch("http://localhost:3005/departments")
    .then((res) => res.json())
    .then((data) => {
      state.departments = data;
      render();
    });
}
getDepartmentfromServer();

function getStudentsfromServer() {
  fetch("http://localhost:3005/students")
    .then((res) => res.json())
    .then((data) => {
      state.students = data;
      render();
    });
}
getStudentsfromServer();

function getProfesorsfromServer() {
  fetch(" http://localhost:3005/professors")
    .then((res) => res.json())
    .then((data) => {
      state.professors = data;
      render();
    });
}
getProfesorsfromServer();

let bodyEl = document.querySelector("body");

function signIn(email: String, password: String) {
  fetch(`http://localhost:3005/professors/${email}`)
    .then((resp) => resp.json())
    .then((professor) => {
      if (professor.password === password) {
        state.user.id = professor.id;
        state.user.password = `${professor.password}`;
        state.user.type = "professor";
        state.user.name = `${professor.name}`;
        state.user.img = professor.img;
        render();
      } else {
        fetch(`http://localhost:3005/students/${email}`)
          .then((resp) => resp.json())
          .then((student) => {
            if (student.password === password) {
              state.user.id = student.id;
              state.user.password = `${student.password}`;
              state.user.name = `${student.name}`;
              state.user.img = `${student.img}`;
              state.user.type = "student";
              render();
            } else {
              state.alertMessage = "Wrong email or password. Please try again";
              render();
            }
          });
      }
    });
}

function renderHomePage() {
  if (bodyEl === null) return;
  let containerEl = document.createElement("div");
  containerEl.className = "container";

  let holderEl = document.createElement("div");
  holderEl.className = "holder";

  let titleEl = document.createElement("h1");
  titleEl.textContent = "Welcome! Please sign in!";
  titleEl.className = "home-title";
  containerEl.append(titleEl);

  let h1El = document.createElement("h1");
  h1El.textContent = "essm";
  h1El.className = "title";

  let formEl = document.createElement("form");
  formEl.className = "form";
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    signIn(userEl.value, passwordEl.value);
    render();
  });

  let userEl = document.createElement("input");
  userEl.type = "email";
  userEl.placeholder = "Enter your email";
  userEl.className = "user";
  userEl.required = true;

  let divEl = document.createElement("div");
  divEl.className = "div-password";

  let passwordEl = document.createElement("input");
  passwordEl.type = "password";
  passwordEl.placeholder = "Enter your password";
  passwordEl.className = "password";
  passwordEl.required = true;

  divEl.append(passwordEl);

  if (state.alertMessage !== "") {
    let pEl = document.createElement("p");
    pEl.textContent = "* Wrong email or password. Please try again!";
    pEl.className = "alert-message";
    divEl.append(pEl);
  }

  let buttonEl = document.createElement("button");
  buttonEl.textContent = "Log in";
  buttonEl.className = "login-button";

  formEl.append(userEl, divEl, buttonEl);
  holderEl.append(h1El, formEl);
  containerEl.append(holderEl);
  bodyEl.append(containerEl);
}

function renderProfessorPage() {
  if (bodyEl === null) return;
  bodyEl.textContent = "";

  let containerEl = document.createElement("div");
  containerEl.className = "container-professor";

  let mainEl = document.createElement("div");
  mainEl.className = "main-professor";

  let headerEl = document.createElement("header");
  headerEl.className = "header-professor";

  let divEl = document.createElement("div");
  divEl.className = "div-professor";

  let verticalLineEl = document.createElement("div");
  verticalLineEl.className = "material-symbols-outlined";
  verticalLineEl.textContent = "menu";
  verticalLineEl.id = "verticalLine";
  verticalLineEl.addEventListener("click", function () {
    openMenu();
  });

  let rightSidemenuEl = document.createElement("div");
  rightSidemenuEl.id = "rightSidemenu";
  rightSidemenuEl.className = "rightSidemenu";

  let profileEl = document.createElement("a");
  profileEl.textContent = "Profile";
  profileEl.className = "profile";

  let aboutEl = document.createElement("a");
  aboutEl.textContent = "About ESSM";
  aboutEl.className = "about";

  rightSidemenuEl.append(profileEl, aboutEl);

  let pEl = document.createElement("h1");
  pEl.textContent = "essm";
  pEl.className = "title-professor";

  let imgEl = document.createElement("img");
  imgEl.src = state.user.img;
  imgEl.className = "img";

  let p2El = document.createElement("p");
  p2El.textContent = state.user.name;
  p2El.className = "professor-name";

  let buttonEl = document.createElement("div");
  buttonEl.textContent = "logout";
  buttonEl.className = "material-symbols-outlined";
  buttonEl.addEventListener("click", function () {
    state.user = {
      id: "",
      name: "",
      img: "",
      password: "",
      type: "",
    };
    state.mark = [];
    render();
  });

  rightSidemenuEl.append(buttonEl);
  divEl.append(imgEl, p2El, buttonEl);
  headerEl.append(verticalLineEl, pEl, divEl);
  containerEl.append(headerEl, rightSidemenuEl, mainEl);
  bodyEl.append(containerEl);

  renderProfessorContetPage(mainEl);
}

function openMenu() {
  let rightSidemenuEl = document.getElementById("rightSidemenu");
  if (rightSidemenuEl === null) return;

  let appsEl = document.getElementById("verticalLine");
  if (appsEl === null) return;

  if (rightSidemenuEl.style.display === "block") {
    appsEl.style.backgroundColor = "transparent";
    rightSidemenuEl.style.display = "none";
  } else {
    appsEl.style.backgroundColor = "#3AB4F2";
    rightSidemenuEl.style.display = "block";
  }
}

function renderProfessorContetPage(mainEl: HTMLDivElement) {
  mainEl.textContent = "";

  let selectEl = document.createElement("div");
  selectEl.className = "select";

  let depEl = document.createElement("details");
  depEl.className = "department";

  let summaryEl = document.createElement("summary");
  summaryEl.textContent = "Select Department";
  for (let dep of state.departments) {
    let liEl = document.createElement("li");
    liEl.textContent = dep.name;
    liEl.className = "select-item";
    liEl.addEventListener("click", function () {
      summaryEl.textContent = `Department: ${dep.name}`;
      state.select.department = dep.name;
      getStudentMark();
      render();
    });
    depEl.append(summaryEl, liEl);
  }

  let subEl = document.createElement("details");
  subEl.className = "subjects";

  let summary1El = document.createElement("summary");
  summary1El.textContent = "Select Subject";

  for (let subject of state.subjects) {
    let li4El = document.createElement("li");
    li4El.textContent = subject.name;
    li4El.className = "select-item";
    li4El.addEventListener("click", function () {
      summary1El.textContent = `Subject: ${subject.name}`;
      state.select.subject = subject.name;
      render();
    });
    subEl.append(summary1El, li4El);
  }

  let studentEl = document.createElement("div");
  studentEl.className = "student";

  let infoEl = document.createElement("div");
  infoEl.className = "info";

  let studentNameEl = document.createElement("div");
  studentNameEl.className = "student-name";
  studentNameEl.textContent = "Student Name";

  let studentIDEl = document.createElement("div");
  studentIDEl.className = "student-id";
  studentIDEl.textContent = "Student ID";

  let studentSubejctEl = document.createElement("div");
  studentSubejctEl.className = "student-subject";
  studentSubejctEl.textContent = "Subject";

  let studentMarkEl = document.createElement("div");
  studentMarkEl.className = "student-mark";
  studentMarkEl.textContent = "Student Mark";

  let studentGradeEl = document.createElement("div");
  studentGradeEl.className = "student-grade";
  studentGradeEl.textContent = "Mark";

  let studentInfoEl = document.createElement("div");
  studentInfoEl.className = "student-info";

  for (let mark of state.mark) {
    let oneEl = document.createElement("div");
    oneEl.className = "one-student";

    let studentName1El = document.createElement("div");
    studentName1El.className = "student-name1";
    studentName1El.textContent = mark.student.name;

    let studentID1El = document.createElement("div");
    studentID1El.className = "student-id1";
    studentID1El.textContent = mark.student.id;

    let studentSubject1El = document.createElement("div");
    studentSubject1El.className = "student-subject1";
    studentSubject1El.textContent = state.select.subject;

    let studentMark1El = document.createElement("div");
    studentMark1El.className = "student-mark1";
    studentMark1El.textContent = state.studentMark;

    let inputEl = document.createElement("input");
    inputEl.id = "input";
    inputEl.type = "number";
    inputEl.max = "10";
    inputEl.min = "5";
    inputEl.className = "input";

    let formEl = document.createElement("form");
    formEl.className = "form";
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      state.studentMark = inputEl.value;
      render();
    });

    formEl.append(inputEl);

    oneEl.append(
      studentName1El,
      studentID1El,
      studentSubject1El,
      studentMark1El,
      formEl
    );
    studentInfoEl.append(oneEl);
  }
  studentInfoEl.append(studentEl);
  infoEl.append(
    studentNameEl,
    studentIDEl,
    studentSubejctEl,
    studentMarkEl,
    studentGradeEl
  );
  studentEl.append(infoEl);

  selectEl.append(depEl, subEl);

  mainEl.append(selectEl, studentEl, studentInfoEl);
}

function render() {
  if (bodyEl === null) return;
  bodyEl.textContent = "";
  if (state.user.type === "") renderHomePage();
  if (state.user.type === "professor") renderProfessorPage();
  // if (state.user.type === "student") renderStudentPage()
}

render();

window.state = state;
console.log(state);
