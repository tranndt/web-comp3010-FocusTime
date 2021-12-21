var width = 1000
var height = 700

data = Array.from(
    [{taskid: '1', task: 'Task 1', project: 'COMP 3020', duration: '200'},
    {taskid: '2', task: 'Task 2', project: 'COMP 3020', duration: '250'},
    {taskid: '3', task: 'Task 3', project: 'COMP 3020', duration: '300'},
    {taskid: '4', task: 'Task 4', project: 'COMP 3040', duration: '245'},
    {taskid: '5', task: 'Task 5', project: 'COMP 3040', duration: '200'},
    {taskid: '6', task: 'Task 6', project: 'COMP 3040', duration: '500'},
    {taskid: '7', task: 'Task 7', project: 'COMP 2140', duration: '710'},
    {taskid: '8', task: 'Task 8', project: 'COMP 2140', duration: '400'},
    {taskid: '9', task: 'Task 9', project: 'COMP 2140', duration: '300'},
    {taskid: '10', task: 'Task 10', project: 'COMP 4710', duration: '400'},
    {taskid: '11', task: 'Task 11', project: 'COMP 4710', duration: '200'},
    {taskid: '12', task: 'Task 12', project: 'COMP 4230', duration: '400'}
]);

var svg = d3.select("#myStatsBubbles")
    .append("svg")
    .attr("width",width)
    .attr("height",height)


// const off_h = document.getElementsByClassName("navbar")[0].offsetHeight
const off_h = 0;

const bound = (value, min, max) => {
        if (isNaN(value)){return 0;}
        if (value < min) {return min;}
        if (value > max) {return max;}
        return value;
}
const array_column = (array, column) => {
        const result = [];
        array.forEach(e => {
            result.push(e[column]);
        });
        return result;
    };

const array_range = (array, attr) => {
    const result = [];
    var min = Math.min.apply(null, array.map(item => item[attr])),
        max = Math.max.apply(null, array.map(item => item[attr]));
    result.push(min);
    result.push(max);
    return result;
};
// Tasks Container View  

function taskSimulation(data){
    var simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width/2).y(height/2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(250)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.5).radius(function(d){ return (size(d.duration)+3) }).iterations(1)) // Force that avoids circle overlapping

    
    // create a tooltip
    var Tooltip = d3.select("#myStatsBubbles")
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
        .html('<span style="color:'+color(d.project)+ '"><u><b>' + d.project + '</b></u></span>'
            + "<br><b>" + d.task  + "</b>"
            + "<br>" + fmt(d.duration))
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
        .html('<span style="color:'+color(d.project)+ '"><u><b>' + d.project + '</b></u></span>'
            + "<br><b>" + d.task  + "</b>"
            + "<br>" + fmt(d.duration))
        .style("left", (d3.mouse(this)[0]+10) + "px")
        .style("top", (d3.mouse(this)[1]+off_h) + "px")
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;
    }


    data_rollup = d3.flatRollup(data,v => d3.sum(v, d => d.duration), d => d.project)
    data_rollup = data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))

    a_ = 0.3
    b_ = 1- a_
    var centroid_x = d3.scaleOrdinal()
        .domain(array_column(data_rollup,0))
        .range([a_*width,b_*width,a_*width,b_*width]);

    var centroid_y = d3.scaleOrdinal()
        .domain(array_column(data_rollup,0))
        .range([a_*height,a_*height,b_*height,b_*height]);

    function starting_x (d) {
        offset_dir = Math.random() < 0.5 ? 1 : -1;
        return centroid_x(d.project) + offset_dir*size(d.duration)
    }
    function starting_y (d) {
        offset_dir = Math.random() < 0.5 ? 1 : -1;
        return centroid_y(d.project) + offset_dir*size(d.duration)
    }

    var color = d3.scaleOrdinal()
        .domain(array_column(data_rollup,0))
        .range(d3.schemeSet1);

    var size = d3.scaleLinear()
        .domain(array_range(data,"duration"))
        .range([30,80])

    var sizedot = d3.scaleLinear()
        .domain(array_range(data,"duration"))
        .range([3,8])

    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//
    // Add one dot in the legend for each name.
    var dotsize = 20
    var allgroups = array_column(data_rollup,0)
    var alldurations = array_column(data_rollup,1)

    svg.append("g").attr("class","myrect").selectAll("myrect") // selectAll
    .data(allgroups)
    .enter()
    .append("circle")
        .attr("cx", (d,i) => 100 - dotsize + i * 150)
        .attr("cy", function(d,i){ return height - 30}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", (d,i) => sizedot(alldurations[i]))
        .style("fill", function(d){ return color(d)})
        .style("stroke", "black")
        .style("stroke-width", 1)
        // .on("mouseover", highlightSelection)
        // .on("mouseleave", unhighlightSelection)

    // Add labels beside legend dots
    svg.append("g").attr("class","mylabels").selectAll("mylabels")
    .data(allgroups)
    .enter()
    .append("text")
        .attr("x", (d,i) => 100 + i * 150)
        .attr("y", function(d,i){ return height - 30}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        // .on("mouseover", highlightSelection)
        // .on("mouseleave", unhighlightSelection)

    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

    var node = svg.append("g")
        .attr("class","statscontainer tasks show")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", d => "task node " + d.project)
        .attr("r", function(d){return size(d.duration)})
        .attr("cx", function(d){return starting_x(d) })
        .attr("cy", function(d){return starting_y(d) })
        .style("fill", function(d){return color(d.project)})
        .style("fill-opacity", 1)
        .attr("stroke", "black")
        .style("stroke-width", 2)
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
        .call(d3.drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
        
    node.append("text")
        // .data(data)
        // .attr("x", 0)
        // .attr("y", 0)
        .attr("class","label")
        .attr("r", 0)
        .attr("dy", ".35em")
        .style("font", "10px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("fill-opacity", 1)
        .style("display","inline")
        .text(d => d.task);
        

    simulation
        .nodes(data)
        .on("tick", function(d){
            node
                .attr("cx", d => bound(d.x, 100, width - 100)) // d.x
                .attr("cy", d => bound(d.y, 50, height - 150)) // d.y
            });
}

function projectSimulation(data){
// Projects Container View  
data_rollup = d3.flatRollup(data,v => d3.sum(v, d => d.duration), d => d.project)
data_rollup = data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))

// console.log(data_rollup)

var simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width/2).y(height/2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(1000)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.5).radius(function(d){ return (size(d[1])+3) }).iterations(1)) // Force that avoids circle overlapping

// create a tooltip
var Tooltip = d3.select("#myStatsBubbles")
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
    .html('<span style="color:'+color(d[0])+ '"><u><b>' + d[0] + '</b></u></span>'
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
    .html('<span style="color:'+color(d[0])+ '"><u><b>' + d[0] + '</b></u></span>'
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
    .domain(array_range(data_rollup,1))
    .range([50,100])

var color = d3.scaleOrdinal()
    .domain(array_column(data_rollup,0))
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
    .style("stroke-width", 2)
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

/*-------------------------*/
/* Creating Filter Buttons */
/*-------------------------*/

function filterSelection(c) {
    c = asClassName(c)
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
    if (x[i].className.baseVal.indexOf(asProjectName(c)) > -1){
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
    data_rollup = d3.flatRollup(data,v => d3.sum(v, d => d.duration), d => d.project)
    data_rollup = data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))

    listcontainer = document.getElementById("listcontainer")

    var color = d3.scaleOrdinal()
        .domain(array_column(data_rollup,0))
        .range(d3.schemeSet1);

    html = ""
    for (const i in data.slice(0,data.length)){
        d = data[i]
        if (project == null | project == "all" | asClassName(d.project) == project){
            span ='<li class = "task-li '+ asClassName(d.project)+'"">'
                + '<span style="color:'+color(d.project)+ '"><u><b>' + d.project + '</b></u></span>'
                + "<br><b> " + d.task  + "</b>"
                + "<br> " + fmt(d.duration) + '</li>'
            html += span
        }
    }
    listcontainer.innerHTML = html
}

function displayProjectList(project){
    data_rollup = d3.flatRollup(data,v => d3.sum(v, d => d.duration), d => d.project)
    data_rollup = data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))

    var color = d3.scaleOrdinal()
        .domain(array_column(data_rollup,0))
        .range(d3.schemeSet1);

    listcontainer = document.getElementById("listcontainer")

    html = ""
    for (const i in data_rollup){
        d = data_rollup[i]
        if (project == null | project == "all" | asClassName(d[0])  === project){
            span ='<li class = "project-li '+ asClassName(d[0])+'"">'
                + '<span style="color:'+color(d[0])+ '"><u><b>' + d[0] + '</b></u></span>'
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
    data_rollup = d3.flatRollup(data,v => d3.sum(v, d => d.duration),d => d.project)
    data_rollup = data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))

    var allgroups = array_column(data_rollup,0)
    var alldurations = array_column(data_rollup,1)

    var color = d3.scaleOrdinal()
        .domain(array_column(data_rollup,0))
        .range(d3.schemeSet1);

    btnContainer = document.getElementById("myFilterContainer")
    html = ""
    for (const i in allgroups){
        d = allgroups[i]
        span = '<button class="project filter-btn '+ asClassName(d) +'" onclick="projectFilterSelection(\''+ d +'\')">' + d +'</button>'
        html += span
        addCssRule(".filter-btn."+asClassName(d), {
            'background-color': "white",
            'color': color(d)
        });
        addCssRule(".filter-btn."+asClassName(d)+".clicked", {
            'background-color': color(d),
            'color': "white"
        });
        addCssRule(".filter-btn."+asClassName(d)+":hover", {
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
    c = asClassName(c)
    highlightSelection(c)
    taskButtonActive = document.getElementsByClassName("btn active")[0].className.indexOf("task") > -1
    if (taskButtonActive) displayTaskList(c) 
    else  displayProjectList(c)
}

function btnSelection(c){
    var btns = document.getElementById("myBtnContainer").getElementsByClassName("btn");
    selectedBtn = document.getElementById("myBtnContainer").getElementsByClassName(c)[0];
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].className.indexOf("active") > -1)
            btns[i].className = btns[i].className.replace(" active","")
    }
    selectedBtn.className += " active"
    filterSelection(c)

    var clicked = document.getElementById("myFilterContainer").getElementsByClassName("clicked")[0];
    if (clicked != null){
        var currentFilter = clicked.className.split(" ")[2];
        projectFilter(currentFilter);
    }
}

function projectFilterSelection(c){
    c = asClassName(c)
    projectFilter(c)
    var btns = document.getElementById("myFilterContainer").getElementsByClassName("filter-btn");
    selectedBtn = document.getElementById("myFilterContainer").getElementsByClassName(c)[0];
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].className.indexOf("clicked") > -1)
            btns[i].className = btns[i].className.replace(" clicked","")
    }
    if (c!= "all" & c != null)
        selectedBtn.className += " clicked"
}

function asClassName(c){
    return c.replace(" ","-")
}

function asProjectName(c){
    return c.replace("-"," ")
}

/*------------------------*/
/* Running the simulation */
/*------------------------*/

createProjectFilterButtons()
clearProjectFilter()
taskSimulation(data);
projectSimulation(data)

