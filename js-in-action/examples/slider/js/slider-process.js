function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

function animate(obj, json, fn) {
    if (!obj) {
        return;
    }

    clearInterval(obj.timer);

    obj.timer = setInterval(function() {

        var bBtn = true;

        for (var attr in json) {

            var iCur = 0;

            if (attr == 'opacity') {
                iCur = Math.round(getStyle(obj, attr) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr)) || 0;
            }

            var iSpeed = (json[attr] - iCur) / 8;

            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCur != json[attr]) {
                bBtn = false;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }

        }

        if (bBtn) {
            clearInterval(obj.timer);

            if (fn) {
                fn.call(obj);
            }
        }


    }, 30);
}

function getElementsByClassName(className, root) {
    root = root ? document.getElementById(root) : document;

    if (root.getElementsByClassName) {
        return root.getElementsByClassName(className);
    }

    var elements = root.getElementsByTagName('*'),
        ret = [];

    for (var i = 0, len = elements.length; i < len; i++) {
        var elem = elements[i];
        if ((' ' + elem.className + ' ').indexOf(' ' + className + '') > - 1) {
            ret.push(elem);
        }
    }
    return ret;
}

function slide() {
    var oSlide = getElementsByClassName('slide')[0],
        arrItems = getElementsByClassName('slide-item'),
        arrBtns = getElementsByClassName('slide-guide')[0].getElementsByTagName('li'),
        oLBtn = getElementsByClassName('slide-left')[0],
        oRBtn = getElementsByClassName('slide-right')[0],
        iLen = arrItems.length;
    index = 0;
    timer = null;

    function init() {
        oSlide.style.height = document.documentElement.clientHeight || document.body.clientHeight + 'px';
        arrItems[0].style.filter = 'alpha(opacity=100)';
        arrItems[0].style.opacity = 1;
        for (var i = 1; i < iLen; i++) {
            arrItems[i].style.filter = 'alpha(opacity=0)';
            arrItems[i].style.opacity = 0;
        }
    }

    init();

    timer = setInterval(function() {
        index++;
        if (index > iLen - 1) {
            index = 0;
        }
        run();
    }, 5000);

    function run() {
        for (var i = 0; i < iLen; i++) {
            arrBtns[i].className = '';
            animate(arrItems[i], {
                opacity: 0
            });
        }
        arrBtns[index].className = 'active';
        animate(arrItems[index], {
            opacity: 100
        });
    }

    for (var i = 0; i < iLen; i++) {
        arrBtns[i].index = i;
        arrBtns[i].onclick = function() {
            index = this.index;
            run();
        }
    }

    oSlide.onmouseover = function() {
        clearInterval(timer);
    }

    oSlide.onmouseout = function() {
        timer = setInterval(function() {
            index++;
            if (index > iLen - 1) {
                index = 0;
            }
            run();
        }, 5000);
    }

    oLBtn.onclick = function() {
        index--;
        if (index < 0) {
            index = iLen - 1;
        }
        run();
    }

    oRBtn.onclick = function() {
        index++;
        if (index > iLen - 1) {
            index = 0;
        }
        run();
    }
}

window.onload = function() {
	slide();
}
