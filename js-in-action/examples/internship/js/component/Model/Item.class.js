(function(window){

	jh.buildNameSpace('jh.component.Model');

	var Item = Backbone.Model.extend({
		
		toggle: function() {
		  _.each(this.collection.models,function(item){
		  		item.set({selected : false});
		  })
	      this.set({selected: true});
	    }
	});

	window.jh.component.Model.Item = Item;

})(window);