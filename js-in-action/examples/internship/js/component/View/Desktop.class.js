(function(window){

	jh.buildNameSpace('jh.component.View');

	/*
	
	var desktopView = new DesktopView({
		model: item,
		chartData: chartData
	})

	*/

	var DesktopView = Backbone.View.extend({
		className : 'content',

		template : _.template('<%= content %>'),

		initialize : function(attrs){
			var _this = this;
			this.chartData = attrs.chartData;
			this.model = attrs.model;

			_.bindAll(this,'render');
			this.listenTo(this.model,'change',this.changeStyle);
			this.listenTo(this.chartData,'add',this.repaint);
		},

		render : function(){
			var _this = this;
			this.$el.html(this.template({'content': this.model.get('title') }));
			if(this.model.get('selected')){
				this.$el.show();
			}
			if(this.model.get('chartType') == 'barChart'){
				var id = 'a'+new Date().getTime();
				this.$el.append('<div id='+id+'></div>');
				// setTimeout(function(){jh.util.barChart(_this.chartData.get('chartData'),id)},1000);
				jh.util.barChart(_this.chartData.get('chartData'),id);
			}else{					
				var chartData = this.chartData.get('chartData');
				chartData.chart.type = this.model.get('chartType');
				this.$el.highcharts(chartData);
			}
			return this;
		},

		changeStyle : function(){
			if(this.model.get('selected')){
				this.$el.show();
			}else{
				this.$el.hide();
			}
		},

		repaint : function(){
		  	if(this.model.get('chartType') == 'barChart'){
		  		//
		  	}else{					
		  		var chart = this.$el.highcharts();
				for(var i=0,len=chart.series.length;i<len;i++){
					var chartData = this.chartData.get('chartData').series[i].data;
					chart.series[i].addPoint(chartData[chartData.length-1],true,true);
				}
		  	}
		}

	});

	window.jh.component.View.DesktopView = DesktopView;

})(window); 