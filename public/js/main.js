var AppRouter = Backbone.Router.extend({

    routes: {
        ""			: "home",
        "scubagears"		: "list",
        "scubagears/page/:page"	: "list",
        "scubagears/add"	: "addScubagear",
        "scubagears/:id"	: "scubagearDetails",
        "about"			: "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var scubagearList = new ScubagearCollection();
        scubagearList.fetch({success: function(){
            $("#content").html(new ScubagearListView({model: scubagearList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    scubagearDetails: function (id) {
        var scubagear = new Scubagear({_id: id});
        scubagear.fetch({success: function(){
            $("#content").html(new ScubagearView({model: scubagear}).el);
        }});
        this.headerView.selectMenuItem();
    },

    addScubagear: function() {
        var scubagear = new Scubagear();
        $('#content').html(new ScubagearView({model: scubagear}).el);
        this.headerView.selectMenuItem('add-menu');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'ScubagearView', 'ScubagearListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
