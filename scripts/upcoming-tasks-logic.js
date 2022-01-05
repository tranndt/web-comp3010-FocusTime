const toast_elem = document.getElementById("toast");

DATA = Array.from(
    [{taskid: '1', task: 'Self study', project: 'COMP 3020', duration: '200', breaks: 0, progress: 100, date: '2021-11-26', note:'Lorem ipsum dolor sit amet, consectetuar adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    {taskid: '2', task: 'Quiz Prep', project: 'COMP 3020', duration: '250',breaks: 10, progress: 100, date: '2021-11-29', note:'Integer venenatis orci et massa feugiat vehicula. Integer ullamcorper non libero vel semper. Nam eu tempor purus. Suspendisse potenti. Vivamus eget erat ex. '},
    {taskid: '3', task: 'Assignment 2', project: 'COMP 3020', duration: '300',breaks: 23, progress: 80, date: '2022-02-25',note:'Cras sit amet ultrices felis, ut faucibus lorem. Integer non dictum leo, at aliquam arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'},
    {taskid: '4', task: 'Term Test 1 Prep', project: 'COMP 3040', duration: '245',breaks: 60, progress: 100, date: '2021-11-21', note:'Praesent sagittis venenatis arcu ut semper. Cras finibus lorem tempus, varius lectus ac, tristique lacus. Cras aliquam facilisis felis quis euismod.'},
    {taskid: '5', task: 'Assignment 3', project: 'COMP 3040', duration: '200',breaks: 25, progress: 90, date: '2022-01-06', note:'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce nec luctus diam. Morbi nec tempus est, vitae aliquet nibh.'},
    {taskid: '6', task: 'Term Test 1 Review', project: 'COMP 3040', duration: '500',breaks: 41, progress: 100, date: '2021-11-24', note:'Ut blandit in leo in pellentesque. Suspendisse nec enim sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla sem tortor, molestie ornare finibus vitae, viverra sed dui.'},
    {taskid: '7', task: 'Group Work Prep', project: 'COMP 2140', duration: '710',breaks: 75, progress: 50, date: '2022-01-24', note:'Quisque quis vehicula odio. Praesent eu massa eu mauris rhoncus porta. Fusce interdum suscipit purus, vitae euismod sapien blandit sit amet.'},
    {taskid: '8', task: 'Fix Code Bugs', project: 'COMP 2140', duration: '400',breaks: 100, progress: 75, date: '2022-02-03', note:'Praesent placerat congue nisl, sit amet congue ante pulvinar ut. Nullam dictum, lorem non rutrum euismod, ante dui pharetra nunc, et molestie nunc turpis a massa.'},
    {taskid: '9', task: 'Assignment 2', project: 'COMP 2140', duration: '300',breaks: 12, progress: 40, date: '2022-01-29', note:'In interdum purus quis urna egestas dignissim. Suspendisse potenti. Maecenas non sapien fringilla, lobortis diam vitae, rhoncus ipsum.'},
    {taskid: '10', task: 'Quiz 12', project: 'Miscellaneous', duration: '400',breaks: 0, progress: 100, date: '2021-11-13', note:'Nam eu nisi laoreet, sodales eros et, posuere orci. Nam vehicula rutrum ligula ac blandit. Curabitur scelerisque ullamcorper mauris, nec rutrum ligula. Ut hendrerit commodo est, ac consequat nisl finibus vel. Vestibulum tincidunt est odio, non tempus odio vulputate eu. Pellentesque id lectus id ex tempor laoreet. Nulla aliquet mauris vitae risus accumsan, eget venenatis magna gravida. Vestibulum consequat pellentesque elit, at dictum arcu viverra tincidunt. Etiam rutrum, mi sed pretium lacinia, lorem elit gravida dolor, sit amet commodo orci turpis in risus. Nunc consectetur magna metus, ullamcorper lobortis lectus consectetur eget. Nullam in mauris sed diam faucibus tempor in non lorem.'},
    {taskid: '11', task: 'Group Work Prep', project: 'Miscellaneous', duration: '200',breaks: 0, progress: 60, date: '2022-01-06', note:'Nam sed tincidunt odio. Sed nulla orci, semper ut mattis vel, luctus a eros. Nullam aliquam, massa commodo scelerisque aliquam, odio eros mattis libero, ut malesuada ipsum dolor in risus. Duis sagittis ipsum sem, finibus laoreet magna dapibus scelerisque. Sed a ipsum nec lectus congue tincidunt. Proin imperdiet tempor lectus ac faucibus. '},
    {taskid: '12', task: 'Proofread submission', project: 'COMP 4230', duration: '400',breaks: 100, progress: 100, date: '2021-11-23', note:'Sed faucibus neque eget condimentum finibus. Proin rutrum, velit vitae laoreet ultrices, orci velit dictum arcu, non iaculis mi magna sed mi. Donec quis quam id turpis pulvinar dignissim laoreet eget erat. Sed porta quam urna, at faucibus sem mattis in. Fusce commodo nisi at velit porttitor, in vehicula purus feugiat.'}
]);

if(JSON.parse(localStorage.getItem("progress_data")) == null) {
    localStorage.setItem("progress_data", JSON.stringify(DATA));
}

DATA = JSON.parse(localStorage.getItem("progress_data") || DATA);


const get_col = (array, column) => {
    const result = [];
    array.forEach(e => {
        result.push(e[column]);
    });
    return result;
};

const get_range = (array, attr) => {
    const result = [];
    var min = Math.min.apply(null, array.map(item => item[attr])),
        max = Math.max.apply(null, array.map(item => item[attr]));
    result.push(min);
    result.push(max);
    return result;
};

function hyphenated(c){
    return c.replace(" ","-")
}

function unhyphenated(c){
    return c.replace("-"," ")
}

//  Reduced the data by number of tasks and total duration per project
function reduced(DATA){
    rollup = d3.rollup(DATA, v => v.length, d => d.project, d => d.duration)
    dict = {}
    Array.from(rollup).forEach(k => {
        var proj = k[0]; var dur = k[1];
        dict[proj] = {num_tasks: 0, duration: 0}
        Array.from(dur).forEach(d => {
            dict[proj].num_tasks += 1;
            dict[proj].duration += d[0]*d[1];
        })
    })
    dict2 = Object.entries(dict)
    dict2 = dict2.sort((a,b) => d3.descending(a[1].duration,b[1].duration))
    return dict2;
}

var REDUCED_DATA = reduced(DATA)
console.log(REDUCED_DATA)
var PROJECT_LABELS = get_col(REDUCED_DATA,0)
var color = d3.scaleOrdinal().domain(PROJECT_LABELS).range(d3.schemeSet1);
function get_projects(){
    return get_col(REDUCED_DATA,0);
}

function update_color_scheme(){
    PROJECT_LABELS = get_col(REDUCED_DATA,0)
    color = d3.scaleOrdinal().domain(PROJECT_LABELS).range(d3.schemeSet1);
}
// var NUM_TASKS = {}; REDUCED_DATA.forEach(d => NUM_TASKS[d[0]] = d[1].num_tasks)
function NUM_TASKS(project,completed){
    num_tasks = 0;
    DATA.forEach(d => {
        if (d.project == project & 
            (completed == null | (d.progress < 100 & !completed) | (d.progress == 100 & completed))){
            num_tasks += 1;
        }
    })
    return num_tasks;
}


function fmt (seconds) {
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const odd_secs = seconds % 60
    if (hours <= 0){ hh = ''} else {hh = hours+'h '}
    if (minutes <= 0){ mm = ''} else {mm = minutes+'m '}
    ss = odd_secs + 's'
    return hh+mm+ss
}


// function rolledup(DATA){
//     var data_rollup = d3.flatRollup(DATA,v => d3.sum(v, d => d.duration), d => d.project)
//     return data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))
// }


function addCssRule(rule, css) {
    css = JSON.stringify(css).replace(/"/g, "").replace(/,/g, ";");
    $("<style>").prop("type", "text/css").html(rule + css).appendTo("head");
}

function load_projects_css(){
    console.log(document.querySelector(`head style`))
    document.querySelector(`head style`).innerHTML = ""
    PROJECT_LABELS.forEach( d=> {
        addCssRule(`.button-${hyphenated(d)} ,.button-${hyphenated(d)}.clicked:hover`, {
            'color': "white",
            'background-color': color(d),
            'border':`var(--border-divider-regular-dark)`,
            'font-weight': 'bold',
        });
        addCssRule(`.button-${hyphenated(d)}.clicked`, {
            // 'filter':'brightness(85%)'
            'color': color(d),
            'background-color': "white",
            'border-radius':'var(--border-radius-tab)'
        });
    })
}

function load_completed_items(completed){
    var html = '';
    PROJECT_LABELS.forEach(project => {
        var html_i = '';
        DATA.forEach(d => {
            if (d.project == project & ((d.progress < 100 & !completed) | (d.progress == 100 & completed))){
                span = `<tr class="task-item" id="taskid-${d.taskid}" onclick="task_clicked('${d.taskid}')">
                            <td class="td-task">${d.task}</td>
                            <td class="td-progress">${d.progress}</td>
                            <td class="date td-date">${d.date}</td>
                        </tr>`
                html_i += span;
            }
        })
        if (html_i != ''){
            date_str = completed ? "Date Completed" : "Due Date";
            completed_str = completed ? "completed" : "inprogress";
            // add_task_button = completed ? '<div class="project-item-add-tasks button-${hyphenated(project)}">+</div>' : ''

            //  ${!completed ? `<div class="project-item-add-tasks button-${hyphenated(project)}">+</div>`:``}
            html += 
            `<details class="project-item">
                <summary class="accordion project-item-header ${completed_str} button-${hyphenated(project)}" onclick="project_item_clicked('${project}',${completed})">
                    <div class="project-item-header-ele project-name">${project}</div>
                    <div class="project-item-header-ele-num-tasks">${NUM_TASKS(project,completed)}</div>
                    
                </summary>

                <div class="project-item-table ${hyphenated(project)}">
                    <table class="project-item-table-content">
                        <tbody>
                            <tr class="th-row" style="background-color: ${color(project)}">
                                <th class="th-task">Task</th>
                                <th class="th-progress">Progress (%)</th>
                                <th class="th-date">${date_str}</th>
                            </tr>
                            ${html_i}
                        </tbody>
                    </table>
                    ${completed ? `` : 
                    `<details>
                        <summary class="project-item-add-tasks" id="project-item-add-tasks-${hyphenated(project)}">+ Add New Task</summary>
                        <table class="project-item-table-content">
                            <tbody>
                                <tr class="th-row input" style="background-color: ${color(project)}">
                                    <th class="th-task input">Task</th>
                                    <th class="th-progress input">Progress (%)</th>
                                    <th class="th-date input">${date_str}</th>
                                </tr>
                                <tr class="accordion-item-body newItem-container-details">
                                    <td class="td-task input">
                                        <input type="text" class="taskName" id="input-task-${hyphenated(project)}" name="taskName" size="20" placeholder="New Task Name">
                                    </td> 
                                    <td class="td-progress">
                                        <input type="number" class="taskProgress" id="input-progress-${hyphenated(project)}" name="taskProgress" size="20" placeholder="0-100" min="0" max="100">
                                    </div>
                                    </td>
                                    <td class="td-date">
                                        <input type="date" class="taskDate" id="input-date-${hyphenated(project)}" name="taskDate" value="2022-01-10" onkeydown="return false">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="container-button-add-task">
                            <button class="button cancel-task" onclick="clear_new_task('${project}')">Cancel</button>
                            <button class="button create-task button-${hyphenated(project)}" onclick="create_new_task('${project}')">Done</button>
                        </div>
                    </details>
                    `}
                </div>


            </details>`
        }
        $(`.project-item-header.button-${hyphenated(project)}`).click(function() {   
            // document.querySelector("#app-a2").scrollTo(0,this.offsetTop)
            // console.log(document.querySelector("#app-a2").scrollHeight, this.offsetTop)
            // console.log(this.scrollTop, this.offsetHeight, this.scrollHeight)
        })  
    })

    table = document.getElementById(`list-${completed_str}`)
    table.innerHTML = html;
}

function cancel_new_project(){
    document.querySelector(`#input-project`).value = null
    document.querySelector(`#container-inprogress > details > details`).open = false
}

function create_new_project(){
    var project = document.querySelector(`#input-project`).value
    function project_error(project){
        if (project.length <= 0 | project.length > 30)
            return 'Project name must not be empty and no more than 30 characters. Please try again.'
        else if (get_projects().includes(project))
            return 'Project with this name already exists. Please choose another project name.'
        else return false
    }
    
    if (project_error(project)) alert(project_error(project))
    else{
        REDUCED_DATA.push([project,{num_tasks:0, duration:0}])
        update_color_scheme();
        load_projects_css()
        console.log(color(project))
        completed = false;
        date_str = completed ? "Date Completed" : "Due Date";
        completed_str = completed ? "completed" : "inprogress";
        span = 
        `<details class="project-item" open>
            <summary class="accordion project-item-header ${completed_str} button-${hyphenated(project)}" onclick="project_item_clicked('${project}',${completed})">
                <div class="project-item-header-ele project-name">${project}</div>
                <div class="project-item-header-ele-num-tasks">${NUM_TASKS(project,completed)}</div>
            </summary>
            <div class="project-item-table ${hyphenated(project)}">
                <table class="project-item-table-content">
                    <tbody>
                    </tbody>
                </table>
            <details>
            <summary class="project-item-add-tasks" id="project-item-add-tasks-${hyphenated(project)}">+ Add New Task</summary>
            <table class="project-item-table-content">
                <tbody>
                    <tr class="th-row input" style="background-color: ${color(project)}">
                        <th class="th-task input">Task</th>
                        <th class="th-progress input">Progress (%)</th>
                        <th class="th-date input">${date_str}</th>
                    </tr>
                    <tr class="accordion-item-body newItem-container-details">
                        <td class="td-task input">
                            <input type="text" class="taskName" id="input-task-${hyphenated(project)}" name="taskName" size="20" placeholder="New Task Name">
                        </td> 
                        <td class="td-progress">
                            <input type="number" class="taskProgress" id="input-progress-${hyphenated(project)}" name="taskProgress" size="20" placeholder="0-100" min="0" max="100">
                        </div>
                        </td>
                        <td class="td-date">
                            <input type="date" class="taskDate" id="input-date-${hyphenated(project)}" name="taskDate" value="2022-01-10" onkeydown="return false">
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="container-button-add-task">
                <button class="button create-task button-${hyphenated(project)}" onclick="create_new_task('${project}')">Done</button>
                <button class="button cancel-task" onclick="clear_new_task('${project}')">Cancel</button>
            </div>
        </details>
        </div>

        </details>

        `

        list_inprogress = document.querySelector(`#list-inprogress`)
        list_inprogress.innerHTML =  span + list_inprogress.innerHTML

        toast_elem.className = "show";
        toast_elem.textContent = "New project "+ " '" + project + "' created.";

        setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);

    }
}



function create_new_task(project){
    d = {taskid: `${new Date().getTime()}`,    
        task: document.querySelector(`#input-task-${hyphenated(project)}`).value,
        project: project,
        progress:document.querySelector(`#input-progress-${hyphenated(project)}`).value,
        date: document.querySelector(`#input-date-${hyphenated(project)}`).value,
        duration: '0', breaks: 0,
        note: 'Empty'
    }
    if (task_error(d)) alert(task_error(d))
    else{
        DATA.push(d)
        clear_new_task(project)
        table = document.querySelector(`.project-item-table.${hyphenated(project)} > .project-item-table-content > tbody`);
        span = 
        ` ${(table.querySelector(`.th-row`) != null) ? '' : // Add table header row if not existed
            `<tr class="th-row" style="background-color: ${color(project)}">
                <th class="th-task">Task</th>
                <th class="th-progress">Progress (%)</th>
                <th class="th-date">${date_str}</th>
            </tr>`}
            <tr class="task-item" id="taskid-${d.taskid}" onclick="task_clicked('${d.taskid}')">
                <td class="td-task">${d.task}</td>
                <td class="td-progress">${d.progress}</td>
                <td class="date td-date">${d.date}</td>
            </tr>`
        table.innerHTML += span

        toast_elem.className = "show";
        toast_elem.textContent = "New task "+ " '" + d.task + "' created.";

        setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);
    }
    update_num_tasks()
}


function task_error(d){
    function task_name_error(task){
        if (task.length <= 0 | task.length > 30)
            return 'Task name must not be empty and no more than 30 characters. Please try again.'
        else return false
    }
    function progress_error(progress){
        if (progress != "" & progress >= 0 & progress <=100)
            return false
        else return 'Progress should be a number between 0-100. Please try again.'
    }
    if (task_name_error(d.task)) return task_name_error(d.task)
    else if (progress_error(d.progress)) return progress_error(d.progress)
    else return false;
}

function clear_new_task(project){
    document.querySelector(`#input-task-${hyphenated(project)}`).value = null
    document.querySelector(`#input-progress-${hyphenated(project)}`).value = null
    document.querySelector(`#input-date-${hyphenated(project)}`).value = '2022-01-10'
    document.querySelector(`.project-item-table.${hyphenated(project)} > details`).open = false
}

function task_clicked(taskid){
    // Highlight current task-item
    all_tasks = Array.from(document.getElementsByClassName("task-item"));
    all_tasks.forEach(task_item => {
        task_item.className = task_item.className.replace(" clicked","")
    });
    curr_task = document.getElementById(`taskid-${taskid}`);
    curr_task.className += " clicked"
    console.log(curr_task.className)

    // Display its information on Details column
    display_task(taskid)
}

function project_item_clicked(project,completed){
    completed_str = completed ? "completed" : "inprogress";
    project_item = document.querySelector(`.project-item-header.${completed_str}.button-${hyphenated(project)}`)
    if (project_item.className.includes('clicked'))
    project_item.className = project_item.className.replace(' clicked','')
    else
        project_item.className += ' clicked'
}

function display_task(taskid){
    var html='';
    for (j in DATA){
        d=DATA[j]
        // console.log(taskid, d.taskid, d.taskid == taskid)
        if (d.taskid == taskid){
            date_str = (d.progress < 100) ? "Due Date" : "Date Completed"
            html = 
            `<tr><td class="td-details-label">Task</td><td>${d.task}</td></tr>
            <tr><td class="td-details-label">Project</td><td>${d.project}</td></tr>
            <tr><td class="td-details-label">Focus Time</td><td>${fmt(d.duration)}</td></tr>
            <tr><td class="td-details-label">Break Time</td><td>${fmt(d.breaks)}</td></tr>
            <tr><td class="td-details-label">Progress</td><td>${d.progress}%</td></tr>
            <tr><td class="td-details-label">${date_str}</td><td>${d.date}</td></tr>
            <tr><td class="td-details-label">Notes:</td><td></td></tr>`
            note = d.note;
            break;
        }
    }
    table = document.getElementById("table-details-body");
    table.innerHTML = html;
    notes = document.getElementById("text-notes");
    notes.innerHTML = note;
}

function load_search_listener(){
    const searchInput = document.getElementById('searchID');
    searchInput.addEventListener('keyup', function(event) {
        const q = event.target.value.toLowerCase();
        display_search_result(q);
    })

}

function num_tasks_to_display(project_item){
    num_tasks = 0;
    if (project_item.style.display == "grid"){
        Array.from(project_item.querySelectorAll(".task-item")).forEach( task_item =>{
            num_tasks = (task_item.style.display == "grid") ? num_tasks + 1 : num_tasks;
        })
    }
    return num_tasks;
}


function display_search_result(q){
    let projects = document.querySelectorAll(".project-item");
    projects.forEach(project_item => {
        if (project_item.querySelector(".project-item-header-ele.project-name").textContent.toLowerCase().includes(q.toLowerCase())){
            project_item.style.display = "grid";
            let rows = project_item.querySelectorAll(".task-item");
            rows.forEach((row) => {row.style.display = "flex"})
        }
        else {
            str = ''; 
            Array.from(project_item.querySelectorAll(".task-item")).forEach(d => str += d.querySelector("td").textContent + " ")
            if (str.toLowerCase().includes(q.toLowerCase())){
                let rows = project_item.querySelectorAll(".task-item");
                    rows.forEach((row) => {
                    if (row.querySelector("td").textContent.toLowerCase().includes(q.toLowerCase())){
                        project_item.style.display = "grid";
                        row.style.display = "flex"
                    }
                    else row.style.display = "none";
                })
            }
            else {
                project_item.style.display = "none"
            };
        }
    });
    update_num_tasks()
}

function update_num_tasks(){
    document.querySelectorAll(".project-item").forEach(project_item => {
        num_tasks = 0;
        Array.from(project_item.querySelectorAll(".task-item")).forEach( task_item =>{
            num_tasks = (task_item.style.display != "none") ? num_tasks + 1 : num_tasks;
        })
        project_item.querySelector(".project-item-header-ele-num-tasks").textContent = num_tasks
        console.log(project_item)
    })
}

function load_accordion_listener(){
    Array.from(document.querySelectorAll('.accordion-container > details')).forEach(accordion_item => {
        accordion_item.open = true
    })

    Array.from(document.querySelectorAll('.project-item')).forEach(accordion_item => {
        accordion_item.open = true
    })
}

function add_timer_new_task(){
    d = {
        taskid: `${new Date().getTime()}`,    
        task: sessionStorage.task_name ? sessionStorage.task_name : null,
        project: sessionStorage.project_name ? sessionStorage.project_name : 'Miscellaneous',
        progress: sessionStorage.task_progress ? sessionStorage.task_progress : null,
        date: new Date(),
        duration: sessionStorage.time_focused ? sessionStorage.time_focused : null,
        breaks: 0,
        note: sessionStorage.Notes,
    }
    console.log(d)
    if (task_error(d)) alert(task_error(d))
    else{
        DATA.push(d)
        clear_new_task(d.project)
        table = document.querySelector(`.project-item-table.${hyphenated(d.project)} > .project-item-table-content > tbody`);
        span = 
        ` ${(table.querySelector(`.th-row`) != null) ? '' : // Add table header row if not existed
            `<tr class="th-row" style="background-color: ${color(d.project)}">
                <th class="th-task">Task</th>
                <th class="th-progress">Progress (%)</th>
                <th class="th-date">${date_str}</th>
            </tr>`}
            <tr class="task-item" id="taskid-${d.taskid}" onclick="task_clicked('${d.taskid}')">
                <td class="td-task">${d.task}</td>
                <td class="td-progress">${d.progress}</td>
                <td class="date td-date">${d.date}</td>
            </tr>`
        table.innerHTML += span

        toast_elem.className = "show";
        toast_elem.textContent = "New task "+ " '" + d.task + "' created.";

        setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);
    }
    update_num_tasks()
}

function init_page(){
    load_projects_css();
    load_completed_items(false)
    load_completed_items(true)
    load_search_listener()
    load_accordion_listener()
    // if (sessionStorage.new_task_added) add_timer_new_task()
}

init_page()


