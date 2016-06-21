window.Things = window.Things||{};
window.Things.DataGlobal = window.Things.DataGlobal || {};
window.Things.DataGlobal.wip = window.Things.DataGlobal.wip || {};
window.Things.DataGlobal.qc = window.Things.DataGlobal.qc || {};
window.Things.DataGlobal.inv = window.Things.DataGlobal.inv || {};

Polymer({
    is: 'things-oi-app',
    properties:{
        selectedMenu : {
            type: Object
        },
        isFullscreen:{
            type: Boolean,
            value: false
        },
        hideStep:{
            type: Number,
            value: 1
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

        document.addEventListener('things-show-tost', function(e) {
            this.showToast(e.detail.msg);
            // Check to make sure caching is actually enabled—it won't be in the dev environment.
        }.bind(this));
    },
    _fullScreenTap: function () {
        this.isFullscreen  = !this.isFullscreen;
        this.$.informationContainer.opened = !this.isFullscreen;
        this.target = this.$.contentArea;
        this.toggleFullscreen();
    },
    showToast : function(msg){
        this.$.infoToast.text = msg;
        this.$.infoToast.show();
    },

    showToastInfo : function(e){
        this.$.infoToast.text = e.detail;
        this.$.infoToast.show();
    },

    showToastConfim : function(e){
        this.$.confirmToast.text = e.detail;
        this.$.confirmToast.show();
    },
    
    refreshWip: function(e) {
        this.$.wip.refresh();
        this.$['order-actual'].refresh();
    },
    _hideInfoContent : function (e) {
        var informationContainer = document.getElementById('informationContainer');
        var searchBar =  document.getElementById('searchToolbar');

        if(this.hideStep==1){
            informationContainer.opened = false;
            this.hideStep =2;
        }else if(this.hideStep==2){
            searchBar.opened = false;
            this.hideStep =3;
        }else if(this.hideStep==3){
            informationContainer.opened = true;
            searchBar.opened = true;
            this.hideStep=1;
        }
    },

});

