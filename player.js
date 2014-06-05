var maxLeft = 10;
var maxRight = 20;
var initStep = -5;

var playing = false;
var playingData = [];
var playingStep = initStep;
var playingTick = 100;

function getMainWidth() {
    var result = data_main.clientWidth / data_main.clientHeight;
    alert(result);
    return result && result > 0.5 ? result : 0.5;
}

function playExec(data, step) { // Return next tick rate
    if (step >= data.length) return 0;

    var lText = '';
    var mText = '';
    var xText = '';
    var rText = '';

    for (var i = Math.max(0, step - maxLeft); i < Math.min(data.length, step); ++i) {
        lText += data[i][0];
    }

    if (step >= 0) {
        mText = data[step][0];
    } else {
        for (var i = step; i < 0; ++i) mText += '.';
    }

    for (var i = Math.max(0, step + 1); i < Math.min(data.length, step + maxRight); ++i) {
        rText += data[i][0];
    }

    if (step >= 0) {
        xText += rText.substring(0, data[step][1]);
        rText = rText.substring(data[step][1]);
    }

    data_left.innerHTML = '';
    data_main.innerHTML = '';
    data_main_extra.innerHTML = '';
    data_right.innerHTML = '';

    data_left.appendChild(document.createTextNode(lText));
    data_main.appendChild(document.createTextNode(mText));
    data_main_extra.appendChild(document.createTextNode(xText));
    data_right.appendChild(document.createTextNode(rText));

    return getMainWidth();
}

function playTimer() {
    var tickRate = 1;

    if (playing) {
        tickRate = playExec(playingData, playingStep);

        if (tickRate) {
            playingStep++;
        } else {
            playing = false;
            playingStep = initStep;
        }
    }

    setTimeout(playTimer, tickRate * playingTick);
}

function playLoad(data, step, init) {
    playingData = data;
    playingStep = init ? initStep : step;
    playExec(playingData, playingStep);
}

function playStartPause() {
    playing = !playing;
}

playTimer();
