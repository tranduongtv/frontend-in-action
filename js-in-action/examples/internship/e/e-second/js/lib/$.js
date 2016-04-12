(function(window){

	if(!('jh' in window)){
		window.jh = {};
	}

	if(!('util' in window.jh)){
		window.jh.util = {};
	}

	var $=function(){
		if(arguments[0].substring(0,1) == '#'){  //获取id元素
			this.ele = document.getElementById(arguments[0].substring(1));
		}else if(arguments[0].substring(0,1) == '.'){  //获取类元素
			this.ele = util.getElementsByClassName(arguments[0].substring(1));
		}else{  //获取标签元素
			this.ele = document.getElementsByTagName(arguments[0]);
		}
	}

	var util={

		getElementsByClassName : function(sclass,tag){
			var tag = tag || '*' ,  pattern = new RegExp("(^|\\s)"+sclass+"(\\s|$)");
			var tags = document.getElementsByTagName(tag);
			var elements = [];
			for(var i=0,len=tags.length;i<len;i++){
				if(pattern.test(tags[i].className)){
					elements.push(tags[i]);
				}
			}
			return elements;
		},

		bindEvent : function(obj,evet,fn){
			if(window.event){
				obj.attachEvent('on'+evet,fn);
			}else{
				obj.addEventListener(evet,fn,false);
			}
		}

	};

	jh.util.extend($.prototype,{

		html : function(){
			if(this.ele[0]){
				if(arguments.length==1){
					alert(this.ele[0].innerHTML);
					this.ele[0].innerHTML = arguments[0];
				}else{
					return this.ele[0].innerHTML;
				}
			}else{
				return 'undefine';
			}
		},

		append : function(str){
			this.ele.appendChild(str);
			return this;
		},

		show : function(){
			this.ele.style.display = 'block';
			return this;
		},

		each : function(obj,fn){
			for(var i=0,len=obj.length;i<len;i++){
				fn(obj[i]);
			}
		},

		hide : function(){
			this.ele.style.display = 'none';
			return this;
		},

		on : function(evet,fn){
			util.bindEvent(this.ele,evet,fn);
		},

		val : function(){
			return this.ele.value;
		}

	});

	var obj=function(att){
		return new $(att);
	}

	window.$ = obj;

})(window);