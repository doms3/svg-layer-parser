var fs = require('fs');

var loadXML = function( err, data ) {
    if( err ) {
        console.log( err );
    } else {
        var xml2js = require( 'xml2js' );
        xml2js.parseString( data, parseXML );
    }
}

var parseXML = function( err, result ) {
    if( err ) {
        console.log( err );
    } else {
        var xml2js = require( 'xml2js' );
        var builder = new xml2js.Builder( {rootName: "svg" } );
        var layerXML = result.svg.g;
        for( let i = 0; i < layerXML.length; i++ ) {
            // delete layerXML[i].$['slic3r:z'];
            // delete layerXML[i].polygon[0].$['slic3r:type'];
            var layer = {
                g: layerXML[i],
                $: { width: 102, 
                     height: 150,
                     xmlns: "http://www.w3.org/2000/svg",
                   }
            }
            layer.$["xmlns:svg"] = "http://www.w3.org/2000/svg";
            layer.$["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
            layer.$["xmlns:slic3r"] = "http://slic3r.org/namespaces/slic3r";
            fs.writeFile( "layers/" + i.toString() + ".svg", builder.buildObject( layer ), function( err ) {
                if( err ) console.log( err );
            } );
        }
    }
}

console.log( process.argv[2] );
fs.readFile( process.argv[2], 'utf8', loadXML );


