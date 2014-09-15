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

    var signed_url = 'http://api.meetup.com/2/events?group_id=13092622&status=upcoming&order=time&limited_events=False&desc=false&offset=0&photo-host=public&format=json&page=20&fields=&sig_id=29041352&sig=dab9854bf9e82e510a2a2d37d36509e8d3317c68';
    var $event = $("#event");

    $.ajax({
        url: signed_url,
        type: 'GET',
        dataType: 'jsonp',
        success: function(responseData) {
            console.log(responseData);
            var nextEvent;
            var out = '';
            if (responseData && responseData.results && responseData.results.length > 0) {
                nextEvent = responseData.results[0];
                out = _.template($("#eventTmpl").html(), {event: nextEvent});
            } else {
                out = _.template($("#emptyEventTmpl").html(), {});
            }
            $event.html(out);
            Spin.stop();
        },
        error: function (jqXHR, status, errorThrown) {
            $event.html(_.template($("#emptyEventTmpl").html(), {}));
            Spin.stop();
        },
    });
};

window.Utils = {
    linkify: function(text) {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(exp,"<a href='$1'>$1</a>")
                 .replace(/@(\w+)/ig, "<a target='_blank' href='http://twitter.com/$1'>@$1</a>")
                 .replace(/#([^\s]+)/ig, "<a target='_blank' href='http://twitter.com/search?q=%23$1'>#$1</a>");
    },
    formatDate: function(timestamp) {
        console.log(timestamp);
        var d = new Date(timestamp);
        console.log(d);
        var hour = d.getHours();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        return MONTH[month] + " " + day + ", " + year + " "+ hour + "h";
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
