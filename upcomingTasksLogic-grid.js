let accordionItemsList = document.querySelectorAll(".accordion-item-header");
const newTaskRow = `<tr><td colspan="3" style="width:100%"><button class="newItem" onclick="createNewTask(this.closest('table').id)">+ Create new task</button></td></tr>`;
const tableHeader = `<thead>
                        <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        </tr>
                    </thead>`;
const toast_elem = document.getElementById("toast");
var tableCount = 6;
var projectCount = 6;
var taskCount = 13;
var taskDetailsCount = 13;

var existingProjs = ['project-1', 'project-2', 'project-3', 'project-4', 'project-5', 'project-6'];
// var existingProjs = ['COMP 3020', 'COMP 3040', 'COMP 2140', 'COMP 4710', 'COMP 4230', 'none'];
//var newOptionsUT = JSON.parse(localStorage.getItem("newOptionsUT") || "[]");
var newOptionsUT = JSON.parse(localStorage.getItem("newOptions") || "[]");

var taskHeaders = document.getElementsByClassName("taskHeader");
var taskDetails_target = document.getElementById("text-notes");

for (var i = 0; i < taskHeaders.length; i++) {
    addTaskDetailsEvent(taskHeaders[i]);
}

function addTaskDetailsEvent(taskHeader) {
    //taskHeaders.forEach(taskHeader=> {
    taskHeader.addEventListener("click", event => {
        //taskHeader.classList.toggle("active");
        const taskDetailBody = taskHeader.nextElementSibling;

        //if(taskHeader.classList.contains("active")) {
            //if (taskDetailBody.tagName.localeCompare("TR")) {
            var project = taskHeader.closest('.accordion-item').firstElementChild.textContent.trim();
            var taskNotes = taskDetailBody.innerHTML;
            var taskBody = `<p>Project:      ${project}</p>
                            <p>Task:         ${taskHeader.firstElementChild.textContent}</p>
                            <p>Status:       ${taskHeader.children[1].textContent}</p>
                            <p>Due Date:     ${taskHeader.children[2].textContent}</p>
                            <p>Task Notes: ${taskNotes}</p>`;
            
            taskDetails_target.innerHTML = taskBody;
            //}
        //}
    });
    //});
}

addAccordionItemEvent(accordionItemsList);

function addAccordionItemEvent(accordionItemHeaders) {
    accordionItemHeaders.forEach(accordionItemHeader => {
        accordionItemHeader.addEventListener("click", event => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
    
        if(accordionItemHeader.classList.contains("active")) {
            if (accordionItemBody.tagName.localeCompare("TR")) {
                accordionItemBody.style.maxHeight = "250px";
            }
    
            else {
                accordionItemBody.style.display = "table-row";
            }
        }
        else {
            if (accordionItemBody.tagName.localeCompare("TR")) {
                accordionItemBody.style.maxHeight = "0";
            }
    
            else {
                accordionItemBody.style.display = "none";
            }
        }
      });
    });
}

function createNewTask(tableID, taskNameID, taskDateID, taskProgressID, projectID) {
    let table = document.getElementById(tableID);
    let newTaskName = "", progress = "", date = "", newRow = [];
    let fromThisPage = taskDateID.localeCompare("N/A");
    //let projectName = document.getElementById(projectID);
    let projectName = document.getElementById(projectID).textContent.trim();
    
    if (fromThisPage) {
        newTaskName = document.getElementById(taskNameID).value;
        progress = document.getElementById(taskProgressID).value;
        date = document.getElementById(taskDateID).value;
    }

    else {
        progress = taskProgressID;
        newTaskName = taskNameID;
        date = taskDateID;
    }

    if (newTaskName.localeCompare("") && progress >= 0 && progress <= 100) {
        taskDetailsCount++;
        let taskDetailsID = "task-"+taskDetailsCount;
        
        if (progress == 0) {
            progress = '--';
        }

        else if (progress == 100) {
            progress = '&#10004';
        }

        else {
            progress += '% Complete';
        }

        if (fromThisPage) {
            date = formatDate(date);
        }

        let newRows = `
                    <tr class="taskHeader">
                        <td>${newTaskName}</td>
                        <td>${progress}</td>
                        <td class="date">${date}</td>
                    </tr>
                    <tr class="accordion-item-body taskDetails">
                        <td colspan="3" style="width:100%" class="accordion-item-body-content" id="${taskDetailsID}">
                        <p>Task Notes<p>
                        </td>
                    </tr>`;

        let lastRow = table.rows[table.rows.length-2];
        lastRow.insertAdjacentHTML('beforebegin', newRows);
        
        let taskHeaders = table.getElementsByClassName("taskHeader").length;
        let newTaskHeader = table.getElementsByClassName("taskHeader")[taskHeaders - 1];
        addTaskDetailsEvent(newTaskHeader);

        if (fromThisPage) {
            sortByDate(table);

            //notify users
            toast_elem.className = "show";
            toast_elem.textContent = "New task "+ " '" + newTaskName + "' created.";

            setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);

            newOptionsUT.push({project : `${projectName}`, projectID : `${projectID}`, task : `${newTaskName}`, update : 'task'});
            //localStorage.setItem("newOptionsUT", JSON.stringify(newOptionsUT));
            localStorage.setItem("newOptions", JSON.stringify(newOptionsUT));
        }
    }

    else {
        alert('Task name cannot be empty and/or Progress should be 0-100. Please try again.');
    }
}

function createNewProject(name, fromThisPage) {
    let newProjDiv = document.getElementById("misc");
    let headers = [];
    let newProjectName = name;
    //let fromThisPage = true;

    // if (!name.localeCompare('')) {
    //     newProjectName = prompt("What is the new project?");
    // }

    // else {
    //     newProjectName = name;
    //     fromThisPage = false;
    // }

    if (newProjectName.localeCompare("") && newProjectName != null) {
        tableCount++;
        projectCount++;
        let newTableID = "table"+tableCount;
        let newTaskNameID = "taskName"+tableCount;
        let newTaskDateID = "taskDate"+tableCount;
        let newTaskProgressID = "taskProgress"+tableCount;
        let newProjID = "project-"+projectCount;
        let newDiv = document.createElement("div");

        let newTaskRows = `<tr class="newItem-container accordion-item-header">
                        <td colspan="3" style="width:100%" class="newItem">+ Create new task</td>
                    </tr>
                    <tr class="accordion-item-body newItem-container-details">
                    <td>
                        <label for="taskName">New Task Name:</label>
                        <input type="text" class="taskName" id="${newTaskNameID}" name="taskName" size="20">
                    </td> 
                    <td>
                        <label for="taskDate">Due on:</label>
                        <input type="date" class="taskDate" id="${newTaskDateID}" name="taskDate" value="2021-12-31" onkeydown="return false">
                    </td>
                    <td>
                        <div class="taskProgress-container">
                        <label for="taskProgress">Progress:</label>
                        <input type="number" class="taskProgress" id="${newTaskProgressID}" name="taskProgress" size="20" placeholder="0-100" min="0" max="100">
                        </div>
                        <button class="doneButton" onclick="createNewTask('${newTableID}', '${newTaskNameID}', '${newTaskDateID}', '${newTaskProgressID}', '${newProjID}')">Done</button>
                    </td>
                    </tr>`;

        let newProjectItem = `<div class="accordion-item">
                <div class="accordion-item-header" id=${newProjID}>
                    ${newProjectName}
                </div>
                <div class="accordion-item-body" id="table2Parent">
                    <div class="accordion-item-body-content">
                        <table class="content-table" id="${newTableID}">
                            ${tableHeader}
                            ${newTaskRows}
                        </table>
                    </div> 
                </div>
            </div>`;

        newDiv.innerHTML = newProjectItem;
        newProjDiv.insertAdjacentElement('beforebegin', newDiv);

        let accordionItemHeader = newDiv.firstChild.childNodes[1];
        let newTaskHeader = document.getElementById(newTableID).getElementsByClassName("newItem-container")[0];
        headers.push(accordionItemHeader);
        headers.push(newTaskHeader);
        addAccordionItemEvent(headers);

        if (fromThisPage) {
            existingProjs.push(newProjID);

            //notify users
            toast_elem.className = "show";
            toast_elem.textContent = "New project "+ " '" + newProjectName + "' created.";

            setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);

            newOptionsUT.push({project : `${newProjectName}`, projectID : `${newProjID}`, task : "", update : 'project'});
            //localStorage.setItem("newOptionsUT", JSON.stringify(newOptionsUT));
            localStorage.setItem("newOptions", JSON.stringify(newOptionsUT));
        }
    }

    else {
        alert("Please input a valid project name.");
    }
}

function sortByDate(table) {
    let rows = table.querySelectorAll(".taskHeader"),
        values = [],
        val,
        taskDetails = table.querySelectorAll(".taskDetails"),
        lastRow,
        lastRowDetails;

    for (var index = 0; index < rows.length; index++) {
        node = rows[index].querySelector(".date");
        val = node.innerText;
        //if(val != "N/A") {
            values.push({value : val, row: rows[index]});
        //}
    }

    lastRow = table.querySelector(".newItem-container");
    lastRowDetails = table.querySelector(".newItem-container-details");

    values.sort(sortDateVal);

    let detailsIndex = 0;
    for (let idx = 0; idx < values.length; idx++) {
        table.querySelector("tbody").appendChild(values[idx].row);
        table.querySelector("tbody").appendChild(taskDetails[detailsIndex]);
        detailsIndex++;
    }

    detailsIndex = 0;
    table.querySelector("tbody").appendChild(lastRow);
    table.querySelector("tbody").appendChild(lastRowDetails);
}

function sortDateVal(a, b) {
    var result = 0;

    var dateA,
        dateB,
        dateAvalue,
        dateBvalue;

    if (a.value == "N/A") {
        result = 1;

        if (b.value == "N/A") { result = 0;}
    }

    else if (b.value == "N/A") {
        result = -1;

        if (a.value == "N/A") { result = 0;}
    }

    else {
        dateA = new Date(a.value).toISOString(),
        dateB = new Date(b.value).toISOString(),
        dateAvalue = Date.parse(dateA),
        dateBvalue = Date.parse(dateB);
    }

    return result;
}

function formatDate(date) {
    let months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    
    let currFormat = date.split('-');
    let monthVal = currFormat[1];
    let newDateFormat = months[monthVal - 1]+" "+currFormat[2]+", "+currFormat[0]; 
    
    return newDateFormat;
}

const searchInput = document.getElementById('searchID');

searchInput.addEventListener('keyup', function(event) {
    let rows = document.querySelectorAll(".content-table > tbody > .taskHeader");

    const q = event.target.value.toLowerCase();
    display_search_result(q);
    // rows.forEach((row) => {
    //     row.querySelector("td").textContent.toLowerCase().startsWith(q)
    //     ? (row.style.display = "table-row") 
    //     : (row.style.display = "none");
    // });
})

function updateNotes() {
    var values = [],
        keys = Object.keys(localStorage);

    for(i = 0; i < keys.length; i++) {
        values.push(localStorage.getItem(keys[i]));
    }

    let taskDetailsAreas = document.getElementsByClassName("taskDetails");

    for (i = 0; i < taskDetailsAreas.length; i++) {
        for (j = 0; j < keys.length; j++) {
            if(!keys[j].localeCompare(taskDetailsAreas[i].firstElementChild.id)) {
                let notes = values[j];

                let listItems = notes.split(/\ ?\u2022\ ?/);

                let heading = listItems[0];

                listItems = listItems.slice(1);

                let newNotes = `${heading}
                    <ul>
                        ${listItems.map(c => `<li>${c}</li>`).join('\n')}
                    </ul>
                `;

                taskDetailsAreas[i].firstElementChild.innerHTML = newNotes;
            }
        }
    }
}

function update(newItems) {
	if(newItems != null) {
		for (j = 0; j < newItems.length; j++) {
            let newItem = newItems[j];
            let projName = newItem.project;
            let projID = newItem.projectID;
            let taskName = newItem.task;
            let update = newItem.update;

            if (update == "project") {
                createNewProject(projName, false);
                existingProjs.push(projID);
            }

            else {
                let projIndex = searchProject(projID);
                if (projIndex > -1) {
                    let table = "table"+(projIndex + 1);
                    let project = "project-"+(projIndex + 1);
                    createNewTask(table, taskName, "N/A", 0, project);
                }
            }
        }
	}
}

function searchProject(project) {
    let index = -1;
    let notFound = true;

    for (i = 0; i < existingProjs.length && notFound; i++) {
        notFound = existingProjs[i].localeCompare(project);

        if (!notFound) {
            index = i;
        }
    }

    return index;
}

function updatePage() {
    //let newItems = JSON.parse(localStorage.getItem('newOptions') || "[]");
    //let newItemsUT = JSON.parse(localStorage.getItem('newOptionsUT') || "[]");

    //update(newItemsUT);
    //update(newItems);
    update(newOptionsUT);
}

const UT_dbox_elem = document.getElementById("dialogBox");
const UT_dbox_msg = document.getElementById("dbox-msg");
const UT_new_item = document.getElementById("dbox-input");
const UT_dbox_btn_done = document.getElementById("confirm-btn");
const UT_dbox_btn_cancel = document.getElementById("cancel-btn");
const UT_dbox_btn_skip = document.getElementById("skip-btn");
const UT_newProject_btn = document.getElementById("button-add-project");
var newProject = "";

UT_newProject_btn.addEventListener('click', () => {
	UT_dbox_msg.textContent = "What is the new project?";
	UT_dbox_elem.style.display = "block";
});

UT_dbox_btn_skip.addEventListener('click', () => {
	UT_dbox_elem.style.display = "none";
	newProject = "";
});

UT_dbox_btn_cancel.addEventListener('click', () => {
	UT_dbox_elem.style.display = "none";
	newProject = "";
});

UT_dbox_btn_done.addEventListener('click', () => {
    newProject = UT_new_item.value;

    if(newProject == "") {
        alert("New task/project name should not be empty. Please try again.");
    }

    else {
        UT_dbox_elem.style.display = "none";
        createNewProject(newProject, true);
        newProject = "";
    }
});

updatePage();
updateNotes();

function display_search_result(q){
    let projects = document.querySelectorAll(".accordion-item");
    projects.forEach(project_item => {
        if (project_item.firstElementChild.classList.contains("active")) {
            project_item.firstElementChild.classList.toggle("active");
        }

        project_item.children[1].style.maxHeight = "250px";

        if (project_item.querySelector(".accordion-item-header").textContent.toLowerCase().includes(q)){
            project_item.style.display = "block";
            project_item.children[1].style.maxHeight = "0";
            let rows = project_item.querySelectorAll(".taskHeader");
            rows.forEach((row) => {row.style.display = "table-row"});
        }

        else {
            str = ''; 
            Array.from(project_item.querySelectorAll(".taskHeader")).forEach(d => str += d.querySelector("td").textContent + " ")
            if (str.toLowerCase().includes(q)){
                let rows = project_item.querySelectorAll(".taskHeader");
                    rows.forEach((row) => {
                        console.log(row.querySelector("td").textContent,row.querySelector("td").textContent.toLowerCase().includes(q),row.style.display)
                    if (row.querySelector("td").textContent.toLowerCase().includes(q)){
                        project_item.style.display = "block";
                        row.style.display = "table-row";
                    }

                    else row.style.display = "none";
                })
            }
            else {
                project_item.style.display = "none";
            };
        }

        // if (project_item.style.display == "block"){
        //     num_tasks = 0;
        //     Array.from(project_item.querySelectorAll(".task-item")).forEach( task_item =>{
        //         num_tasks = (task_item.style.display == "flex") ? num_tasks + 1 : num_tasks;
        //     })
        //     project_item.querySelector(".project-item-header-ele-num-tasks").textContent = num_tasks;
        // }
    });
}