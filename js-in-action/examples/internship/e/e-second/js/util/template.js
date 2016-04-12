(function(window){
	if(!('jh' in window)){
		window.jh = {};
	}
	if(!('util' in window.jh)){
		window.jh.util = {};
	}

	function template(str){

	 return  function(obj){
			var target=str.replace(/<%=\s*(\w+)\s*%>/g,function(a,b){
				return obj[b];
			});
			return target;
		};

	}

	window.jh.util.template = template;

})(window);