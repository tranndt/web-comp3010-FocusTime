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

//timer states
const RUNNING = 0;
const PAUSED = 1;
const STOPPED = 2;
const EDIT = 3;
const READY = 4;

//button colors
const disabled_background = 'rgb(238, 225, 218)';
const disabled_text = "rgb(158, 150, 147)";
const enabled_text = "rgb(54, 38, 30)";
const main_btn_color = 'rgb(238, 185, 161)';
const click_color = 'rgb(173, 72, 35)';

//initial state
let state = STOPPED;
start_pause_btn.disabled = true;
time_input_elem.style.display = "none";
stop_btn.style.backgroundColor = main_btn_color;
start_pause_btn.style.backgroundColor = disabled_background;
start_pause_btn.style.color = disabled_text;
start_pause_btn.style.cursor = 'default';

var album_sec = -1;

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


    if(state != EDIT) {
        enable_start_pause_button("Start");
    }
    else {
        disable_start_pause_button("Start");
    }

};

const set_album_length = (album_sec_stored) => {
    console.log('album_sec', album_sec_stored);
    album_sec = album_sec_stored;
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
        br_time = total_secs*BREAK_PERCENT;
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
            setProgress(0);
        }, 1000);

        time_focused = total_secs - time;

        time = 0;

        //notify users of time over, use dialog box to get time progress input
        toast_elem.className = "show";
        toast_elem.textContent = "Focus time over. Good job!";

        setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);

        dbox_elem.style.display = "block";
        dbox_msg.textContent = "Focus time over! \nType in a value between 1 - 100 to save your progress as percentage.";
        // To disable:    
        // document.getElementById('container-body').style.pointerEvents = 'none';
    }
    else {
        set_timer(hr_elem, min_elem, sec_elem, time);
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
            toast_elem.textContent = "Break Over! Focus time resumed."
            setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);
            state = RUNNING;

            //disable pause -> no more breaks
            disable_start_pause_button("No break left!");

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
        setProgress(0);

        toast_elem.className = "show";
        toast_elem.textContent = "Focus time over. Good job! Your progress is saved.";

        setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 2000); 
        task_done_input = Number(task_amount.value);
        if (typeof(Storage) !== "undefined") {
            // Store to for sessionStorage
            sessionStorage.setItem("task_done", task_done_input);
            sessionStorage.setItem("time_focused", time_focused);
        } else {
            // Sorry! No Web Storage support..
        }
        dbox_elem.style.display = "none";
        // To re-enable:
        // document.getElementById('container-body').style.pointerEvents = 'auto'; 
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
    setProgress(0);

    toast_elem.className = "show";
    toast_elem.textContent = "Focus time over. Good job! Progress not saved.";

    setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 2000);
    dbox_elem.style.display = "none";
    // To re-enable:
    // document.getElementById('container-body').style.pointerEvents = 'auto'; 

});

dbox_btn_cancel.addEventListener('click', () => {
    // resume timer
    state = RUNNING;
    countdown();//start main countdown again
    intervalID = setInterval(countdown, 1000);
    dbox_elem.style.display = "none";  
    // To re-enable:
    // document.getElementById('container-body').style.pointerEvents = 'auto';   
});

start_pause_btn.addEventListener('click', () => {
    start_pause_btn.style.backgroundColor = click_color;

    if (state != RUNNING) { //if not running, start

        main_timer_elem.style.display = "flex";

        setTimeout(() => { //button blink effect
            start_pause_btn.style.backgroundColor = main_btn_color;
        }, 100);

        //set timer in running state -> pause,stop btn
        start_pause_btn.textContent = "Pause";
        start_pause_btn.style.color =  enabled_text;

        setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 1000);

        stop_btn.textContent = "Stop";

        console.log('AFTER setTimeout()');

        //only run when timer is >= 0
        state = RUNNING;
        countdown();//start countdown immediately when clicked
        intervalID = setInterval(countdown, 1000);

        clearInterval(br_intervalID);//pause br timer

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
        console.log('State: READY');
        state = READY;
        stop_btn.textContent = "Set"; //allow to edit after input

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

        dbox_elem.style.display = "block";
        dbox_msg.textContent = "Focus time over! \nType in a value between 1 - 100 to save your progress as percentage.";
        
        // To disable everything other than the pop-up:    
        // document.getElementById('container-body').style.pointerEvents = 'none';
        
        // Use '' if you want to allow CSS rules to set the value
    }

});

// $('*:not(#search)').click(function(e){
//     e.preventDefault();
//   });