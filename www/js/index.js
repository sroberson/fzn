var myMedia = null;
var mediaTimer;

document.addEventListener('deviceready', onDeviceReady, false);

function getMediaURL(s) {
    if(device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
    return s;
}

function playAudio() {

    myMedia.play();
    document.getElementById('play').style.display = "none";

    // } else {
    //     myMedia.pause();
    //     document.getElementById('play').innerHTML = "Play";
    //     document.getElementById('audio_position').innerHTML = "0.000 sec";
    //     playing = false;
    }
}

function stopAudio() {
    myMedia.stop();
    // myMedia.release();
    clearInterval(mediaTimer);
    document.getElementById('play').style.display = "block";
    document.getElementById('audio_position').innerHTML = "0.000 sec";
}

function mediaError(e) {
    alert('Media Error');
    alert(JSON.stringify(e));
}

function updateMedia(src) {
    // Clean up old file
    if (myMedia != null) {
        myMedia.release();
    }

    // Get the media file
    var mp3URL = getMediaURL("sounds/fzn15.mp3");
    myMedia = new Media(mp3URL, stopAudio, mediaError);

    // Update media position every second
    mediaTimer = setInterval(function() {
        // get media position
        myMedia.getCurrentPosition(
            // success callback
            function(position) {
                if (position > -1) {
                    document.getElementById('audio_position').innerHTML = position + " sec";
                }
            },
            // error callback
            function(e) {
                console.log("Error getting position = " + e);
            }
        );
    }, 1000);
}

function setAudioPosition(position) {
   document.getElementById('audio_position').innerHTML = position;
}
function onDeviceReady() {
    updateMedia();
    document.querySelector("#play").addEventListener("touchend", playAudio, false);
	document.querySelector("#stop").addEventListener("touchend", stopAudio, false);
};

