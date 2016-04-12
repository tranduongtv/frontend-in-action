(function () {
    var htmltomarkdown = function (html) {
        //toMarkdown is defined in to-mardown.js
        return toMarkdown(html);
    };

    var markdowntohtml = function (text) {
        //markdown is defined in markdown.js
        var html = markdown.toHTML(text);
        return html;
    };

    var oEditor = document.getElementById('editor');
    var oVisual = document.getElementById('visual');

    oEditor.style.height = document.documentElement.clientHeight - 78 + 'px';

    oEditor.addEventListener('keyup', function () {
        oVisual.innerHTML = markdowntohtml(this.value);
    });
})();
