(function($){

var log = function() {
    if(this.console) {
        console.log( Array.prototype.slice.call(arguments) )
    }
}

var MONTH = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var ParisJS = {
    ICAL: "http://h2vx.com/ics/www.eventbrite.com/org/862067525"
}

var Nav = {
    init: function() {
        var activeTarget,
        $window = $(window),
        nav = $('body .topbar li a'),
        targets = nav.map(function () {
            return $(this).attr('href');
        }),
        offsets = $.map(targets, function (id) {
            return $(id).offset().top;
        });


        function setButton(id) {
            nav.parent("li").removeClass('active');
            $(nav[$.inArray(id, targets)]).parent("li").addClass('active');
        }

        function processScroll(e) {
            var scrollTop = $window.scrollTop() + 10, i;
            for (i = offsets.length; i--;) {
                if (activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1])) {
                    activeTarget = targets[i];
                    setButton(activeTarget);
                }
            }
        }

        nav.click(function () {
            processScroll();
        });

        processScroll();

        $window.scroll(processScroll);
    }
}

var Tabs = {
    init: function() {
        function getPanel(tab) {
            return $($('a', tab).attr('href'));
        }

        $('.panel').hide();
        $('.tabs li').click(function(e) {
            e.preventDefault();
            var previous = $('.tabs .active');
            getPanel(previous).hide();
            previous.removeClass('active');

            $(this).addClass('active');
            getPanel(this).show();
        });
        getPanel($('.tabs .active')).show();
        var tabs = $('.tabs');
        var oldTabs = this._olderTabs();
        if (oldTabs.size() == 0)
            return;
        oldTabs = oldTabs.add(oldTabs.first().prev());
        $('<li>').addClass('dropdown').append(
            $('<a>').addClass('dropdown-toggle').text('olders')
        ).append(
            $('<ul>').addClass('dropdown-menu').append(oldTabs)
        ).click(function() {
            $(this).toggleClass('open')
        }).appendTo(tabs);
    },

    _olderTabs: function() {
        var tabs = $('.tabs');
        var maxWidth = tabs.width();
        var actual = 0;
        return $('li', tabs).filter(function() {
            actual += $(this).width();
            if (actual > maxWidth) {
                return true;
            }
            return false;
        });
    }
}

var Meetups = {};

Meetups.init = function() {
    this.load(0);
}

Meetups.load = function(tries) {
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'https%3A%2F%2Fwww.eventbrite.com%2Fxml%2Forganizer_list_events%3Fapp_key%3DOTlkMWFkODNjYThl%26id%3D856075'&format=json&diagnostics=true",
        jsonp: "callback",
        success: function(result) {
            var events = [];
            if (typeof result == "string") {
                result = $.parseJSON(result);
            }
            if (result.query.count === 0 && tries < 2) {
                // Once in a while YQL sends an empty result: try again!
                Meetups.load(tries + 1);
                return;
            }

            if (result.query.count > 0) {
                events = events.concat(result.query.results.events.event);
            }
            var nextEvent = null;

            $(events).each(function(){
                if (this.status == "Completed") return;
                nextEvent = this;
            });
            var $event = $("#event");
            if (nextEvent) {
                $event.find('h2').append(": "+ nextEvent.title);
                var event = $("#eventTmpl").tmpl({event: nextEvent});
                $event.append(event);
                event.find(".span4").css('min-height', event.height());
            } else {
                $event.append("No event scheduled yet.");
            }
            $("#eventsSpinner").hide();
        }
    });
}

var Utils = {
    formatDate: function(date) {
        var hour = date.split(" ")[1];
        date = date.split(" ")[0];
        var year = date.split("-")[0];
        var month = date.split("-")[1];
        var day = date.split("-")[2];
        return MONTH[month -1] + " " + day + ", " + year + " "+ hour;
    }
}

window.Utils = Utils;
window.ParisJS = ParisJS;

$(function() {
    Meetups.init();
    Tabs.init();
    Nav.init();
});

})(jQuery);
