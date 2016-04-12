(function(window){

	jh.buildNameSpace('jh.component.View');

	var AddPointView = Backbone.View.extend({

		className : 'point',
		template : '<button id="AddPoint">Add Point</button>',

		initialize : function(attr){
			this.chartData = attr.chartData;
		},

		events : {
			"click #AddPoint" : "AddPoint"
		},

		render : function(){			
			this.$el.append(this.template);
			return this;
		},

		AddPoint : function(){
			var chartData = this.chartData.get('chartData');
			for(var i=0;i<chartData.series.length;i++){
				chartData.series[i]['data'].push(Math.random(0,1)*30);
			}
			this.chartData.trigger('add');
		}

	});

	jh.component.View.AddPointView= AddPointView;

})(window)