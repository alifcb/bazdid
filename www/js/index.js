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
    onDeviceReady: function() {alert('salam');
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

document.addEventListener('deviceready',onDeviceBase, false);
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);

///////////////////////////////////////////////////////
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction(function(tx){           
tx.executeSql("SELECT * FROM company where flag=1", [],
function(tx, rs){    
	var rows = rs.rows;
	if (rows.length>0) {
		var json_arr =  [];  
		for(var i = 0; i < rows.length; i++) {
			var row = rows.item(i);
			var obj = {name: row.name,logo:row.logo,comment:row.comment,comment:row.comment};
			json_arr.push(obj);
		}                         
	}    
var sssc=JSON.stringify(json_arr);
})}); 
////////////////////////////////////
function onDeviceBase() {
var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
db.transaction(table, errorCB, successCB);
}// end onDeviceBase

function table(tx){    
tx.executeSql('DROP TABLE IF EXISTS company');
tx.executeSql('DROP TABLE IF EXISTS pics');
tx.executeSql('DROP TABLE IF EXISTS cars');
tx.executeSql('DROP TABLE IF EXISTS settings');
tx.executeSql('CREATE TABLE IF NOT EXISTS company(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER, name text,comment text,logo text,direct text,flag INTEGER)');
tx.executeSql('CREATE TABLE IF NOT EXISTS pics(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,ids INTEGER, pic text,id_car INTEGER,direct text,flag INTEGER)');
tx.executeSql('CREATE TABLE IF NOT EXISTS cars(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER, name text,comment text,bime INTEGER,pic text,direct text,company INTEGER,flag INTEGER,fav INTEGER)');
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
tx.executeSql('SELECT * FROM company', [], up_picco, errorCB);
tx.executeSql('SELECT * FROM cars', [], up_picca, errorCB);
tx.executeSql('SELECT * FROM pics', [], up_picpi, errorCB);
tx.executeSql('SELECT * FROM settings where title="last_co"', [], flagSuccess, errorSE);
tx.executeSql('SELECT * FROM settings where title="last_car"', [], again_car, errorSE);
tx.executeSql('SELECT * FROM settings where title="last_pic"', [], again_pic, errorSE);
}

////////////////////////////////////زمانی که بار اول ننننیست
function flagSuccess(tx, results) {
var counts=results.rows.item(0).valuem;
//alert(counts);
var x=0;
//DownloadFile("http://www.shahreroya.ir/demo2/company.json",company.json);
$.getJSON("http://www.shahreroya.ir/demo2/company.json", function(json) {
for(i = counts; i < json.items.length; i++) {
x=x+1;
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
DownloadFile('http://www.irannoozdah.ir/bazdid/'+direct+pic,pic);	// دانلود عکس ها

}
///////////////////////// اپدیت  آیتم های قدیم

function up_flag(id,name,pic,direct,comment,flag){
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
//alert(results.rows.length);
$.getJSON("http://www.shahreroya.ir/demo2/company.json", function(json) {

for(i = 0; i < results.rows.length; i++) {
if(results.rows.item(i).logo!=json.items[i].pic){//alert('sssr'+results.rows.item(i).logo);
DownloadFile('http://www.irannoozdah.ir/bazdid/'+json.items[i].direct+json.items[i].pic,json.items[i].pic);	// دانلود عکس ها		
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
 out+="Row = " + i + " ID = " + results.rows.item(i).ids + " flag =  " + results.rows.item(i).flag  + " logo =  " + results.rows.item(i).pic;
}
console.log( out);
}

/////////////////////////////////////////////زمانی که بار اول اجرای برنامه هست
function errorSE(err) {
//console.log("Error processing SQL2: "+err.message);

//alert('out');
$.getJSON("http://www.shahreroya.ir/demo2/company.json", function(json) {
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
DownloadFile('http://www.irannoozdah.ir/bazdid/'+direct+pic,pic);	 
}

function inserts(tx,id,name,pic,comment,direct,flag) {
//alert(id+name+pic+comment);
tx.executeSql('INSERT INTO company(ids,name,comment,direct,logo,flag) values('+id+', "'+name+'", "'+comment+'", "'+direct+'", "'+pic+'","'+flag+'")');
}

////////////////////////////////////////////////////////////////////////cars start insert
$.getJSON("http://www.shahreroya.ir/demo2/company.json", function(json) {
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
DownloadFile('http://www.irannoozdah.ir/bazdid/'+direct+pic,pic);	 
}

function inserts_cars(tx,id,name,pic,bime,comment,company,direct,flag) {
//alert(id+name+pic+comment);
tx.executeSql('INSERT INTO cars(ids,name,comment,bime,company,direct,pic,flag,fav) values('+id+', "'+name+'","'+comment+'",'+bime+','+company+',"'+direct+'", "'+pic+'",'+flag+',0)');
}



////////////////////////////////////////////////////////////////////////pics_car start insert
$.getJSON("http://www.shahreroya.ir/demo2/company.json", function(json) {
var long=json.pics.length;
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
DownloadFile('http://www.irannoozdah.ir/bazdid/'+direct+pic,pic);	 
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
var counts=results.rows.item(0).valuem;
//alert(counts);
var x=0;

$.getJSON("http://www.shahreroya.ir/demo2/company.json", function(json) {
for(i = counts; i < json.cars.length; i++) {
x=x+1;
insert_car(json.cars[i].ids, json.cars[i].name, json.cars[i].pic,json.cars[i].bime, json.cars[i].direct, json.cars[i].company, json.cars[i].comment, json.cars[i].flag);
if(x==1){up_last_car(json.cars.length);}
}
for(i = 0; i < counts; i++) {
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
tx.executeSql('INSERT INTO cars(ids,name,comment,company,pic,bime,direct,flag,fav) values('+id+', "'+name+'", "'+comment+'",  '+company+',"'+pic+'",'+bime+',"'+direct+'", '+flag+',0)');
DownloadFile('http://www.irannoozdah.ir/bazdid/'+direct+pic,pic);	// دانلود عکس ها
}
///////////////////////// اپدیت  آیتم های قدیم

function up_flag_car(id,name,pic,direct,company,comment,flag){
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){up_function_car(tx,id,name,pic,bime,direct,company,comment,flag);}, testonly,errorCB );	 
}

function up_function_car(tx,id,name,pic,bime,direct,company,comment,flag) {//alert(id);
tx.executeSql("UPDATE cars SET name='"+name+"',comment='"+comment+"',company="+company+",pic='"+pic+"',bime="+bime+",direct='"+direct+"',flag="+flag+" where ids="+id+"", [], testonly, errorCB );
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
//alert(results.rows.length);
$.getJSON("http://www.shahreroya.ir/demo2/company.json", function(json) {

for(i = 0; i < results.rows.length; i++) {
if(results.rows.item(i).pic!=json.cars[i].pic){//alert('sssr'+results.rows.item(i).pic);
DownloadFile('http://www.irannoozdah.ir/bazdid/'+json.cars[i].direct+json.cars[i].pic,json.cars[i].pic);	// دانلود عکس ها		
}
}
});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////pic_cars
function again_pic(tx, results) {
var counts=results.rows.item(0).valuem;
//alert(counts);
var x=0;

$.getJSON("http://www.shahreroya.ir/demo2/company.json", function(json) {
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

function insert_to_pic(tx,id,pic,direct,id_car,flag) {
tx.executeSql('INSERT INTO pics(ids,pic,direct,id_car,flag) values('+id+',"'+pic+'","'+direct+'", '+id_car+' '+flag+')');
DownloadFile('http://www.irannoozdah.ir/bazdid/'+direct+pic,pic);	// دانلود عکس ها
}
///////////////////////// اپدیت  آیتم های قدیم

function up_flag_pic(id,pic,direct,id_car,flag){
var dbs = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
dbs.transaction (function(tx){up_function_pic(tx,id,pic,direct,id_car,flag);}, testonly,errorCB );	 
}

function up_function_pic(tx,id,pic,direct,id_car,flag) {//alert(id);
tx.executeSql("UPDATE pics SET  pic='"+pic+"',id_car="+id_car+",direct='"+direct+"',flag="+flag+" where ids="+id+"", [], testonly, errorCB );
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
//alert(results.rows.length);
$.getJSON("http://www.shahreroya.ir/demo2/company.json", function(json) {

for(i = 0; i < results.rows.length; i++) {
if(results.rows.item(i).pic!=json.pics[i].pic){//alert('sssr'+results.rows.item(i).pic);
DownloadFile('http://www.irannoozdah.ir/bazdid/'+json.pics[i].direct+json.pics[i].pic,json.pics[i].pic);	// دانلود عکس ها		
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
  console.log("download complete2: " + entt.toURL());
},
function(error) {
  console.log("download error source " + error.source);
  console.log("download error target " + error.target);
  console.log("upload error code" + error.message);
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
function onOnline() {
alert('online');
}
function succOUT() {
	alert('best');
}
function errOUT(err) {
	alert('eerr-'+err.message);
}