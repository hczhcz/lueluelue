var maxLeft = 10;
var maxRight = 20;
var initStep = -5;

var playing = false;
var playingText = '';
var playingData = [];
var playingStep = initStep;

var parseFunc = parse;

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

    return (step >= 0) ? data[step][2] : 0.5;
}

function playTimer() {
    var tickRate;

    if (playing) {
        tickRate = playExec(playingData, playingStep);

        if (tickRate) {
            playingStep++;
        } else {
            playing = false;
            playingStep = initStep;
            tickRate = 1;
        }
    } else {
        tickRate = 1;
    }

    setTimeout(playTimer, tickRate * input_tick.value);
}

function playLoad(text, step, init) {
    playingText = text;
    playingData = parseFunc(text);
    playingStep = init ? initStep : step;
    playExec(playingData, playingStep);
}

function playStartPause() {
    if (playing) {
        playing = false;
    } else if (input_text.value != playingText && input_text.value != '') {
        playLoad(input_text.value, 0, true);
    } else {
        playing = true;
    }
}

playTimer();
