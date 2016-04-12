(function(window){


	jh.buildNameSpace('jh.component.View');

	var DesktopsView = Backbone.View.extend({

		id : 'content',

		initialize : function(attrs){
			var _this = this;
			this.chartData = attrs.chartData;
			_.bindAll(this,'render','appendItem');
			//this.collection.bind('add',this.addItem,_this);
			this.listenTo(this.collection,'add',this.addItem);
		},

		render : function(){
			var _this = this;
			_.each(this.collection.models,function(item){
				var obj = {model : item,chartData : _this.chartData};
				_this.appendItem(obj);
			})
			return this;
		},

		appendItem : function(attrs){
			var desktopView = new jh.component.View.DesktopView({
				model : attrs.model,
				chartData : this.chartData
			})
			this.$el.append(desktopView.render().el);
		},

		addItem : function(attr){
			var desktopView = new jh.component.View.DesktopView({
				model : attr,
				chartData : this.chartData
			})
			// this.$el.append(desktopView.render().el);
			this.$el.append(desktopView.el);
			desktopView.render();
		}

	});

	window.jh.component.View.DesktopsView = DesktopsView;

})(window);