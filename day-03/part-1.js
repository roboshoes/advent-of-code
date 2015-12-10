var input = require( "fs" ).readFileSync( __dirname + "/input.txt", "utf-8" );

var houses = {};
var current = {
    x: 0,
    y: 0
};

function setHouse( x, y ) {
    var hash = x + "," + y;

    houses[ hash ] = true;
}

setHouse( 0, 0 );

for ( var i = 0; i < input.length; i++ ) {

    var instruction = input[ i ];

    switch ( instruction ) {
        case "^": current.y--; break;
        case "v": current.y++; break;
        case "<": current.x--; break;
        case ">": current.x++; break;
    }

    setHouse( current.x, current.y );

}

console.log( Object.keys( houses ).length );