(function($){

var log = function() {
    if(this.console) {
        console.log( Array.prototype.slice.call(arguments) )
    }
};

var MONTH = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var ParisJS = {
    ICAL: "http://h2vx.com/ics/www.eventbrite.com/org/862067525"
};

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

    $(".meetup").click(function (evt) {
        evt.preventDefault();
        $(evt.target).parent()
                     .next()
                     .slideToggle("slow");
    });

    $(".meetup-content").hide()
               .first()
               .slideToggle("slow");
};

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
                if (this.status == "Completed") { return; }
                nextEvent = this;
            });
            var $event = $("#event"),
                event;

            if (nextEvent) {
                event = $("#eventTmpl").tmpl({event: nextEvent});
            } else {
                event = $("#emptyEventTmpl").tmpl();
            }
            $event.html(event);
            Spin.stop();
        }
    });
};

var Twitter = {
    max: 6,
    last_id: null
};

Twitter.init = function() {
    this.$twitter = $("#twitter-panel");
    Twitter.refresh();
    setInterval(Twitter.refresh, 10 * 1000);
};

Twitter.refresh = function() {
    $.jsonp({
        url: "http://search.twitter.com/search.json?q=parisjs&rpp=8"
            + "&result_type=recent"
            + (Twitter.last_id ? "&since_id=" + Twitter.last_id : ""),
        dataType: "jsonp",
        callbackParameter: "callback",
        success: function(result) {
            $(result.results.reverse()).each(function(){
                if (this.id != Twitter.last_id)
                    Twitter.addTwitt(this, Twitter.last_id == null);
            });
            if (result.results.length > 0) {
                Twitter.last_id = result.results[0].id;
            }
        },
        error: function(XHR, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
};

Twitter.addTwitt = function(twitt, initial) {
    while ($(".tweet-box", this.$twitter).size() >= this.max) {
        $(".tweet-box", this.$twitter).last().remove();
    }
    
    var newTwitt = $("#tweetTmpl").tmpl({ 
        tweet: { 
            user : twitt.from_user ,
            text : Utils.linkify(twitt.text),
            time : (new Date(twitt.created_at)).toDateString() 
        }
    });

    this.$twitter.prepend(newTwitt);

    if (initial) newTwitt.show();
    else newTwitt.slideDown();
};

var Utils = {
    linkify: function(text) {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(exp,"<a href='$1'>$1</a>")
                 .replace(/@(\w+)/ig, "<a href='http://twitter.com/$1'>@$1</a>")
                 .replace(/(#[^\s]+)/ig, "<a href='http://twitter.com/search?q=$1'>$1</a>");
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

window.Utils = Utils;
window.ParisJS = ParisJS;

$(function() {
    var parisJSTmpl = $('script#parisJSTmpl').tmpl(parisJS);
	$(parisJSTmpl).appendTo('div#meetups ul:first');
	Spin.init($("#event").get(0));
    Toggle.init();
    Meetups.init();
    Twitter.init();
});

})(jQuery);
