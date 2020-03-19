// select Elements
const toDoInput = document.getElementById("input"),
    toDoList = document.getElementById("toDoList");
    
// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
const TODOS_LS = "toDo";
let toDos = [],
    newId = toDos.length;
    
/* to-do is Done */
function completeToDo(element) // element: circle button
{
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    toDos[element.id].done = toDos[element.id].done ? false : true;
}

/* remove a to-do*/
function removeToDo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);
    toDos[element.id].trash = true;
}

function handleButton(event)
{
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete")
    {
        completeToDo(element); // line 16
    }else if(elementJob == "delete"){
        removeToDo(element); // line 25
    }
    /* save toDos to localstorage(this cod must be added where the toDos array is updated) */
    saveToDos();
}

/* save toDos to localStorage */
function saveToDos()
{
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(toDo, newId, done, trash)
{
    if(trash){return; }
    
    /* add to do list */
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const toDoItem = `<li class="item">
                            <i class="fa ${DONE} co" job = "complete" id="${newId}"></i>
                            <p class="text ${LINE}">${toDo}</p>
                            <i class="fa fa-trash-o de", job="delete" id="${newId}"></i>
                      </li>`;
    const position = "beforeend"
    toDoList.insertAdjacentHTML(position, toDoItem);

    // save add to do list as a object
    const toDoObj = {
        name: toDo,
        id: newId,
        done: false,
        trash: false
    };
    toDos.push(toDoObj);
    
    /* target the items created dynamically */
    toDoList.addEventListener("click", handleButton);
}

function handleEnter(event)
{
    if(event.which == 13 || event.keyCode == 13)
    {
        const toDo = toDoInput.value;
        if(toDo)
        {
            paintToDo(toDo, newId, false, false);
            /* save toDos to localstorage(this cod must be added where the toDos array is updated) */
            saveToDos();
            
            newId++;
            toDoInput.value = "";
        }
    }
    
}


// load toDos to the user's interface from localstorage
function loadToDos()
{
    // get toDos from localstorage
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    // check if data is not empty
    if(loadedtoDos != null)
    {
        const parsedToDos = JSON.parse(loadedtoDos);
        parsedToDos.forEach(function(item){
            paintToDo(item.name, item.id, item.done, item.trash);
        });
    }
}

function init()
{
    loadToDos();
    document.addEventListener("keyup", handleEnter);
}
init();


