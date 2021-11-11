
const bullet = "\u2022";
const bulletWithSpace = `${bullet} `;
const enter = 13;


const handleInput = (event) => {
    const { keyCode, target } = event;
    const { selectionStart, value } = target;

    if (keyCode === enter) {
        target.value = [...value]
        .map((c, i) => i === selectionStart - 1
            ? `\n${bulletWithSpace}`
            : c
        )
        .join('');
        
        target.selectionStart = selectionStart+bulletWithSpace.length;
        target.selectionEnd = selectionStart+bulletWithSpace.length;
    }
    
    if (value[0] !== bullet) {
        target.value = `${bulletWithSpace}${value}`;
    }
}

function createNewOption() {
    var taskBox = document.getElementById("task-selector");
    var projectBox = document.getElementById("project-selector");
    var selectedTask = taskBox.value;
    var selectedProj = projectBox.value;
    var newOption;

    if (!selectedTask.localeCompare("create-task")) {
        var newTask = window.prompt("What is the new task?");

        if (newTask == "") {
            alert("Task name should not be empty. Please try again.");
        }

        else {
            newOption = new Option(newTask, newTask);
            taskBox.add(newOption, taskBox.options.length - 1);
            taskBox.value = newOption.value;
        }
    }

    if (!selectedProj.localeCompare("create-proj")) {
        var newProj = window.prompt("What is the new project?");

        if (newProj == "") {
            alert("Project name should not be empty. Please try again.");
        }

        else {
            newOption = new Option(newProj, newProj);
            projectBox.add(newOption, projectBox.options.length - 1);
            projectBox.value = newOption.value;
        }
    }
}

// function createNewOption(selector, type) {
//     var selectBox = document.getElementById(selector);
//     var selectedValue = document.getElementById(selectBox).value;
//     var newOption;

//     if (!selectedValue.localeCompare("create-"+type)) {
//         var newValue = window.prompt("What is the new "+type+"?");

//         newOption = new Option(newValue, newValue);
//         selectBox.add(newOption, selectBox.options.length - 1);
//         selectBox.value = newOption.value;
//     }
// }