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

$.fn.reverse = function(fn) {
   var i = this.length;
   while(i) {
       i--;
       fn.call(this[i], i, this[i])
   }
};


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

        console.log(targets, nav);
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
        $('.tabs li').click(function() {
            var previous  = $(this).parent().find('.active');
            getPanel(previous).hide();
            previous.removeClass('active');

            $(this).addClass('active');
            getPanel(this).show();

            return false;
        });
        getPanel($('.tabs .active')).show();
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
            var $meetups = $("#meetups");
            $(events).reverse(function(){
                if (this.status == "Completed") return;
                $meetups.append($("#eventTmpl").tmpl({event: this}));
            });
            $("#eventsSpinner").hide();
            $("#Events").show();
        }
    });
}

var Utils = {
    linkify: function(text) {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(exp,"<a href='$1'>$1</a>")
                 .replace(/@(\w+)/ig, "<a href='http://twitter.com/$1'>@$1</a>")
                 .replace(/(#[^\s]+)/ig, "<a href='http://twitter.com/search?q=$1'>$1</a>");
    },
    formatDate: function(date) {
        var year = date.split("-")[0];
        var month = date.split("-")[1];
        var day = date.split("-")[2];
        return MONTH[month -1] + " " + day + ", " + year;
    }
}

window.Utils = Utils;

$(function() {
    //Meetups.init(); // FIXME
    Tabs.init();
    Nav.init();
});

})(jQuery);
