# Parisjs.org utils

You don't want to manage the list of events/talks/people by hands? This script can help you.

It's a two way parser:

- read index.html and extract the list of events/talks/people and output JSON on stdout
- read a JSON from stdin and output the new HTML on stdout

Why JSON? Because there is no good yaml parser in javascript, and it was out of the scope for now

## Dependencies:

* node
* npm (bundled with node \o/)

## Install

    npm install

## Usage

Parse the list of talks and output a json

    node utils/meetups.js parse > meetups.json

Write the list of talks and output HTML

    node utils/meetups.js update < meetups.json

## Examples

### You want to update the HTML of all talks

1. Parse meetups and export to json

    node utils/meetups.js parse > meetups.json

2. edit utils/template_meetup.html and update it (the hard part)
3. Generate the new html of the page

    node utils/meetups.js update < meetups.json > index2.html

4. Move the generated HTML to index.html

    mv index2.html index.html

### You want to extract talks informations from your code

Install the package

    npm install parisjs-website

And then in your code

    var parisjs = require('parisjs-website');
    parisjs.parseMeetups('http://parisjs.org', function(meetups) {})
