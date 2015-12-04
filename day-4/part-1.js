var md5 = require( "md5" );
var input = "ckczppom";

var current = "";
var revision = -1;

while ( current.substr( 0, 5 ) !== "00000" ) {
    revision++;
    current = md5( input + revision );
}

console.log( revision );