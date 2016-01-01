var input = require( "fs" )
    .readFileSync( __dirname + "/input.txt", "utf-8" )
    .split( "\n" );

var registers = {
    a: 1,
    b: 0
};

var methods = {};

methods.hlf = function( args ) {
    registers[ args ] = ( registers[ args ] / 2 ) | 0;
    return 1;
};

methods.tpl = function( args ) {
    registers[ args ] *= 3;
    return 1;
};

methods.inc = function( args ) {
    registers[ args ]++;
    return 1;
};

methods.jmp = function( args ) {
    return parseInt( args, 10 );
};

methods.jie = function( args ) {
    var parts = args.split( ", " );
    var value = registers[ parts[ 0 ] ];

    return value % 2 === 0 ? parseInt( parts[ 1 ], 10 ) : 1;
};

methods.jio = function( args ) {
    var parts = args.split( ", " );
    var value = registers[ parts[ 0 ] ];

    return value === 1 ? parseInt( parts[ 1 ], 10 ) : 1;
};

function interprete( line ) {

    var command = input[ line ];

    var method = command.substr( 0, 3 );
    var args = command.substr( 4 );

    var next = methods[ method ]( args ) + line;

    if ( next < 0 || next > input.length - 1 ) {
        console.log( registers.b );
        return;
    }

    process.nextTick(
        interprete.bind( null, next )
    );
}

interprete( 0 );