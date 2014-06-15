var dataEn = 'One day a little white rabbit went to a bakery and asked, "Have you got 100 buns?"\
The shopkeeper answered, "Sorry, we don\'t have that many."\
"Oh, that\'s a pity!" said the rabbit and left, disappointed.\
The second day the little white rabbit went to the bakery again and asked, "Have you got 100 buns?"\
The shopkeeper again answered, "Sorry, we don\'t have that many."\
"Oh, it\'s a pity," said the rabbit, and again left, disappointed.\
The third day the little white rabbit went again to the bakery and asked, "Have you got 100 buns?"\
"Oh, yes we have 100 buns today!" the shopkeeper answered gladly.\
"That\'s great, I\'ll buy two, thank you!"';

var dataCn = '一天有只小白兔来到面包店问：“请问你们有100个小面包吗？”\
老板回答：“抱歉我们没有那么多。”\
“哦，太遗憾了。”小白兔失望地离开了。\
第二天小白兔又来到那个面包店问：“请问你们有100个小面包吗？”\
老板仍回答：“抱歉我们没有那么多。”\
“哦，太遗憾了。”小白兔又失望地离开了。\
第三天小白兔依然来到那家面包店，问：“请问你们有100个小面包吗？”\
“啊是的，今天我们有100个小面包啦！”老板高兴地回答。\
“那太好啦！我买2个，谢谢！”';

function loadDefault() {
    var lang = navigator.language ? navigator.language : navigator.browserLanguage;
    var data;

    lang = lang.toLowerCase();
    if (lang.indexOf('zh') >= 0 || lang.indexOf('cn') >= 0) {
        data = dataCn;
        title.innerHTML += '<br />阅读加速器';
    } else {
        data = dataEn;
    }

    playLoad(parse(data), 0, true);
}

loadDefault();
