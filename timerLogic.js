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

var time = 59;

let intervalID = null;

const RUNNING = 0;
const PAUSED = 1;
const STOPPED = 2;

let state = STOPPED; 

start_pause_btn.addEventListener('click', () => {
    if (state != RUNNING) { //if not running, start
        start_pause_btn.style.backgroundColor = 'blue';
        start_pause_btn.textContent = "Start";

        setTimeout(() => {
            start_pause_btn.style.backgroundColor = 'crimson';
            start_pause_btn.textContent = "Pause";
        }, 100);

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

    console.log('AFTER stop timer');

    //stop decrementing timer
    hr_elem.textContent = '00';
    min_elem.textContent = '00';
    sec_elem.textContent = '00';

    clearInterval(intervalID);
    state = STOPPED;

    start_pause_btn.disabled = true

    time = 0;

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


