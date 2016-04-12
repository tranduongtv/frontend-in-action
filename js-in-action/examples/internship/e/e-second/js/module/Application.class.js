(function(window){
	if(!('jh' in window) ){
		window.jh={};
	}
	if(!('module' in window.jh)){
		window.jh.module={};
	}
	var Application=function(options){
		this.attrs = options.attrs;
		this.bind();
		jh.component.Common.apply(this,arguments);
	};

	jh.util.extend(Application.prototype,{

		tagName : 'div',

		init : function(){
			this.ele = document.createElement(this.tagName);
			this.ele['id'] = 'tab';
			document.body.insertBefore(this.ele,document.body.children[0]);
		},

		render : function(){

		  this.tabs = new jh.component.Tabs(this.options);
		  this.desktops = new jh.component.Desktops(this.options);
		  this.form = new jh.component.Form();
		  this.ele.appendChild(this.tabs.ele);
		  this.ele.appendChild(this.desktops.ele);
		  this.ele.appendChild(this.form.ele);

		  var _this = this;
		  this.form.onSubmit(function(attr) {
			   var opt={};
			   opt.id= _this.attrs.length;
			   opt.title = attr;
			   _this.attrs[_this.attrs.length] = opt;
	           _this.tabs.addOne(opt);
	           _this.desktops.addOne(opt);
          });

		},

		bind : function(){
			var _this=this;
			window.onload=function(){
				_this.tabs.changeStyle();
				_this.desktops.changeStyle();
				window.onhashchange=function(){
					_this.tabs.changeStyle();
					_this.desktops.changeStyle();
				}
			}
		}

	});

	window.jh.module.Application = Application;

})(window);