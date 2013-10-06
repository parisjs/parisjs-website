(function($, _){
var log = function() {
    if(this.console) {
        console.log( Array.prototype.slice.call(arguments) )
    }
};

var MONTH = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var Spin = { };

Spin.init = function (target) {
    var opts = {
      lines: 16,
      length: 9,
      width: 2,
      radius: 12,
      color: '#FFFFFF',
      speed: 1,
      trail: 100,
      shadow: true
    };

    this.spinner = new Spinner(opts).spin(target);
};

Spin.stop = function () {
    this.spinner.stop();
};

var Toggle = {};

Toggle.init = function () {

    $(".meetup-title").click(function (evt) {
        evt.preventDefault();
        $(this).parent().find('.meetup-content').slideToggle("slow");
    });

    $(".meetup-content").hide();

    var hash = window.location.hash;
    if (-1 != hash.indexOf("#meetup-")) {
        //Open selected meetup
        $('.meetup-content', hash).toggle();
    } else {
        //Open first by default
        $(".meetup-content")
            .first()
            .toggle();
    }
};

var Meetups = {};

Meetups.init = function() {
    this.load(0);
}

Meetups.load = function(tries) {
    var $event = $("#event");

    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'https%3A%2F%2Fwww.eventbrite.com%2Fxml%2Forganizer_list_events%3Fapp_key%3DOTlkMWFkODNjYThl%26id%3D856075'&format=json&diagnostics=true&callback=?",
        error: function (jqXHR, status, errorThrown) {
            $event.html(_.template($("#emptyEventTmpl").html(), {}));
            Spin.stop();
        },
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

            var nextEvent = _(events).find(function(evt){
                return evt.status == "Live";
            });

            $event.html(nextEvent ? _.template($("#eventTmpl").html(), {event: nextEvent}) : _.template($("#emptyEventTmpl").html(), {}));
            Spin.stop();
        }
    });
};

window.Utils = {
    linkify: function(text) {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(exp,"<a href='$1'>$1</a>")
                 .replace(/@(\w+)/ig, "<a target='_blank' href='http://twitter.com/$1'>@$1</a>")
                 .replace(/#([^\s]+)/ig, "<a target='_blank' href='http://twitter.com/search?q=%23$1'>#$1</a>");
    },
    formatDate: function(date) {
        var hour = date.split(" ")[1];
        date = date.split(" ")[0];
        var year = date.split("-")[0];
        var month = date.split("-")[1];
        var day = date.split("-")[2];
        return MONTH[month -1] + " " + day + ", " + year + " "+ hour;
    }
};

$(function() {
    Spin.init($("#event").get(0));
    Toggle.init();
    Meetups.init();
});

(function pickAndAddRandomCommunities($, d, _){
    var meetups = _(d).chain().filter(function(e){return e.continent!="Conference"; }).shuffle().first(10).value(),
        $place = $("#communities ul"),
        tmpl = _.template($("#communityTmpl").html());
    $place.html(tmpl({meetups : meetups}));
})($, data || [], _);

$("a[href='']").attr("href","http://www.youtube.com/watch?v=oHg5SJYRHA0")

})(jQuery, _);
