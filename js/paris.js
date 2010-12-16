/**
 * ParisJS Website
 * (c) 2010 François de Metz
 * Released under GPL 3
 */
$(function() {
    var Meetup = Backbone.Model.extend({
        initialize : function(attr) {
            var date = this.getDate(attr.dtstart);
            var month = "month-"+ (date.getMonth() + 1);
            this.set({"dateday"  : date.getDate(),
                      "datemonth": month.toLocaleString(),
                      "dateyear" : date.getFullYear()});
        },

        getDate : function(date) {
            var date = date || this.get("dtstart");
            var dtstart = date.split('-');
            var d = new Date(dtstart[0], dtstart[1] - 1, dtstart[2]);
            d.setHours(23);
            return d;
        }
    });

    var Meetups = Backbone.Collection.extend({
        model : Meetup,

        comparator: function(meetup) {
            return meetup.getDate().getTime();
        },

        getNextOnes : function() {
            return new Meetups(this.filter(_.bind(function(meetup) {
                return meetup.getDate().getTime() > new Date().getTime();
            }, this)));
        },

        getPreviousOnes: function() {
            return new Meetups(this.filter(function(meetup) {
                return meetup.getDate().getTime() < new Date().getTime();
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
            var elt = $("#list").get(0);

            var onTransitionEnd = function (evt) {
                evt.stopPropagation();
                elt.style.webkitTransform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
                elt.removeEventListener('webkitTransitionEnd', onTransitionEnd, false);
            }
            elt.addEventListener('webkitTransitionEnd', onTransitionEnd, false);
            elt.style.webkitTransform = 'rotateX(180deg) rotateY(360deg) rotateZ(180deg) ';
        },

        render: function() {
            var next = this.collection.getNextOnes();
            $(this.el).html(this.template({
                l: function(s) {
                    return function(text, render) {
                        return render(text.toLocaleString());
                    }
                },
                formatdate : function(text, render) {
                    return text;
                },
                next: next.length !== 0 ? next.first().toJSON() : null,
                // FIXME Stupid fix: au moins on peut voire le prochain event sur IE...
                previous: $.browser.msie ? null : this.collection.getPreviousOnes().toJSON()
            }));
        }

    });
    var ParisJS = Backbone.Controller.extend({
        routes: {
            "":                 "index" // #/
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
            var meetups  = new Meetups();
            $('.content .vevent').each(function(i, el) {
                meetups.add(new Meetup({
                    "summary"  : $(this).find('.summary').text(),
                    "dtstart"  : $(this).find('.dtstart').text(),
                    "location" : $(this).find('.location').text(),
                    "url"      : $(this).find('.url').attr('href')
                }));
            });
            this.meetups = meetups;
        },

        index: function() {
            new IndexView({el         : $(".content"),
                           collection : this.meetups}).render();
        }
    });

    new ParisJS();
    Backbone.history.start();
});
