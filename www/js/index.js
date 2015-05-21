document.addEventListener('deviceready', onDeviceReady, false);

function playFZN() {
    var mp3URL = getMediaURL("sounds/fzn15.mp3");
    var media = new Media(mp3URL, null, mediaError);
    media.play();
}

function getMediaURL(s) {
    if(device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
    return s;
}

function mediaError(e) {
    alert('Media Error');
    alert(JSON.stringify(e));
}

function onDeviceReady() {
    playFZN();
	document.querySelector("#playFZN").addEventListener("touchend", playFZN, false);
};

