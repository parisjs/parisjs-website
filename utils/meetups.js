#!/usr/bin/env node
/**
 * You don't want to manage the list of events/talks/people by hands? This script can help you.
 *
 * It's a two way parser:
 *  - read index.html and extract the list of events/talks/people and output JSON on stdout
 *  - read a JSON from stdin and update index.html
 *
 * Why JSON?
 *  Because there is no good yaml parser in javascript, and it was out of the scope for now
 *
 * How to use it?
 *  node utils/meetups.js parse > meetup.json
 *  node utils/meetups.js update < meetup.json
 */

var jsdom = require('jsdom')
  , fs = require('fs')
  , _ = require('underscore')
;

if (process.argv.length == 3) {
    if (process.argv[2] == 'parse') {
        return parseMeetups();
    } else if (process.argv[2] == 'update') {
        return updateMeetups();
    }
}
console.log('usage');
console.log('node utils/meetups.js parse');
console.log('node utils/meetups.js update');
return;

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

function updateMeetups() {
    readStdin(function(data) {
        var meetups = JSON.parse(data);
        var html = generateHTMLFor(meetups);
        var website = fs.readFileSync(__dirname + '/../index.html', 'utf8');

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
                      console.log(output.trim());
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

function parseMeetups() {
    var website = fs.readFileSync(__dirname + '/../index.html', 'utf8');

    var jquery = 'http://code.jquery.com/jquery-1.5.min.js';
    jsdom.env(website, [jquery],
              function(errors, window) {
                  if (errors) {
                      return console.error('jsdom error', errors)
                  }
                  var $ = window.$;
                  var meetups = extractMeetups($);
                  console.log(JSON.stringify(meetups));
                  //var normalization = normalizeMeetups(meetups);
                  //console.log(JSON.stringify(normalization));
              });
}

/**
 * The hard part
 * find same authors to have a ref to each ones
 */
function normalizeMeetups(meetups) {
    var authors = {};
    // don't worry, this is only the first level of indentation
    meetups.forEach(function(meetup) {
        // don't worry, this is only the second level of indentation
        meetup.talks.forEach(function(talk) {
            // don't worry, this is only the last level of indentation
            talk.authors = talk.authors.map(function(author) {
                if (authors[author.name]) {
                    var previous = authors[author.name];
                    ['url', 'avatar'].forEach(function(property) {
                        if (author[property] != previous[property])
                            console.error('grrrr! '+ property +' mismatch for '+ author.name);
                    });
                }
                authors[author.name] = author;
                return author.name;
            });
        })
    });
    return {
        meetups: meetups,
        authors: authors
    }
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
