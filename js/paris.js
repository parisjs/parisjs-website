(function(){

$(function() {

    $.ajax({
        url: "http://pipes.yahoo.com/pipes/pipe.run?_id=8c2a8882b12a0c758e4e993c08f12926&_render=json",
        jsonp: "_callback",
        success: function(result) {
            var events = result.value.items[0].event;
            var $meetups = $("#meetups");
            var $old = $("#oldmeetups");
            $(events).each(function(){
                if (this.status == "Completed") {
                    $old.append(makeEvent(this, false));
                } else {
                    $meetups.append(makeEvent(this, true));
                }
            });
        }
    });

});

function makeEvent(event, inscription) {
    return "<div class='vevent'>"
    + "<h3>" + event.title + "</h3>"
        + "<p><span class='dtstart'>" + event.start_date.split(" ")[0] + "</span> at "
        + "<span class='location'>" + event.venue.name + "</span>"
        + (inscription ? (" - <a href='" + event.url + "'>inscription</a></p>") : "")
    + "</div>";
}

})();
