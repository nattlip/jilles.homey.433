"use strict";
var fs = require('fs');
var path = require('path');
var jil;


(function (jil_1) {
    
    var Signal = Homey.wireless('868').Signal;
    
    
    
    // Short impulse ~320 us, long impulse ~720 us. i think manche=sterunit = 160
    // https://www.raspberrypi.org/forums/viewtopic.php?f=37&t=97826
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
    
  //  jil_1.Signal = Signal;
    
    var signal = new Signal({
        
sof: [1,1,1,1],
eof: [],

        words: [ 
// accroing youtube mu=320
//[1, 1, 0, 1, 1, 0],//0                                                  0 in recieved frame 
//[1,0, 1,0],  // 1                                                       1                                                      
//[1, 0, 1, 1, 0], //nothing ???? no 0 no 1  duration 1 == 320 duration   2
        // [0,0,0,0,1, 1, 1, 1, 1, 1, 1, 1,1], // 720 high mu 80
           [0,0,0,0,0,0,0,0,0], // 720 high mu 80
           // [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1] // 320 high mu 80   
            [ 0,0,0,0] // 320 high mu 80  
          //  [720],
          //  [320]
        ],
        /// is a time unit usec
      manchesterUnit: 80, // https://www.raspberrypi.org/forums/viewtopic.php?f=37&t=97826  bit 1 = 320usec = [1] bit 0  =[1,1,1] = 720   Short impulse ~320 us, long impulse ~720 us.
        //                                        cyclus = 2500 = 1short high and 3 short low = 1 bit makes word [1,1,1,0]
       // manchesterunit is the shortest part of a cycle of  high or low where the words are derived from 
     manchesterMaxUnits: 90,  // still not clear what this is could be max number of succeding 0 or 1
        interval: 5000, // Time between repititions
        repetitions: 6,
        sensitivity: 2,
        minimalLength: 30,//4, minimum legth of message in  bits  or bytes ?????
        maximalLength: 200 //5 max length of message in bits
        
    })// end signal
    
    jil_1.signal = signal;

    var frame, frame2, frame3, frame4 = [];
    
    
    
    
    var preamble = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];  // preable
    
    var extraleadingbyte, adressbyte , invertedadressbyte, commandbyte, invertedcommandbyte = [];
    var lsfbadressbyte , lsfbcommandbyte, lsfbinvertedadressbyte, lsfbinvertedcommandbyte = [];
    //extraleadingbyte = [0, 0, 1, 0, 0, 0, 0, 0];
    adressbyte = [0, 1, 1, 0, 0, 0, 0, 0]; //a4
    invertedadressbyte = [1, 0, 0, 1, 1, 1, 1, 1];
    commandbyte = [0, 0, 1, 1, 1, 0, 0, 0];  //off
    invertedcommandbyte = [1, 1, 0, 0, 0, 1, 1, 1];
    var extrabyte = [0]; // for odd length
    
    //NOTE: in 32 bits, standard X10 mode the bytes are transmitted as:   x10 rfxcom pdf
    //Received order Byte 1 Byte 2 Byte 3 Byte 4
    //Bytes changed of position Byte 3 Byte 4 Byte 1 Byte 2
    //Bits are changed 7 - 0 to 0 - 7 for all 4 bytes 
    
    
    
    
    
    
    
    
    //lsbf  conversion
    lsfbadressbyte = [0, 0, 0, 0, 0, 1, 1, 0];    //byte 1    //a4
    lsfbinvertedadressbyte = [1, 1, 1, 1, 1, 0, 0, 1];   //byte 2
    lsfbcommandbyte = [0, 0, 0, 1, 1, 1, 0, 0];         //byte 3      //off
    lsfbinvertedcommandbyte = [1, 1, 1, 0, 0, 0, 1, 1];  //byte 4
    
    
    
  frame = [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
    //     1010 1001 0100 1100 0010 0001 1000 1101 0111 0010 1100 1011 1000 0000 =  A94C218D72CB80  send 
    //A94C218D72CB80 received
    //A94C218D72CB80
    //A94C218D72CB80
    //    1010 1001 0010 0110 0001 0000 1100 1101 0011 0010 1110 0101 1000 0000  received by rfxcom
    
    
    // 0001 1111   0110 0000   1001 1111   0011 1000   1100 0110 send bY homey
    //  0010 0000   0110 0000   1001 1111   0011 1000   1100 0111 correct one send by rfxcom a4 off
  //frame = preamble.concat(adressbyte, invertedadressbyte, commandbyte, invertedcommandbyte);
    /// frame from 1,2,3,4
   // frame = adressbyte.concat(invertedadressbyte, commandbyte, invertedcommandbyte, invertedcommandbyte,extrabyte);
    /// frame from 3,4,1,2
    frame2 = commandbyte.concat(invertedcommandbyte, adressbyte, invertedadressbyte);
    /// frame 1,2,3,4 lsfb
    frame3 = lsfbadressbyte.concat(lsfbinvertedadressbyte, lsfbcommandbyte, lsfbinvertedcommandbyte);
    
    frame4 = lsfbcommandbyte.concat(lsfbinvertedcommandbyte, lsfbadressbyte, lsfbinvertedadressbyte);
    
    
    jil_1.frame = frame, 
    jil_1.frame2 = frame2,
    jil_1.frame3 = frame3, 
    jil_1.frame4 = frame4;


}
)(jil = exports.jil || (exports.jil = {}));






// } //end init


