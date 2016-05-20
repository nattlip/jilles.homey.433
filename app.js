// jilles433 app.js


"use strict";
var fs = require('fs');
var path = require('path');
var util = require('util');

var signal = require('./signalx10.js').jil.signal;
//var signal = require('./signaloregon.js').jil.signal;
var counter = 0;



var self = module.exports= {
    
    init: function () {
        
      
        
     
        

        
        signal.register(function (err, success) {
            if (err != null) {
                console.log('signal error: err yes', err, 'success', success);
            } else { console.log('signal error: no error ', err, 'success', success);}
        });
        
        
        signal.on('payload', function (err, payload, first) {
            //if (!first) return;
            counter += 1;
            
            if (err != null) {
                console.log('jillesrxerror: Error:', err)
                util.log( 'error = array length ', err.length)
            
            
            
            }
            console.log('counter                                    ', counter)
            ;
            var rxData = parseRXData(payload); //Convert received array to usable data
            
            console.log("payload   ", payload.toString());
            console.log("rxdata  "  , rxData)

        });
        
        function parseRXData(data) {
            if (Array.isArray(data)) {
                var address = data.slice(0, (data.length - 1));
                console.log("data isarray")
            }
            else { console.log("dataarray :" ,Array.isArray(data)); }
        
        }
        
        
        var frame = [];
        var preamble = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0 ];  // preable
     
        var extraleadingbyte, adressbyte , invertedadressbyte, commandbyte, invertedcommandbyte = [];
        extraleadingbyte = [0, 0, 1, 0, 0, 0, 0, 0];
        adressbyte = [0, 1, 1, 0, 0, 0, 0, 0]; //a4
        invertedadressbyte = [1, 0, 0, 1, 1, 1, 1, 1];
        commandbyte = [0, 0, 1, 1, 1, 0, 0, 0];  //off
        invertedcommandbyte = [1, 1, 0, 0, 0, 1, 1, 1];
        
        
        //lsbf
        //adressbyte = [0, 0, 0, 0, 0, 1,1, 0]; //a4
        //invertedadressbyte = [1, 1, 1, 1, 1,0, 0, 1];
        //commandbyte = [0, 0, 0, 1, 1, 1, 0, 0];  //off
        //invertedcommandbyte = [1, 1, 1, 0, 0, 0, 1, 1];
        
        
        
        
        
        

        // 0001 1111   0110 0000   1001 1111   0011 1000   1100 0110 send bY homey
       //  0010 0000   0110 0000   1001 1111   0011 1000   1100 0111 correct one send by rfxcom a4 off
       //frame = preamble.concat(adressbyte, invertedadressbyte, commandbyte, invertedcommandbyte);
        frame = adressbyte.concat( invertedadressbyte, commandbyte, invertedcommandbyte);
        var buffer =  new Buffer(frame);  // node js buffer makes 01 from 1 and 00 from 0
        var sendBuffer = buffer;  // homey sends same signal with Buffer as Array.
        
        //setInterval(function () {
        setTimeout(function () {
  //your code to be executed after 4 second
       
        

        signal.tx(sendBuffer, function (err, result) {
                if (err != null) { console.log('433Socket: Error:', err) }
                else {
                    console.log('433Socket: result:', result);
                    console.log('433Socket: array.length:', sendBuffer.length);
                    console.log('433Socket: array:   ' ,sendBuffer)
                };
        });
        

        },2000);
        
    
        
      

    
        Homey.on('unload', function () {
            signal.unregister();
    // save some last settings, say goodbye to your remote connected devices, etc.
        });




    }  // end init
    }