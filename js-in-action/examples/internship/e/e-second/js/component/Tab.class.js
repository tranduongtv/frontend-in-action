(function(window){
	if(!('jh' in window)){
		window.jh={};
	}

	if(!('component' in window.jh)){
		window.jh.component = {};
	}

	var Tab=function(options){
		jh.component.Common.apply(this,arguments);
	}

	jh.util.extend(Tab.prototype,{

		tagName : 'li',

		htmlTemplate : '<a href=<%= href %>><%= content %></a>',

		init : function(){
		},

		render : function(){
			this.createA();
		},

		createA : function(){
			var str={};
			str['href']="#tab_"+this.options['id'] , str['content']=this.options['title'];
			var htmlCreator=jh.util.template(this.htmlTemplate) , html=htmlCreator(str);
			this.ele.innerHTML +=html;
		},

		current : function(){
			this.ele.className = 'current';
		},

		icurrent : function(){
			this.ele.className = '';
		}
	});

	window.jh.component.Tab=Tab;

})(window);