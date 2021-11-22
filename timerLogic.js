// 1: 20: 50

const input_hr = 1;
const input_min = 20;
const input_sec = 50;

const convert_to_secs = (input_hr, input_min, input_sec) => {
    return input_hr*60*60 + input_min*60 + input_sec;
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
const start_pause_btn = document.querySelector('#start-pause');
const stop_btn = document.querySelector('#stop');
const time_input_elem = document.querySelector('#input-time');
const main_timer_elem = document.querySelector('#timer-set'); //main timer


var time = 0; //in seconds

let intervalID = null;

//timer states
const RUNNING = 0;
const PAUSED = 1;
const STOPPED = 2;
const EDIT = 3;
const READY = 4;

//initial state
let state = STOPPED;
start_pause_btn.disabled = true;
// main_timer_elem.style.visibility = "hidden";
main_timer_elem.style.display = "none";


start_pause_btn.addEventListener('click', () => {
    if (state != RUNNING) { //if not running, start
        start_pause_btn.style.backgroundColor = 'blue';
        start_pause_btn.textContent = "Start";
        main_timer_elem.style.display = "flex";

        setTimeout(() => {
            start_pause_btn.style.backgroundColor = 'crimson';
            start_pause_btn.textContent = "Pause";
        }, 100);

        stop_btn.textContent = "Stop";

        console.log('AFTER setTimeout()');

        //only run when timer is >= 0
        state = RUNNING;
        intervalID = setInterval(f, 1000);
    } 
    
    else { //if running, paused
        clearInterval(intervalID);
        state = PAUSED;

        start_pause_btn.style.backgroundColor = 'blue';
        start_pause_btn.textContent = "Pause";
        stop_btn.textContent = "Stop";

        setTimeout(() => {
            start_pause_btn.style.backgroundColor = 'crimson';
            start_pause_btn.textContent = "Resume";
        }, 100);

    }

});

stop_btn.addEventListener('click', () => {

    stop_btn.style.backgroundColor = 'blue';

    setTimeout(() => {
        stop_btn.style.backgroundColor = 'crimson';
    }, 100);


    if (state == STOPPED) {//button=set, timer-input = OFF
        //set state to set
        //turn input fields on
        console.log('State: EDIT');
        state = EDIT;
        stop_btn.textContent = "Done";
        
        start_pause_btn.disabled = true;
        start_pause_btn.textContent = "Start";
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
        time = 20;
        start_pause_btn.disabled = false;
        start_pause_btn.textContent = "Start";

    }
    else if (state == READY) {
        state = EDIT;
        stop_btn.textContent = "Done";
        main_timer_elem.style.display = "none";
        time_input_elem.style.display = "flex";

        start_pause_btn.disabled = true;
        start_pause_btn.textContent = "Start";

        console.log('State: EDIT');

    }
    else {
        //stop timer
        state = STOPPED;
        stop_btn.textContent = "Set"; //allow to edit 

        start_pause_btn.disabled = true;
        start_pause_btn.textContent = "Start";

        console.log('AFTER stop timer');

        //stop decrementing timer
        hr_elem.textContent = '00';
        min_elem.textContent = '00';
        sec_elem.textContent = '00';

        clearInterval(intervalID);
        state = STOPPED;

        time = 0;
    }

});

const f = () => {
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
    }
    else {
        hr_elem.textContent = String(hr).padStart(2,'0');
        min_elem.textContent = String(min).padStart(2,'0');
        sec_elem.textContent = String(sec).padStart(2,'0');
    }

    
    time--;
};


