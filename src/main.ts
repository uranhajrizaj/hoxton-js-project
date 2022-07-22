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
  marks: {
    subject: "",
    mark: "",
    professor: "",
    img: "",
    student: "",
  }
}



function getStudentMarkForEachSubejct() {
  fetch(`http://localhost:3005/marks?_expand=student&_expand=professor&_expand=subject`)
    .then((resp) => resp.json())
    .then((data) => {
      for (let mark of data) {
        state.marks.subject = mark.subject.id;
        state.marks.mark = mark.mark;
        state.marks.professor = mark.professor.id;
        state.marks.student = mark.student.name;
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

function renderStudentHearderPage() {
  let headerEl = document.createElement('header')

  let SideBarDivEl = document.createElement('div')
  SideBarDivEl.className = 'sidebardiv'
  SideBarDivEl.id = "mySidenav"

  let SideBarEl = document.createElement('img')
  SideBarEl.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUAAAD///+2trb09PSIiIipqan39/dTU1Nvb29MTEyurq7Y2NiAgICfn5/U1NTo6OjFxcUnJyfh4eFbW1uWlpYvLy+Ojo5mZma9vb3e3t7Hx8d1dXWYmJhYWFghISFFRUUaGho7OzvgU+V/AAACm0lEQVR4nO3di07bQBCFYbeJHUJw7twMAfL+L9ma0EalM2sLRhrN5P+e4Bz5trJ3vVUFAAAAAAAAAAAAAAAAoGy3/xnPfje23mz9I6r1bES/26V3zG9Z3g4VvPKO+G1X5YK1dz4DdangnXc6E3d6wbl3NiNzteHEO5qRiVZw753MzF5p2HgHM9PIBe+9cxm6Fxtee8cydC02XHjHMrRIfhlqFyINI7nUhivvWIZWYsMH71iGHsSGN96xDN2IDSvvWIbkgokGNfKQJtNB1AqmuRKVq7CX43Yq30g/PHqnM/BYKpjhKBaPYC/6C9OB16Xv2rgD1KYd0a+3q7tJPF09+tMMAAAAAAAAAAAAgNFm7TLeJLfVsh2z6qlXB/4GXFwv8yH9d/z0czHiLj08W2cvWKyYf16bdzIzWsEMyytPtIeGdy5DcsEn71iGnsSG8R+FZ/JDMd5QVCevt4g7HP3fpa4KomEkcsOtdyxDW7FhniGNNqjZeccypMyH9o5lSC6Y5L8fPfXfH1lGNfKIpnfwjmbkoDasnr2zmXjWC+aoWCyY4VVNYfHhSfp/ff0267xjflk39stFdWjreNrCLRQAAAAAAAAAAADAF23abcRZfM223YzqN4+8C8RC30Tnr+izvYd+QfsSf7ugyUuxYMTr77OmVDHHxDZ9WluaObTqStJX72RmXpWGcWcKfdbJBd+8cxl6ExvmmSKsTRLOc5Jqp2n8h/2ZvD9ghqf9H5e6KoiGkcgNY09//tdSbNh6xzIk73Ox8Y5lSHmdkWEbnRNtM508W63KG60mOoiF/ZC8oxnRC1ZH72wmjoWGKfYeH1hYcoz+MmpVPILvYj/4x21pNY36Xn8xHdXvdLJO4xk+PQEAAAAAAAAAAAAguV+5RFjTgzitKAAAAABJRU5ErkJggg=='
  SideBarEl.className = 'sidebarimg'
  SideBarEl.addEventListener("click", function () {
    createSideMenuBar()
  })

  let NameDivEl = document.createElement('div')
  NameDivEl.className = 'header_part'

  let TitleEl = document.createElement('h2')
  TitleEl.textContent = 'ESSM'

  let HeaderContainerEl = document.createElement('div')
  HeaderContainerEl.className = 'header_container'


  let PersonWhoLogsIn = document.createElement('a')
  PersonWhoLogsIn.textContent = state.user.name

  let PersonWhoLogsInImg = document.createElement('img')
  PersonWhoLogsInImg.alt = 'Student'
  PersonWhoLogsInImg.src = state.user.img
  PersonWhoLogsInImg.className = 'studentaccoutimg'

  let Element = document.createElement('a')
  Element.textContent = 'Log Out'
  Element.addEventListener("click", function () {
    state.user = {
      id: "",
      name: "",
      img: "",
      password: "",
      type: "",
    }
    render()
  })

  SideBarDivEl.append(SideBarEl)
  PersonWhoLogsIn.append(PersonWhoLogsInImg)
  HeaderContainerEl.append(PersonWhoLogsIn, Element)
  NameDivEl.append(TitleEl)
  headerEl.append(SideBarDivEl, NameDivEl, HeaderContainerEl)
  bodyEl?.append(headerEl)
}

function createSideMenuBar() {
  let SIDEBARMENU = document.createElement('div')
  SIDEBARMENU.className = 'side-nav'

  let CloseButton = document.createElement('div')
  CloseButton.className = 'Close'
  CloseButton.textContent = 'X'

  let UlEl = document.createElement('ul')
  UlEl.className = 'SideBarUl'

  let LiEl1 = document.createElement('Li')
  LiEl1.className = 'SideBarLi'
  LiEl1.textContent = 'More Info'
  LiEl1.addEventListener('click', function () {
    if (bodyEl === null) return;
    renderMoreInfoPage()
    render()
  })

  let LiEl2 = document.createElement('Li')
  LiEl2.className = 'SideBarLi'
  LiEl2.textContent = 'Erasums +'

  let LiEl3 = document.createElement('Li')
  LiEl3.className = 'SideBarLi'
  LiEl3.textContent = 'Decisions & Regulations'

  UlEl.append(LiEl1, LiEl2, LiEl3)
  SIDEBARMENU.append(CloseButton, UlEl)
  bodyEl?.append(SIDEBARMENU)
}

function renderMoreInfoPage() {
  let mainEl = document.createElement('main')
  mainEl.className = 'main'

  let TheHoleText = document.createElement('div')
  TheHoleText.className = 'TheHoleText'


  let MoreInfo = document.createElement('div')
  MoreInfo.className = 'moreinfo'

  let MoreInfotitle = document.createElement('h2')
  MoreInfotitle.textContent = 'More info'
  MoreInfotitle.className = 'more-info-title'

  let textDivel = document.createElement('div')
  textDivel.className = 'TextpartDiv'

  let MoreinfoText1 = document.createElement('h3')
  MoreinfoText1.className = 'more-info-text'
  MoreinfoText1.textContent = 'How do we Calculate our finale grade?'

  let MoreinfoText2 = document.createElement('h3')
  MoreinfoText2.className = 'more-info-text'
  MoreinfoText2.textContent = 'Let us walk you through it...'

  let MoreinfoText3 = document.createElement('h3')
  MoreinfoText3.className = 'more-info-text'
  MoreinfoText3.textContent = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'


  MoreInfo.append(MoreInfotitle)
  textDivel.append(MoreinfoText1, MoreinfoText2, MoreinfoText3)
  TheHoleText.append(MoreInfo, textDivel)
  mainEl.append(TheHoleText)
  bodyEl?.append(mainEl)
}
// function renderErasumusPage() {
//   let mainEl = document.createElement('main')
//   mainEl.className = 'main'

//   let TheHoleText = document.createElement('div')
//   TheHoleText.className = 'TheHoleText'


//   let HelloErasmus = document.createElement('div')
//   HelloErasmus.className = 'HelloErasmus'

//   let WhatisErasmus = document.createElement('h2')
//   WhatisErasmus.textContent = 'What is Erasmus'
//   WhatisErasmus.className = 'What-is-Erasmus'

//   let ErasmusTextPart = document.createElement('div')
//   ErasmusTextPart.className = 'ErasmusTextPart'

//   let AboutErasmus = document.createElement('h3')
//   AboutErasmus.className = 'abouterasmus'
//   AboutErasmus.textContent = "Erasmus+ is the EU's programme to support education, training, youth and sport in Europe.It has an estimated budget of €26.2 billion. This is nearly double the funding compared to its predecessor programme (2014-2020). The 2021-2027 programme places a strong focus on social inclusion, the green and digital transitions, and promoting young peoples participation in democratic life It supports priorities and activities set out in the European Education Area, Digital Education Action Plan and the European Skills Agenda."

//   let TakePartInErasmus = document.createElement('h3')
//   TakePartInErasmus.className = 'takepartinerasmus'
//   TakePartInErasmus.textContent = 'Erasmus+ is a very wide programme, covering a diverse range of actions. How you can take part depends broadly on two factors:'

//   let TakePartInErasmus2 = document.createElement('h3')
//   TakePartInErasmus2.className = 'takepartinerasmus2'
//   TakePartInErasmus2.textContent = '1. if you are applying by yourself or on behalf of an organisation'

//   let TakePartInErasmus3 = document.createElement('h3')
//   TakePartInErasmus3.className = 'takepartinerasmus3'
//   TakePartInErasmus3.textContent = '2. in which country you or your organisation is based'

//   let TakePartInErasmus4 = document.createElement('h3')
//   TakePartInErasmus4.className = 'takepartinerasmus4'
//   TakePartInErasmus4.textContent = 'This page contains a general overview of how to take part. You will need to check the specific action that you are interested in to see the criteria you should meet.'


//   HelloErasmus.append(WhatisErasmus)
//   ErasmusTextPart.append(AboutErasmus, TakePartInErasmus, TakePartInErasmus2, TakePartInErasmus3, TakePartInErasmus4)
//   TheHoleText.append(HelloErasmus, ErasmusTextPart)
//   mainEl.append(TheHoleText)
//   bodyEl?.append(mainEl)
// }
// function renderRegulationsPage() {
//   let mainEl = document.createElement('main')
//   mainEl.className = 'main'

//   let TheHoleText = document.createElement('div')
//   TheHoleText.className = 'TheHoleText'


//   let RegulationsPart = document.createElement('div')
//   RegulationsPart.className = 'RegulationsPart'

//   let Regulations = document.createElement('h2')
//   Regulations.textContent = 'Decisions & Regulations'
//   Regulations.className = 'Regulations'

//   let Decisions_Regulations = document.createElement('div')
//   Decisions_Regulations.className = 'Decisions_Regulations'

//   let Rule1 = document.createElement('h3')
//   Rule1.className = 'rules'
//   Rule1.textContent = '1. Find a shorter way, automate using code, try to be as efficient as possible'

//   let Rule2 = document.createElement('h3')
//   Rule2.className = 'rules'
//   Rule2.textContent = '2. Be curious, go deep in language'

//   let Rule3 = document.createElement('h3')
//   Rule3.className = 'rules'
//   Rule3.textContent = '3. Read good open source codes'

//   let Rule4 = document.createElement('h3')
//   Rule4.className = 'rules'
//   Rule4.textContent = '4. Comments: Your code should be commented. Period. You should be able to understand it 12 months 24 months later.'

//   let Rule5 = document.createElement('h3')
//   Rule5.className = 'rules'
//   Rule5.textContent = '5. Write Reusable/modular code: Saves time in long run. Makes debugging easier. Makes modifications easier.'

//   let Rule6 = document.createElement('h3')
//   Rule6.className = 'rules'
//   Rule6.textContent = '6. Practice:It is hard to get better at anything without practice. Write a lot of code. Always try to write good code and keep improving yourself. None of the advice will help you if you are not writing code and applying good practices in realty.'


//   RegulationsPart.append(Regulations)
//   Decisions_Regulations.append(Rule1, Rule2, Rule3, Rule4, Rule5, Rule6)
//   TheHoleText.append(RegulationsPart, Decisions_Regulations)
//   mainEl.append(TheHoleText)
//   bodyEl?.append(mainEl)
// }


function renderStudentMainPage() {
  let Container = document.createElement('div')
  Container.className = 'Container'

  let MainEl = document.createElement('main')
  MainEl.className = 'main'

  let SubjectDivEl = document.createElement('Div')
  SubjectDivEl.className = 'Subject_Part'

  let AllSubjectsEl = document.createElement('div')
  AllSubjectsEl.className = 'allsubjects'
  let H3El = document.createElement('h2')
  H3El.textContent = 'Subjects'

  let AlgoritmsEl = document.createElement('h3')
  AlgoritmsEl.textContent = 'Algoritms'

  let Data_StructuresEl = document.createElement('h3')
  Data_StructuresEl.textContent = 'Data Structures'

  let Operating_SystemsEl = document.createElement('h3')
  Operating_SystemsEl.textContent = 'Operating Systems'

  let Programming_LanguagesEl = document.createElement('h3')
  Programming_LanguagesEl.textContent = 'Programming Languages'

  let Software_EngineeringEl = document.createElement('h3')
  Software_EngineeringEl.textContent = 'Software Engineering'

  let Web_DevelopmentEl = document.createElement('h3')
  Web_DevelopmentEl.textContent = 'Web Development'


  let ScienceEl = document.createElement('h3')
  ScienceEl.textContent = 'Science'

  let AllGradesEl = document.createElement('h2')
  AllGradesEl.textContent = 'Grade Sheet'
  AllGradesEl.className = 'gradesheet'







  let ImportantPartEl = document.createElement('div')
  ImportantPartEl.className = 'Important_Part'

  let ProfSectionEl = document.createElement('div')
  ProfSectionEl.className = 'Professor_in_Student'

  let ProfImg1 = document.createElement('img')
  ProfImg1.src = "https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg?auto=compress&cs=tinysrgb&w=600"

  let ProfName1 = document.createElement('h3')
  ProfName1.textContent = 'Professor John Doe'

  let Profgmail1 = document.createElement('h3')
  Profgmail1.textContent = 'Contact:johndoe@gmail.com'

  let ProfImg = document.createElement('img')
  ProfImg.src = "https://www.fillmurray.com/200/201"

  let ProfName = document.createElement('h3')
  ProfName.textContent = 'Professor James poe'

  let Profgmail = document.createElement('h3')
  Profgmail.textContent = 'Contact:jamespoe@gmail.com'

  let forstudentPartEl = document.createElement('div')
  forstudentPartEl.className = 'forstudent'

  let GradesPartEl = document.createElement('div')
  GradesPartEl.className = 'Grades'

  let SubjectName = document.createElement('h3')
  SubjectName.textContent = 'Algorithm'
  SubjectName.className = 'SubjectName'

  let SubjectGrade = document.createElement('h3')
  SubjectGrade.textContent = 'Your Grade in this subject is: 7 '

  let PassorNot = document.createElement('h3')
  PassorNot.textContent = 'You Passed '
  PassorNot.className = 'passed'



  let GradesPartEl2 = document.createElement('div')
  GradesPartEl2.className = 'Grades'

  let SubjectName2 = document.createElement('h3')
  SubjectName2.textContent = 'Data Structures'
  SubjectName2.className = 'SubjectName'


  let SubjectGrade2 = document.createElement('h3')
  SubjectGrade2.textContent = 'Your Grade in this subject is: 5 '

  let PassorNot2 = document.createElement('h3')
  PassorNot2.textContent = 'You Passed '
  PassorNot2.className = 'passed'


  let GradesPartEl3 = document.createElement('div')
  GradesPartEl3.className = 'Grades'

  let SubjectName3 = document.createElement('h3')
  SubjectName3.textContent = 'Operating Systems'
  SubjectName3.className = 'SubjectName'

  let SubjectGrade3 = document.createElement('h3')
  SubjectGrade3.textContent = 'Your Grade in this subject is: 4 '

  let PassorNot3 = document.createElement('h3')
  PassorNot3.textContent = 'You Failed '
  PassorNot3.className = 'failed'

  let GradesPartEl4 = document.createElement('div')
  GradesPartEl4.className = 'Grades'

  let SubjectName4 = document.createElement('h3')
  SubjectName4.textContent = 'Programming Languages'
  SubjectName4.className = 'SubjectName'

  let SubjectGrade4 = document.createElement('h3')
  SubjectGrade4.textContent = 'Your Grade in this subject is: 9 '

  let PassorNot4 = document.createElement('h3')
  PassorNot4.textContent = 'You Passed '
  PassorNot4.className = 'passed'

  let GradesPartEl5 = document.createElement('div')
  GradesPartEl5.className = 'Grades'

  let SubjectName5 = document.createElement('h3')
  SubjectName5.textContent = 'Software Engineering'
  SubjectName5.className = 'SubjectName'

  let SubjectGrade5 = document.createElement('h3')
  SubjectGrade5.textContent = 'Your Grade in this subject is:10 '

  let PassorNot5 = document.createElement('h3')
  PassorNot5.textContent = 'You Passed '
  PassorNot5.className = 'passed'

  let GradesPartEl6 = document.createElement('div')
  GradesPartEl6.className = 'Grades'

  let SubjectName6 = document.createElement('h3')
  SubjectName6.textContent = 'Web Development'
  SubjectName6.className = 'SubjectName'


  let SubjectGrade6 = document.createElement('h3')
  SubjectGrade6.textContent = 'Your Grade in this subject is:6 '

  let PassorNot6 = document.createElement('h3')
  PassorNot6.textContent = 'You Passed '
  PassorNot6.className = 'passed'

  GradesPartEl6.append(SubjectName6, SubjectGrade6, PassorNot6)
  GradesPartEl5.append(SubjectName5, SubjectGrade5, PassorNot5)
  GradesPartEl4.append(SubjectName4, SubjectGrade4, PassorNot4)
  GradesPartEl3.append(SubjectName3, SubjectGrade3, PassorNot3)
  GradesPartEl2.append(SubjectName2, SubjectGrade2, PassorNot2)
  GradesPartEl.append(SubjectName, SubjectGrade, PassorNot)
  forstudentPartEl.append(GradesPartEl, GradesPartEl2, GradesPartEl3, GradesPartEl4, GradesPartEl5, GradesPartEl6)
  ProfSectionEl.append(ProfImg1, ProfName1, Profgmail1, ProfImg, ProfName, Profgmail)
  ImportantPartEl.append(ProfSectionEl, forstudentPartEl)
  AllSubjectsEl.append(H3El, AlgoritmsEl, Data_StructuresEl, Operating_SystemsEl, Programming_LanguagesEl, Software_EngineeringEl, Web_DevelopmentEl)
  SubjectDivEl.append(AllSubjectsEl, AllGradesEl)
  MainEl.append(SubjectDivEl, ImportantPartEl)
  Container.append(MainEl)
  bodyEl?.append(Container)
}

function renderStudentPage() {
  if (bodyEl === null) return;
  bodyEl.textContent = "";
  renderStudentHearderPage()
  renderStudentMainPage()
  createSideMenuBar()
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
