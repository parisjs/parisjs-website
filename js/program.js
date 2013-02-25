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

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: true
});

/**
 * Backbone App
 */
var App = {
    models: {},
    views: {},
    collections: {}
};

/**
 * Talk model
 */
App.models.Talk = Backbone.Model.extend({
    // normal talk (10-20 min)
    TYPE_NORMAL     : 1,
    // lightning talk
    TYPE_SHORT      : 2,

    defaults: {
        title: '',
        type: '',
        abstract: ''
    },

    /**
     * Parse the json returned by the spreadsheet
     */
    parse: function(card) {
        var type = _(card.labels).chain().pluck('color').indexOf('yellow').value() == -1 ? this.TYPE_NORMAL : this.TYPE_SHORT;
        return {
            title: card.name,
            type: type,
            abstract: card.desc
        };
    }
});

/**
 * Collection of talks
 */
App.collections.Talks = Backbone.Collection.extend({
    model: App.models.Talk,

    comparator: function(talk) {
        return talk.get('type');
    }
});

/**
 *
 */
App.models.Board = Backbone.Model.extend({
    /**
     * Custom sync for trello
     */
    sync: function(method, model, options) {
        if (method != "read") throw new Error("not (yet) supported");
        Trello.get('/board/4f7d53a2cbcb1a6878c92c2e', {
            cards: 'visible',
            lists: 'open'
        }, function(data) {
            options.success(model, data, options);
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
        this.collection.on('reset', this.render, this);
    },

    render: function() {
        this.$el.append($('<h1>').text(this.options.title));
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
        ""     : "index",
        "add"  : "add",
        ":list": "show"
    },

    initialize: function() {
        Spin.init($('#spin').get(0));
        $('.switch').hide();
        this.board = new App.models.Board();
        this.board.fetch({
            success: _.bind(this.onSuccess, this)
        });
    },

    onSuccess: function() {
        $("#spin").remove();
        Spin.stop();

        this._renderSwitch();
        this._renderLists();
        $('.switch').show();
        this.show(_(this.board.get('lists')).last().id);
    },

    _renderSwitch: function() {
        _(this.board.get('lists')).each(function(list, idList) {
            // remove the 'infos' list
            if (list.id == '4f7d53a2cbcb1a6878c92c32') return;
            $("#content .switch").append($('<a>').attr({
                href: "#"+ list.id
            }).text(list.name)).append(' ');
        });
    },

    _renderLists: function() {
        var board = this.board;
        var lists = _(this.board.get('cards')).groupBy('idList');
        _(lists).each(function(list, idList) {
            // remove the 'infos' list
            if (idList == '4f7d53a2cbcb1a6878c92c32') return;
            var talks = new App.collections.Talks();
            var view = new App.views.Talks({
                id: idList,
                title: _(board.get('lists')).find(function(list) {
                    return list.id == idList;
                }).name,
                className: 'list',
                collection: talks.reset(list, {parse: true})
            }).render();
            view.$el.appendTo($('#content'));
        });
    },

    add: function() {
        this.show(null);
        $('#content').append($('<iframe>').attr({
            src: 'http://parisjstalks-francois2metz.dotcloud.com/',
            width: '100%'
        }));
    },

    show: function(id) {
        $('#content .list').hide();
        $('#content #'+ id).show();
        $('#content iframe').remove();
    }
});

$(function() {
    new App.Program();
    Backbone.history.start();
});
