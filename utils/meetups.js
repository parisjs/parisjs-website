#!/usr/bin/env node

var jsdom = require('jsdom')
  , fs = require('fs')
  , _ = require('underscore')
;

function cli() {
    if (process.argv.length == 3) {
        var website = __dirname + '/../index.html';
        if (process.argv[2] == 'parse') {
            return parseMeetups(website, console.log);
        } else if (process.argv[2] == 'update') {
            return updateMeetups(website, console.log);
        }
    }
    console.log('usage');
    console.log('node utils/meetups.js parse');
    console.log('node utils/meetups.js update');
}
if (process.argv.length >= 2 && process.argv[1] == __filename)
    cli();

function readStdin(callback) {
    var data = "";
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function (chunk) {
        data += chunk;
    });
    process.stdin.on('end', function () {
        callback(data);
    });
}

function updateMeetups(website, callback) {
    readStdin(function(data) {
        var meetups = JSON.parse(data);
        var html = generateHTMLFor(meetups);
        var jquery = 'http://code.jquery.com/jquery-1.5.min.js';
        jsdom.env(website, [jquery],
                  function(errors, window) {
                      if (errors) {
                          return console.error('jsdom error', errors)
                      }
                      var $ = window.$;
                      var $meetups = $('#meetups > ul').empty().append("\n                    ").append($(html)).append("\n                ");
                      var document = window.document;
                      // remove the jquery inserted by jsdom
                      $('script:last', document).remove();
                      var output = document.doctype + document.innerHTML;
                      callback(output.trim());
                  });
    });
}

function generateHTMLFor(meetups) {
    var template = _.template(fs.readFileSync(__dirname +'/template_meetup.html', 'utf8'));
    var total = meetups.length;
    var html = meetups.map(function(meetup, num) {
        meetup.num = total - num;
        return template(meetup);
    });
    return "\n"+ html.join('')+"\n\n";
}

//

function parseMeetups(website, callback) {
    var jquery = 'http://code.jquery.com/jquery-1.5.min.js';
    jsdom.env(website, [jquery],
              function(errors, window) {
                  if (errors) {
                      return console.error('jsdom error', errors)
                  }
                  var $ = window.$;
                  var meetups = extractMeetups($);
                  callback(JSON.stringify(meetups));
              });
}

/**
 * Return a raw object of all events and talks
 */
function extractMeetups($) {
    var $meetups = $('#meetups li.meetup');
    var meetups = [];
    $meetups.each(function() {
        var $meetup = $(this);
        var meetup = {
            title: $('.meetup-title', this).text(),
            talks: []
        };
        var $talks = $meetup.find('.meetup-content').find('> li');
        meetup.talks = extractTalks($, $talks);
        meetups.push(meetup);
    });
    return meetups;
}

function extractTalks($, $talks) {
    return $talks.toArray().map(function(talk) {
        var $talk = $(talk);

        function getLinks(regexp) {
            return $talk.find('.descTalk a').filter(function() {
                return $(this).text().match(regexp);
            }).map(function() {
                return $(this).attr('href');
            }).toArray();
        }

        var slides = getLinks(/slide/i);
        var videos = getLinks(/(video|part)/i);
        var projects = getLinks(/project/i);

        return {
            title: $talk.find('.titleTalk').text().trim(),
            slides: slides,
            videos: videos,
            projects: projects,
            authors: $talk.find('.authorTalk a').map(function() {
                return {
                    name: $(this).text(),
                    url: $(this).attr('href'),
                    // sorry boy, in case of multiple authors, we have only one avatar
                    avatar: $talk.find('.avatar img').attr('src')
                }
            }).toArray()
        }
    });
}

exports.parseMeetups = parseMeetups;
