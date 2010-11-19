/**
 * ParisJS Website
 * (c) 2010 François de Metz
 * Released under GPL 3
 */
$(function() {
    var Meetup = Backbone.Model.extend({
        initialize : function(attr) {
            var date = new Date(Date.parse(attr.date));
            var month = "month-"+ (date.getMonth() + 1);
            this.set({"dateday"  : date.getDate(),
                      "datemonth": month.toLocaleString(),
                      "dateyear" : date.getFullYear()});
        }
    });

    var Meetups = Backbone.Collection.extend({
        model : Meetup,

        comparator: function(meetup) {
            return Date.parse(meetup.get("date"));
        },

        getNextOnes : function() {
            return new Meetups(this.filter(function(meetup) {
                return Date.parse(meetup.get("date")) > new Date().getTime();
            }));
        },

        getPreviousOnes: function() {
            return new Meetups(this.filter(function(meetup) {
                return Date.parse(meetup.get("date")) < new Date().getTime();
            }));
        }
    });

    var IndexView = Backbone.View.extend({
        template: function(context) {
            return Mustache.to_html($('#template-index').html(), context);
        },

        events: {
            "click .csstransforms3d a" : "transform"
        },

        transform: function() {
            $("#list").get(0).style.webkitTransform = 'rotateX(180deg) rotateY(180deg) rotateZ(180deg)';
        },

        render: function() {
            $(this.el).html(this.template({
                l: function(s) {
                    return function(text, render) {
                        return render(text.toLocaleString());
                    }
                },
                formatdate : function(text, render) {
                    return text;
                },
                next: this.collection.getNextOnes().first().toJSON(),
                previous: this.collection.getPreviousOnes().toJSON()
            }));
        }

    });
    var ParisJS = Backbone.Controller.extend({
        routes: {
            "":                 "index", // #/
        },

        initialize: function() {
            if (Modernizr.localstorage && window.localStorage.lang) {
                String.locale = window.localStorage.lang;
            }
            var that = this;
            $(".switch_languages li").click(function(e) {
                // save current selection
                String.locale = $(this).data("lang");
                // save for future visits
                if (Modernizr.localstorage) {
                    window.localStorage.lang = String.locale;
                }
                // redraw current page
                // FIXME: it works currently because we have only one route ...
                that[that.routes[""]]();
            });
        },

        index: function() {
            var meetups  = new Meetups();
            $.getJSON('/meetups.json', function(result) {
                _.each(result, function(r) {
                    meetups.add(new Meetup(r));
                });
                new IndexView({el         : $(".content"),
                               collection : meetups}).render();
            });
        }
    });

    new ParisJS();
    Backbone.history.start();
});
