var Spin = {};

Spin.init = function (target)
{
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

Spin.stop = function ()
{
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

Talk.TEMPLATE = "<article class=\"prez\"><header><h1>{title}</h1></header><section class=\"authors\"><span>{authors}</span><span>{contacts}</span></section><section class=\"abstract\"><pre>{abstract}</pre></section></article>";

Talk.TYPE_NORMAL = 1;
Talk.TYPE_SHORT = 2;

Talk.STATE_ACCEPTED = 'Accepte';
Talk.STATE_NEXT = 'Prochain';
Talk.STATE_NEXT_NEXT = 'Suivant';

Talk.prototype.generateView = function ()
{
  var str = Talk.TEMPLATE;
  for (var key in this) str = str.replace ('{' + key + '}', this [key]);

  var div = document.createElement (div);
  div.innerHTML = str;
  div = div.firstElementChild;
    
  if (this.type === Talk.TYPE_SHORT) div.className = "prez lightning";
  return div;
}

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
  var state = (row[7])?row[7].v:Talk.STATE_NEXT_NEXT;
  
  if (state == Talk.STATE_ACCEPTED) Talk.hasAcceptedTalk = true;
  
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
    
    article = talk.generateView ();
    
    if (talk.type === Talk.TYPE_SHORT) div_lightning.appendChild (article);
    else div_normal.appendChild (article);
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
  
  if (response.isError ())
  {
    alert ('Error in query: ' + response.getMessage() + ' ' + 
      response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable ();
  var talks = parseDataTable (data);
  
  // Un programme est dispo
  if (Talk.hasAcceptedTalk)
  {
    generateGUI (".prez", talks, Talk.STATE_ACCEPTED);
    document.querySelector (".prez.prochain").style.visibility = "hidden";
    document.querySelector (".prez.avenir").style.visibility = "hidden";
  }
  // Pas de programme dispo, on affiche les propositions
  else
  {
    document.querySelector ("a.add_prez").style.visibility = "visible";
    document.querySelector (".prez").innerHTML = "<h2>Programme du prochain ParisJS en cours de finalisation...<h2>";

    generateGUI (".prez.prochain", talks, Talk.STATE_NEXT);
    generateGUI (".prez.avenir", talks, Talk.STATE_NEXT_NEXT);
  }
}

/**
 *
 */
function requestData ()
{
  var query = new google.visualization.Query (  'http://spreadsheets.google.com/tq?key=0AnLhUwtBNx3zdDNDbU93eUh1NXpCenNXT1FqQksxZmc&pub=1');

  query.send (queryResult)
}
