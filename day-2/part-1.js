var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var totalPaper = input.reduce( function( previous, current ) {

    var values = current.split( "x" );

    var a = values[ 0 ];
    var b = values[ 1 ];
    var c = values[ 2 ];

    var section1 = a * b;
    var section2 = a * c;
    var section3 = b * c;

    var paper = 2 * section1 + 2 * section2 + 2 * section3;

    paper += Math.min ( section1, section2, section3 );

    return previous + paper;

}, 0  );

console.log( totalPaper );