// Our Local DATA

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
    {taskid: '10', task: 'Quiz 12', project: 'COMP 4710', duration: '400',breaks: 0, progress: 100, date: '2021-11-13', note:'Nam eu nisi laoreet, sodales eros et, posuere orci. Nam vehicula rutrum ligula ac blandit. Curabitur scelerisque ullamcorper mauris, nec rutrum ligula. Ut hendrerit commodo est, ac consequat nisl finibus vel. Vestibulum tincidunt est odio, non tempus odio vulputate eu. Pellentesque id lectus id ex tempor laoreet. Nulla aliquet mauris vitae risus accumsan, eget venenatis magna gravida. Vestibulum consequat pellentesque elit, at dictum arcu viverra tincidunt. Etiam rutrum, mi sed pretium lacinia, lorem elit gravida dolor, sit amet commodo orci turpis in risus. Nunc consectetur magna metus, ullamcorper lobortis lectus consectetur eget. Nullam in mauris sed diam faucibus tempor in non lorem.'},
    {taskid: '11', task: 'Group Work Prep', project: 'COMP 4710', duration: '200',breaks: 0, progress: 60, date: '2022-01-06', note:'Nam sed tincidunt odio. Sed nulla orci, semper ut mattis vel, luctus a eros. Nullam aliquam, massa commodo scelerisque aliquam, odio eros mattis libero, ut malesuada ipsum dolor in risus. Duis sagittis ipsum sem, finibus laoreet magna dapibus scelerisque. Sed a ipsum nec lectus congue tincidunt. Proin imperdiet tempor lectus ac faucibus. '},
    {taskid: '12', task: 'Proofread submission', project: 'COMP 4230', duration: '400',breaks: 100, progress: 100, date: '2021-11-23', note:'Sed faucibus neque eget condimentum finibus. Proin rutrum, velit vitae laoreet ultrices, orci velit dictum arcu, non iaculis mi magna sed mi. Donec quis quam id turpis pulvinar dignissim laoreet eget erat. Sed porta quam urna, at faucibus sem mattis in. Fusce commodo nisi at velit porttitor, in vehicula purus feugiat.'}
]);

/*-----------------------------*/
/* Getting elements dimensions */
/*-----------------------------*/
// Margin dimensions
margin_dim = {}
Array.from(document.querySelectorAll(".margin")).forEach(margin => {
    margin_dim[margin.id] = [margin.offsetWidth, margin.offsetHeight]
})

// Navbar dimensions
navbar_dim = {}
Array.from(document.querySelectorAll(".navbar")).forEach(navbar => {
    navbar_dim[navbar.id] = [navbar.offsetWidth, navbar.offsetHeight]
})
console.log(navbar_dim)

// App Divs dimensions
app_div_dim = {}
Array.from(document.querySelectorAll(".app-div")).forEach(app_div => {
    app_div_dim[app_div.id] = [app_div.offsetWidth, app_div.offsetHeight]
})

/*-----------------------------*/
/* Simulation functions -------
/*-----------------------------*/

/**
 * Helper functions
 */

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


const bound = (value, min, max) => {
    if (isNaN(value)){return 0;}
    if (value < min) {return min;}
    if (value > max) {return max;}
    return value;
}
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
var PROJECT_LABELS = get_col(REDUCED_DATA,0)
var color = d3.scaleOrdinal().domain(PROJECT_LABELS).range(d3.schemeSet1);
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

/**
 * Simulation functions
 */
curr_appdiv = document.querySelector("#container-stats-bubbles").parentElement.id
var width = app_div_dim[curr_appdiv][0];
var height = app_div_dim[curr_appdiv][1];
const off_w = margin_dim['margin-left'][0];
const off_h = navbar_dim['navbar-left'][1]+app_div_dim['app-a0'][1]+app_div_dim['app-a1'][1] + app_div_dim['app-a7'][1]
 
var svg = d3.select("#container-stats-bubbles").append("svg").attr("width",width).attr("height",height)

// Tasks Container View  

function taskSimulation(DATA){
    var simulation = d3.forceSimulation()
        .force("center", d3.forceCenter().x(width/2).y(height/2.5)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(250)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.5).radius(function(d){ return (size(d.duration)+3) }).iterations(1)) // Force that avoids circle overlapping
    
    // create a tooltip
    var Tooltip = d3.select("#container-stats-bubbles")
        .append("div")
        .style("opacity", 0)
        .attr( "class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "10px")
        .style("padding", "5px")
        .style("font-family","Montserrat")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        Tooltip
        .style("opacity", 1)
    }
    var mousemove = function(d) {
        Tooltip
        .html('<span style="color:'+color(d.project)+ '"><b>' + d.project + '</b></span>'
            + "<br><b>" + d.task  + "</b>"
            + "<br>" + fmt(d.duration))
        .style("left", (d3.mouse(this)[0]+off_w+10) + "px")
        .style("top", (d3.mouse(this)[1]+off_h) + "px")
    }
    var mouseleave = function(d) {
        Tooltip
        .style("opacity", 0)
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(.03).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        Tooltip
        .html('<span style="color:'+color(d.project)+ '"><b>' + d.project + '</b></span>'
            + "<br><b>" + d.task  + "</b>"
            + "<br>" + fmt(d.duration))
        .style("left", (d3.mouse(this)[0]+off_w+10) + "px")
        .style("top", (d3.mouse(this)[1]+off_h) + "px")
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;
    }


    data_rollup = d3.flatRollup(DATA,v => d3.sum(v, d => d.duration), d => d.project)
    data_rollup = data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))

    var size = d3.scaleLinear()
        .domain(get_range(DATA,"duration"))
        .range([25,55])

    var sizedot = d3.scaleLinear()
        .domain(get_range(DATA,"duration"))
        .range([3,7])


    var node = svg.append("g")
        .attr("class","statscontainer tasks show")
        .selectAll("circle")
        .data(DATA)
        .enter()
        .append("circle")
        .attr("class", d => "task node " + d.project)
        .attr("r", function(d){return size(d.duration)})
        .attr("cx", 0)
        .attr("cy", 0)
        .style("fill", function(d){return color(d.project)})
        .style("fill-opacity", 1)
        .attr("stroke", "black")
        .style("stroke-width", 1)
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
        .call(d3.drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
        
    node.append("text").attr("class","label")
        // .data(data)
        // .attr("x", 0)
        // .attr("y", 0)
        // .attr("class","label")
        // .attr("r", 0)
        // .attr("dy", ".35em")
        .attr("x", 600)
        .attr("y", 600)
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("font", "10px sans-serif")
        .style("color", "black")
        .style("z-index",1000)
        .style("fill-opacity", 1)
        .style("display","block")
        .text(d => d.task);

        // ---------------------------//
        //       LEGEND              //
        // ---------------------------//
        // Add one dot in the legend for each name.
        var dotsize = 20
        var allgroups = get_col(data_rollup,0)
        var alldurations = get_col(data_rollup,1)

        svg.append("g").attr("class","myrect").selectAll("myrect") // selectAll
        .data(allgroups)
        .enter()
        .append("circle")
            .attr("cx", (d,i) => 50)
            .attr("cy", function(d,i){ return 100 + i * 40}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", (d,i) => sizedot(alldurations[i]))
            .style("fill", function(d){ return color(d)})
            .style("stroke", "black")
            .style("stroke-width", 1)

        // Add labels beside legend dots
        svg.append("g").attr("class","mylabels").selectAll("mylabels")
        .data(allgroups)
        .enter()
        .append("text")
            .attr("x", (d,i) => 65)
            .attr("y", function(d,i){ return 100 + i * 40}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return color(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")



    simulation
        .nodes(DATA)
        .on("tick", function(d){
            node
                .attr("cx", d => bound(d.x, 100, width - 100)) // d.x
                .attr("cy", d => bound(d.y, 50, height - 100)) // d.y
            });
}

function projectSimulation(DATA){
// Projects Container View  
data_rollup = d3.flatRollup(DATA,v => d3.sum(v, d => d.duration), d => d.project)
data_rollup = data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))

// console.log(data_rollup)

var simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width/2).y(height/2.5)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(1000)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.5).radius(function(d){ return (size(d[1])+3) }).iterations(1)) // Force that avoids circle overlapping

// create a tooltip
var Tooltip = d3.select("#container-stats-bubbles")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
    Tooltip
    .style("opacity", 1)
}
var mousemove = function(d) {
    Tooltip
    .html('<span style="color:'+color(d[0])+ '"><b>' + d[0] + '</b></span>'
        + "<br><b>" + d.length  + " Tasks" + "</b>"
        + "<br>" + fmt(d[1]))
    .style("left", (d3.mouse(this)[0]+10) + "px")
    .style("top", (d3.mouse(this)[1]+off_h) + "px")
}
var mouseleave = function(d) {
    Tooltip
    .style("opacity", 0)
}

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    Tooltip
    .html('<span style="color:'+color(d[0])+ '"><b>' + d[0] + '</b></span>'
        + "<br><b>" + d.length  + " Tasks" + "</b>"
        + "<br>" + fmt(d[1]))
    .style("left", (d3.mouse(this)[0]+10) + "px")
    .style("top", (d3.mouse(this)[1]+off_h) + "px")
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
}


var size = d3.scaleLinear()
    .domain(get_range(data_rollup,1))
    .range([30,80])

var color = d3.scaleOrdinal()
    .domain(get_col(data_rollup,0))
    .range(d3.schemeSet1);

var node = svg.append("g")
    .attr("class","statscontainer projects hidden")
    .selectAll("circle")
    .data(data_rollup)
    .enter()
    .append("circle")
    .attr("class", d => "project node " + d[0])
    .attr("r", function(d){return size(d[1])})
    .attr("cx", function(d){return Math.random()*d[1]})
    .attr("cy", function(d){return Math.random()*d[1]})
    .style("fill", function(d){return color(d[0])})
    .style("fill-opacity", 1)
    .attr("stroke", "black")
    .style("stroke-width", 1)
        .on("mouseover", mouseover) // What to do when hovered
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    .call(d3.drag() // call specific function when circle is dragged
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));


simulation
    .nodes(data_rollup)
    .on("tick", function(d){
        node
        .attr("cx", d => bound(d.x, 100, width - 100)) // d.x
        .attr("cy", d => bound(d.y, 50, height - 150)) // d.y
    });
}



/*-------------------------*/
/* Creating Filter Buttons */
/*-------------------------*/

function filterSelection(c) {
    c = hyphenated(c)
    var x, i;
    x = document.getElementsByClassName("statscontainer");
    if (c == "all") c = "";
    else if (c === "tasks") displayTaskList()
    else if (c === "projects") displayProjectList()
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        w3RemoveClass(x[i], "hidden");
        if (x[i].className.baseVal.indexOf(c) > -1) w3AddClass(x[i], "show");
        else w3AddClass(x[i], "hidden")
    }
}

function highlightSelection(c) {
    var x, i;
    x = document.getElementsByClassName("node");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "highlight");
    w3RemoveClass(x[i], "unhighlight");
    if (x[i].className.baseVal.indexOf(unhyphenated(c)) > -1){
        w3AddClass(x[i], "highlight");
    }
    else w3AddClass(x[i], "unhighlight")
    }
}

function unhighlightSelection(c) {
    highlightSelection("all")
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.baseVal.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className.baseVal += " " + arr2[i];}
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.baseVal.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
        }
    }
    element.className.baseVal = arr1.join(" ");
}


function displayTaskList(project){
    data_rollup = d3.flatRollup(DATA,v => d3.sum(v, d => d.duration), d => d.project)
    data_rollup = data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))

    listcontainer = document.getElementById("container-list")

    var color = d3.scaleOrdinal()
        .domain(get_col(data_rollup,0))
        .range(d3.schemeSet1);

    html = ""
    for (const i in DATA.slice(0,DATA.length)){
        d = DATA[i]
        if (project == null | project == "all" | hyphenated(d.project) == project){
            span ='<li class = "task-li '+ hyphenated(d.project)+'"">'
                + '<span style="color:'+color(d.project)+ '"><b>' + d.project + '</b></span>'
                + "<br><b> " + d.task  + "</b>"
                + "<br> " + fmt(d.duration) + '</li>'
            html += span
        }
    }
    listcontainer.innerHTML = html
}

function displayProjectList(project){
    data_rollup = d3.flatRollup(DATA,v => d3.sum(v, d => d.duration), d => d.project)
    data_rollup = data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))

    var color = d3.scaleOrdinal()
        .domain(get_col(data_rollup,0))
        .range(d3.schemeSet1);

    listcontainer = document.getElementById("container-list")

    html = ""
    for (const i in data_rollup){
        d = data_rollup[i]
        if (project == null | project == "all" | hyphenated(d[0])  === project){
            span ='<li class = "project-li '+ hyphenated(d[0])+'"">'
                + '<span style="color:'+color(d[0])+ '"><b>' + d[0] + '</b></span>'
                + "<br><b> " + d.length  + " Tasks" + "</b>"
                + "<br> " + fmt(d[1]) + '</li>'
            html += span
        }
    }
    listcontainer.innerHTML = html
}

function addCssRule(rule, css) {
    css = JSON.stringify(css).replace(/"/g, "").replace(/,/g, ";");
    $("<style>").prop("type", "text/css").html(rule + css).appendTo("head");
}

function createProjectFilterButtons(){
    data_rollup = d3.flatRollup(DATA,v => d3.sum(v, d => d.duration),d => d.project)
    data_rollup = data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))

    var allgroups = get_col(data_rollup,0)
    var alldurations = get_col(data_rollup,1)

    var color = d3.scaleOrdinal()
        .domain(get_col(data_rollup,0))
        .range(d3.schemeSet1);

    btnContainer = document.getElementById("list-filters")
    html = ""
    for (const i in allgroups){
        d = allgroups[i]
        span = '<button class="project filter-btn '+ hyphenated(d) +'" onclick="projectFilterSelection(\''+ d +'\')">' + d +'</button>'
        html += span
        addCssRule(".filter-btn."+hyphenated(d), {
            'background-color': "white",
            'color': color(d)
        });
        addCssRule(".filter-btn."+hyphenated(d)+".clicked", {
            'background-color': color(d),
            'color': "white"
        });
        addCssRule(".filter-btn."+hyphenated(d)+":hover", {
            'background-color': color(d),
            'color': "white"
        });
    }
    btnContainer.innerHTML += html
}   

function clearProjectFilter(){
    taskButtonActive = document.getElementsByClassName("btn active")[0].className.indexOf("task") > -1

    if (taskButtonActive) displayTaskList() 
    else  displayProjectList()


}

function projectFilter(c){
    c = hyphenated(c)
    highlightSelection(c)
    taskButtonActive = document.getElementsByClassName("btn active")[0].className.indexOf("task") > -1
    if (taskButtonActive) displayTaskList(c) 
    else  displayProjectList(c)


}

function btnSelection(c){
    var btns = document.getElementById("container-buttons").getElementsByClassName("btn");
    selectedBtn = document.getElementById("container-buttons").getElementsByClassName(c)[0];
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].className.indexOf("active") > -1)
            btns[i].className = btns[i].className.replace(" active","")
    }
    selectedBtn.className += " active"
    filterSelection(c)

    var clicked = document.getElementById("list-filters").getElementsByClassName("clicked")[0];
    if (clicked != null){
        var currentFilter = clicked.className.split(" ")[2];
        projectFilter(currentFilter);
    }
}

function projectFilterSelection(c){
    c = hyphenated(c)
    projectFilter(c)
    var btns = document.getElementById("list-filters").getElementsByClassName("filter-btn");
    selectedBtn = document.getElementById("list-filters").getElementsByClassName(c)[0];
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].className.indexOf("clicked") > -1)
            btns[i].className = btns[i].className.replace(" clicked","")
    }
    if (c!= "all" & c != null){
        selectedBtn.className += " clicked"
        filter_status = document.querySelector("#text-filter-on");
        // filter_status.style.display = "block";
        filter_status.textContent = "On";
        filter_status.style.backgroundColor = "green";
    }
    else{
        filter_status = document.querySelector("#text-filter-on");
        // filter_status.style.display = "none";
        filter_status.textContent = "Off";
        filter_status.style.backgroundColor = "red";

    }

}


/*------------------------*/
/* Running the simulation */
/*------------------------*/

createProjectFilterButtons()
clearProjectFilter()
taskSimulation(DATA);
projectSimulation(DATA)

