var TemplateEnginePrototype = function(tpl, data) {
	// magic here
	var re = /<%([^%>]+)?%>/g;
	var reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
	var code = 'var r = [];\n';
	var cursor = 0;
	var match;

	var add = function (line, js) {
		// 若包含关键字和符号的语句直接放进字符里，否则加入到数组里
		code += js ? line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' :
			'r.push("' + line.replace(/"/g, '\\"') + '");\n';
	}
	while (match = re.exec(tpl)) {
		// tpl = tpl.replace(match[0], data[match[1]]);
		add(tpl.slice(cursor, match.index));
		add(match[1], true);
		cursor = match.index + match[0].length;
	}
	add(tpl.substr(cursor, tpl.length - cursor));
	code += 'return r.join("");';
	
	// console.log(code);
	// return tpl;

	return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}

var template1 = '<p>Hello, my name is <%this.name%>, I\'m <%this.profile.age%> years old.</p>';

var template2 = 'My skills: ' +
		'<% for (var index in this.skills) { %>' +
		'<a href="#"><% this.skills[index] %></a>' +
		'<% } %>';

var template3 = 'My skills: ' +
	'<% if (this.showSkills) { %>' +
		'<% for (var index in this.skills) { %>' +
		'<a href="#"><% this.skills[index] %></a>' +
		'<% } %>' +
	'<% } else {%>' +
		'<p>none</p>' +
	'<% } %>';

console.log(TemplateEnginePrototype(template1, {
	name: 'yunxiange',
	profile: {age: 24}
}));

console.log(TemplateEnginePrototype(template2, {
	skills: ['html', 'css', 'js']
}));

console.log(TemplateEnginePrototype(template3, {
	skills: ['html', 'css', 'js'],
	showSkills: false
}));

var TemplateEngine = function(html, options) {
    var re = /<%([^%>]+)?%>/g;
    var reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
    var code = 'var r=[];\n';
    var cursor = 0;

    var add = function(line, js) {
        code += js? (line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}

var template4 = 'My skills: ' +
	'<% if (this.showSkills) { %>' +
		'<% for (var index in this.skills) { %>' +
		'<a href="#"><% this.skills[index] %></a>' +
		'<% } %>' +
	'<% } else {%>' +
		'<p>none</p>' +
	'<% } %>';

console.log(TemplateEngine(template3, {
	skills: ['html', 'css', 'js'],
	showSkills: true
}));
