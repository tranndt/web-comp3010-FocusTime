// 1: 20: 50
const input_hr = 1;
const input_min = 20;
const input_sec = 50;
const BREAK_PERCENT = 0.25;

const convert_to_secs = (input_hr, input_min, input_sec) => {
    return Number(input_hr)*60*60 + Number(input_min)*60 + Number(input_sec);
};

var album_sec = -1;
const set_album_length = (album_sec) => {
    console.log('album_sec', album_sec);
};

const convert_from_secs = (input_sec) => {
    const sec = input_sec % 60;
    const minFromSec = Math.floor(input_sec / 60);
    const min = minFromSec % 60;
    const hr = Math.floor(minFromSec / 60);
    return [hr, min, sec];
};

const test1 = convert_to_secs(input_hr,input_min, input_sec);
console.log('test1', test1);

const test2 = convert_from_secs(test1);
console.log(`test2: [hr:min:sec] ${test2[0]} : ${test2[1]} : ${test2[2]}`);

//--------------------------------------------------------

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
console.log(radius);


var total_secs = null;

console.log(time_inputs);

time_inputs.forEach(elem => {
    // elem.value = 0;
    elem.addEventListener('input', () => {
        total_secs = convert_to_secs(time_inputs[0].value, time_inputs[1].value, time_inputs[2].value);
        console.log('total-secs:', total_secs);
    })
});


var time = 0; //in seconds, time left
var br_time = 0;

let intervalID = null; //countdown interval
let br_intervalID = null; //countdown interval


// let intervalID = null; //countdown interval

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
timer_set = false;
let state = STOPPED;
start_pause_btn.disabled = true;
time_input_elem.style.display = "none";
stop_btn.style.backgroundColor = main_btn_color;
start_pause_btn.style.backgroundColor = disabled_background;
start_pause_btn.style.color = disabled_text;
start_pause_btn.style.cursor = 'default';

start_pause_btn.addEventListener('click', () => {
    start_pause_btn.style.backgroundColor = click_color;

    if (state != RUNNING) { //if not running, start

        main_timer_elem.style.display = "flex";

        setTimeout(() => {
            start_pause_btn.style.backgroundColor = main_btn_color;
        }, 100);

        //set timer in running state -> pause,stop btn
        start_pause_btn.textContent = "Pause";
        start_pause_btn.style.color =  enabled_text;

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

        // start_pause_btn.textContent = "Pause";
        start_pause_btn.style.color =  enabled_text;
        stop_btn.textContent = "Stop";

        setTimeout(() => {
            start_pause_btn.style.backgroundColor = main_btn_color;
        }, 100);

        start_pause_btn.textContent = "Resume";

        br_countdown();//start br countdown immediately when clicked
        br_intervalID = setInterval(br_countdown, 1000);


    }

});

stop_btn.addEventListener('click', () => {

    stop_btn.style.backgroundColor = click_color;

    setTimeout(() => {
        stop_btn.style.backgroundColor = main_btn_color;
    }, 100);



    if (state == STOPPED) {//button=set, timer-input = OFF
        //set state to set
        //turn input fields on
        timer_set = true;
        console.log('State: EDIT');
        state = EDIT;
        stop_btn.textContent = "Done";
        
        start_pause_btn.disabled = true;
        start_pause_btn.style.backgroundColor = disabled_background;
        start_pause_btn.style.color = disabled_text;
        start_pause_btn.textContent = "Start";
        start_pause_btn.style.cursor = 'default';

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

        if (timer_set == true) {
            time = total_secs;
        }
        else 
        
        br_time = BREAK_PERCENT*time;
        // set main time
        const [hr, min, sec] = convert_from_secs(time);
        hr_elem.textContent = String(hr).padStart(2,'0');
        min_elem.textContent = String(min).padStart(2,'0');
        sec_elem.textContent = String(sec).padStart(2,'0');

        //set break time
        const [br_hr_val, br_min_val, br_sec_val] = convert_from_secs(br_time);
        br_hr.textContent = String(br_hr_val).padStart(2,'0');
        br_min.textContent = String(br_min_val).padStart(2,'0');
        br_sec.textContent = String(br_sec_val).padStart(2,'0');

        start_pause_btn.disabled = false;
        start_pause_btn.style.backgroundColor = main_btn_color;
        start_pause_btn.style.color = enabled_text;
        start_pause_btn.textContent = "Start";
        start_pause_btn.style.cursor = 'pointer';

    }
    else if (state == READY) {
        state = EDIT;
        stop_btn.textContent = "Done";
        main_timer_elem.style.display = "none";
        time_input_elem.style.display = "flex";

        start_pause_btn.disabled = true;
        start_pause_btn.textContent = "Start";
        start_pause_btn.style.backgroundColor = disabled_background;
        start_pause_btn.style.color = disabled_text;
        start_pause_btn.style.cursor = 'default';

        console.log('State: EDIT');

    }
    else {
        //stop timer
        state = STOPPED;
        stop_btn.textContent = "Set"; //allow to edit 

        start_pause_btn.disabled = true;
        start_pause_btn.textContent = "Start";
        start_pause_btn.style.backgroundColor = disabled_background;
        start_pause_btn.style.color = disabled_text;
        start_pause_btn.style.cursor = 'default';

        console.log('AFTER stop timer');

        //stop decrementing timer
        hr_elem.textContent = '00';
        min_elem.textContent = '00';
        sec_elem.textContent = '00';

        //reset break timer
        br_hr.textContent = '00';
        br_min.textContent = '00';
        br_sec.textContent = '00';

        clearInterval(intervalID);
        clearInterval(br_intervalID);
        setProgress(0);
        state = STOPPED;

        time = 0;
        br_time = 0;
    }

});


function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  progress.style.strokeDashoffset = offset;
}

const countdown = () => {
    console.log(time);

    const [hr, min, sec] = convert_from_secs(time);

    if (time === 0) {
        console.log("Time's up!!");
        start_pause_btn.textContent = "Start";
    }
    if(time <= 0) {
        hr_elem.textContent = '00';
        min_elem.textContent = '00';
        sec_elem.textContent = '00';

        //stop decrementing timer
        clearInterval(intervalID);
        clearInterval(br_intervalID);
        setProgress(0);
    }
    else {
        hr_elem.textContent = String(hr).padStart(2,'0');
        min_elem.textContent = String(min).padStart(2,'0');
        sec_elem.textContent = String(sec).padStart(2,'0');
    }

    let time_percent = Math.ceil(((total_secs-time)/total_secs)*100);
    setProgress(time_percent);
    time--;
    if (time == -1) {//change to STOPPED state once time is up
        //stop timer
        state = STOPPED;
        stop_btn.textContent = "Set"; //allow to edit 

        start_pause_btn.disabled = true;
        start_pause_btn.textContent = "Start";
        start_pause_btn.style.backgroundColor = disabled_background;
        start_pause_btn.style.color = disabled_text;
        start_pause_btn.style.cursor = 'default';

        console.log('AFTER stop timer');

        //stop decrementing timer
        hr_elem.textContent = '00';
        min_elem.textContent = '00';
        sec_elem.textContent = '00';

        clearInterval(intervalID);
        clearInterval(br_intervalID);
        setProgress(100);
        state = STOPPED;
        setTimeout(() => {
            setProgress(0);
        }, 1000);

        time = 0;
    }
};

const br_countdown = () => {
    console.log("break time:" , br_time);

    const [br_hr_val, br_min_val, br_sec_val] = convert_from_secs(br_time);

    if (br_time === 0) {
        console.log("Break Time over! Focus time running.");
    }

    if (br_time === 60) {
        console.log("1 minute break remaining. Focus time will resume automatically after this.");
    }
    if(br_time <= 0) {
        br_hr.textContent = '00';
        br_min.textContent = '00';
        br_sec.textContent = '00';

        //stop decrementing timer
        clearInterval(br_intervalID);
    }
    else {
        br_hr.textContent = String(br_hr_val).padStart(2,'0');
        br_min.textContent = String(br_min_val).padStart(2,'0');
        br_sec.textContent = String(br_sec_val).padStart(2,'0');
    }

    br_time--;
    if (br_time == -1) {//change to STOPPED state once time is up
        
        console.log('AFTER stop break timer');

        //stop decrementing timer
        br_hr.textContent = '00';
        br_min.textContent = '00';
        br_sec.textContent = '00';

        clearInterval(br_intervalID);
        br_time = 0;
    }
};


