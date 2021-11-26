
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

// http://www.developphp.com/video/JavaScript/Audio-Playlist-Play-Buttons-JavaScript-Programming-Tutorial 
function audioApp(){
	var audio = new Audio();
	var audio_folder = "audio/";
	var audio_ext = ".mp3";
	var audio_index = 1;
	var is_playing = false;
	var playingtrack;
	var trackbox = document.getElementById("trackbox");
	var tracks = {
	    0:["Ghost", "ghost"],
		1:["Heart In Pieces", "heart_in_pieces"],
		2:["Way 2 Sexy", "way_2_sexy"],
        3:["Under Pressure", "under_pressure"],
        4:["Lose Somebody", "lose_somebody"],
	};
	const keys = Object.keys(tracks);
	var audio_tracker = 0;
	var audio_max_tracks = 0;
	for(var track in tracks){
		var tb = document.createElement("div");
		var pb = document.createElement("button");
		var tn = document.createElement("div");
		tb.className = "trackbar";
		pb.className = "playbutton";
		tn.className = "trackname";
		tn.innerHTML = audio_index+". "+tracks[track][0];
		pb.id = tracks[track][1];
		pb.addEventListener("click", switchTrack);
		tb.appendChild(pb);
		tb.appendChild(tn);
		trackbox.appendChild(tb);
		audio_index++;
		audio_max_tracks++;
	}
	audio.addEventListener("ended",nextTrack);
  	var mutebtn = document.getElementById("mutebutton"); 
	mutebtn.addEventListener("click", mute);
	var sd = document.getElementById("volumeslider");
	sd.addEventListener("input",setVolume);

	// create a function that calculates the total length of the song queue (album)
	
	function nextTrack() {
		// reset the button display after the track finishes 
		document.getElementById(playingtrack).style.background = "url(assets/playButton.svg)";
		// counter which keeps track of which track user is on and which track to play next
		if (audio_tracker < audio_max_tracks - 1) {
			audio_tracker++;
			playingtrack = tracks[audio_tracker][1];
			document.getElementById(playingtrack).style.background = "url(assets/pauseButton.svg)";
			audio.src = audio_folder+playingtrack+audio_ext;
	        audio.play();
		}
  		else {
		  	playingtrack = "";
		  	is_playing = false;
		}
	}
	function switchTrack(event){
		setVolume();
		// case where user switches tracks while one is already playing
		if(is_playing){
			// if current playing track does not equal the next chosen track
		    if(playingtrack != event.target.id){
			    is_playing = true;
				document.getElementById(playingtrack).style.background = "url(assets/playButton.svg)";
			    event.target.style.background = "url(assets/pauseButton.svg)";
			    audio.src = audio_folder+event.target.id+audio_ext;
				// keeping track of which track number we are currently at
				for(var key in keys) {
					if(tracks[key][1] == event.target.id)
						audio_tracker = key;
				}
	            audio.play();
			} else {
			    audio.pause();
			    is_playing = false;
				event.target.style.background = "url(assets/playButton.svg)";
			}
		// case where user chooses a track while nothing is playing
		} else {
			is_playing = true;
			event.target.style.background = "url(assets/pauseButton.svg)";
			if(playingtrack != event.target.id){
				audio.src = audio_folder+event.target.id+audio_ext;
			}
	        audio.play();
		}
		playingtrack = event.target.id;
	}
  	function mute() {
		if(audio.muted){
		    audio.muted = false;
		    mutebtn.style.background = "url(assets/volume.svg) no-repeat";
	    } else {
		    audio.muted = true;
		    mutebtn.style.background = "url(assets/muteVolume.svg) no-repeat";
	    }
	}	
	function setVolume() {
		audio.volume = sd.value / 100;
	}
}
window.addEventListener("load", audioApp);