console.log("process.argv[1]   " , process.argv[1]);

var __parentDir = path.dirname(process.mainModule.filename);

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
        