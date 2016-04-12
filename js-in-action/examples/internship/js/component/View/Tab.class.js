(function(window){

	
	jh.buildNameSpace('jh.component.View');
	
	var TabView = Backbone.View.extend({

		tagName : 'li',

		template : _.template('<a href=<%= href %>><%= content %></a>'),

		initialize : function(){
			_.bindAll(this,'render');
			this.listenTo(this.model,'change',this.changeStyle);
		},

		events : {
			'click' : 'select'
		},

		render : function(){
			this.$el.html(this.template({'href':'#tab/'+this.model.get('id'),content:this.model.get('title')}));
			if(this.model.get('selected')){
				this.$el.addClass("current");
			}
			return this;
		},

		select : function(){
			this.model.toggle();
		},

		changeStyle : function(){
		  if(this.model.get('selected')){
		    this.$el.addClass('current');
		  }else{
		  	this.$el.removeClass('current');
		  }
		}

	});

	window.jh.component.View.TabView=TabView;

})(window);