(function(window) {

	var util = {
		extend: function(source, target) {
			if (Object.prototype.toString.call(target) == '[object Object]') {
				for (var attr in target) {
					if (target.hasOwnProperty(attr)) {
						source[attr] = target[attr];
					}
				}
			}

			return source;
		},

		getStyle: function(obj, attr) {
			if (!obj && !attr) {
				return '';
			}
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			} else {
				return getComputedStyle(obj, false)[attr];
			}
		},

		setStyle: function() {
			var argLen = arguments.length;

			if(argLen == 1) {
				return;
			}

			var obj = arguments[0];

			if (argLen == 2) {
				var options = arguments[1];
				for (var option in options) {
					if (options.hasOwnProperty(option)) {
						if(option == 'opacity') {
							obj.style.opacity = options[option];
							obj.style.filter = 'alpha(opacity='+ options[option] * 100 +')'
						} else {
							obj.style[option] = options[option];
						}
					}
				}
			}
			else if (argLen == 3) {
				if(arguments[1] == 'opacity') {
					obj.style.opacity = arguments[2];
					obj.style.filter = 'alpha(opacity=' + arguments[2] * 100 + ')';
				} else {
					obj.style[arguments[1]] = arguments[2];
				}
			}
		},

		getElementsByClassName: function(className, root) {
	        root = root ? document.getElementById(root) : document;

	        if (root.getElementsByClassName) {
	            return root.getElementsByClassName(className);
	        }

	        var elements = root.getElementsByTagName('*'),
	            ret = [];

	        for (var i = 0, len = elements.length; i < len; i++) {
	            var elem = elements[i];
	            if ((' ' + elem.className + ' ').indexOf(' ' + className + '') > -1) {
	                ret.push(elem);
	            }
	        }

	        return ret;
	    },

	    bind: function(obj, evt, fn) {
	    	if (!obj) {
	    		return;
	    	}

	    	if (obj.addEventListener) {
	    		obj.addEventListener(evt, fn, false);
	    	} else if (obj.attachEvent) {
	    		obj.attachEvent('on' + evt, fn);
	    	} else {
	    		obj['on' + evt] = fn;
	    	}
	    },

	    unbind: function(obj, evt, fn) {
	    	if (obj.removeEventListener) {
	    		obj.removeEventListener(evt, fn, false);
	    	} else if (obj.detachEvent) {
	    		obj.detachEvent(evt, fn);
	    	} else {
	    		obj['on' + evt] = null;
	    	}
	    },

		animate: function(obj, json, fn) {
			if (!obj) {
				return;
			}

			obj.timer && clearInterval(obj.timer);

			obj.timer = setInterval(function() {
				var bBtn = true;
				var opa = false;
				for (var attr in json) {
					var iCur = 0;

					if (attr == 'opacity') {
						opa = true;
						iCur = Math.round(util.getStyle(obj, attr) * 100);
					} else {
						iCur = parseInt(util.getStyle(obj, attr), 10) || 0;
					}

					var iSpeed = (json[attr] - iCur) / 8;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

					if (iCur != json[attr]) {
						bBtn = false;
					}
					if (opa) {
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
	};

	if (!Function.prototype.bind) {
	    Function.prototype.bind = function(oThis) {
	        if (typeof this !== "function") {
	            // closest thing possible to the ECMAScript 5 internal IsCallable function 
	            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	        }
	        var aArgs = Array.prototype.slice.call(arguments, 1),
	            fToBind = this,
	            fNOP = function() {},
	            fBound = function() {
	                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
	                    aArgs.concat(Array.prototype.slice.call(arguments)));
	            };
	        fNOP.prototype = this.prototype;
	        fBound.prototype = new fNOP();
	        return fBound;
	    };
	}

	function Slider(options) {
		this.defaultOptions = {
			containerClass: 'slide',
			itemClass: 'slide-item',
			guideClass: 'slide-guide',
			lBtnClass: 'slide-left',
			rBtnClass: 'slide-right',
			effect: 'fadeInOut',
			isGuide: true,
			isBtn: true
		};

		options = options || {};
		this.options = util.extend(this.defaultOptions, options);

		this.slide = util.getElementsByClassName(this.options.containerClass)[0];
		this.items = util.getElementsByClassName(this.options.itemClass);

		if (this.options.isBtn) {
			this.lBtn = util.getElementsByClassName(this.options.lBtnClass)[0];
			this.rBtn = util.getElementsByClassName(this.options.rBtnClass)[0];
		}

		if (this.options.isGuide) {
			this.guides = util.getElementsByClassName(this.options.guideClass)[0]
						  .getElementsByTagName('li');
		}

		this.length = this.items.length;
		this.index = 0;
		this.timer = null;

		this.init && this.init();
	}

	Slider.prototype = {
		constructor: Slider,

		init: function() {
			var _this = this;

			util.setStyle(this.items[0], 'opacity', 1);

			this.timer && clearInterval(this.timer);
		    this.timer = setInterval(function() {
		        _this.index++;
		        if (_this.index > _this.length - 1) {
		            _this.index = 0;
		        }
		        _this[_this.options.effect]();
		    }, 5000);

			this.bind();
		},

		fadeInOut: function() {
			for (var i = 0; i < this.length; i++) {
				if (this.options.isGuide) {
	                this.guides[i].className = '';
				}

                util.animate(this.items[i], {
                    opacity: 0
                });
            }
            
            if (this.options.isGuide) {
		        this.guides[this.index].className = 'active';
            }

            util.animate(this.items[this.index], {
                opacity: 100
            });
		},

		bind: function() {
	        util.bind(this.slide, 'mouseover', this.mouseoverFn.bind(this));
	        util.bind(this.slide, 'mouseout', this.mouseoutFn.bind(this));

		    if (this.options.isBtn) {
		        util.bind(this.lBtn, 'click', this.lBtnClick.bind(this));
		        util.bind(this.rBtn, 'click', this.rBtnClick.bind(this));
	        }

	        if (this.options.isGuide) {
		        this.guideClick();
	        }
        },

		mouseoverFn: function() {
            clearInterval(this.timer);
        },

        mouseoutFn: function() {
        	var _this = this;
            this.timer = setInterval(function() {
                _this.index++;

                if (_this.index > _this.length - 1) {
                    _this.index = 0;
                }

                _this[_this.options.effect]();
            }, 5000);
        },

        lBtnClick: function() {
            this.index--;
            if (this.index < 0) {
                this.index = this.length - 1;
            }
            this[this.options.effect]();
        },

        rBtnClick: function() {
            this.index++;
            if (this.index > this.length - 1) {
                this.index = 0;
            }
            this[this.options.effect]();
        },

        guideClick: function() {
        	var _this = this;
        	for (var i = 0; i < this.length; i++) {
	            _this.guides[i].index = i;
	            util.bind(_this.guides[i], 'click', function() {
	            	_this.index = this.index;
			        _this[_this.options.effect]();
			    });
	        }
        }
	};

	window.Slider = Slider;

})(window);
