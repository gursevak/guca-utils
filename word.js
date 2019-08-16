const fs = require('fs');
const jsdom = require('jsdom');
const jquery = require('jquery');
const anvaad = require('anvaad-js')

fs.readFile('pothi.html', 'utf8', (err, data) => {
    const dom = new jsdom.JSDOM(data);
    const $ = jquery(dom.window);
    $( "span" ).each(function( index ) {
    	$( this ).html( anvaad.translit($( this ).text(), 'devnagri') );
    });
    // $('span').html('');
    fs.writeFile('output.html', dom.serialize(), err => {
        console.log('done');
    });
});
