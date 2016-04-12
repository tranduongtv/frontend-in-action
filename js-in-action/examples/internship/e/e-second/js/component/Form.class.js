 (function(window){
 	if(!('jh' in window)){
 		window.jh = {};
 	}
 	if(!('component' in window.jh)){
 		window.jh.component = {};
 	}

 	var Form=function(){
 		this.ele = document.createElement(this.tagName);
 		this.init();
 		this.render();
 	};

 	jh.util.extend(Form.prototype,{

 		tagName : 'div',

 		template : '<p><label for="at">Add Title:<input id="at" value="" placeholder="Add title"></p><p><input type="button" value="Add Tab&Desktop" id="bat"/></p>',

 		init : function(){
 			this.ele.className = 'form';
 		},

 		render : function(){
 			this.ele.innerHTML += this.template;
 			var _this = this;

 			setTimeout(function() {
 				var $bat = $('#bat');
 				$bat.on('click', function(){
 					if($('#at').val()==''){
 						return;
 					}
 				    _this.submit($('#at').val());
 				});
 			},200)
 		},

 		onSubmit : function(cb){
 			this.cb = cb;
 		},

 		submit : function(att){
 			this.cb(att);
 		}

 	});

 	window.jh.component.Form = Form;

 })(window);