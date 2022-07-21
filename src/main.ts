import "./style.css";

let state = {
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
   mark: {
    subject: "",
    mark: "",
    professor: "",
    student: "",
  }
   }



 function getStudentMarkForEachSubejct() {
  fetch(`http://localhost:3005/marks?_expand=student&_expand=professor&_expand=subject`)
    .then((resp) => resp.json())
    .then((data) => {
      for(let mark of data){
      state.mark.subject = mark.subject.id;
      state.mark.mark = mark.mark;
      state.mark.professor = mark.professor.id;
      state.mark.student =mark.student.name;
      }
      console.log(data);
      render();
    }
    );
}
getStudentMarkForEachSubejct()



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

  let liEl = document.createElement("li");
  liEl.textContent = "Computer Science";
  liEl.addEventListener("click", function () {
    summaryEl.textContent = "Department: Computer Science";
  });

  let li2El = document.createElement("li");
  li2El.textContent = "Electrical Engineering";

  let li3El = document.createElement("li");
  li3El.textContent = "Mechanical Engineering";

  depEl.append(summaryEl, liEl, li2El, li3El);

  let subEl = document.createElement("details");
  subEl.className = "subjects";

  let summary1El = document.createElement("summary");
  summary1El.textContent = "Select Subject";

  let li4El = document.createElement("li");
  li4El.textContent = "Algorithms";
  li4El.addEventListener("click", function () {
    summary1El.textContent = "Subject: Algorithms";
  });

  let li5El = document.createElement("li");
  li5El.textContent = "Data Structures";

  let li6El = document.createElement("li");
  li6El.textContent = "Operating Systems";

  subEl.append(summary1El, li4El, li5El, li6El);

  let exEl = document.createElement("details");
  exEl.className = "eaxam";

  let summary2El = document.createElement("summary");
  summary2El.textContent = "Select Exams month";

  let li7El = document.createElement("li");
  li7El.textContent = "July Exams ";
  li7El.addEventListener("click", function () {
    summary2El.textContent = "Exam: July Exams";
  });

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

  let studentGradeEl = document.createElement("div");
  studentGradeEl.className = "student-grade";
  studentGradeEl.textContent = "Student Grade";

  infoEl.append(studentNameEl, studentIDEl, studentGradeEl);
  studentEl.append(infoEl);

  exEl.append(summary2El, li7El);

  selectEl.append(depEl, subEl, exEl);

  mainEl.append(selectEl, studentEl);
}

function renderStudentPage() {
  if (bodyEl === null) return;
  bodyEl.textContent = "";
  let containerEl = document.createElement("div");
  containerEl.className = "container-student";
  let pEl = document.createElement("h1");
  pEl.textContent = "Welcome student";

  containerEl.append(pEl);
  bodyEl.append(containerEl);
}

function render() {
  if (bodyEl === null) return;
  bodyEl.textContent = "";
  if (state.user.type === "") renderHomePage();
  if (state.user.type === "professor") renderProfessorPage();
  if (state.user.type === "student") renderStudentPage();
}
render();

window.state = state;
console.log(state);
