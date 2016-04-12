(function(window){

    if(!('jh' in window)){
        window.jh={};
    }

    var application = new jh.module.Application({
    attrs: [{
        id: 0,
        title: 'Tab0'
    }, {
        id: 1,
        title: 'Tab1'
    }, {
        id: 2,
        title: 'Tab2'
    }, {
        id: 3,
        title: 'Tab3'
    }, {
        id: 4,
        title: 'Tab4'
    }]
});
})(window);