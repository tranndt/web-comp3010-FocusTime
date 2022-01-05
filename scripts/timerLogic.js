// 1: 20: 50
const input_hr = 1;
const input_min = 20;
const input_sec = 50;
const BREAK_PERCENT = 0.25;

const convert_to_secs = (input_hr, input_min, input_sec) => {
    return Number(input_hr)*60*60 + Number(input_min)*60 + Number(input_sec);
};

const convert_from_secs = (input_sec) => {
    input_sec =  Number(input_sec);
    const sec = input_sec % 60;
    const minFromSec = Math.floor(input_sec / 60);
    const min = minFromSec % 60;
    const hr = Math.floor(minFromSec / 60);
    return [hr, min, sec];
};

//--------------------------------------------------------

const toast_elem = document.getElementById("toast");

const dbox_elem = document.getElementById("dialogBox");
const dbox_msg = document.getElementById("dbox-msg");
const task_amount = document.querySelector('#dbox-input');
const dbox_btn_done = document.querySelector('#confirm-btn');
const dbox_btn_cancel = document.querySelector('#cancel-btn');
const dbox_btn_skip = document.querySelector('#skip-btn');

const dbox_warn = document.getElementById("dialogBox-3");
const dbox_warn_msg = document.getElementById("dbox-msg-3");
const dbox_warn_okay = document.querySelector('#okay');
const dbox_warn_cancel = document.querySelector('#cancel-btn-3');

const dbox_noTask = document.getElementById("dialogBox-4");
const dbox_noTask_msg = document.getElementById("dbox-msg-4");
const dbox_noTask_okay = document.querySelector('#okay-4');
const dbox_noTask_cancel = document.querySelector('#cancel-btn-4');

const hr_elem = document.querySelector('#hr');
const min_elem = document.querySelector('#min');
const sec_elem= document.querySelector('#sec');

const br_hr = document.querySelector('#br-hr');
const br_min = document.querySelector('#br-min');
const br_sec= document.querySelector('#br-sec');

const start_pause_btn = document.querySelector('#start-pause');
const stop_btn = document.querySelector('#stop');

const time_input_elem = document.querySelector('#input-time');
const main_timer_elem = document.querySelector('#timer-set'); //main timer
const time_inputs = document.querySelectorAll('.time-inputs');
const progress = document.querySelector('.base-timer__path-remaining');
const radius = progress.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

progress.style.strokeDasharray = circumference;
progress.style.strokeDashoffset = circumference;

var total_secs = null; // input from screen

var time = 0; //in seconds, time left
var br_time = 0;//break time left
var task_done_input = -1; // amount of task done in percentage.
var time_focused = -1; // amount of time user focused on work(seconds)

let intervalID = null; //countdown interval
let br_intervalID = null; //countdown interval

var task_not_selected_warned = false;
var task_warning_message = "Warning! No task selected. You can proceed without selecting a task, but your progress will not be saved.";

//timer states
const RUNNING = 0;
const PAUSED = 1;
const STOPPED = 2;
const EDIT = 3;
const READY = 4;

//button colors
const disabled_background = 'rgba(248, 222, 222, 0.932)';
const disabled_text = "rgb(158, 150, 147)";
const enabled_text = "#a1303f";
const main_btn_color = 'rgba(253, 152, 152, 0.932)';
const click_color = '#B6404F';

// New Task Added Flags
const NO_TASK_ADDED = 0;
const EDIT_TASK = 1;
const ADD_TASK = 2;

//initial state
let state = STOPPED;
start_pause_btn.disabled = true;
time_input_elem.style.display = "none";
stop_btn.style.backgroundColor = main_btn_color;
start_pause_btn.style.backgroundColor = disabled_background;
start_pause_btn.style.color = disabled_text;
start_pause_btn.style.cursor = 'default';
setProgress(100);
progress.style.transition = '0s';
sessionStorage.setItem("new_task_added",false);


var album_sec = -1;

const saveSession = () => {
    var selected_task = document.getElementById("task-selector").options[document.getElementById("task-selector").selectedIndex].text;
    var selected_proj = document.getElementById("project-selector").options[document.getElementById("project-selector").selectedIndex].text;
    var notes = document.getElementById("notes-text").value;

    if (typeof(Storage) !== "undefined") {
        // Store to for sessionStorage
        // d = {
        //     taskid: `${new Date().getTime()}`,    
        //     task: selected_task ? selected_task : null,
        //     project: selected_proj ? selected_proj : 'Miscellaneous',
        //     progress: task_done_input ? task_done_input : null,
        //     date: new Date(),
        //     duration: time_focused ? time_focused : null,
        //     breaks: 0,
        //     note: notes,
        // }
        // sessionStorage.setItem("new_task",JSON.parse(d))
        sessionStorage.setItem("task_progress", task_done_input);
        sessionStorage.setItem("time_focused", time_focused);
        sessionStorage.setItem("task_name", selected_task);
        sessionStorage.setItem("project_name", selected_proj);
        sessionStorage.setItem("Notes", notes);
        sessionStorage.setItem("new_task_added",true);
    } else {
        // Sorry! No Web Storage support..
    }
};

const isValidInteger = (input_val, min_val, max_val) => {
    return Number.isInteger(Number(input_val)) && Number(input_val) >= min_val && Number(input_val) <= max_val;
};

const set_timer_to_album_length = () => {
    total_secs = album_sec;
    time = total_secs;
    br_time = time*BREAK_PERCENT;

    const [hr, min, sec] = convert_from_secs(album_sec);
    time_inputs[0].value = hr;
    time_inputs[1].value = min;
    time_inputs[2].value = sec;

    set_timer(hr_elem, min_elem, sec_elem, time);
    set_timer(br_hr, br_min, br_sec, br_time);

    progress.style.transition = '0.9s';
    setProgress(0);


    if(state != EDIT) {
        enable_start_pause_button("Start");
        stop_btn.textContent = "Edit";
    }
    else {
        disable_start_pause_button("Start");
    }

};

const set_album_length = (album_sec_stored) => {
    console.log('album_sec', album_sec_stored);
    album_sec = album_sec_stored;


    var alb_hr = -1;
    var alb_min = -1;
    var alb_sec = -1;

    var str_time = album_sec_stored;
    var splitted = str_time.split(':');
    console.log(Number(splitted[0]), Number(splitted[1]));


    if(splitted.length == 2) {
        alb_hr = 0;
        alb_min = Number(splitted[0]);
        alb_sec = Number(splitted[1]);
    }
    else if(splitted.length == 3) {
        alb_hr = Number(splitted[0]);
        alb_min = Number(splitted[1]);
        alb_sec = Number(splitted[2]);
    }

    album_sec = convert_to_secs(alb_hr, alb_min, alb_sec);


    set_timer_to_album_length();
};

time_inputs.forEach(elem => {
    elem.addEventListener('input', () => {

        if(!isValidInteger(time_inputs[0].value, 1, 24) && time_inputs[0].value != "" && Number(time_inputs[0].value) != 0) {
            alert("Invalid hour input. Hour should be a whole number between 0 and 24");
            time_inputs[0].value = "";
        }

        if(!isValidInteger(time_inputs[1].value, 1, 60) && time_inputs[1].value != "" && Number(time_inputs[1].value) != 0) {
            alert("Invalid minute input. Minute should be a whole number between 0 and 60");
            time_inputs[1].value = "";
        }

        if(!isValidInteger(time_inputs[2].value, 1, 60) && time_inputs[2].value != "" && Number(time_inputs[2].value) != 0) {
            alert("Invalid second input. Second should be a whole number between 0 and 60");
            time_inputs[2].value = "";
        }

        total_secs = convert_to_secs(time_inputs[0].value, time_inputs[1].value, time_inputs[2].value);
        br_time = Math.ceil(total_secs*BREAK_PERCENT);
        set_timer(br_hr, br_min, br_sec, br_time);
        console.log('total-secs:', total_secs);
        
    })
});

const disable_start_pause_button = (button_text) => {
    start_pause_btn.disabled = true;
    start_pause_btn.textContent = button_text;
    start_pause_btn.style.backgroundColor = disabled_background;
    start_pause_btn.style.color = disabled_text;
    start_pause_btn.style.cursor = 'default';
};

const enable_start_pause_button = (button_text) => {
    start_pause_btn.disabled = false;
    start_pause_btn.style.backgroundColor = main_btn_color;
    start_pause_btn.style.color = enabled_text;
    start_pause_btn.textContent = button_text;
    start_pause_btn.style.cursor = 'pointer';
};

const clear_timer = (hr, min, sec) => {
    hr.textContent = '00';
    min.textContent = '00';
    sec.textContent = '00';
};

const set_timer = (hr_pos, min_pos, sec_pos, curr_time_sec) => {
    const [hr, min, sec] = convert_from_secs(curr_time_sec);
    hr_pos.textContent = String(hr).padStart(2,'0');
    min_pos.textContent = String(min).padStart(2,'0');
    sec_pos.textContent = String(sec).padStart(2,'0');
};

function setProgress(percent) { //set progress of the circular progress bar
    const offset = circumference - (percent / 100) * circumference;
    progress.style.strokeDashoffset = offset;
  }
  
const countdown = () => {
    console.log(time);

    if(time <= 0) {//change to STOPPED state once time is up

        state = STOPPED;

        console.log("Time's up!!");
        start_pause_btn.textContent = "Start";
        stop_btn.textContent = "Set"; //allow to edit 

        //stop decrementing timer
        clear_timer(hr_elem, min_elem, sec_elem);
        clearInterval(intervalID);
        clearInterval(br_intervalID);
        setProgress(100);
    
        setTimeout(() => {
            progress.style.transition = '0s';
        }, 1000);

        time_focused = total_secs - time;

        time = 0;

        //notify users of time over, use dialog box to get time progress input
        toast_elem.className = "show";
        toast_elem.textContent = "Focus time over. Good job!";

        setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);

        var selected_task = document.getElementById("task-selector").options[document.getElementById("task-selector").selectedIndex].text;
        if(selected_task == "Choose a task" || selected_task == "+ Create new task") {
            //if task not chosen, don't prompt for progress
            console.log("Warning: task not chosen");
            task_not_selected_warned = true;
            dbox_noTask_msg.textContent = "Time over! Click \"okay\" to continue.";
            dbox_noTask_okay.textContent = "Okay";
            dbox_noTask.style.display = "block";
        }
        else {
            dbox_elem.style.display = "block";
            dbox_msg.textContent = "Focus time over! \nEstimate your progress percentage between 1 - 100 to save for your session.";
        }

        // To disable:    
        document.getElementById('container-body').style.pointerEvents = 'none';

        task_not_selected_warned = false;
    }
    else {
        set_timer(hr_elem, min_elem, sec_elem, time);

        if(total_secs - time == 1) {
            toast_elem.className = "show";
            toast_elem.textContent = "Focus time started! Don't move to other pages while the timer is running, or the session will end and you will lose your progress.";

            setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 8000);

        }

    }

    let time_percent = Math.ceil(((total_secs-time)/total_secs)*100);
    setProgress(time_percent);
    time--;
};

const br_countdown = () => {
    console.log("break time:" , br_time);

    if (br_time <= 60 && br_time > 0) {

        toast_elem.className = "show";
        toast_elem.textContent = "Less than 1 minute break remaining. Focus time will resume automatically after this.";

    }

    if(br_time <= 0) {
        //stop decrementing timer
        console.log("Break Time over! Focus time running.");
        clear_timer(br_hr, br_min, br_sec);
        clearInterval(br_intervalID);
        br_time = 0;

        if(time > 0) { //resume main timer,set timer in running state -> pause,stop btn
            //notify users
            toast_elem.textContent = "Break over! Timer resumed."
            setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);
            state = RUNNING;

            //disable pause -> no more breaks
            disable_start_pause_button("Pause");

            countdown();//start main countdown again
            intervalID = setInterval(countdown, 1000);
        }
    }
    else {
        set_timer(br_hr, br_min, br_sec, br_time);
    }

    br_time--;
};

dbox_btn_done.addEventListener('click', () => {

    if(!isValidInteger(task_amount.value, 1, 100)){
        alert("Input has to be a whole number between 1 - 100. Try again.");
    }
    else {
        time_focused =total_secs - time;

        stop_btn.textContent = "Set"; //allow to edit 
        disable_start_pause_button("Start");

        //clear timer
        clear_timer(hr_elem, min_elem, sec_elem);
        clear_timer(br_hr, br_min, br_sec);
        time = 0;
        br_time = 0;
        state = STOPPED;
        setProgress(100);
        setTimeout(() => {
            progress.style.transition = '0s';
        }, 1000);

        toast_elem.className = "show";
        toast_elem.textContent = "Focus time over! Your progress has been saved.";

        setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000); 
        task_done_input = Number(task_amount.value);

        saveSession();

        dbox_elem.style.display = "none";
        // To re-enable:
        document.getElementById('container-body').style.pointerEvents = 'auto'; 

        task_not_selected_warned = false;
    }
    
});

dbox_btn_skip.addEventListener('click', () => {
    time_focused =total_secs - time;

    stop_btn.textContent = "Set"; //allow to edit 
    disable_start_pause_button("Start");

    //clear timer
    clear_timer(hr_elem, min_elem, sec_elem);
    clear_timer(br_hr, br_min, br_sec);
    time = 0;
    br_time = 0;
    state = STOPPED;
    setProgress(100);
    setTimeout(() => {
        progress.style.transition = '0s';
    }, 1000);

    toast_elem.className = "show";
    toast_elem.textContent = "Focus time over! Your progress has not been saved.";

    setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);
    dbox_elem.style.display = "none";
    // To re-enable:
    document.getElementById('container-body').style.pointerEvents = 'auto'; 

    task_not_selected_warned = false;

});

dbox_btn_cancel.addEventListener('click', () => {
    // resume timer
    state = RUNNING;
    countdown();//start main countdown again
    intervalID = setInterval(countdown, 1000);
    dbox_elem.style.display = "none";  
    // To re-enable:
    document.getElementById('container-body').style.pointerEvents = 'auto';   
});

dbox_warn_cancel.addEventListener('click', () => {
    dbox_warn.style.display = "none"; 
    // To re-enable:
    document.getElementById('container-body').style.pointerEvents = 'auto';  
});

dbox_warn_okay.addEventListener('click', () => {
    dbox_warn.style.display = "none";   
    // To re-enable:
    document.getElementById('container-body').style.pointerEvents = 'auto';
});

dbox_noTask_cancel.addEventListener('click', () => {
    // resume timer
    state = RUNNING;
    countdown();//start main countdown again
    intervalID = setInterval(countdown, 1000);
    dbox_noTask.style.display = "none";  
    // To re-enable:
    document.getElementById('container-body').style.pointerEvents = 'auto';  
});

dbox_noTask_okay.addEventListener('click', () => {
    time_focused =total_secs - time;

    stop_btn.textContent = "Set"; //allow to edit 
    disable_start_pause_button("Start");

    //clear timer
    clear_timer(hr_elem, min_elem, sec_elem);
    clear_timer(br_hr, br_min, br_sec);
    time = 0;
    br_time = 0;
    state = STOPPED;
    setProgress(100);
    setTimeout(() => {
        progress.style.transition = '0s';
    }, 1000);

    toast_elem.className = "show";
    toast_elem.textContent = "Focus time over! Since a task was not selected, your progress has not been saved.";

    setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);
    dbox_noTask.style.display = "none";
    // To re-enable:
    document.getElementById('container-body').style.pointerEvents = 'auto'; 

    task_not_selected_warned = false;   
});

start_pause_btn.addEventListener('click', () => {
    start_pause_btn.style.backgroundColor = click_color;

    if (state != RUNNING) { //if not running, start

        //enable timer animation transition
        if(total_secs - time <= 1) {
            progress.style.transition = '0.9s';
        }

        main_timer_elem.style.display = "flex";
        setTimeout(() => { //button blink effect
            start_pause_btn.style.backgroundColor = main_btn_color;
        }, 100);

        var selected_task = document.getElementById("task-selector").options[document.getElementById("task-selector").selectedIndex].text;
        console.log(selected_task, total_secs-time, task_not_selected_warned);
        if((selected_task == "Choose a task" || selected_task == "+ Create new task") 
        && time-total_secs <= 0 && !task_not_selected_warned) {
            console.log("Warning: task not chosen");
            task_not_selected_warned = true;
            dbox_warn_msg.textContent = task_warning_message;
            dbox_warn.style.display = "block";
            // To disable:    
            document.getElementById('container-body').style.pointerEvents = 'none';
        }
        else {    
            //set timer in running state -> pause,stop btn
            start_pause_btn.textContent = "Pause";
            start_pause_btn.style.color =  enabled_text;
    
            // setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 1000);
    
            stop_btn.textContent = "Stop";
    
            console.log('AFTER setTimeout()');
    
            //only run when timer is >= 0
            state = RUNNING;
            countdown();//start countdown immediately when clicked
            intervalID = setInterval(countdown, 1000);
    
            clearInterval(br_intervalID);//pause br timer
        }
    } 
    
    else { //if running, paused
        clearInterval(intervalID);
        state = PAUSED;

        start_pause_btn.style.color =  enabled_text;
        stop_btn.textContent = "Stop";

        setTimeout(() => {//button blink effect
            start_pause_btn.style.backgroundColor = main_btn_color;
        }, 100);

        start_pause_btn.textContent = "Resume";

        br_countdown();//start br countdown immediately when clicked
        br_intervalID = setInterval(br_countdown, 1000);

    }

});

stop_btn.addEventListener('click', () => {

    stop_btn.style.backgroundColor = click_color;

    setTimeout(() => {//button blink effect
        stop_btn.style.backgroundColor = main_btn_color;
    }, 100);

    if (state == STOPPED) {//button=set, timer-input = OFF
        //set state to set
        //turn input fields on
        console.log('State: EDIT');
        state = EDIT;
        stop_btn.textContent = "Done";

        disable_start_pause_button("Start");

        if(album_sec > 0) {
            set_timer_to_album_length();
        }
        else {
            total_secs = convert_to_secs(time_inputs[0].value, time_inputs[1].value, time_inputs[2].value);
            br_time = total_secs*BREAK_PERCENT;
            set_timer(br_hr, br_min, br_sec, br_time);
        }


        main_timer_elem.style.display = "none";
        time_input_elem.style.display = "flex";
    }
    else if (state == EDIT) {//button=done, timer-input = ON
        //check if input is done
        //get inputs
        //if done:  state

        progress.style.transition = '0.9s';
        console.log('State: READY');
        state = READY;
        setProgress(0);

        stop_btn.textContent = "Edit"; //allow to edit after input

        main_timer_elem.style.display = "flex";
        time_input_elem.style.display = "none";
        //input field disappears, and main field appears with set time
        time = total_secs;
        br_time = BREAK_PERCENT*time;

        // set main time
        set_timer(hr_elem, min_elem, sec_elem, time);

        //set break time
        set_timer(br_hr, br_min, br_sec, br_time);

        enable_start_pause_button("Start");

    }
    else if (state == READY) {// after clicking done, left button = start, right = set -> if clicked, right becomes done
        state = EDIT;
        stop_btn.textContent = "Done";
        main_timer_elem.style.display = "none";
        time_input_elem.style.display = "flex";

        disable_start_pause_button("Start");

        console.log('State: EDIT');

    }
    else {
        //stop timer
        state = PAUSED; //set to stop when user confirms

        console.log('AFTER pause(for stop confirmation) timer');

        clearInterval(intervalID);
        clearInterval(br_intervalID);

        time_focused =total_secs - time;

        var selected_task = document.getElementById("task-selector").options[document.getElementById("task-selector").selectedIndex].text;
        if(selected_task == "Choose a task" || selected_task == "+ Create new task") {
            //if task not chosen, don't prompt for progress
            console.log("Warning: task not chosen");
            task_not_selected_warned = true;
            dbox_noTask_msg.textContent = "Are you sure you wish to end the session early?";
            dbox_noTask_okay.textContent = "Yes";
            dbox_noTask.style.display = "block";
        }
        else {
            dbox_elem.style.display = "block";
            dbox_msg.textContent = "Focus time over! \nType in a value between 1 - 100 to save your progress as percentage.";
        }
        
        // To disable everything other than the pop-up:    
        document.getElementById('container-body').style.pointerEvents = 'none';
        
        // Use '' if you want to allow CSS rules to set the value
    }

});

// $('*:not(#search)').click(function(e){
//     e.preventDefault();
//   });