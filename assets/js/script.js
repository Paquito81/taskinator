var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

<<<<<<< HEAD
var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name'").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (!taskNameInput  || !taskTypeInput ) {
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset();

  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  console.dir(listItemEl);

  // add list item to list
  tasksToDoEl.appendChild(listItemEl);
};
=======
var taskFormHandler =function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //check if input values are empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();
    
    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskNameInput
    };


    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

};

var createTaskEl = function(taskDataObj){
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}
>>>>>>> feature/form-submit

formEl.addEventListener("submit", taskFormHandler);