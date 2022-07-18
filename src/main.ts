import "./style.css";

 
// type User={
//     id:string,
//     password:string
// }

// type State={
//     user:User[]
// }

let state={
    user: {
        id:"",
        password:""
    }
}




let bodyEl=document.querySelector("body");

// console.log(state);
function renderHomePage(){

    if(bodyEl===null) return 
    let containerEl=document.createElement("div");
    containerEl.className="container";

    let holderEl=document.createElement("div");
    holderEl.className="holder";

    let h1El=document.createElement("h1");
    h1El.textContent="ESSM";
    h1El.className="title";

    let formEl=document.createElement("form");
    formEl.className="form";
    formEl.addEventListener("submit",function(event){
        event.preventDefault();
        
        state.user.id=`${userEl.value}`
        state.user.password=`${passwordEl.value}`
        // console.log(state);
        render();

    }
    )

    let userEl=document.createElement("input");
    userEl.type="number";
    userEl.placeholder="Enter your ID";
    userEl.className="user";

    let passwordEl=document.createElement("input");
    passwordEl.type="password";
    passwordEl.placeholder="Enter your password";
    passwordEl.className="password";

    let buttonEl=document.createElement("button");
    buttonEl.textContent="Log in";
    buttonEl.className="login-button";

    formEl.append(userEl,passwordEl,buttonEl);
     holderEl.append(h1El,formEl);
    containerEl.append(holderEl);
    bodyEl.append(containerEl);
}

// window.state=state
// console.log(state);

function renderProfessorPage(){}


function renderStudentPage(){}



function render(){
    if(bodyEl===null) return
    bodyEl.textContent="";
    renderHomePage();
    if(state.user.id[0]==="0") renderProfessorPage();
    else  renderStudentPage();

}
render()
