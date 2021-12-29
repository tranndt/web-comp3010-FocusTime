accordionItemsList = document.querySelectorAll(".accordion-item-header");
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

// var existingProjs = ['project-1', 'project-2', 'project-3', 'project-4', 'project-5', 'none'];
var existingProjs = ['COMP 3020', 'COMP 3040', 'COMP 2140', 'COMP 4710', 'COMP 4230', 'none'];
var newOptionsUT = JSON.parse(localStorage.getItem("newOptionsUT") || "[]");

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
                    <tr class="accordion-item-header taskHeader">
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
        newRow.push(newTaskHeader);
        addAccordionItemEvent(newRow);

        if (fromThisPage) {
            sortByDate(table);

            //notify users
            toast_elem.className = "show";
            toast_elem.textContent = "New task "+ " '" + newTaskName + "' created.";

            setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);

            newOptionsUT.push({project : `${projectName}`, task : `${newTaskName}`, update : 'task'});
            localStorage.setItem("newOptionsUT", JSON.stringify(newOptionsUT));
        }
    }

    else {
        alert('Task name cannot be empty and/or Progress should be 0-100. Please try again.');
    }
}

function createNewProject(name) {
    let newProjDiv = document.getElementById("misc");
    let headers = [];
    let newProjectName = "";
    let fromThisPage = true;

    if (!name.localeCompare('')) {
        newProjectName = prompt("What is the new project?");
    }

    else {
        newProjectName = name;
        fromThisPage = false;
    }

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

            newOptionsUT.push({project : `${newProjectName}`, task : "", update : 'project'});
            localStorage.setItem("newOptionsUT", JSON.stringify(newOptionsUT));
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
        values.push({value : val, row: rows[index]});
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
    var dateA = new Date(a.value).toISOString(),
        dateB = new Date(b.value).toISOString(),
        dateAvalue = Date.parse(dateA),
        dateBvalue = Date.parse(dateB);

    return dateAvalue - dateBvalue;
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
    let rows = document.querySelectorAll(".content-table > tbody > tr");

    const q = event.target.value.toLowerCase();
    rows.forEach((row) => {
        row.querySelector("td").textContent.toLowerCase().startsWith(q)
        ? (row.style.display = "table-row") 
        : (row.style.display = "none");
    });
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
            let taskName = newItem.task;
            let update = newItem.update;

            if (update == "project") {
                createNewProject(projName);
                existingProjs.push(projName);
            }

            else {
                let projIndex = searchProject(projName);
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
    let newItems = JSON.parse(localStorage.getItem('newOptions') || "[]");
    let newItemsUT = JSON.parse(localStorage.getItem('newOptionsUT') || "[]");

    update(newItems);
    update(newItemsUT);
}

updatePage();
updateNotes();