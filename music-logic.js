DATA = Array.from(
[
    {album_name: 'Blonde', artist:"Frank Ocean", year:2016, num_tracks: 17, length: '60:08', topic:"Today's Pick", src:"assets/music/albums/album_blonde.jpeg"},
    {album_name: 'Flower Boy', artist:"Tyler, The Creator", year:2017, num_tracks: 14, length: '46:39', topic:"Today's Pick", src:"assets/music/albums/album_flowerboy.png"},
    {album_name: 'Ctrl', artist:"SZA", year:2017, num_tracks: 14, length: '49:06', topic:"Today's Pick", src:"assets/music/albums/album_ctrl.png"},
    {album_name: 'KIDS SEE GHOSTS', year:2017, artist:"KIDS SEE GHOSTS, Kanye West, Kid Cudi", num_tracks: 7, length: '23:52', topic:"Today's Pick", src:"assets/music/albums/album_ksg.png"},
    {album_name: 'Coloring Book', artist:"Chance the Rapper", year:2016, num_tracks: 14, length: '57:21', topic:"Today's Pick", src:"assets/music/albums/album_coloringbook.png"},
    {album_name: 'Freudian', artist:"Daniel Ceasar", year:2017, num_tracks: 10, length: '44:51', topic:"Today's Pick", src:"assets/music/albums/album_freudian.jpg"},
    {album_name: 'American Teen', artist:"Khalid", year:2017, num_tracks: 15, length: '54:45', topic:"Today's Pick", src:"assets/music/albums/album_americanteen.png"},
    {album_name: 'Happier Than Ever', artist:"Billie Eilish", year:2017, num_tracks: 16, length: '56:15', topic:"Today's Pick", src:"assets/music/albums/album_happierthanever.png"},
]);

TOPICS = ["Today's Pick","What's Popular", "Release Radar"]
LISTS = ['list-todays-pick',"list-whats-popular","list-release-radar"]

function load_albums(){
    TOPICS.forEach(topic => {
        var html_i = '';
        DATA.forEach(d => {
            if (d.topic == topic){
                span = `<img class="album-item" id="album-${d.album_name}" src="${d.src}" onclick="display_album_details('${d.album_name}')">`
                html_i += span;
            }
        })
        var list_container = document.querySelector(`#${LISTS[TOPICS.indexOf(topic)]}`)
        list_container.innerHTML = html_i
    })
}

function display_album_details(album_name){
    var html='';
    for (j in DATA){
        d=DATA[j]
        if (d.album_name == album_name){
            html = 
                `<div id="album-name">${d.album_name}</div>
                <div id="album-artist">${d.artist}</div>
                <div id="album-num_tracks">${d.num_tracks} Songs</div>
                <div id="album-playlist-length">${d.length}</div>`
            src = d.src;
            break;
        }
    }
    album_details = document.querySelector("#album-details");
    album_details.innerHTML = html;
    album_cover = document.querySelector("#album-cover");
    album_cover.style.opacity = 1;
    album_cover.src = src
    containera3b = document.querySelector("#container-a3b");
    containera3b.style.display = "flex";
    containera5 = document.querySelector("#container-a5");
    containera5.style.display = "grid";
}

function cancel_album_details(){
    html = 
    `<div id="album-name"></div>
    <div id="album-artist"></div>
    <div id="album-num_tracks"></div>
    <div id="album-playlist-length"></div>`
    src = "";
    album_details = document.querySelector("#album-details");
    album_details.innerHTML = html;
    album_cover = document.querySelector("#album-cover");
    album_cover.style.opacity = 0;
    album_cover.src = src
    containera3b = document.querySelector("#container-a3b");
    containera3b.style.display = "none";
    containera5 = document.querySelector("#container-a5");
    containera5.style.display = "none";
}

load_albums()    



// const get_col = (array, column) => {
//     const result = [];
//     array.forEach(e => {
//         result.push(e[column]);
//     });
//     return result;
// };

// const get_range = (array, attr) => {
//     const result = [];
//     var min = Math.min.apply(null, array.map(item => item[attr])),
//         max = Math.max.apply(null, array.map(item => item[attr]));
//     result.push(min);
//     result.push(max);
//     return result;
// };

// function hyphenated(c){
//     return c.replace(" ","-")
// }

// function unhyphenated(c){
//     return c.replace("-"," ")
// }

// //  Reduced the data by number of tasks and total duration per project
// function reduced(DATA){
//     rollup = d3.rollup(DATA, v => v.length, d => d.project, d => d.duration)
//     dict = {}
//     Array.from(rollup).forEach(k => {
//         var proj = k[0]; var dur = k[1];
//         dict[proj] = {num_tasks: 0, duration: 0}
//         Array.from(dur).forEach(d => {
//             dict[proj].num_tasks += 1;
//             dict[proj].duration += d[0]*d[1];
//         })
//     })
//     dict2 = Object.entries(dict)
//     dict2 = dict2.sort((a,b) => d3.descending(a[1].duration,b[1].duration))
//     return dict2;
// }

// var REDUCED_DATA = reduced(DATA)
// var PROJECT_LABELS = get_col(REDUCED_DATA,0)
// var color = d3.scaleOrdinal().domain(PROJECT_LABELS).range(d3.schemeSet1);
// // var NUM_TASKS = {}; REDUCED_DATA.forEach(d => NUM_TASKS[d[0]] = d[1].num_tasks)
// function NUM_TASKS(project,completed){
//     num_tasks = 0;
//     DATA.forEach(d => {
//         if (d.project == project & 
//             (completed == null | (d.progress < 100 & !completed) | (d.progress == 100 & completed))){
//             num_tasks += 1;
//         }
//     })
//     return num_tasks;
// }


// function fmt (seconds) {
//     const format = val => `0${Math.floor(val)}`.slice(-2)
//     const hours = Math.floor(seconds / 3600)
//     const minutes = Math.floor((seconds % 3600) / 60)
//     const odd_secs = seconds % 60
//     if (hours <= 0){ hh = ''} else {hh = hours+'h '}
//     if (minutes <= 0){ mm = ''} else {mm = minutes+'m '}
//     ss = odd_secs + 's'
//     return hh+mm+ss
// }


// // function rolledup(DATA){
// //     var data_rollup = d3.flatRollup(DATA,v => d3.sum(v, d => d.duration), d => d.project)
// //     return data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))
// // }


// function addCssRule(rule, css) {
//     css = JSON.stringify(css).replace(/"/g, "").replace(/,/g, ";");
//     $("<style>").prop("type", "text/css").html(rule + css).appendTo("head");
// }

// function load_projects_css(){
//     PROJECT_LABELS.forEach( d=> {
//         addCssRule(`.button-${hyphenated(d)}`, {
//             'background-color': color(d),
//             'color': "white"
//         });
//         addCssRule(`.button-${hyphenated(d)}:hover`, {
//             'background-color': color(d),
//             'color': "white"
//         });
//     })

// }

// function load_completed_items(completed){
//     var html = '';
//     PROJECT_LABELS.forEach(project => {
//         var html_i = '';
//         DATA.forEach(d => {
//             if (d.project == project & ((d.progress < 100 & !completed) | (d.progress == 100 & completed))){
//                 span = `<tr class="task-item" id="taskid-${d.taskid}" onclick="task_clicked('${d.taskid}')">
//                             <td class="td-task">${d.task}</td>
//                             <td class="td-progress">${d.progress}</td>
//                             <td class="date td-date">${d.date}</td>
//                         </tr>`
//                 html_i += span;
//             }
//         })
//         if (html_i != ''){
//             date_str = completed ? "Date Completed" : "Due Date";
//             // add_task_button = completed ? '<div class="project-item-add-tasks button-${hyphenated(project)}">+</div>' : ''

//             html += 
//             `<div class="project-item">
//                 <div class="accordion project-item-header button-${hyphenated(project)}">
//                     <div class="project-item-header-ele project-name">${project}</div>
//                     <div class="project-item-header-ele-num-tasks">${NUM_TASKS(project,completed)}</div>
//                 </div>
//                 ${!completed ? `<div class="project-item-add-tasks button-${hyphenated(project)}">+</div>`:``}
//                 <div class="project-item-table ${hyphenated(project)}" style="max-height: 250px;">
//                     <table class="project-item-table-content">
//                         <tbody>
//                             <tr class="th-row">
//                                 <th class="th-task">Task</th>
//                                 <th class="th-progress">Progress (%)</th>
//                                 <th class="th-date">${date_str}</th>
//                             </tr>
//                             ${html_i}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>`
//         }
//     })
//     // console.log(html)

//     list_id = completed ? "list-completed" : "list-inprogress"
//     table = document.getElementById(list_id)
//     table.innerHTML = html;
// }

// function task_clicked(taskid){
//     // Highlight current task-item
//     all_tasks = Array.from(document.getElementsByClassName("task-item"));
//     all_tasks.forEach(task_item => {
//         task_item.className = task_item.className.replace(" clicked","")
//     });
//     curr_task = document.getElementById(`taskid-${taskid}`);
//     curr_task.className += " clicked"
//     console.log(curr_task.className)


//     // Display its information on Details column
//     display_task(taskid)
// }

// function display_task(taskid){
//     var html='';
//     for (j in DATA){
//         d=DATA[j]
//         // console.log(taskid, d.taskid, d.taskid == taskid)
//         if (d.taskid == taskid){
//             date_str = (d.progress < 100) ? "Due Date" : "Date Completed"
//             html = 
//             `<tr><td>Task</td><td>${d.task}</td></tr>
//             <tr><td>Project</td><td>${d.project}</td></tr>
//             <tr><td>Focus Time</td><td>${fmt(d.duration)}</td></tr>
//             <tr><td>Break Time</td><td>${fmt(d.breaks)}</td></tr>
//             <tr><td>Progress</td><td>${d.progress}%</td></tr>
//             <tr><td>${date_str}</td><td>${d.date}</td></tr>
//             <tr><td>Notes:</td><td></td></tr>`
//             note = d.note;
//             break;
//         }
//     }
//     table = document.getElementById("table-details-body");
//     table.innerHTML = html;
//     notes = document.getElementById("text-notes");
//     notes.innerHTML = note;
// }

// function load_search_listener(){
//     const searchInput = document.getElementById('searchID');
//     searchInput.addEventListener('keyup', function(event) {
//         const q = event.target.value.toLowerCase();
//         display_search_result(q);
//         console.log(q)

//     })

// }

// function num_tasks_to_display(project_item){
//     num_tasks = 0;
//     if (project_item.style.display == "grid"){
//         Array.from(project_item.querySelectorAll(".task-item")).forEach( task_item =>{
//             num_tasks = (task_item.style.display == "flex") ? num_tasks + 1 : num_tasks;
//         })
//     }
//     return num_tasks;
// }


// function display_search_result(q){
//     let projects = document.querySelectorAll(".project-item");
//     projects.forEach(project_item => {
//         if (project_item.querySelector(".project-item-header-ele.project-name").textContent.toLowerCase().includes(q.toLowerCase())){
//             project_item.style.display = "grid";
//             let rows = project_item.querySelectorAll(".task-item");
//             rows.forEach((row) => {row.style.display = "flex"})
//         }
//         else {
//             str = ''; Array.from(project_item.querySelectorAll(".task-item")).forEach(d => str += d.querySelector("td").textContent + " ")
//             if (str.toLowerCase().includes(q.toLowerCase())){
//                 let rows = project_item.querySelectorAll(".task-item");
//                     rows.forEach((row) => {
//                         console.log(row.querySelector("td").textContent,row.querySelector("td").textContent.toLowerCase().includes(q.toLowerCase()),row.style.display)
//                     if (row.querySelector("td").textContent.toLowerCase().includes(q.toLowerCase())){
//                         project_item.style.display = "grid";
//                         row.style.display = "flex"
//                     }
//                     else row.style.display = "none";
//                 })
//             }
//             else {
//                 project_item.style.display = "none"

//             };
//         }
//         if (project_item.style.display == "grid"){
//             num_tasks = 0;
//             Array.from(project_item.querySelectorAll(".task-item")).forEach( task_item =>{
//                 num_tasks = (task_item.style.display == "flex") ? num_tasks + 1 : num_tasks;
//             })
//             project_item.querySelector(".project-item-header-ele-num-tasks").textContent = num_tasks
//         }
//     });
// }

// function add_new_task(table_id, task_name_item, task_date_item){
//     let task_name = document.getElementById(task_name_item).value;
//     let task_date = document.getElementById(task_date_item).value;
//     let task_id = get_next_id()
//     let table = document.getElementById(table_id);
//     let newRows = ` <tr class="task-item" id="taskid-${task_id}" onclick="task_clicked('${taskid}')">
//                         <td class="td-task">${task_name}</td>
//                         <td class="td-progress">0</td>
//                         <td class="date td-date">${task_date}</td>
//                     </tr>`;

//     let lastRow = table.rows[table.rows.length-2];
//     lastRow.insertAdjacentHTML('beforebegin', newRows);
    
//     let taskHeaders = table.getElementsByClassName("taskHeader").length;
//     let newTaskHeader = table.getElementsByClassName("taskHeader")[taskHeaders - 1];
//     newRow.push(newTaskHeader);
//     addAccordionItemEvent(newRow);

// }


// load_projects_css();
// load_completed_items(false)
// load_completed_items(true)
// load_search_listener()

// // display_search_result("12")