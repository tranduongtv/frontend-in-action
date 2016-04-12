(function(window){

	/*add text into svg */
	function addSvgText(oParent,attrs,text){
		var svg = oParent['quote'].append('svg:text');
		for(var value in attrs){
			svg.attr(value,attrs[value]);
		}
		svg.text(text['text']);
	}

	/*add line into svg */
	function addSvgLine(oParent,attrs){
		var svg = oParent['quote'].append('svg:line');
		for(var value in attrs){
			svg.attr(value,attrs[value]);
		}
	}

	/*add rect into svg */
	function addSvgRect(oParent,styles,attrs){
		var svg = oParent['quote'].append('svg:rect');
		for(var value1 in styles){
			svg.style(value1,styles[value1]);
		}
		for(var value2 in attrs){
			svg.attr(value2,attrs[value2]);
		}
	}

	// opt ={
	// 	id : 'chart',
	// 	xAxis : {
	// 		categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania']
	// 	},
	// 	yAxis: {
 //        	title: {
 //            	text: 'Population (millions)'
 //            }
 //        },
	// 	series : [{
	// 		name: 'Year 1800',
 //            data: [133, 156, 947, 408, 6]
 //        }]
	// };

	function barChart(options,id){

		var width = 720 , height = 320,labelpad = 70,
		    svg = d3.select('#'+id).append('svg:svg').attr('class','svg'),
		    xAxisAttr = options.xAxis.categories,
		    yAxisData = options.series[0].data,
	        x = d3.scale.linear().domain([0, d3.max(yAxisData)]).range([0, width]),
	    	y = d3.scale.ordinal().domain(d3.range(yAxisData.length)).rangeBands([0, height],0.4),
	    	colorList = d3.scale.category10();

	    //add kinds of g to svg
		var rules =  svg.append("svg:g").attr('class','rule').attr('transform','translate(0,30)').selectAll('g')
		    .data(x.ticks(5)).enter().append("svg:g")
		    .attr("transform", function(d) { return "translate(" + x(d) + ", 0)"; });

		addSvgLine(
			{
				'quote' : rules
			},
			{
				'y1' : 0,
				'y2' : height,
				'x1' : labelpad,
				'x2' : labelpad,
				'stroke' : '#333',
				'stroke-opacity' : 0.3
			}
		);

		addSvgText(
			{
				'quote' : rules
			},
			{
				'y' : height+8,
				'x' : labelpad,
				'dy' : '0.71em',
				'text-anchor' : 'middle',
				'class' : 'stext'
			},
			{
				'text' : x.tickFormat(5)
			}				
		);

		var lengend=svg.append("svg:g").attr('class','lengend').attr('transform','translate(600,40)');

		addSvgText(
			{
				'quote' : lengend
			},
			{
				'y' : height+18,
				'x' : labelpad,
				'dy' : '0.71em',
				'text-anchor' : 'middle',
				'class' : 'stext'
			},
			{
				'text' : options.yAxis.title.text
			}
		);

	    var bar = svg.append("svg:g").attr('class','bar').selectAll('g')
	       .data(yAxisData).enter().append("svg:g")
	       .attr("transform", function(d, i) { return "translate(70,"+(y(i)+20)+")"; });

	    addSvgRect(
			{
				'quote' : bar
			},
	    	{
	    		'fill' : function(d,i){return colorList(i);}
	    	},
	    	{
	    		'height' : 20,
	    		'width' : function(d,i){return (d/d3.max(yAxisData))*width;},
	    		'transform' : 'translate(0,10)'
	    	}
	    );

	    addSvgText(
			{
				'quote' : bar
			},
	    	{
	    		'x' : 0,
	    		'y' : 10+y.rangeBand()/2,
	    		'dx' : -6,
	    		'dy' : 4,
	    		'text-anchor' : 'end'
	    	},
	    	{
	    		'text' : function(d,i){return xAxisAttr[i]}
	    	}
	    );

	    addSvgText(
			{
				'quote' : bar
			},
	    	{
	    		'x' : 0,
	    		'y' : 10+y.rangeBand()/2,
	    		'dx' : function(d,i){return (d/d3.max(yAxisData))*width+40;},
	    		'dy' : 6,
	    		'text-anchor' : 'end',
	    		'class' : 'stext'
	    	},
	    	{
	    		'text' : function(d,i){return yAxisData[i];}
	    	}		    	
	    );

	}

	jh.buildNameSpace('jh.util');

	window.jh.util.barChart = barChart;

})(window);