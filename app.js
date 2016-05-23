// jilles433 app.js


"use strict";
var fs = require('fs');
var path = require('path');
var util = require('util');

var jil = require('./signalx10.js').jil;
//var jil = require('./signalvisonic.js').jil;
//var jil = require('./signaloregon.js').jil;
//var jil = require('./signalx10.js').jil;
//var jil = require('../homeEasyEu.js').jil;
var signal = jil.signal;

var counter = 0;
var counter2 = 0;


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
                util.log('jillesrxerror: Error:', err)
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
        
        
   

         // node js buffer makes 01 from 1 and 00 from 0
       // var sendBuffer = buffer;  // homey sends same signal with Buffer as Array.
       // var 
        setInterval(function () {
      // setTimeout(function () {
  //your code to be executed after 4 second
            if (isEven(counter2)) {
                var buffer = new Buffer(jil.receivedA4OffFrame);
            } else { 
                var buffer = new Buffer(jil.receivedA4OnFrame);
            
            }
        signal.tx(buffer, function (err, result) {
                if (err != null) { console.log('433Socket: Error:', err) }
                else {
                    console.log('433Socket: result:', result);
                    console.log('433Socket: array.length:', buffer.length);
                    console.log('433Socket: array:   ' , buffer);
                    counter2 += 1;
                    console.log('433Socket: sendcounter:   ' , counter2);
                };
        });
        

        },5000);
        
    
        
      

    
        Homey.on('unload', function () {
            signal.unregister();
    // save some last settings, say goodbye to your remote connected devices, etc.
        });




    }  // end init
}

function isEven(n) {
    return n % 2 == 0;
}