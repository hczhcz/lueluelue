/*
    Lue~Lue~Lue~ Reading Accelerator
    By HCZ
*/

function exampleData() {
    // [data, extra_highlighted, time]
    return [
        ['今天', 0, 2],
        ['我', 2, 1],
        ['没有', 0, 2],
        ['吃药', 1, 2],
        ['，', 0, 1],
        ['感觉', 0, 2],
        ['萌', 2, 1],
        ['萌', 1, 1],
        ['哒', 1, 1],
        ['！', 0, 1]
    ]
}

function parse_1(data) {
    var result = [['\u00a0', 0, 0.5]];
    var tail = 0;
    var pre ='s';

    for (i in data) { // stat: ?wdcfbs
        var stat = '?';
        var long = (data[i].charCodeAt() >= 256);
        var time = long ? 1 : 0.5;
        stat = long ? 'c' : stat;
        stat = (data[i] >= 'A' && data[i] <= 'Z') ? 'w' : stat;
        stat = (data[i] >= 'a' && data[i] <= 'z') ? 'w' : stat;
        stat = ('0123456789０１２３４５６７８９'.search(data[i]) > 0) ? 'd' : stat;
        stat = ('<([{`$＜（［｛｀《（‘“￥€￡№'.search(data[i]) > 0) ? 'f' : stat;
        stat = ('>)]}\'":;,.?!%-＞）］｝＇＂：；，．？！％－》）’”：；，。、？！…—～°℃'.search(data[i]) > 0) ? 'b' : stat;
        stat = (' \t\r\n'.search(data[i]) > 0) ? 's' : stat;

        switch (stat) {
            case '?':
            case 'w':
            case 'd':
            case 'f':
                if (pre != stat) {
                    result.push([data[i], 0, time]);
                } else {
                    result[result.length - 1][0] += data[i];
                    result[result.length - 1][2] += time;
                }
                break;
            case 'c':
                result.push([data[i], 0, time]);
                break;
            case 'b':
                if (pre != 's') {
                    result[result.length - 1][0] += data[i] + '\u00a0';
                    result[result.length - 1][2] += time;
                } else {
                    result.push([data[i] + '\u00a0', 0, time]);
                }
                pre = 's';
                continue;
            case 's':
                if (pre != 's') {
                    result[result.length - 1][0] += '\u00a0';
                }
                break;
        }

        pre = stat;
    }

    return result;
}

function parse(data) {
    // return exampleData();
    return parse_1(data);
}
