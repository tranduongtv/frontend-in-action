(function(window) {

	jh.buildNameSpace('jh.component.Model');

	var ChartData = Backbone.Model.extend({		

		fetch: function() {
            var _this = this;

            return $.getJSON('./js/data/chartData.json',function(data){
            	var obj={
            		chart: {
            			type : 'line'
            		},				
					title: {
			            text: 'Monthly Average Temperature',
			            x: -10 //center
			        },
			        subtitle: {
			            text: 'Source: WorldClimate.com',
			            x: -10
			        },
			        xAxis: {
			            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			        },
			        yAxis: {
			            title: {
			                text: 'Temperature (°C)'
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }]
			        },
			        tooltip: {
			            valueSuffix: '°C'
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'middle',
			            borderWidth: 0
			        }
			    };
			    for(var attr in data){
			    	obj[attr] = data[attr];
			    }
                _this.set('chartData',obj);
            });
        }
	});

	window.jh.component.Model.ChartData = ChartData;

})(window);