window.Things.DataGlobal = window.Things.DataGlobal || {};
window.Things.DataGlobal.wip = window.Things.DataGlobal.wip || {};
window.Things.DataGlobal.qc = window.Things.DataGlobal.qc || {};
window.Things.DataGlobal.inv = window.Things.DataGlobal.inv || {};

Polymer({
    is: 'things-oi-app',
    behaviors:[
      Things.GlobalBehavior
    ],
    observers:[
      'observerGlobals(globals.*)'
    ],
    observerGlobals : function (value) {
       console.log(value);
       console.log(Things.DataGlobal);
    },
    /**
     * toggle 
     */
    _toggle :function(){
      var thingsRouting = this.$['informationContainer'];
      var iconButton = Polymer.dom(event).localTarget;
      iconButton.icon = thingsRouting.opened ? 'hardware:keyboard-arrow-up'
                        : 'hardware:keyboard-arrow-down';
      thingsRouting.toggle();
    }

});