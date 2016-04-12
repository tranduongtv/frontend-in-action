 (function(window){


	 function buildNameSpace(){
	 	var arg = arguments[0],j,arr,ns;

 		if(arg.indexOf('.')>-1){

 			arr = arg.split('.');

 			if(!(arr[0] in window)){
 				window[arr[0]] = window[arr[0]] || {};
 			}

 			ns = window[arr[0]];

 			for(j = 1,len = arr.length;j < len;j++){
 				ns[arr[j]] = ns[arr[j]] || {};
 				ns = ns[arr[j]];
 			}

 		}else{

 		    if(!(arg in window)){
 				window[arg] = window[arg] || {};
 				ns = window[arg];
 			}

 		}

	 };

	 buildNameSpace('jh');

	 window.jh.buildNameSpace = buildNameSpace;

})(window);