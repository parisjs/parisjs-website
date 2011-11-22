var Spin = { };

Spin.init = function (target) {
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

Spin.stop = function () {
    this.spinner.stop();
};

/****************************************************************
 *    Data and Parse
 ****************************************************************/

/**
 *
 */
function Talk (title, authors, contacts, type, abstract, state)
{
  this.title = title;
  this.authors = authors;
  this.contacts = contacts;
  this.type = type;
  this.abstract = abstract;
  this.state = state;
}

Talk.TYPE_NORMAL = 1;
Talk.TYPE_SHORT = 2;

Talk.STATE_ACCEPTED = 0;
Talk.STATE_NEXT = 1;
Talk.STATE_NEXT_NEXT = 2;

Talk.hasAcceptedTalk = false;

/**
 *
 */
function parseRow (row)
{
  var title = (row[1])?row[1].v:"";
  var authors = (row[2])?row[2].v:"";
  var contacts = (row[3])?row[3].v:"";
  var type =
    (row[4] && row[4].v.indexOf ("Lightning") === 0)?Talk.TYPE_SHORT:Talk.TYPE_NORMAL;
  var abstract = (row[5])?row[5].v:"";
  var state = (row[7])?row[7].v:"Suivant";
  if (state == "Accepte") state = Talk.STATE_ACCEPTED ;
  else if (state == "Prochain") state = Talk.STATE_NEXT;
  else if (state == "Suivant") state = Talk.STATE_NEXT_NEXT;
  
  if (state === 0) Talk.hasAcceptedTalk = true;
  
  return new Talk (title, authors, contacts, type, abstract, state);
}

/**
 *
 */
function parseDataTable (dataTable)
{
  var talks = [];
  
  // oui c un peu con mais au moins c plus simple a parser
  var data = JSON.parse (dataTable.toJSON ());

  for (var i = 0; i < data.rows.length; i++)
  {
    talks.push (parseRow (data.rows [i].c));
  }
  return talks;
}

/****************************************************************
 *    Gui generation
 ****************************************************************/

/**
 *
 */
function generateGUI (className, talks, state)
{
  var div_normal = document.querySelector (className + ' .normal');
  var div_lightning = document.querySelector (className + ' .lightning');
  
  for (var i = 0; i < talks.length; i++)
  {
    var talk = talks[i];
    if (talk.state != state) continue;
    
    var article = document.createElement ('article');
    
    if (talk.type === Talk.TYPE_SHORT)
    {
      article.className = "prez lightning";
      div_lightning.appendChild (article);
    }
    else
    {
      article.className = "prez";
      div_normal.appendChild (article);
    }

    var header = document.createElement ('header');
    header.innerHTML = "<h1>" + talk.title + "</h1>";
    article.appendChild (header);

    section = document.createElement ('section');
    article.appendChild (section);
    section.className = "authors";

    var span = document.createElement ('span');
    section.appendChild (span);
    span.innerHTML = talk.authors;

    span = document.createElement ('span');
    section.appendChild (span);
    span.innerHTML = talk.contacts;

    section = document.createElement ('section');
    article.appendChild (section);
    section.className = "abstract";
    section.innerHTML = "<pre>" + talk.abstract + "</pre>";
  }
}

/****************************************************************
 * Google Stuff
 ****************************************************************/

/**
 *
 */
function _google_on_laoded ()
{
  google.load("visualization", "1");
  google.setOnLoadCallback (requestData);
}

/**
 *
 */
function queryResult (response)
{
  Spin.stop ();
  document.getElementById ("spin").style.display = "none";
  document.getElementById ("content").style.visibility = "visible";
  
  if (response.isError())
  {
    alert ('Error in query: ' + response.getMessage() + ' ' + 
      response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable ();
  var talks = parseDataTable (data);
  if (Talk.hasAcceptedTalk)
  {
    generateGUI (".prez", talks, 0);
  }
  else
  {
    var prez = document.querySelector (".prez");
    var title = document.createElement ('h2');
    title.innerHTML = "Programme du prochain ParisJS en cours de finalisation...";
    prez.appendChild (title);
  }
  generateGUI (".prez.prochain", talks, 1);
  generateGUI (".prez.avenir", talks, 2);
}

/**
 *
 */
function requestData ()
{
  var query = new google.visualization.Query (    'http://spreadsheets.google.com/tq?key=0AnLhUwtBNx3zdDNDbU93eUh1NXpCenNXT1FqQksxZmc&pub=1');

  query.send (queryResult)
}

/****************************************************************
 *
 ****************************************************************/

/**
 *
 */
function init ()
{
  Spin.init (document.getElementById ("spin"));
}