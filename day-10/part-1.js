var input = "1113122113";


function lookAndSay( code ) {

    var accumilator = "";
    var buffer = "";

    function flush() {
        if ( buffer.length > 0 ) {
            accumilator += buffer.length.toString() + buffer[ 0 ];
        }

        buffer = "";
    }

    for ( var j = 0; j < code.length; j++ ) {
        var letter = code[ j ];

        if ( buffer[ 0 ] !== letter ) flush();

        buffer += letter;
    }

    flush();

    return accumilator;
}

for ( var i = 0; i < 40; i++ ) {
    input = lookAndSay( input );
}

console.log( input.length );