(function(window){
	if(!('jh' in window)){
		window.jh = {};
	}

	if(!('component' in window.jh)){
		window.jh.component = {};
	}

	var Common=function(options){
		this.options = options;
		this.ele = document.createElement(this.tagName);
		this.init();
		this.render();
	}

	jh.util.extend(Common.prototype,{

		tagName : 'div',

		init : function(){

		},

		render : function(){

		}
	});

	window.jh.component.Common = Common;

})(window);