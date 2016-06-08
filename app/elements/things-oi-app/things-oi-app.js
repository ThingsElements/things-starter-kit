window.Things.DataGlobal = window.Things.DataGlobal || {};
window.Things.DataGlobal.wip = window.Things.DataGlobal.wip || {};
window.Things.DataGlobal.qc = window.Things.DataGlobal.qc || {};
window.Things.DataGlobal.inv = window.Things.DataGlobal.inv || {};

Polymer({
    is: 'things-oi-app',
    properties:{
    	selectedMenu : {
    		type: Object
    	}
    },
    behaviors:[
    	Things.GlobalBehavior,
		Things.FullscreenBehavior
    ],
    ready:function(){
    	document.addEventListener('things-routing-changed', function(e) {
          this.selectedMenu = e.detail;
        }.bind(this));
    },
    _fullScreenTap: function () {
    	this.$.informationContainer.opened = !this.$.informationContainer.opened;
    	this.target = this.$.contentArea;
    	this.toggleFullscreen();
    }

});