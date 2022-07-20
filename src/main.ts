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

function signIn(email:String, password:String, divEl:HTMLDivElement) {
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

  if(state.alertMessage !== ""){
    let pEl = document.createElement("p");
              pEl.textContent = "* Wrong email or password. Please try again!";
              pEl.className="alert-message";
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

function renderStudentPage() {
  if (bodyEl === null) return;
  bodyEl.textContent = "";
  let containerEl = document.createElement("div");
  containerEl.className = "container";
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
