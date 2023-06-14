var addNewTask = document.querySelector(".add-task");

addNewTask.addEventListener("click", () => {
  document.querySelector(".popup-main").style.display = "block";
});

function removePopup() {
  document.querySelector(".popup-main").style.display = "none";
  document.querySelector(".popup-main-item").style.display = "none";
}

function createTask() {
  backOpt();

  if(document.querySelector(".selected") != null){
    document.querySelector(".selected").classList.remove("selected")
  }

  var userInput = document.querySelector("#taskinput").value;
  var boxContainer = document.querySelector(".box-container");
  document.querySelector(".no_item").style.display = "none";
  let checkFirstTask = document.querySelector(".box-container").style.display;
  if (checkFirstTask == "none") {
    boxContainer.style.display = "flex";
  }

  //creating elements
  var taskBoxDiv = document.createElement("div");
  var headingDiv = document.createElement("div");
  var tasksDiv = document.createElement("div");
  var ulTag = document.createElement("ul");
  var bottomTaskDiv = document.createElement("div");
  var circleDeleteDiv = document.createElement("div");
  var circleAddDiv = document.createElement("div");
  var delImg = document.createElement("img");
  var addSpan = document.createElement("span");
  var hrTag = document.createElement("hr");

  boxContainer.appendChild(taskBoxDiv);
  taskBoxDiv.appendChild(headingDiv);
  taskBoxDiv.appendChild(hrTag);
  taskBoxDiv.appendChild(tasksDiv);
  taskBoxDiv.appendChild(bottomTaskDiv);
  tasksDiv.appendChild(ulTag);
  bottomTaskDiv.appendChild(circleDeleteDiv);
  bottomTaskDiv.appendChild(circleAddDiv);
  circleDeleteDiv.appendChild(delImg);
  circleAddDiv.appendChild(addSpan);

  //assigning classes
  taskBoxDiv.className = "task-box";
  headingDiv.className = "heading";
  tasksDiv.className = "tasks";
  ulTag.className = "task_list";
  bottomTaskDiv.className = "task_bottom";
  circleDeleteDiv.classList.add("circle", "delete");
  circleAddDiv.classList.add("circle", "add");
  delImg.src = "delete.svg";
  delImg.alt = "delete";
  delImg.style.width = "16px";

  addSpan.textContent = "+";
  headingDiv.textContent = userInput;
  ulTag.id = userInput.toLowerCase().replace(/\s/g, "");

  //removing task
  circleDeleteDiv.addEventListener("click", () => {
    taskBoxDiv.remove();
    backOpt();
    if (document.querySelector(".box-container").childElementCount == 0) {
      var taskTitle = document.querySelector(".tasktitle");
      taskTitle.style.display = "none";
      if (taskTitle.style.display == "none")
        document.querySelector(".no_item").style.display = "block";
      document.querySelector(".box-container").style.display = "none";
    }
  });

  //clicking on the Card
  headingDiv.addEventListener("click", () => {
    // const clonedElement = taskBoxDiv.cloneNode(true);
    selectedCard(headingDiv.innerHTML, taskBoxDiv);
    document.querySelector(".title").innerHTML = "< Back";
  });

  //adding subtask
  circleAddDiv.setAttribute("onclick", `addItem("${ulTag.id}")`);
  document.querySelector(".popup-main").style.display = "none";
}

//To open the popup and send the respective id
function addItem(idName) {
  document.querySelector(".popup-main-item").style.display = "block";
  document
    .querySelector(".additembtn")
    .setAttribute("onclick", `addLiItem("${idName}")`);
}


//------------------add list Items----------------------
function addLiItem(idName) {
  var inputItem = document.querySelector("#taskinputItem").value;
  var ulList = document.querySelector(`#${idName}`);
  var liTag = document.createElement("li");
  var buttonTag = document.createElement("button");
  // buttonTag.setAttribute("onclick","strike()");
  liTag.textContent = inputItem;
  buttonTag.textContent = "Mark done";
  liTag.appendChild(buttonTag);
  ulList.appendChild(liTag);
  buttonTag.addEventListener("click", () => {
    buttonTag.remove();
    liTag.style.color = "red";
    liTag.style.textDecoration = "line-through";
  });
  document.querySelector(".popup-main-item").style.display = "none";
}



//------------------Card Selection---------------
function selectedCard(heading, cardElemnt) {
  cardElemnt.classList.add("selected");
  document.querySelectorAll(".task-box").forEach((item) => {
    item.style.display = "none";
  });
  document.querySelector(".selected").style.display = "block";
  document.querySelector(".box-container").style.justifyContent = "center";
  var taskTitle = document.querySelector(".tasktitle");
  taskTitle.style.display = "block";
  taskTitle.textContent = heading;

  //---------------Back button-----------------
  var title = document.querySelector(".title");
  title.addEventListener("click", () => {
    backOpt();
  });
  cardElemnt.classList.remove("selected");
}


function backOpt(){
  //changing the heading back to tasklist
  document.querySelector(".title").innerHTML = "Tasks <span>List</span>";
    var task_head = document.querySelector(".tasktitle");
    task_head.style.display = "none";
    document.querySelector(".box-container").style.justifyContent = "space-between";

    if (document.querySelector(".box-container").childElementCount != 0)
      document.querySelector(".box-container").style.display = "flex";

    document.querySelectorAll(".task-box").forEach((item) => {
      item.style.display = "block";
    });
}