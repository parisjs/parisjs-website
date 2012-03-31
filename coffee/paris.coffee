(($, _) ->
  log = ->
    console.log Array::slice.call(arguments)  if @console

  MONTH = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
  Spin = {}
  Spin.init = (target) ->
    opts =
      lines: 16
      length: 9
      width: 2
      radius: 12
      color: "#FFFFFF"
      speed: 1
      trail: 100
      shadow: true

    @spinner = new Spinner(opts).spin(target)

  Spin.stop = ->
    @spinner.stop()

  Toggle = {}
  Toggle.init = ->
    $(".meetup-title").click (evt) ->
      evt.preventDefault()
      $(this).parent().find(".meetup-content").slideToggle "slow"

    $(".meetup-content").hide()
    hash = window.location.hash
    unless -1 is hash.indexOf("#meetup-")
      $(".meetup-content", hash).toggle()
    else
      $(".meetup-content").first().toggle()

  Meetups = {}
  Meetups.init = ->
    @load 0

  Meetups.load = (tries) ->
    $event = $("#event")
    $.ajax
      dataType: "json"
      type: "GET"
      url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'https%3A%2F%2Fwww.eventbrite.com%2Fxml%2Forganizer_list_events%3Fapp_key%3DOTlkMWFkODNjYThl%26id%3D856075'&format=json&diagnostics=true&callback=?"
      error: (jqXHR, status, errorThrown) ->
        $event.html _.template($("#emptyEventTmpl").html(), {})
        Spin.stop()

      success: (result) ->
        events = []
        result = $.parseJSON(result)  if typeof result is "string"
        if result.query.count is 0 and tries < 2
          Meetups.load tries + 1
          return
        events = events.concat(result.query.results.events.event)  if result.query.count > 0
        nextEvent = null
        $(events).each ->
          return  if @status is "Completed"
          nextEvent = this

        $event.html (if nextEvent then _.template($("#eventTmpl").html(),
          event: nextEvent
        ) else _.template($("#emptyEventTmpl").html(), {}))
        Spin.stop()

  Twitter =
    max: 6
    last_id: null

  Twitter.init = ->
    @$twitter = $("#twitter-panel")
    Twitter.refresh()
    setInterval Twitter.refresh, 10 * 1000

  Twitter.refresh = ->
    $.jsonp
      url: "http://search.twitter.com/search.json?q=parisjs OR pariscoffee&rpp=8" + "&result_type=recent" + (if Twitter.last_id then "&since_id=" + Twitter.last_id else "")
      dataType: "jsonp"
      callbackParameter: "callback"
      success: (result) ->
        $(jQuery.makeArray(result.results).reverse()).each ->
          Twitter.addTwitt this, not Twitter.last_id?  unless @id is Twitter.last_id

        Twitter.last_id = result.max_id  if result.results.length > 0

      error: (XHR, textStatus, errorThrown) ->
        log textStatus
        log errorThrown

  Twitter.addTwitt = (twitt, initial) ->
    $(".tweet-box", @$twitter).last().remove()  while $(".tweet-box", @$twitter).size() >= @max
    newTwitt = _.template($("#tweetTmpl").html(),
      tweet:
        user: twitt.from_user
        text: Utils.linkify(twitt.text)
        time: (new Date(twitt.created_at)).toDateString()
        id: twitt.id_str
    )
    @$twitter.prepend newTwitt
    if initial
      $(newTwitt).show()
    else
      $(newTwitt).slideDown()

  window.Utils =
    linkify: (text) ->
      exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/g
      text.replace(exp, "<a href='$1'>$1</a>").replace(/@(\w+)/g, "<a target='_blank' href='http://twitter.com/$1'>@$1</a>").replace /#([^\s]+)/g, "<a target='_blank' href='http://twitter.com/search?q=%23$1'>#$1</a>"

    formatDate: (date) ->
      hour = date.split(" ")[1]
      date = date.split(" ")[0]
      year = date.split("-")[0]
      month = date.split("-")[1]
      day = date.split("-")[2]
      MONTH[month - 1] + " " + day + ", " + year + " " + hour

  $ ->
    Spin.init $("#event").get(0)
    Toggle.init()
    Meetups.init()
    Twitter.init()

  (pickAndAddRandomCommunities = ($, d, _) ->
    meetups = _(d).chain().filter((e) ->
      e.continent isnt "Conference"
    ).shuffle().first(10).value()
    $place = $("#communities ul")
    tmpl = _.template($("#communityTmpl").html())
    $place.html tmpl(meetups: meetups)
  ) $, data or [], _
  $("a[href='']").attr "href", "http://www.youtube.com/watch?v=oHg5SJYRHA0"
) jQuery, _
