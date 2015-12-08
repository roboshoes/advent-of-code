var input = require( "fs" ).readFileSync( __dirname + "/input.txt", "utf-8" );

var floor = 0;

for ( var i = 0; i < input.length; i++ ) {
    floor += ( input[ i ] === "(" ) ? 1 : -1;
}

console.log( floor );