if (!String.prototype.toHHMMSS) {
    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0" + hours;}
        if (minutes < 10) {minutes = "0" + minutes;}
        if (seconds < 10) {seconds = "0" + seconds;}
        var time    = hours + ':' + minutes + ':' + seconds;
        return time;
    }
}

var myMedia = null;
var playing = false;
var mediaTimer;

document.addEventListener('deviceready', onDeviceReady, false);

function getMediaURL(s) {
    if(device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
    return s;
}

function playAudio() {
    if (!playing) {

        if (!mediaTimer) {
            updateMedia();
        }

        myMedia.play();
        document.getElementById('play').innerHTML = "Pause";
        playing = true;
    } else {
        myMedia.pause();
        document.getElementById('play').innerHTML = "Play";
        playing = false;
    }
}

function stopAudio() {
    myMedia.stop();
    clearInterval(mediaTimer);
    playing = false;
    document.getElementById('play').innerHTML = "Play";
    document.getElementById('audio_position').innerHTML = "0.000 sec";
}

function mediaError(e) {
    console.log('Media Error');
    console.log(JSON.stringify(e));
}

function updateMedia(src) {

    var positionVal;

    // Clean up old file
    if (myMedia != null) {
        myMedia.release();
    }

    // Get the media file
    var mp3URL = getMediaURL("sounds/fzn15.mp3");
    // var mp3URL = getMediaURL("sounds/zrrp.mp3");
    myMedia = new Media(mp3URL, stopAudio, mediaError);

    // Update media position every second
    mediaTimer = setInterval(function() {
        // get media position
        myMedia.getCurrentPosition(
            // success callback
            function(position) {
                if (position > -1) {
                    //document.getElementById('audio_position').innerHTML = Math.round(position) + " seconds";
                    positionVal = Math.round(position);
                    positionVal = positionVal + "";
                    //console.log(positionVal.toHHMMSS());
                    document.getElementById('audio_position').innerHTML = positionVal.toHHMMSS();
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
    playAudio();
    document.querySelector("#play").addEventListener("touchend", playAudio, false);
	document.querySelector("#stop").addEventListener("touchend", stopAudio, false);
};

