var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompleteEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name'").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (!taskNameInput === "" || !taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }

  //reset form fields for the next tasks to be entered
  document.querySelector("input[name='task-name']").value = '';
  document.querySelector("select[name='task-type']").selectedIndex = 0;
  
  //check if task is new  or one being edited by seeing if it has a data-task-id attribute
  var isEdit = formEl.hasAttribute("data-task-id");
  if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completedEditTask(taskNameInput, taskTypeInput, taskId)
    }else{
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
   

        createTaskEl(taskDataObj);
    }    
};

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    
    var taskActionsEl = createTaskAction(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);
    //increase task counter for the next unique id
    taskIdCounter++;

};
var createTaskActions = function(taskId) {
    //create container to hold elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.ClassName = "task-actions";
    
    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);
    actionContainerEl.appendChild(editButtonEl);
    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
//create change status dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-tasks-id", taskId);
    statusSelectEl.calssName = "select-status";
    actionContainerEl.appendChild(statusSelectEl);
    //create status options
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
    //find task list item with taskId value
    var taskSelected = document.querySelector(".task-item[data-task-id'" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated");

    //remove data attribute from form
    formEl.removeAttribute("data-task-id");
    //update formEl button to go back to saying "add Task" instead of "edit Task"
    formEl.querySelector("save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }else if (targetEl.matches(".delete-btn")) {
        console.log("delete", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event) {
    console.log(event.target.value);

    //find task list item based oon event.target's data-task-id attribute
    var taskId = event.target.getAttribute("data-task-id");

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //covert value to lower case
    var statusValue = event.target.value.toLowerCase();

    if (statusValue ==="to do") {
        tasksToDoEl.appendChild(taskSelected);
    }else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }else if (statusValue === "completed") {
        tasksCompleteEl.appendChild(taskSelected);
    }
};

var editTask = function(taskId) {
    console.log(taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    //write values of taskName and taskType to form to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='tasktype']").value = taskType;

    //set data attribuite to the form with a value of the task's id so it knows which one is being edited
    formEl.setAttribute("data-task-id", taskId);
    //update form's button to reflect editing a task rather than creating a new one
    formEl.querySelector("save-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
    console.log(taskId);
    //find task lidt element with taskId value and remove it
    var taskSelected = document.querySelector("task-item[data-task-id'" + taskId + "']");
    taskSelected.remove();
};

//Create a new task
formEl.addEventListener("submit", taskFormHandler);

//for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

//for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);
























