/**
 * ParisJS Website
 * (c) 2010 François de Metz
 * Released under GPL 3
 */
$(function() {
    var IndexView = Backbone.View.extend({
        template: _.template($('#template-index').html()),

        render: function() {
            console.log(this.template({}));
            $(this.el).html(this.template({}));
        }

    });
    var ParisJS = Backbone.Controller.extend({
        routes: {
            "":                 "index", // #/
        },

        index: function() {
            var view = new IndexView({el: $(".content")});
            view.render();
        }
    });

    new ParisJS();
    Backbone.history.start();
});
