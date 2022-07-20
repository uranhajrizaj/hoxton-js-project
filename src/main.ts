import "./style.css";


let state = {
  students: [],
  professors: [],
  user: {
    id: "",
    password: "",
    type: "",
  },
  alertMessage: "",
};

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

function signIn(email: String, password: String, divEl: HTMLDivElement) {
  fetch(`http://localhost:3005/professors/${email}`)
    .then((resp) => resp.json())
    .then((professor) => {
      if (professor.password === password) {
        state.user.id = professor.id;
        state.user.password = `${professor.password}`;
        state.user.type = "professor";
        render()
      } else {
        fetch(`http://localhost:3005/students/${email}`)
          .then((resp) => resp.json())
          .then((student) => {
            if (student.password === password) {
              state.user.id = student.id;
              state.user.password = `${student.password}`;
              state.user.type = "student";
              render()
            } else {
              state.alertMessage = "Wrong email or password. Please try again";
              render()
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
    signIn(userEl.value, passwordEl.value, divEl);
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

  let pEl = document.createElement("h1");
  pEl.textContent = "Welcome professor";
  containerEl.append(pEl);
  bodyEl.append(containerEl);
}



function renderStudentHearderPage() {
  let headerEl = document.createElement('header')

  let NameDivEl = document.createElement('div')
  NameDivEl.className = 'header_part'

  let TitleEl = document.createElement('h2')
  TitleEl.textContent = 'ESSM'

  let HeaderContainerEl = document.createElement('div')
  HeaderContainerEl.className = 'header_container'

  let Element1 = document.createElement('a')
  Element1.textContent = 'Home'

  let Element2 = document.createElement('a')
  Element2.textContent = 'Work'

  let Element3 = document.createElement('a')
  Element3.textContent = 'Log Out'

  HeaderContainerEl.append(Element1, Element2, Element3)
  NameDivEl.append(TitleEl)
  headerEl.append(NameDivEl, HeaderContainerEl)
  bodyEl?.append(headerEl)
}


function renderStudentMainPage() {
  let MainEl = document.createElement('main')

  let SubjectDivEl = document.createElement('Div')
  SubjectDivEl.className = 'Subject_Part'

  let H3El = document.createElement('h2')
  H3El.textContent = 'Subjects'
  let MathEl = document.createElement('h3')
  MathEl.textContent = 'Math'

  let EnglishEl = document.createElement('h3')
  EnglishEl.textContent = 'English'

  let HistoryEl = document.createElement('h3')
  HistoryEl.textContent = 'History'

  let ScienceEl = document.createElement('h3')
  ScienceEl.textContent = 'Science'

  let ImportantPartEl = document.createElement('div')
  ImportantPartEl.className = 'Important_Part'

  let ProfSectionEl = document.createElement('div')
  ProfSectionEl.className = 'Professor_in_Student'

  let ProfImg = document.createElement('img')
  ProfImg.src = 'https://images.pexels.com/photos/4342401/pexels-photo-4342401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

  let ProfName = document.createElement('h3')
  ProfName.textContent = 'Professor name'

  let ProfDepartment = document.createElement('h3')
  ProfDepartment.textContent = 'Professor department'

  let forstudentPartEl = document.createElement('div')
  forstudentPartEl.className = 'forstudent'

  let GradesPartEl = document.createElement('div')
  GradesPartEl.className = 'Grades'

  let SubjectName = document.createElement('h3')
  SubjectName.textContent = 'Subject Name'

  let SubjectGrade = document.createElement('h3')
  SubjectGrade.textContent = 'Subject Grade'

  let AbsentPartEl = document.createElement('div')
  AbsentPartEl.className = 'Absent'

  let Reasonable = document.createElement('h3')
  Reasonable.textContent = 'Reasonable absents'

  let Unreasonable = document.createElement('h3')
  Unreasonable.textContent = 'Unreasonable absents'

  let AssignmentPartEl = document.createElement('div')
  AssignmentPartEl.className = 'Assignment'

  let HandinAssignment = document.createElement('h3')
  HandinAssignment.textContent = 'Hand in Assignment'

  let MissingAssignment = document.createElement('h3')
  MissingAssignment.textContent = 'Missing Assignment'

  AssignmentPartEl.append(HandinAssignment, MissingAssignment)
  AbsentPartEl.append(Reasonable, Unreasonable)
  GradesPartEl.append(SubjectName, SubjectGrade)
  forstudentPartEl.append(GradesPartEl, AssignmentPartEl, AbsentPartEl)
  ProfSectionEl.append(ProfImg, ProfName, ProfDepartment)
  ImportantPartEl.append(ProfSectionEl, forstudentPartEl)
  SubjectDivEl.append(H3El, MathEl, EnglishEl, HistoryEl, ScienceEl)
  MainEl.append(SubjectDivEl, ImportantPartEl)
  bodyEl?.append(MainEl)
}


function renderStudentPage() {
  if (bodyEl === null) return;
  bodyEl.textContent = "";
  renderStudentHearderPage()
  renderStudentMainPage()
}

function render() {
  let bodyEl = document.querySelector("body");
  if (bodyEl === null) return;
  bodyEl.textContent = "";
  if (state.user.type === "") renderHomePage();
  if (state.user.type === "professor") renderProfessorPage();
  if (state.user.type === "student") renderStudentPage();
}
render();


window.state = state;
console.log(state);
