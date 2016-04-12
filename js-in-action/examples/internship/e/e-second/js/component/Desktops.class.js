(function(window){
	if( !('jh' in window) ){
		window.jh={};
	}

	if(!('component' in window.jh)){
		window.jh.component = {};
	}

	var Desktops=function(options){
		this.attrs = options.attrs;
		this.arr = [];
		jh.component.Common.apply(this,arguments);
	}

	jh.util.extend(Desktops.prototype,{

		tagName : 'div',

		init : function(){
			this.ele['id']='content';
		},

		render : function(opt){
		  for(var i=0,len=this.attrs.length;i<len;i++){
			var desktop = new jh.component.Desktop(this.attrs[i]);
			this.ele.appendChild(desktop.ele);
			this.arr.push(desktop);
		  }
		},

		addOne : function(attr){
			var desktop = new jh.component.Desktop(attr)
			this.ele.appendChild(desktop.ele);
			this.arr.push(desktop);
		},

		changeStyle : function(){
			for(var i=0,len=this.arr.length;i<len;i++){
				this.arr[i].hide();
			}
			if(location.hash){
				var num=this.getHashNum(location.hash);
				if(num>=this.arr.length){ num = 0 ; }
				this.arr[num].show();
			}else{
				this.arr[0].show();
			}
		},

		getHashNum : function(target){
			var index=target.indexOf('_')+1 , num=target.substring(index);
			return num;
		}

	})

	window.jh.component.Desktops = Desktops;

})(window);