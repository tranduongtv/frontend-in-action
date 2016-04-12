(function(window){
	if(!('jh' in window)){
		window.jh = {};
	}

	if(!('util' in window.jh)){
		window.jh.util = {};
	}

	function get(url, data, success){

		var xmlhttp = XHR() , params = '' , result = '';
		if(data){
			for(var attr in data){
				params += '&'+attr+'='+data[attr];
			}
		}

		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				result = xmlhttp.responseText;
				if(success){
					success(result);
				}
				return result;
			}
		}

		xmlhttp.open('GET',url+"?nocache="+new Date().getTime()+params,true);

		xmlhttp.send();

	};

	function getJSON(url, data, success){

		get(url, data, function(data){

			var temp=JSON.parse(data);

			success(temp);
		});
	};

	function XHR(){
		var xmlhttp;
		if(window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}else{
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xmlhttp;
	}

	window.jh.util = {

		get : get,

		getJSON : getJSON

	}

})(window);