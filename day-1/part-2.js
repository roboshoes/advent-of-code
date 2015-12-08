var input = require( "fs" ).readFileSync( __dirname + "/input.txt", "utf-8" );

var position = 0;
var floor = 0;

for ( var i = 0; i < input.length; i++ ) {
    floor += ( input[ i ] === "(" ) ? 1 : -1;

    position++;

    if ( floor < 0 ) break;
}

console.log( position );
