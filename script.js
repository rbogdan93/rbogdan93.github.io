var lookupTable = [
	"none",
	"sustain",
	"G3",
	"Ab4",
	"A4",
	"Bb4",
	"B4",
	"C4",
	"Db4",
	"D4",
	"Eb4",
	"E4",
	"F4",
	"Gb4",
	"G4",
	"Ab5",
	"A5",
	"Bb5",
	"B5",
	"C5",
	"Db5",
	"D5",
	"Eb5",
	"E5",
	"F5",
	"Gb5",
	"G5"
];

var notes = [];

function initializeNotes() {
	for (var i = 0; i < 16; ++i) {
		notes[i] = lookupTable[0];
	}
}

var state;

function playSound(soundObj) {
  var sound = $("#audio")[0];
  sound.src = soundObj + ".mp3";
  sound.play();
}

function stopSound() {
  var sound = $("#audio")[0];
  if (!sound.paused) {
  	  sound.pause();
	  // sound.fastSeek(0);
	  sound.currentTime = 0;
	}
}

var stillPlaying = false;

function startPlaying() {
	stillPlaying = true;
	$("#play")[0].value = "\u25FC";
	setTimeout(function() { playNotes(0); }, 1);
}

function stopPlaying() {
	stillPlaying = false;
	$("#play")[0].value = "\u25BA";
	$('.slider').css('background-color', 'white');
	stopSound();
}

function playNotes(index) {
	if (stillPlaying) {
		if(index >= notes.length) {
			stopPlaying();
			return;
		}
		var currentNote = notes[index];
		setTimeout(function() { playNotes(index + 1); }, 250);
		// $("#note" + (index + 1).toString()).css('background-color', 'red');
		$("#note" + (index + 1).toString()).effect('bounce', {times:2}, 250);

		if (currentNote == "sustain") {

		} else if (currentNote == "none") {
			stopSound();
		} else {
			stopSound();
			playSound(notes[index]);
		}
	}
}

$(document).ready(function() {
	initializeNotes();

    $(".slider").slider({
    	change: function(event, ui) {
    		// playSound("ping");
    		var sliderID = this.id.match(/\d+/);
    		var changedNote = ui.value;
    		notes[sliderID - 1] = lookupTable[changedNote];
    	},
    	start: function(event, ui) {
    		var handle = $(this).find('.ui-slider-handle');
    		handle.css('background-color', 'red');
    	},
    	slide: function(event, ui) {
    		var handle = $(this).find('.ui-slider-handle');
    		var sliderID = this.id.match(/\d+/);
    		var changedNote = ui.value;

    		notes[sliderID - 1] = lookupTable[changedNote];
    		handle.css('background-color', 'red');
    		handle.text(lookupTable[changedNote]);
    	},
    	stop: function(event, ui) {
    		var handle = $(this).find('.ui-slider-handle');
    		var sliderID = this.id.match(/\d+/);
    		var changedNote = ui.value;
    		handle.css('background-color', 'white');
    		if (! (lookupTable[changedNote] == 'none' || lookupTable[changedNote] == 'sustain')) {
    			playSound(lookupTable[changedNote]);
    			setTimeout(function() { stopSound(); }, 250);
    		}
    		
    	},
        orientation: "vertical",
        step: 1,
        min: 0,
        max: 26
    });
    $(".slider").each(function(index, element) {
    	var handle = $(this).find(".ui-slider-handle");
    	handle.text("none");
    });
     $("#play").click(function() {
    	if (!stillPlaying) {
	    	startPlaying();
	    } else {
	    	stopPlaying();
	    }
    });
});
