var maxLeft = 10;
var maxRight = 20;
var initStep = -10;

var playing = false;
var playingData = [];
var playingStep = initStep;
var playingTick = 100;

function playExec(data, step) {
    if (step >= data.length) return false;
    if (step < 0) step = 0;

    var lText = '';
    var mText = '';
    var rText = '';

    for (var i = Math.max(0, step - maxLeft); i < step; ++i) {
        lText += data[i][0];
    }

    mText = data[step][0];

    for (var i = step + 1; i < Math.min(data.length, step + maxRight); ++i) {
        rText += data[i][0];
    }

    mText += rText.substring(0, data[step][1]);
    rText = rText.substring(data[step][1]);

    data_left.innerHTML = '';
    data_main.innerHTML = '';
    data_right.innerHTML = '';

    data_left.appendChild(document.createTextNode(lText));
    data_main.appendChild(document.createTextNode(mText));
    data_right.appendChild(document.createTextNode(rText));

    return true;
}

function playTimer() {
    if (playing) {
        if (playExec(playingData, playingStep)) {
            playingStep++;
        } else {
            playing = false;
            playingStep = initStep;
        }
    }

    setTimeout(playTimer, playingTick);
}

function playLoad(data, step, init) {
    playingData = data;
    playingStep = step;
    playExec(playingData, init ? initStep : playingStep);
}

function playStartPause() {
    playing = !playing;
}

playTimer();
