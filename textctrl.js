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
    var dstr = '0123456789０１２３４５６７８９';
    var fstr = '<([{`$＜（［｛｀《（‘“￥€￡№';
    var bstr = '>)]}\'":;,.?!%-＞）］｝＇＂：；，．？！％－》）’”：；，。、？！…—～°℃';
    var sstr = ' \t\r\n';


    var result = [['\u00a0', 0, 0.5]];
    var tail = 0;
    var pre ='s';

    for (i in data) { // stat: ?wdcfbs
        var stat = '?';
        var long = (data[i].charCodeAt() >= 256);
        stat = long ? 'c' : stat;
        stat = (data[i] >= 'A' && data[i] <= 'Z') ? 'w' : stat;
        stat = (data[i] >= 'a' && data[i] <= 'z') ? 'w' : stat;
        stat = (dstr.indexOf(data[i]) >= 0) ? 'd' : stat;
        stat = (fstr.indexOf(data[i]) >= 0) ? 'f' : stat;
        stat = (bstr.indexOf(data[i]) >= 0) ? 'b' : stat;
        stat = (sstr.indexOf(data[i]) >= 0) ? 's' : stat;

        switch (stat) {
            case '?':
            case 'w':
            case 'd':
            case 'f':
                if (pre != stat) {
                    result.push([data[i], 0, 1]);
                } else {
                    result[result.length - 1][0] += data[i];
                    result[result.length - 1][2] += 0.2;
                }
                break;
            case 'c':
                result.push([data[i], 1, 1]);
                break;
            case 'b':
                if (pre != 's') {
                    result[result.length - 1][0] += data[i] + '\u00a0';
                    result[result.length - 1][2] += 0.5;
                } else {
                    result.push([data[i] + '\u00a0', 0, 0.5]);
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
