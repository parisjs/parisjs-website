#!/usr/bin/env node
/**
 * You don't want to manage the list of events/talks/people by hands? This script can help you.
 *
 * It's a two way parser:
 *  - read index.html and extract the list of events/talks/people and output JSON on stdout
 *  - read a JSON from stdin and output the new HTML on stdout
 *
 * Dependencies:
 *  * node
 *  * npm (bundled with node \o/)
 *
 * Install deps: npm install
 *
 * Why JSON?
 *  Because there is no good yaml parser in javascript, and it was out of the scope for now
 *
 * How to use it?
 *  node utils/meetups.js parse > meetups.json
 *  node utils/meetups.js update < meetups.json
 *
 * Examples:
 * You want to update the HTML of all talks
 *  1. Parse meetups and export to json
 *      node utils/meetups.js parse > meetups.json
 *  2. edit utils/template_meetup.html and update it (the hard part)
 *  3. Generate the new html of the page
 *      node utils/meetups.js update < meetups.json > index2.html
 *  4. Move the generated HTML to index.html
 *      mv index2.html index.html
 *
 * You want to extract talks informations from your code
 *  1. var parisjs = require('parisjs-website');
 *  2. parisjs.parseMeetups('http://parisjs.org', function(meetups) {})
 */

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
