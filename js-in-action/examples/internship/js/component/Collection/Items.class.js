(function(window){

	jh.buildNameSpace('jh.component.Collection');

	var Items = Backbone.Collection.extend({

		model : jh.component.Model.Item,

        fetch: function() {
            var _this = this;

            return $.getJSON('./js/data/tabData.json',function(data){
                _this.reset(data);
            });
        }
	});

	window.jh.component.Collection.Items = Items;

})(window);