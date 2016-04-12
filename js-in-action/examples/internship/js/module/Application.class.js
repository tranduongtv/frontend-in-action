(function(window){

	jh.buildNameSpace('jh.Module');

	var AppView = Backbone.View.extend({

		initialize : function(){		
			var _this = this,
				collection = this.collection = new jh.component.Collection.Items(),
				chart = this.chart = new jh.component.Model.ChartData();
			
			$.when(collection.fetch(),chart.fetch()).done(function(){
				// _this.listenTo(collection, 'reset', _this.render);
				_this.render();
			});
			
		},

		render: function() {
			//tab render
			this.tabsView = new jh.component.View.TabsView({
				'collection' : this.collection
			});
			//desktop render
			this.desktopsView = new jh.component.View.DesktopsView({
				'collection' : this.collection,
				'chartData' : this.chart
			});
			//form render
			this.formView = new jh.component.View.FormView({
				'collection' : this.collection
			});
			//Add Point
			this.addPointView = new jh.component.View.AddPointView({
				'chartData' : this.chart
			});

			this.$el.append(this.tabsView.render().$el);
			this.$el.append(this.desktopsView.render().$el);
			this.$el.append(this.formView.render().$el);
			this.$el.append(this.addPointView.render().$el);

			Backbone.history.start();

			return this;
		}
	});

	var NavigationRouter = Backbone.Router.extend({
		routes : {
			"tab/:id" : "showTab",
			"*actions" : "defaultRoute"
		},
		initialize : function(){
			this.appView = new AppView();
			$('body').append(this.appView.$el);
		},
		defaultRoute : function(){
			this.showTab(0);
		},
		showTab : function(id){
			_.each(this.appView.collection.models,function(item){
				item.set({'selected' : false})
			});
			try{
				this.appView.collection.at(parseInt(id)).set({'selected' : true});
			}catch(e){
				this.appView.collection.at(0).set({'selected':true});
			}
		}
	});

	window.jh.Module.NavigationRouter = NavigationRouter;

})(window);