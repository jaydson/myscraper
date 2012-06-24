
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'MyScraper' })
};

exports.scraper = function(req, res) {
	var scraper = require('scraper'),
		url = req.body.url,
		selector = req.body.selector,
		type = req.body.type;
	
    console.log('Scraping '+ url );
	scraper(url, function (err, $) {
        var types = {
            json : 'text/json',
            html : 'text/plain'
        },
        htmlString = $(selector).html(),
        data = '';
        
        res.header('Content-Type', types[type]);
        if (type === 'json') {
            data = { data : htmlString };
        } else if (type === 'html') {
            data = htmlString;
        }        

        if(data !== '') {
            res.send(data);
        }
	});

};