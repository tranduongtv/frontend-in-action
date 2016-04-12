(function(window){

	if(!('jh' in window)){
		window.jh={};
	}

	if(!('component' in window.jh)){
		window.jh.component = {};
	}

	var Desktop=function(options){
		jh.component.Common.apply(this,arguments);
	}

	jh.util.extend(Desktop.prototype,{

		tagName : 'div',

		init : function(){
			this.ele.className = 'content';
		},

		render : function(){
			this.createContent();
		},

		createContent : function(){
			this.ele.className='content';
			this.ele.innerHTML = this.options['title'];
		},

		show : function(){
			this.ele.style.display = "block";
		},

		hide : function(){
			this.ele.style.display = "none";
		}
	});

	window.jh.component.Desktop = Desktop;

})(window); 