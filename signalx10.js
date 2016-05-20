"use strict";
var fs = require('fs');
var path = require('path');
var jil;


(function (jil_1) {
    
  var  Signal =  Homey.wireless('433').Signal;
        

        
        // http://www.printcapture.com/files/X10_RF_Receiver.pdf
        
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
        
    jil_1.Signal = Signal;
     
  var signal = new Signal({
        sof: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1,  0, 0, 0, 0, 0, 0,0,0 ],
        // Start of frame is high  of 9 msec = 16times 563 4,5msec low = 8 times 563
        eof: [0,0,0,0,0,0,0],

        //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0],

            // End of frame
        words: [
                //[1],
                //[0],
            [1, 0], // [525,525] , // 0   
            [1, 0, 0, 0],// [525,1575],  // 1
                       ],
            /// is a time unit usec
           manchesterUnit: 563, //563 ,low 400  650// usec is the duration of 1 short high,  cyclus = 1250 = 1 short high and 1 short low = 0 bit makes word [1,0]
            //                                        cyclus = 2500 = 1short high and 3 short low = 1 bit makes word [1,1,1,0]
            // manchesterunit is the shortest part of a cycle of  high or low where the words are derived from 
           manchesterMaxUnits:  8,  // still not clear what this is could be max number of succeding 0 or 1
            interval: 40000, // Time between repititions
            repetitions: 4,
            sensitivity: 2,
            minimalLength: 32,//4, minimum legth of message in  bits  or bytes ?????
            maximalLength: 32 //5 max length of message in bits
        
        }) // end signal

    jil_1.signal = signal;




    }
)(jil = exports.jil || (exports.jil = {}));






   // } //end init


