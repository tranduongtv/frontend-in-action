 (function(window){


	jh.buildNameSpace('jh.component.View');

 	var FormView = Backbone.View.extend({

 		className : 'form',

 		initialize : function(){
 			// $('body').append(this.el);
 			// this.render();
 			var _this = this;
		    this.on('btnSubmit',function(attr1,attr2){
		    	_this.collection.add({
		    		id : _this.collection.models.length,
		    		title : attr1,
		    		chartType : attr2
		    	});
		    });
 		},

 		template :
 			'<p><label for="at">Add Title:<input type="text" id="at" value="" placeholder="Add title"></label><label id="selectChartType">Select chart type:</label><select name="chartType" id="type"><option value="highchart">highchart</option><option value="barChart">barChart</option></select><select id="category" name="chartCategory"><option value="line">line chart</option><option value="bar">bar chart</option><option value="column">column chart</option></select></p><p style="margin-left:150px;"><input type="button" value="Add Tab&Desktop" id="bat"/></p>',

 		render : function(){
			this.$el.html(this.template);
			return this;
 		},

 		events : {
 			'click input#bat' : 'btnSubmit',
 			'change select#type' : 'createCatagory'
 		},

 		btnSubmit : function(){
			var $bat = $('#at'),
				category = '';
			if($bat.val()==''){
				return;
			}
			if($("#type option:selected").val() == 'highchart'){
				category = $('#category option:selected').val();
			}else{
				category = $('#type option:selected').val();
			}
		    this.trigger('btnSubmit',$bat.val(),category);
 			$bat.val('');

		},

		createCatagory : function(){
			var typeVal = $('#type option:selected').val(),
				categoryEle = $('#category');
			if(typeVal == 'barChart'){
				categoryEle.hide();
			}else{
				categoryEle.show();
			}
		}

 	});

 	window.jh.component.View.FormView = FormView;

 })(window);