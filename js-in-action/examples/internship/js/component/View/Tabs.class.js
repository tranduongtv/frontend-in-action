(function(window){


	jh.buildNameSpace('jh.component.View');

	var TabsView = Backbone.View.extend({

			id : 'title',

			initialize : function(){
				_.bindAll(this,'render','appendItem');
				this.collection.bind('add',this.appendItem);
			},

			render : function(){
				var _this = this;
				_.each(this.collection.models,function(item){
					_this.appendItem(item);
				})
				return this;
			},

			appendItem : function(item){
				var tabView = new jh.component.View.TabView({
					model : item
				})
				this.$el.append(tabView.render().el);
			}

		});

	window.jh.component.View.TabsView = TabsView;

})(window);