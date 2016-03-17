var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {//alert('salam');
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};

document.addEventListener('deviceready', onDeviceBase, false);
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);
  function onOffline() {
document.getElementById('online').value=0;
}	
  function onOnline() {
document.getElementById('online').value=1;
}	
////////////////////////////////////
function onDeviceBase() {


var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
db.transaction(table, errorCB, successCB);
}
// end onDeviceBase

function table(tx){    
//tx.executeSql('DROP TABLE IF EXISTS company');
//tx.executeSql('DROP TABLE IF EXISTS pics');
//tx.executeSql('DROP TABLE IF EXISTS cars');
//tx.executeSql('DROP TABLE IF EXISTS settings');
tx.executeSql('CREATE TABLE IF NOT EXISTS company(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER, name text,comment text,logo text,direct text,flag INTEGER)');
tx.executeSql('CREATE TABLE IF NOT EXISTS pics(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,ids INTEGER, pic text,id_car INTEGER,direct text,flag INTEGER)');
tx.executeSql('CREATE TABLE IF NOT EXISTS cars(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER, name text,comment text,bime text,pic text,direct text,company INTEGER,flag INTEGER,fav INTEGER)');
tx.executeSql('CREATE TABLE IF NOT EXISTS settings(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title text,valuem text)');
//tx.executeSql('INSERT INTO settings(title,valuem) values("flag_one","1")');
}

///////////////////////////////////////error db
function errorCB(err) {
	console.log("Error processing SQLm: "+err.message);
}
///////////////////////////////////// هرچیزی که می خواهد در ابتدا استارت بخورد در این قسمت قرار بگیرد
function successCB() {
var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
db.transaction(flag_one, errorSE);
}

//////////////////////////////////// مرحله سنجش فلگ بار اول
function flag_one(tx) {

tx.executeSql('SELECT * FROM settings where title="last_co"', [], flagSuccess, errorSE);
tx.executeSql('SELECT * FROM settings where title="last_car"', [], again_car, errorSE);
tx.executeSql('SELECT * FROM settings where title="last_pic"', [], again_pic, errorSE);
tx.executeSql('SELECT * FROM company', [], up_picco, errorCB);
tx.executeSql('SELECT * FROM cars', [], up_picca, errorCB);
tx.executeSql('SELECT * FROM pics', [], up_picpi, errorCB);
}

////////////////////////////////////زمانی که بار اول ننننیست
function flagSuccess(tx, results) {

var counts=results.rows.item(0).valuem;
//alert(counts);
var x=0;
//DownloadFile("http://www.borna-grp.ir/demo2/company.json",company.json);
$.getJSON("http://www.borna-grp.ir/company.json", function(json) {
for(i = counts; i < json.items.length; i++) {
x=x+1;
//alert('company');
testo(json.items[i].ids, json.items[i].name, json.items[i].pic, json.items[i].direct, json.items[i].comment, json.items[i].flag);
if(x==1){up_last(json.items.length);}
}

for(i = 0; i < counts; i++) {
up_flag(json.items[i].ids, json.items[i].name, json.items[i].pic, json.items[i].direct, json.items[i].comment, json.items[i].flag);
}	

});
}
///////////////////////////////  ثبت آیتم های جدید
function testo(id,name,pic,direct,comment,flag) {
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){insert(tx,id,name,pic,direct,comment,flag);}, errorCB );	 
}

function insert(tx,id,name,pic,direct,comment,flag) {
tx.executeSql('INSERT INTO company(ids,name,comment,logo,direct,flag) values('+id+', "'+name+'", "'+comment+'", "'+pic+'","'+direct+'", '+flag+')');
DownloadFile('http://www.borna-grp.ir/'+direct+pic,pic);	// دانلود عکس ها

}
///////////////////////// اپدیت  آیتم های قدیم

function up_flag(id,name,pic,direct,comment,flag){//alert(name);
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){up_function(tx,id,name,pic,direct,comment,flag);}, testonly, errOUT );	 
}

function up_function(tx,id,name,pic,direct,comment,flag) {
tx.executeSql("UPDATE company SET name='"+name+"',comment='"+comment+"',logo='"+pic+"',direct='"+direct+"',flag="+flag+" where ids="+id+"", [], testonly, errOUT );
}
////////// اپدیت تعداد ایتم های موجود در دیتا بیس محلی
function up_last(number) {
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){up_exelast(tx,number);}, errOUT );	 
}

function up_exelast(tx,number) {
tx.executeSql("UPDATE settings SET valuem='"+number+"' where title='last_co'", [],errorCB );
}

//////////////////////////////////////
function up_picco(tx, results) {
//alert('company_pic');
//alert(results.rows.length);
$.getJSON("http://www.borna-grp.ir/company.json", function(json) {

for(i = 0; i < results.rows.length; i++) {
if(results.rows.item(i).logo!=json.items[i].pic){//alert('sssr'+results.rows.item(i).logo);
DownloadFile('http://www.borna-grp.ir/'+json.items[i].direct+json.items[i].pic,json.items[i].pic);	// دانلود عکس ها		
}
}
});
}

///////////////فقط برای تست بعدا برداشته شود
function testonly() {
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction(flag_dd, errOUT);
}
function flag_dd(tx) {
tx.executeSql('SELECT * FROM pics', [], querySuccess, errorCB);
}
function querySuccess(tx, results){
	out="";
var len = results.rows.length;
console.log("company table: " + len + " rows found.");
for (var i=0; i<len; i++){
 out+="Row = " + i + " ID = " + results.rows.item(i).id_car + " flag =  " + results.rows.item(i).flag  + " logo =  " + results.rows.item(i).pic;
}
console.log( out);
}

/////////////////////////////////////////////زمانی که بار اول اجرای برنامه هست
function errorSE(err) {
//alert('bar_aval');
DownloadFile('http://www.borna-grp.ir/images/.nomedia','.nomedia');	// file nomedia
//console.log("Error processing SQL2: "+err.message);
//alert('out');
$.getJSON("http://www.borna-grp.ir/company.json", function(json) {
var long=json.items.length;		
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){nenter(tx,long);},errOUT);	
 
function nenter(tx,nter) {//alert('number'+nter);
tx.executeSql('INSERT INTO settings(title,valuem) values("last_co",'+nter+')');
tx.executeSql('INSERT INTO settings(title,valuem) values("flag_one","1")');
}

for(i = 0; i < json.items.length; i++) {
testo(json.items[i].ids, json.items[i].name, json.items[i].pic, json.items[i].comment,json.items[i].direct, json.items[i].flag);
}  

});

function testo(id,name,pic,comment,direct,flag) {
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){inserts(tx,id,name,pic,comment,direct,flag);}, erro);
DownloadFile('http://www.borna-grp.ir/'+direct+pic,pic);	 
}

function inserts(tx,id,name,pic,comment,direct,flag) {
//alert(id+name+pic+comment);
tx.executeSql('INSERT INTO company(ids,name,comment,direct,logo,flag) values('+id+', "'+name+'", "'+comment+'", "'+direct+'", "'+pic+'","'+flag+'")');
}

////////////////////////////////////////////////////////////////////////cars start insert
$.getJSON("http://www.borna-grp.ir/company.json", function(json) {
var long=json.cars.length;		
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){nenter_car(tx,long);},errOUT);	
 
function nenter_car(tx,nter) {//alert('number'+nter);
tx.executeSql('INSERT INTO settings(title,valuem) values("last_car",'+nter+')');
}

for(i = 0; i < json.cars.length; i++) {
insert_cars(json.cars[i].ids, json.cars[i].name, json.cars[i].pic, json.cars[i].bime, json.cars[i].comment, json.cars[i].company,json.cars[i].direct, json.cars[i].flag);
}  
});

function insert_cars(id,name,pic,bime,comment,company,direct,flag) {
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){inserts_cars(tx,id,name,pic,bime,comment,company,direct,flag);}, erro);
DownloadFile('http://www.borna-grp.ir/'+direct+pic,pic);	 
}

function inserts_cars(tx,id,name,pic,bime,comment,company,direct,flag) {
//alert(id+name+pic+comment);
tx.executeSql('INSERT INTO cars(ids,name,comment,bime,company,direct,pic,flag,fav) values('+id+', "'+name+'","'+comment+'","'+bime+'",'+company+',"'+direct+'", "'+pic+'",'+flag+',0)');
}



////////////////////////////////////////////////////////////////////////pics_car start insert
$.getJSON("http://www.borna-grp.ir/company.json", function(json) {
var long=json.pics.length;
//alert(long);
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){nenter_pic(tx,long);},errOUT);	
 
function nenter_pic(tx,nter) {//alert('number'+nter);
tx.executeSql('INSERT INTO settings(title,valuem) values("last_pic",'+nter+')');
}

for(i = 0; i < json.pics.length; i++) {
insert_pics(json.pics[i].ids, json.pics[i].pic,json.pics[i].direct,json.pics[i].id_car, json.pics[i].flag);
}  
});

function insert_pics(id,pic,direct,idcar,flag) {//alert(id+pic+direct+idcar+flag);
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){inserts_pics(tx,id,pic,direct,idcar,flag);}, erro);
DownloadFile('http://www.borna-grp.ir/'+direct+pic,pic);	 
}

function inserts_pics(tx,id,pic,direct,idcar,flag) {
//alert(id+idcar+pic+flag);
tx.executeSql('INSERT INTO pics(ids,pic,direct,id_car,flag) values('+id+',"'+pic+'","'+direct+'",'+idcar+','+flag+')');
}


///////////////////
function succ() {
alert('best');
}

function erro(err) {
alert('erro-'+err.message);
}

}
//end function

///////////////////////////////////////////////////////////////////////////////////////////////////////////////cars
function again_car(tx, results) {
//alert('car');
var counts=results.rows.item(0).valuem;
//alert(counts);
var x=0;

$.getJSON("http://www.borna-grp.ir/company.json", function(json) {
for(i = counts; i < json.cars.length; i++) {
x=x+1;
insert_car(json.cars[i].ids, json.cars[i].name, json.cars[i].pic,json.cars[i].bime, json.cars[i].direct, json.cars[i].company, json.cars[i].comment, json.cars[i].flag);
if(x==1){up_last_car(json.cars.length);}
}
for(i = 0; i < counts; i++) {
	//alert(json.cars[i].name);
up_flag_car(json.cars[i].ids, json.cars[i].name, json.cars[i].pic,json.cars[i].bime, json.cars[i].direct,  json.cars[i].company, json.cars[i].comment, json.cars[i].flag);
}
});
}
///////////////////////////////  ثبت آیتم های جدید
function insert_car(id,name,pic,bime,direct,company,comment,flag) {
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){insert_to_car(tx,id,name,pic,bime,direct,company,comment,flag);}, errorCB );	 
}

function insert_to_car(tx,id,name,pic,bime,direct,company,comment,flag) {
tx.executeSql('INSERT INTO cars(ids,name,comment,company,pic,bime,direct,flag,fav) values('+id+', "'+name+'", "'+comment+'",  '+company+',"'+pic+'","'+bime+'","'+direct+'", '+flag+',0)');
DownloadFile('http://www.borna-grp.ir/'+direct+pic,pic);	// دانلود عکس ها
}


///////////////////////// اپدیت  آیتم های قدیم

function up_flag_car(id,name,pic,bime,direct,company,comment,flag){
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){up_function_car(tx,id,name,pic,bime,direct,company,comment,flag);}, testcard,errorCB );	 
}

function testcard() {
}

function up_function_car(tx,id,name,pic,bime,direct,company,comment,flag) {//alert(name);
tx.executeSql("UPDATE cars SET name='"+name+"',comment='"+comment+"',company="+company+",pic='"+pic+"',bime='"+bime+"',direct='"+direct+"',flag="+flag+" where ids="+id+"", [], testcard, errorCB );
}
////////// اپدیت تعداد ایتم های موجود در دیتا بیس محلی
function up_last_car(number) {
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){up_exe_car(tx,number);}, errorCB );	 
}

function up_exe_car(tx,number) {
tx.executeSql("UPDATE settings SET valuem='" +number+"' where title='last_car'", [],errorCB );
}

//////////////////////////////////////
function up_picca(tx, results) {
//alert('car_pic');
//alert(results.rows.length);
$.getJSON("http://www.borna-grp.ir/company.json", function(json) {

for(i = 0; i < results.rows.length; i++) {
if(results.rows.item(i).pic!=json.cars[i].pic){//alert('sssr'+results.rows.item(i).pic);
DownloadFile('http://www.borna-grp.ir/'+json.cars[i].direct+json.cars[i].pic,json.cars[i].pic);	// دانلود عکس ها		
}
}
});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////pic_cars
function again_pic(tx, results) {
//alert('pics');
var counts=results.rows.item(0).valuem;
//alert(counts);
var x=0;

$.getJSON("http://www.borna-grp.ir/company.json", function(json) {
for(i = counts; i < json.pics.length; i++) {
x=x+1;
insert_pic(json.pics[i].ids, json.pics[i].pic, json.pics[i].direct,json.pics[i].id_car, json.pics[i].flag);
if(x==1){up_last_pic(json.pics.length);}
}
for(i = 0; i < counts; i++) {
up_flag_pic(json.pics[i].ids, json.pics[i].pic, json.pics[i].direct,json.pics[i].id_car, json.pics[i].flag);
}
});
}
///////////////////////////////  ثبت آیتم های جدید
function insert_pic(id,pic,direct,id_car,flag) {
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){insert_to_pic(tx,id,pic,direct,id_car,flag);}, errorCB );	 
}

function insert_to_pic(tx,id,pic,direct,id_car,flag) {//alert(id+pic+direct+id_car+flag);
tx.executeSql('INSERT INTO pics(ids,pic,direct,id_car,flag) values('+id+',"'+pic+'","'+direct+'", '+id_car+', '+flag+')');
DownloadFile('http://www.borna-grp.ir/'+direct+pic,pic);	// دانلود عکس ها
}
///////////////////////// اپدیت  آیتم های قدیم

function up_flag_pic(id,pic,direct,id_car,flag){
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){up_function_pic(tx,id,pic,direct,id_car,flag);}, testpicd,errorCB );	 
}
function testpicd() {
}
function up_function_pic(tx,id,pic,direct,id_car,flag) {//alert(id);
tx.executeSql("UPDATE pics SET  pic='"+pic+"',id_car="+id_car+",direct='"+direct+"',flag="+flag+" where ids="+id+"", [], testpicd, errorCB );
}
////////// اپدیت تعداد ایتم های موجود در دیتا بیس محلی
function up_last_pic(number) {
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){up_exe_pic(tx,number);}, errorCB );	 
}

function up_exe_pic(tx,number) {
tx.executeSql("UPDATE settings SET valuem='" +number+"' where title='last_pic'", [],errorCB );
}

//////////////////////////////////////
function up_picpi(tx, results) {
//alert('pics_pic');
//alert(results.rows.length);
$.getJSON("http://www.borna-grp.ir/company.json", function(json) {

for(i = 0; i < results.rows.length; i++) {
if(results.rows.item(i).pic!=json.pics[i].pic){//alert('sssr'+results.rows.item(i).pic);
DownloadFile('http://www.borna-grp.ir/'+json.pics[i].direct+json.pics[i].pic,json.pics[i].pic);	// دانلود عکس ها		
}
}
});
}
//////////////////////////////////////////////////download
function DownloadFile(URL, File_Name) {
	
var fileTransfer = new FileTransfer();
var uri = encodeURI(URL);
fileTransfer.download(
uri,
"file:///storage/sdcard0/bazdid/images/"+File_Name,
function(entt) {
  //console.log("download complete2: " + entt.toURL());
},
function(error) {
//  console.log("download error source " + error.source);
 // console.log("download error target " + error.target);
  //console.log("upload error code" + error.message);
},
false,
{
  headers: {
	  "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
  }
}
);
//resolveLocalFileSystemURL('file:///storage/sdcard0/bazdid/images/old.jpg', function(entry) {
//    var nativePath = entry.toURL();
//    document.getElementById('iamdd').src = nativePath;
//});
}
/////////////////////////////////////

function succOUT() {
	alert('best');
}
function errOUT(err) {
	alert('eerr-'+err.message);
}
////////////////////////////////////////////////////////////////////////////////////
// Called when a photo is successfully retrieved
//
function onPhotoURISuccessf(imageURI) {
  var largeImage = document.getElementById('largeImage0');
  largeImage.style.display = 'inline';
  largeImage.src = imageURI;
}
// A button will call this function
//
function getPhotof(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccessf, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}
//////////////////////////////////////////////////////////////////////////////////////
function onPhotoURISuccessy(imageURI) {
  var largeImage = document.getElementById('largeImage1');
  largeImage.style.display = 'inline';
  largeImage.src = imageURI;
}
// A button will call this function
//
function getPhotoy(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccessy, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}//
/////////////////////////////////////////////////////////////////////////////////////
function onPhotoURISuccessd(imageURI) {
  var largeImage = document.getElementById('largeImage2');
  largeImage.style.display = 'inline';
  largeImage.src = imageURI;
}
// A button will call this function
//
function getPhotod(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccessd, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}///////////////////////////////////////////////////////////////////////////////////////
function onPhotoURISuccesss(imageURI) {
  var largeImage = document.getElementById('largeImage3');
  largeImage.style.display = 'inline';
  largeImage.src = imageURI;
}
// A button will call this function
//
function getPhotos(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccesss, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}
// Called if something bad happens.
///////////////////////////////////////////////////////////////////////////////////////
function onFail(message) {
  alert('Failed because: ' + message);
}

