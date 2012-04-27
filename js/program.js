var Spin = {};

Spin.init = function(target) {
  var opts = {
    lines: 16,
    length: 9,
    width: 2,
    radius: 12,
    color: '#DC4084',
    speed: 1,
    trail: 100,
    shadow: true
  };

  this.spinner = new Spinner(opts).spin(target);
};

Spin.stop = function() {
  this.spinner.stop();
};


/**
 * Backbone App
 */
var App = {
    models: {},
    views: {},
    collections: {}
};

/**
 * Tall model
 */
App.models.Talk = Backbone.Model.extend({
    // normal talk (10-20 min)
    TYPE_NORMAL     : 1,
    // lightning talk
    TYPE_SHORT      : 2,

    // accepted scheduled for the next parisjs
    STATE_ACCEPTED  : 'Accepte',
    // can be scheduled on the next parisjs by not yet accepted
    STATE_NEXT      : 'Prochain',
    // cannot be scheduled on the next parisjs
    STATE_NEXT_NEXT : 'Suivant',

    defaults: {
        title: '',
        authors: '',
        contacts: '',
        type: '',
        abstract: '',
        state: ''
    },

    /**
     * Parse the json returned by the spreadsheet
     */
    parse: function(response) {
        var row = response.c;
        var title = (row[1]) ?row[1].v : "";
        var authors = (row[2])  ? row[2].v : "";
        var contacts = (row[3]) ? row[3].v : "";
        var type = (row[4] && row[4].v.indexOf("Lightning") === 0) ? this.TYPE_SHORT : this.TYPE_NORMAL;
        var abstract = (row[5]) ? row[5].v: "";
        var state = (row[7]) ? row[7].v : this.STATE_NEXT_NEXT;
        return {
            title: title,
            authors: authors,
            contacts: contacts,
            type: type,
            abstract: abstract,
            state: state
        };
    }
});

/**
 * Collection of talks
 */
App.collections.Talks = Backbone.Collection.extend({
    model: App.models.Talk,

    /**
     * Return only accepted prezs
     */
    accepted: function() {
        return this.where({state: App.models.Talk.prototype.STATE_ACCEPTED});
    },

    /**
     * Return all non-accepted prezs
     */
    submitted: function() {
        return this.filter(function(talk) {
            return talk.get('state') != App.models.Talk.prototype.STATE_ACCEPTED;
        });
    },

    /**
     * Parse the json returned by the spreadsheet
     */
    parse: function(response) {
        // the easiest way :(
        var data = JSON.parse(response.toJSON());
        return data.rows;
    },

    comparator: function(talk) {
        return talk.get('type');
    },

    /**
     * Custom sync for google spreadsheets
     */
    sync: function(method, model, options) {
        if (method != "read") throw new Error("not (yet) supported");
        var query = new google.visualization.Query('http://spreadsheets.google.com/tq?key=0AnLhUwtBNx3zdDNDbU93eUh1NXpCenNXT1FqQksxZmc&pub=1');
        query.send(function(response) {
            if (response.isError()) options.error(response);
            else options.success(response.getDataTable());
        });
    }
});

/**
 * Render a talk
 */
App.views.Talk = Backbone.View.extend({
    tagName: 'article',
    className: 'prez',

    render: function() {
        var template = _.template($('#talk-template').html());
        var data = this.model.toJSON();
        data.abstract = data.abstract.replace(/\n/g, '<br/>');
        this.$el.append(template(data));

        if (this.model.get('type') === this.model.TYPE_SHORT)
            this.$el.addClass("lightning");

        return this;
    }
});
/**
 * Render a collection of talks
 */
App.views.Talks = Backbone.View.extend({
    initialize: function() {
        this.collection.bind('reset', this.render, this);
    },

    render: function() {
        this.collection.each(_.bind(this.renderTalk, this));
        return this;
    },

    renderTalk: function(talkModel) {
        var talkView = new App.views.Talk({model: talkModel}).render();
        this.$el.append(talkView.el);
    }
});

/**
 * The basic router of the page
 */
App.Program = Backbone.Router.extend({

    routes: {
        "": "index",
        "submitted": "submitted"
    },

    initialize: function() {
        Spin.init($('#spin').get(0));
        $('.switch').hide();
        this.talks = new App.collections.Talks();
        this.talksAccepted = new App.collections.Talks();
        this.talksSubmitted = new App.collections.Talks();
        this.talks.on('reset', this.onReset, this);
        this.talks.fetch();
        new App.views.Talks({collection: this.talksAccepted,
                             el: $('#prezs-scheduled .prezs').get(0)}).render();

        new App.views.Talks({collection: this.talksSubmitted,
                             el: $('#prezs-submitted .prezs').get(0)}).render();
    },

    onReset: function() {
        $("#spin").hide();
        Spin.stop();
        this.talksAccepted.reset(this.talks.accepted());
        if (this.talksAccepted.length == 0) {
            // show only submitted talks
            this.submitted();
        } else {
            $('.switch').show();
        }
        this.talksSubmitted.reset(this.talks.submitted());
    },

    index: function() {
        $('#prezs-scheduled').show();
        $('#prezs-submitted').hide();
    },

    submitted: function() {
        $('#prezs-scheduled').hide();
        $('#prezs-submitted').show();
    }
});

/**
 * Callback when the google jsapi is loaded
 */
function _google_on_loaded() {
    google.load("visualization", "1");
    google.setOnLoadCallback(function() {
        new App.Program();
        Backbone.history.start();
    });
}
