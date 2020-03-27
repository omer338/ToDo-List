const form =document.querySelector("#todo-form");
const todoinput=document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firscardbody = document.querySelectorAll(".card-body")[0];

const secondcardbody = document.querySelectorAll(".card-body")[1];

const filter = document.querySelector("#filter");
const clearbutton = document.querySelector("#clear-todos");




eventListeners();


function eventListeners(){
form.addEventListener("submit",addtodo);
document.addEventListener("DOMContentLoaded",loadtodosui);
secondcardbody.addEventListener("click",deletetodo);
filter.addEventListener("keyup", filtertodos);
clearbutton.addEventListener("click", deletealltodos);

}


function deletealltodos(e){
//arayüzden kaldırma
if(confirm("Tümünü Silmek İstediğinize Emin Misiniz ?")){

    //todolist.innerHTML="";  yavas yontem

    while(todolist.firstElementChild !=null) {
        
        todolist.removeChild(todolist.firstElementChild);

    }
    
    localStorage.removeItem("todos");
   

}



}


function filtertodos (e){
const filtervalue = e.target.value.toLowerCase();

const listitem = document.querySelectorAll(".list-group-item");

listitem.forEach(function(listitem){

    const text = listitem.textContent.toLowerCase();
    

    if(text.indexOf(filtervalue)  === -1){
        //bulamadi

        listitem.setAttribute("style","display : none !important");


    }

    else{
       
        listitem.setAttribute("style","display : block");


    }



})


}


function deletetodo(e){

if(e.target.className === "fa fa-remove"){

e.target.parentElement.parentElement.remove();
deletetodostorage(e.target.parentElement.parentElement.textContent.trim());

}

}

function deletetodostorage(deletetodo){
let todos = gettodosfromstorage();



todos.forEach(function(todo, index){
   


    
    if(todo === deletetodo){
        todos.splice(index ,1);
    }
   



}); 
 

localStorage.setItem("todos",JSON.stringify(todos));


}



function loadtodosui(){

    let todos = gettodosfromstorage();

    todos.forEach(function(todo){
        todoToui(todo);
        
    })
}

function addtodo(e){

    const newtodo=todoinput.value.trim();
   if(newtodo === ""){
       showAlert("danger", "Dikkat! To Do ismi boş olamaz." );
   }
    
  else {
    showAlert("success", "To Do başarıyla eklendi" );  
    todoToui(newtodo); 
      addtodotostorage(newtodo);
      
      
    }
    e.preventDefault();
}
    function gettodosfromstorage(){   ///storageden todolari alma
        let todos;

        if(localStorage.getItem("todos")===null){
            todos = [];
        }
        else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        return todos;
    }
    
    
    function addtodotostorage(newtodo){
       let todos = gettodosfromstorage();
       todos.push(newtodo);
      
       localStorage.setItem("todos", JSON.stringify(todos));
    
    
    }



function showAlert(type,message){

const alert = document.createElement("div");
alert.className = `alert alert-${type}`;
alert.textContent = message;

firscardbody.appendChild(alert);

//setTimeOut
window.setTimeout(function(){
alert.remove();
},1500);
 
}

function todoToui(newtodo) {
    
   
    //list item olusturma
   
    const listitem= document.createElement("li");
 
    //link olusturma
    
    const link = document.createElement("a"); 
    link.className="delete-item";
    link.href="#";
    link.innerHTML = " <i class = 'fa fa-remove'></i>";
    
    listitem.className= "list-group-item d-flex justify-content-between";
    listitem.appendChild(document.createTextNode(newtodo));
    listitem.appendChild(link);


    
    
    //todo liste list itemi ekleme

    todolist.appendChild(listitem);
    todoinput.value=""
}

