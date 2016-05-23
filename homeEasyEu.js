"use strict";
var fs = require('fs');
var path = require('path');
var jil;


(function (jil_1) {
    
    var Signal = Homey.wireless('433').Signal;
    
//    0 - bit
//    HIGH for 375μs followed by LOW for 1125μs
//1-bit
//    HIGH for 1125μs followed by LOW for 375μs
//0-bit (short) [1]
//    HIGH for 375μs followed by LOW for 375μs .
    
  
    
    jil_1.Signal = Signal;
    
    var signal = new Signal({
        sof: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        // Start of frame is high  of 9 msec = 16times 563 4,5msec low = 8 times 563
        eof: [],
        
        //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0],
        
        // End of frame
        words: [
                //[1],
                //[0],
            [1, 0], // [525,525] , // 0   
            [1, 0, 0, 0],// [525,1575],  // 1
        ],
        /// is a time unit usec
        manchesterUnit: 540, //563 ,low 400  650// usec is the duration of 1 short high,  cyclus = 1250 = 1 short high and 1 short low = 0 bit makes word [1,0]
        //                                        cyclus = 2500 = 1short high and 3 short low = 1 bit makes word [1,1,1,0]
        // manchesterunit is the shortest part of a cycle of  high or low where the words are derived from 
        manchesterMaxUnits: 8,  // still not clear what this is could be max number of succeding 0 or 1
        interval: 40000, // Time between repititions
        repetitions: 4,
        sensitivity: 2,
        minimalLength: 10,//4, minimum legth of message in  bits  or b
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
    
    //NOTE: in 32 bits, standard X10 mode the bytes are transmitted as:   x10 rfxcom pdf
    //Received order Byte 1 Byte 2 Byte 3 Byte 4
    //Bytes changed of position Byte 3 Byte 4 Byte 1 Byte 2
    //Bits are changed 7 - 0 to 0 - 7 for all 4 bytes 
    
    
    
    
    
    
    
    
    //lsbf  conversion
    lsfbadressbyte = [0, 0, 0, 0, 0, 1, 1, 0];    //byte 1    //a4
    lsfbinvertedadressbyte = [1, 1, 1, 1, 1, 0, 0, 1];   //byte 2
    lsfbcommandbyte = [0, 0, 0, 1, 1, 1, 0, 0];         //byte 3      //off
    lsfbinvertedcommandbyte = [1, 1, 1, 0, 0, 0, 1, 1];  //byte 4
    
    
    
    
    
    
    
    // 0001 1111   0110 0000   1001 1111   0011 1000   1100 0110 send bY homey
    //  0010 0000   0110 0000   1001 1111   0011 1000   1100 0111 correct one send by rfxcom a4 off
    //frame = preamble.concat(adressbyte, invertedadressbyte, commandbyte, invertedcommandbyte);
    /// frame from 1,2,3,4
    frame = adressbyte.concat(invertedadressbyte, commandbyte, invertedcommandbyte);
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


