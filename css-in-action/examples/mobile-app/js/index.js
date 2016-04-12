(function () {
	var mb = {};
	mb.util = {};
	mb.app = {};

	mb.util.getType = function (val) {
		return Object.prototype.toString.call(val).slice(7, -1);
	};
	mb.util.gById = function (id) {
		return document.getElementById(id);
	};
	mb.util.gByClassName = function (className) {
		return document.getElementsByClassName(className);
	};
	mb.util.addClass = function (ele, className) {
		var flag = false;
		var classes = ele.className.replace(/^s*|s*$/g, '').split(' ');
		for (var i = 0; i < classes.length; i++) {
			if (classes[i] === className) {
				flag = true;
				break;
			}
		}
		if (!flag) {
			classes.push(className);
		}
		ele.className = classes.join(' ');
	};
	mb.util.removeClass = function (ele, className) {
		var index;
		var classes = ele.className.replace(/^s*|s*$/g, '').split(' ');
		for (var i = 0; i < classes.length; i++) {
			if (classes[i] === className) {
				index = i;
				break;
			}
		}
		if (index) {
			classes.splice(index, 1);
			ele.className = classes.join(' ');
		}
	};
	mb.util.hasClass = function (ele, className) {
		var classes = ele.className;

		if (classes.indexOf(className) > -1) {
			return true;
		}
		else {
			return false;
		}
	};
	mb.util.toggleClass = function (ele, className) {
		var classes = ele.className;

		if (classes.indexOf(className) > -1) {
			mb.util.removeClass(ele, className);
		}
		else {
			mb.util.addClass(ele, className);
		}
	};
	mb.util.attr = function (ele, attrName, attrVal) {
		if (attrVal) {
			ele.setAttribute(attrName ,attrVal);
		}
		else {
			return ele.getAttribute(attrName);
		}
	};
	mb.util.bind = function (ele, eventName, fn) {
		ele.addEventListener(eventName, fn, false);
	};
	mb.util.unbind = function (ele, eventName, fn) {
		ele.removeEventListener(eventName, fn);
	};

	mb.app.options = {
		problem1: [{
			label: 'yes'
		}, {
			label: 'no'
		}],
		problem2: [{
			label: 'yes'
		}, {
			label: 'no'
		}],
		problem3: [{
			label: '0'
		}, {
			label: '1'
		}, {
			label: '2'
		}, {
			label: '3'
		}],
		problem4: '',
		problem5: [{
			label: 'tel',
			value: '',
			selected: true
		}, {
			label: 'email',
			value: ''
		}]
	};
	mb.app.select = function (evt, problemType) {
		var target = evt.target;
		if (target.nodeType !== 1) {
			return;
		}

		var childs = target.parentNode.childNodes;
		var flag = mb.util.attr(target, 'data-flag');
		var options = mb.app.options[problemType]; 
		var i;

		for (i = 0; i < childs.length; i++) {
			if (childs[i].nodeType === 1) {
				mb.util.removeClass(childs[i] ,'active');
			}
		}
		for (i = 0; i < options.length; i++) {
			if (options[i].label === flag) {
				options[i].selected = true;
			}
			else {
				options[i].selected = false;
			}
		}
		mb.util.toggleClass(target, 'active');
	};
	mb.app.multiSelect = function (evt, problemType) {
		var target = evt.target;
		if (target.nodeType !== 1) {
			return;
		}

		var childs = target.parentNode.childNodes;
		var classFlag = mb.util.hasClass(target, 'active');
		var attrFlag = mb.util.attr(target, 'data-flag');
		var options = mb.app.options[problemType];

		for (var i = 0; i < options.length; i++) {
			if (options[i].label === attrFlag) {
				if (classFlag) {
					options[i].selected = false;
				}
				else {
					options[i].selected = true;
				}
			}
		}
		mb.util.toggleClass(target, 'active');
	};

	mb.util.bind(mb.util.gById('qa01'), 'click', function (evt) {
		mb.app.select(evt, 'problem1');
	});
	mb.util.bind(mb.util.gById('qa02'), 'click', function (evt) {
		mb.app.select(evt, 'problem2');
	});
	mb.util.bind(mb.util.gById('qa03'), 'click', function (evt) {
		mb.app.multiSelect(evt, 'problem3');
	});
	mb.util.bind(mb.util.gById('qa05'), 'click', function (evt) {
		mb.app.select(evt, 'problem5');
		var oLinks = mb.util.gById('links');
		oLinks.value = '';
	});
	mb.util.bind(mb.util.gById('qa04'), 'blur', function (evt) {
		mb.app.options.problem4 = evt.target.value;
	});
	mb.util.bind(mb.util.gById('links'), 'blur', function (evt) {
		var problem = mb.app.options.problem5;
		for (var i = 0; i < problem.length; i++) {
			if (problem[i].selected) {
				problem[i].value = evt.target.value;
			}
		}
	});
	mb.util.bind(mb.util.gById('submitBtn'), 'click', function () {
		// 提交內容
		var request = {
			problem1: '',
			problem2: '',
			problem3: [],
			problem4: '',
			problem5: {}
		};
		// 檢驗必選是否已操作
		for (var key in mb.app.options) {
			if (key === 'problem4') {
				request[key] = mb.app.options[key];
			}
			else {
				var objVal = mb.app.options[key];
				for (var i = 0; i < objVal.length; i++) {
					if (objVal[i].selected == true) {
						var type = mb.util.getType(request[key]);
						if (key === 'problem3') {
							request[key].push(objVal[i].label);
						}
						else if (key === 'problem5') {
							request[key] = {
								type: objVal[i].label,
								label: objVal[i].value
							};
						}
						else {
							request[key] = objVal[i].label;
						}
					}
				}
			}
		}
		var myWindow = window.open('_self', '', 'width=200, height=100');
		myWindow.document.write(JSON.stringify(request));
	});
})();