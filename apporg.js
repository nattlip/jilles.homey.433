// jilles433 app.js


"use strict";
var fs = require('fs');
var path = require('path');

var signal;




var self = module.exports= {
    
    init: function () {
        
      
        
      
        
        var Signal = Homey.wireless('433').Signal;
        
       // http://wmrx00.sourceforge.net/Arduino/OregonScientific-RF-Protocols.pdf
        
        //signal = new Signal({
        //   sof: [1] ,//Start of frame
        ////   // sof: [0,1,0,1],
        //   eof: [], //End of frame
        //    words: [
        //        [0, 1],
        //        [1, 0],
        //        [1, 1],
        //        [0, 0]
        //       ]            
        //    ,
        //    interval: 20, //Time between repititions  // data rate (1024Hz)
        //    manchesterUnit:  960, // microseconds for 1 bit  set to microsecond duration of single digit for manchester encoding  1/1024  * 1000
        //    manchesterMaxUnits: 9, 
        //    repetitions: 2,   //max succeeding units without edges for manchester encoding
        //    sensitivity: 0.1, 
        //    minimalLength: 60, // 60 byte
        //    maximalLength: 96 // 95 byte
        //});
        

        signal = new Signal({
            sof: [], // Start of frame
            eof: [],
         // End of frame
            words: [
                [200, 1200], // 0
                [1200, 200]  // 1     [295, 885], // 0
                //[885, 295]  // 1
            ],
            interval: 40000, // Time between repititions
            repetitions:2,
            sensitivity: 0.7,
            minimalLength: 4,//4,
            maximalLength: 500 //5
        
        });  
        

        
        signal.register(function (err, success) {
            if (err != null) {
                console.log('signal error: err', err, 'success', success);
            }
        });
        
        
        signal.on('payload', function (err, payload, first) {
            // if (!first) return;
            if (err != null) console.log('jillestxerror: Error:', err);
            var rxData = parseRXData(payload); //Convert received array to usable data
            
            console.log("payload   ", payload.toString());
            console.log("rxdata  "  , rxData)

        });
        
        function parseRXData(data) {
            if (Array.isArray(data)) {
                var address = data.slice(0, (data.length - 1));
                console.log("data isarray")
            }
            else { console.log("data no array"); }
            //address = bitArrayToString(address);
            
            //var unit = data.slice(20, 23);
            //unit = bitArrayToString(unit);
            
            //var onoff = data.slice(23, 24);
            //onoff = onoff && onoff[0] ? true : false;
            
            //if (unit == "000") {
            //    unit = "001";
            //    onoff = false;
            //} else if (unit == "001") {
            //    onoff = true;
            //}
            //return {
            //    address: address, 
            //    unit   : unit,
            //    onoff  : onoff
            //};
        }

        
        console.log("process.argv[1]   " , process.argv[1]);
       
         var    __parentDir = path.dirname(process.mainModule.filename);
        
            console.log("dir parent ", __parentDir)
        console.log(". = %s", path.resolve("."));
        var filename = path.join(__parentDir , "/homey-app/wireless/433.js");
        
        //  apps/bootstrap/homey-app/wireless/433.js
        

//        fs.exists(filename, function (exists) {
//            if (exists && !(filenme == "")) {
//                console.log("exists  ", exists)}
//            else {
//console.log("exists  ", exists)
//            }
//        });
        
        

        
        //fs.readFile("/homey-app/wireless/433.js", 'utf8', function (err, data) {
        //    if (err) throw err;
        //    console.log('OK: ' + filename);
        //    console.log(data)
        //});
        

        //fs.readFile(filename, 'utf8', function (err, data) {
        //    if (err) throw err;
        //    console.log('OK: ' + filename);
        //    console.log(data)
        //});
        

        
        

        
        var props = Object.getOwnPropertyNames(Homey.wireless("433"));
        
       
        
        

        
        console.log("props  ", props);
        
        for (var prop in props) {
            
            console.log(prop, typeof (prop))
            if (typeof (prop) === Object) {
                console.log(prop, Object.getOwnPropertyNames(Homey.wireless("433")[prop]));
            }
            else {
                console.log(prop, "is no object");
            }
        };
        
        var signalproperties = Object.getOwnPropertyNames(signal);
        
        console.log("signalproperties  ", signalproperties);
        
        var frame = new Buffer(295);
        
        //signal.register(function (err, success) {
        //    if (err != null) {
        //        console.log('Eurodomest: err', err, 'success', success);

        //    }
            //if (succes != null) {
            //    console.log( 'success', success);
            //}

       // });

        
        //signal.tx(frame,function (err, result) {
        //    console.log("   tx is send         ");
        //    if (err != null) console.log('jillestxerror: Error:', err);
        //})

    





    }  // end init
    }