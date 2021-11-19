const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");
const newTaskRow = `<tr><td colspan="3" style="width:100%"><button class="newItem" onclick="createNewTask(this.closest('table').id)">+ Create new task</button></td></tr>`;
const tableHeader = `<thead>
                        <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        </tr>
                    </thead>`;
var tableCount = 2;

accordionItemHeaders.forEach(accordionItemHeader => {
const accordionItemBody = accordionItemHeader.nextElementSibling;
if(accordionItemHeader.classList.contains("active")) {
    accordionItemBody.style.maxHeight = "250px";
}

accordionItemHeader.addEventListener("click", event => {
accordionItemHeader.classList.toggle("active");
const accordionItemBody = accordionItemHeader.nextElementSibling;
if(accordionItemHeader.classList.contains("active")) {
    accordionItemBody.style.maxHeight = "250px";
}
else {
    accordionItemBody.style.maxHeight = 0;
}

});
});

function createNewTask(tableID) {
// let task = prompt('What is the new task?');
// let progress = prompt('What is the new task\'s progress?');
// let date = prompt('When is the new task\'s due date?');

let task = 'MS4';
let progress = '0%';
let date = 'Dec 8, 2021';
let table = document.getElementById(tableID);

let newRow = `
            <tr>
                <td>${task}</td>
                <td>${progress}</td>
                <td>${date}</td>
            </tr>`;

let lastRow = table.rows[table.rows.length-1];
lastRow.insertAdjacentHTML('beforebegin', newRow);
}

function createNewProject() {
let newProjDiv = document.getElementById("newProject");
let newProjectName = prompt("What is the new project?");
tableCount++;
let newTableID = "table"+tableCount;

if (newProjectName.localeCompare("") && newProjectName != null) {
    let newDiv = document.createElement("div");
    let newProjectItem = `<div class="accordion-item">
            <div class="accordion-item-header">
                ${newProjectName}
            </div>
            <div class="accordion-item-body" id="table2Parent">
                <div class="accordion-item-body-content">
                    <table class="content-table" id="${newTableID}">
                        ${tableHeader}
                        ${newTaskRow}
                    </table>
                </div> 
            </div>
        </div>`;

    newDiv.innerHTML = newProjectItem;
    newProjDiv.insertAdjacentElement('beforebegin', newDiv);

    let accordionItemHeader = newDiv.firstChild.childNodes[1];

    accordionItemHeader.addEventListener("click", event => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if(accordionItemHeader.classList.contains("active")) {
            accordionItemBody.style.maxHeight = "250px";
        }
        else {
            accordionItemBody.style.maxHeight = 0;
        }
        
    });
}

else {
    alert("Please input a valid project name.");
}
}