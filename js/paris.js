(function(){

if (typeof console == "undefined" || typeof console.log == "undefined")
    var console = { log: function() {} };

var MONTH = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var ParisJS = {
    ICAL: "http://h2vx.com/ics/www.eventbrite.com/org/862067525",
    OLDEVENTS: [
        {
            title: "ParisJS Meetup 2",
            start_date: "2010-11-24",
            url: "http://www.hackingparty.org/event/hackingparty_parisjs_fr_paris_100",
            status: "Completed"
        },
        {
            title: "jscamp0",
            start_date: "2010-10-20",
            url: "http://barcamp.org/w/page/30731863/jscamp0",
            status: "Completed"
        },
        {
            title: "First ParisJS Meetup",
            start_date: "2010-10-12",
            url: "http://lanyrd.com/2010/first-js-meetup-paris/",
            status: "Completed"
        }
    ]
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
            if (result.query.count === 0 && tries < 2) {
                // Once in a while YQL sends an empty result: try again!
                Meetups.load(tries + 1);
                return;
            }
            if (result.query.count > 0) {
                events = events.concat(result.query.results.events.event);
            }
            events = events.concat(ParisJS.OLDEVENTS);
            var $meetups = $("#meetups");
            var $old = $("#oldmeetups");
            $(events).each(function(){
                if (this.status == "Completed") {
                    $old.append(Meetups.oldEvent(this));
                } else {
                    $meetups.append($("#eventTmpl").tmpl({event: this}));
                }
            });
            $("#eventsSpinner").hide();
            $("#events").show();
        }
    });
}

Meetups.oldEvent = function(event) {
    var date = event.start_date.split(" ")[0];
    return $('<li></li>').addClass("vevent")
        .append($('<a></a>').addClass('url').attr('href', event.url)
            .html('<span class="dtstart" title="'+date+'">'+Utils.formatDate(date)+'</span> - '
                  + '<span class="summary">' + event.title + '</span>')
        );
}


var Twitter = {};

Twitter.init = function() {
    Twitter.refresh();
    setInterval(Twitter.refresh, 10 * 1000);
}

Twitter.refresh = function() {
    $.jsonp({
        url: "http://search.twitter.com/search.json?q=parisjs&rpp=8",
        dataType: "jsonp",
        callbackParameter: "callback",
        success: function(result) {
            console.log(result);
            var $twitter = $("#twitts");
            $(".twittbox").remove();
            $(result.results).each(function(){
                $twitter.append(Twitter.makeTwitt(this));
            });
        },
        error: function(XHR, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

Twitter.makeTwitt = function(twitt) {
    var body = "<a href='http://twitter.com/"+twitt.from_user+"'>"+twitt.from_user+"</a>: " + Utils.linkify(twitt.text);
    return $("<div></div>").addClass("twittbox").addClass("shadow").html(body);
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
window.ParisJS = ParisJS;

$(function() {
    Meetups.init();
    Twitter.init();
});

})();
