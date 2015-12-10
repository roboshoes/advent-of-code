var input = require( "fs" ).readFileSync( __dirname + "/input.txt", "utf-8" );

var length = input.length;
var houses = {};
var current = {
    x: 0,
    y: 0
};

function setHouse( x, y ) {
    var hash = x + "," + y;

    houses[ hash ] = true;
}

function move( direction ) {
    switch ( direction ) {
        case "^": current.y--; break;
        case "v": current.y++; break;
        case "<": current.x--; break;
        case ">": current.x++; break;
    }

    setHouse( current.x, current.y );
}

setHouse( 0, 0 );

for ( var i = 0; i < length; i += 2 ) move( input[ i ] );

current.x = current.y = 0;

for ( var i = 1; i < length; i += 2 ) move( input[ i ] );

console.log( Object.keys( houses ).length );
