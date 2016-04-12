(function(window){

	if(!('jh' in window)){
		window.jh = {};
	}

	if(!('lib' in window.jh)){
		window.jh.lib = {};
	}

	var Event = {
		on : function(event,cb){
			var calls = this._callbacks || (this._callbacks={});
			(this._callbacks[event] || (this._callbacks[event]=[])).push(cb);
			return this;
		},

		off : function(event){
			if(!(this._callbacks)) return this;
			if(!(this._callbacks[event])) return this;
			delete this._callbacks[event];
		},

		trigger : function(event){
			var args = Array.prototype.slice.call(arguments,0);
			var ev = args.shift();

			var list,calls,i,l;

			if(!(calls=this._callbacks)) return this;
			if(!(list=this._callbacks[ev])) return this;

			for(i=0,l=list.length;i<l;i++){
				list[i].apply(this,args);
				return this;
			}
		}
	}

	window.jh.lib.Event = Event;

})(window);