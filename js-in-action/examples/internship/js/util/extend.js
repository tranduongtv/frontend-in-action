(function(window){
	if(!('jh' in window)){
		window.jh = {};
	}
	if(!('util' in window.jh)){
		window.jh.util = {};
	}

	function extend(obj1,obj2){
		for(var attr in obj2){
			obj1[attr]=obj2[attr];
		}
		return obj1;
	}

	window.jh.util.extend = extend;

})(window);