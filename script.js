
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
	    "track1":["Ghost", "ghost"],
		"track2":["Heart In Pieces", "heart_in_pieces"],
		"track3":["Way 2 Sexy", "way_2_sexy"],
        "track4":["Under Pressure", "under_pressure"],
        "track5":["Lose Somebody", "lose_somebody"]
	};
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
	}
	audio.addEventListener("ended",function(){
	    document.getElementById(playingtrack).style.background = "url(assets/playButton.svg)";
		playingtrack = "";
		is_playing = false;
	});
	function switchTrack(event){
		if(is_playing){
		    if(playingtrack != event.target.id){
			    is_playing = true;
				document.getElementById(playingtrack).style.background = "url(assets/playButton.svg)";
			    event.target.style.background = "url(assets/pauseButton.svg)";
			    audio.src = audio_folder+event.target.id+audio_ext;
	            audio.play();
			} else {
			    audio.pause();
			    is_playing = false;
				event.target.style.background = "url(assets/playButton.svg)";
			}
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
}
window.addEventListener("load", audioApp);