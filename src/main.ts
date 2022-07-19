import "./style.css";


// type User={
//     id:string,
//     password:string
// }

// type State={
//     user:User[]
// }

let state = {
    user: {
        id: "",
        password: ""
    }
}

let bodyEl = document.querySelector("body");



// console.log(state);
// function renderHomePage() {

//     if (bodyEl === null) return
//     let containerEl = document.createElement("div");
//     containerEl.className = "container";

//     let holderEl = document.createElement("div");
//     holderEl.className = "holder";

//     let h1El = document.createElement("h1");
//     h1El.textContent = "ESSM";
//     h1El.className = "title";

//     let formEl = document.createElement("form");
//     formEl.className = "form";
//     formEl.addEventListener("submit", function (event) {
//         event.preventDefault();

//         state.user.id = `${userEl.value}`
//         state.user.password = `${passwordEl.value}`
//         // console.log(state);
//         render();

//     }
//     )

//     let userEl = document.createElement("input");
//     userEl.type = "number";
//     userEl.placeholder = "Enter your ID";
//     userEl.className = "user";

//     let passwordEl = document.createElement("input");
//     passwordEl.type = "password";
//     passwordEl.placeholder = "Enter your password";
//     passwordEl.className = "password";

//     let buttonEl = document.createElement("button");
//     buttonEl.textContent = "Log in";
//     buttonEl.className = "login-button";

//     formEl.append(userEl, passwordEl, buttonEl);
//     holderEl.append(h1El, formEl);
//     containerEl.append(holderEl);
//     bodyEl.append(containerEl);
// }

// window.state=state
// console.log(state);

function renderProfessorPage() { }

function StudentPageHeaderPart() {

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

function StudentPageBodyPart() {
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

    StudentPageHeaderPart()
    StudentPageBodyPart()

}



function render() {
    if (bodyEl === null) return
    bodyEl.textContent = "";
    // renderHomePage();
    if (state.user.id[0] === "0") renderProfessorPage();
    else renderStudentPage();
}

render()

