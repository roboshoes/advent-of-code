var boss = {};
var me = {};

var spells = [ "Magic Missile", "Drain", "Shield", "Poison", "Recharge" ];
var activeSpells = [];
var digets = [ 0 ];
var currentCost = 0;
var minimumCost = Infinity;

function applyActiveSpells() {
    for ( var i = 0; i < activeSpells.length; i++ ) {
        var current = activeSpells[ i ];

        switch ( current.name ) {
            case "Recharge":
                me.mana += 101;
                break;
            case "Poison":
                boss.hitPoints -= 3;
                break;
            case "Shield":
                me.armor = 7;
                break;
        }

        current.timer--;

        if ( current.timer <= 0 ) {
            activeSpells.splice( i, 1 );
            i--;
        }
    }
}

function pushSpell( name ) {
    for ( var i = 0; i < activeSpells.length; i++ ) {
        if ( activeSpells[ i ].name === name ) {
            throw "invalid";
        }
    }

    activeSpells.push( { name: name, timer: getTime( name ) } );
}

function getTime( name ) {
    return {
        Recharge: 5,
        Poison: 6,
        Shield: 6
    }[ name ];
}

function getCost( name ) {
    return {
        Recharge: 229,
        Poison: 173,
        Shield: 113
    }[ name ];
}

function round( attack ) {

    applyActiveSpells();

    if ( boss.hitPoints <= 0 ) return true;

    switch ( attack ) {
        case "Magic Missile":
            me.mana -= 53;
            currentCost += 53;
            boss.hitPoints -= 4;
            break;
        case "Drain":
            me.mana -= 73;
            currentCost += 73;
            me.hitPoints += 2;
            boss.hitPoints -= 2;
            break;
        case "Shield":
        case "Poison":
        case "Recharge":
            var cost = getCost( attack );

            me.mana -= cost;
            currentCost += cost;

            pushSpell( attack );
            break;
    }

    if ( me.mana <= 0 ) {
        me.hitPoints = 0;
        return true;
    }

    me.armor = 0;

    applyActiveSpells();

    if ( boss.hitPoints <= 0 ) return true;

    me.hitPoints -= Math.max( boss.damage - me.armor, 1 );

    if ( me.hitPoints <= 0 || boss.hitPoints <= 0 ) {
        return true;
    }

    return false;
}

function reachedEnd() {
    for ( var i = 0; i < digets.length; i++ ) {
        if ( digets[ i ] < 4 ) return false;
    }

    return true;
}

function reset() {
    boss.hitPoints = 55;
    boss.damage = 8;

    me.hitPoints = 50;
    me.mana = 500;
    me.armor = 0;

    currentCost = 0;

    activeSpells = [];
}

function fight() {
    var someoneIsDead = false;
    var isInvalid = false;
    var index = 0;

    reset();

    do {

        var number = digets[ index ];
        var spell = spells[ number ];

        try {
            someoneIsDead = round( spell );
        } catch ( exception ) {

            if ( exception === "invalid" ) {
                isInvalid = true;
                break;
            }

            throw exception;
        }

        index++;

    } while( ! someoneIsDead && index < digets.length );

    if ( isInvalid ) {

        if ( reachedEnd() ) {
            return -3;
        }

        return -2;
    }

    if ( ! someoneIsDead ) {

        if ( reachedEnd() ) return -3;
        if ( currentCost > minimumCost ) return index;

        return -1;
    }

    if ( me.hitPoints > 0 )  {

        if ( minimumCost > currentCost ) {
            minimumCost = currentCost;
        }

    }

    if ( reachedEnd() ) {
        return -3;
    }

    return index;
}

function count() {

    var carryOver = false;
    var index = 0;

    do {

        carryOver = 0;

        digets[ index ]++;

        if ( digets[ index ] > 4 ) {
            digets[ index ] = 0;
            carryOver = 1;
        }

        index++;

        if ( index === digets.length ) break;

    } while ( carryOver > 0 );

}

function step() {

    var steps = fight();

    if ( steps === -1 ) {
        digets.push( 0 );

        digets = digets.map( () => 0 );
        minimumCost = Infinity;

        process.nextTick( step );
    }

    if ( steps === -3 ) {
        console.log( minimumCost );
    }

    if ( steps >= 0 || steps === -2 ) {
        count();
        process.nextTick( step );
    }

}

step();