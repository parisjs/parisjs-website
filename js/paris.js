/**
 * ParisJS Website
 * (c) 2010 François de Metz
 * Released under GPL 3
 */
$(function() {
    var IndexView = Backbone.View.extend({
        template: function(context) {
            return Mustache.to_html($('#template-index').html(), context);
        },

        events: {
            "click .csstransforms3d a" : "transform",
        },

        transform: function() {
            $("#list").get(0).style.webkitTransform = 'rotateX(180deg) rotateY(180deg) rotateZ(180deg)';
        },

        render: function() {
            $(this.el).html(this.template({
                "l": function(s) {
                    return function(text, render) {
                        return render(text.toLocaleString());
                    }
                }
            }));
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
