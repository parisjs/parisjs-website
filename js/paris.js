(function(){

if (typeof console == "undefined" || typeof console.log == "undefined")
    var console = { log: function() {} };

var MONTH = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var ICAL = "http://h2vx.com/ics/www.eventbrite.com/org/862067525";

var OLDEVENTS = [
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
];

$(function() {
    loadEvents(0);
    loadTwitter();
});

function loadEvents(tries) {
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'https%3A%2F%2Fwww.eventbrite.com%2Fxml%2Forganizer_list_events%3Fapp_key%3DOTlkMWFkODNjYThl%26id%3D856075'&format=json&diagnostics=true",
        jsonp: "callback",
        success: function(result) {
            var events = [];
            if (result.query.count == 0 && tries < 2) {
                // Once in a while YQL sends an empty result: try again!
                loadEvents(tries + 1);
                return;
            }
            if (result.query.count > 0) {
                events = events.concat(result.query.results.events.event);
            }
            events = events.concat(OLDEVENTS);
            var $meetups = $("#meetups");
            var $old = $("#oldmeetups");
            $(events).each(function(){
                if (this.status == "Completed") {
                    $old.append(oldEvent(this));
                } else {
                    $meetups.append(makeEvent(this));
                }
            });
        }
    });
}

function loadTwitter() {
    $.jsonp({
        url: "http://search.twitter.com/search.json?q=parisjs&rpp=10",
        dataType: "jsonp",
        callbackParameter: "callback",
        success: function(result) {
            console.log(result);
            var $twitter = $("#twitts");
            $(result.results).each(function(){
                $twitter.append(makeTwitt(this));
            });
        },
        error: function(XHR, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function makeEvent(event) {
    return "<div class='vevent'><p>"
        + '<a type="text/calendar" title="Download iCal" href="'+ICAL+'"><img src="img/calendar_add.gif"></a> '
        + "<strong class='dtstart'>" + formatDate(event.start_date.split(" ")[0]) + "</strong>: "
        +  event.title + " at "
        + "<span class='location'>" + event.venue.name + "</span>"
        + " - <a href='" + event.url + "'>inscription</a> "
        + "(" + event.num_attendee_rows + " participants)"
        + "</p>"
    + "</div>";
}

function makeTwitt(twitt) {
    var body = "<a href='http://twitter.com/"+twitt.from_user+"'>"+twitt.from_user+"</a>: " + linkify(twitt.text);
    return $("<div></div>").addClass("twittbox").html(body);
}

function oldEvent(event) {
    var date = event.start_date.split(" ")[0];
    return $('<li></li>').addClass("vevent")
        .append($('<a></a>').addClass('url').attr('href', event.url)
            .html('<span class="dtstart" title="'+date+'">'+formatDate(date)+'</span> - '
                  + '<span class="summary">' + event.title + '</span>')
        );
}

function linkify(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(exp,"<a href='$1'>$1</a>")
             .replace(/@(\w+)/ig, "<a href='http://twitter.com/$1'>@$1</a>")
             .replace(/(#[^\s]+)/ig, "<a href='http://twitter.com/search?q=$1'>$1</a>");
}

function formatDate(date) {
    var year = date.split("-")[0];
    var month = date.split("-")[1];
    var day = date.split("-")[2];
    return MONTH[month -1] + " " + day + ", " + year;
}

})();
