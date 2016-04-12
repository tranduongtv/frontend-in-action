(function(window){
	if(!('jh') in window){
		window.jh={};
	}

	if(!('component' in window.jh)){
		window.jh.component = {};
	}

	var Tabs=function(options){
		this.attrs = options.attrs;
		this.arr = [];
		jh.component.Common.apply(this,arguments);
	}

	jh.util.extend(Tabs.prototype,{

		tagName : 'ul',

		init : function(){
			this.ele.id = 'title';
		},

		render : function(){
			for(var i=0,len=this.attrs.length;i<len;i++){
				var tab = new jh.component.Tab(this.attrs[i]);
				this.ele.appendChild(tab.ele);
				this.arr.push(tab);
			}
		},

		addOne : function(attr){
			var tab = new jh.component.Tab(attr);
			this.ele.appendChild(tab.ele);
			this.arr.push(tab);
		},

		changeStyle : function(){
			//debugger;
			for(var i=0,len=this.arr.length;i<len;i++){
				this.arr[i].icurrent();
			}
			if(location.hash){
				var num=this.getHashNum(location.hash);
				if(num>=this.arr.length){ num = 0 ; }
				this.arr[num].current();
			}else{
				this.arr[0].current();
			}
		},

		getHashNum : function(target){

			var index=target.indexOf('_')+1 , num=target.substring(index);
			return num;

		}

	});

	window.jh.component.Tabs = Tabs;

})(window);