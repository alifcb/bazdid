 var scotchApp = angular.module('StarterApp', ['ngRoute','ngMaterial','ngSanitize'] );
 
//scotchApp.run(function($rootScope) {
//    $rootScope.test = new Date();
//})
// configure our routes
scotchApp.factory("user",function(){
        return {};
});

scotchApp.config(function($routeProvider) {	  

  $routeProvider
	  // route for the home page
	  .when('/', {
		  templateUrl : 'pages/start.html',
	  })
	  
	  .when('/home/:param1', {
		  templateUrl : 'pages/home.html',
		  
	  })
	  
	  .when('/online', {
		  templateUrl : 'pages/online.html',
	  })
	  
	  // route for the list page
	  .when('/list/:param1', {
		  templateUrl : 'pages/list.html',
	  })
	  	  // route for the search page
	  .when('/search/:param1', {
		  templateUrl : 'pages/search.html',
	  })
	 // route for the content page
	  .when('/content/:param1/:page1', {
		  templateUrl : 'pages/content.html',
		  controller  : 'ContentCtrl'
	  })
	   // route for the tabs page
	  .when('/form/:param1', {
		  templateUrl : 'pages/form.html',
	  })
	  	   // route for the tabs page
	  .when('/fav/:param1', {
		  templateUrl : 'pages/fav.html',
	  })
	  	  	   // route for the tabs page
	  .when('/about/:param1', {
		  templateUrl : 'pages/about.html',
	  })
	  .when('/help/:param1', {
		  templateUrl : 'pages/help.html',
	  })
	  .when('/contact/:param1', {
		  templateUrl : 'pages/contact.html',
	  })
	  .when('/setting/:param1', {
		  templateUrl : 'pages/setting.html',
	  })
});
////////////////////////////////////////////////////////onlineCtrl
scotchApp.controller('onlineCtrl',  function($scope,$location,$routeParams)
{
document.addEventListener("online", onOnline, false);
function onOnline() {
$location.path('/');
}
});
////////////////////////////////////////////////////////////	
scotchApp.controller('StarterCtr',  function($scope, todoService,$location,$routeParams,$sce,$http)
{
interd=document.getElementById('inter').value;
if(interd==1){
navigator.notification.confirm("آیا می خواهید از برنامه خارج شوید؟ ", onConfirm, "خروج از برنامه!", "بله,خیر"); 
    // Prompt the user with the choice
function onConfirm(button) {
    if(button==2){//If User selected No, then we just do nothing
        return;
    }else{
        navigator.app.exitApp();// Otherwise we quit the app.
  }
}}

$scope.go = function ( path ) {$location.path( path );};

document.addEventListener("offline", onOffline, false);
  function onOffline() {
navigator.notification.confirm("ارتباط شما با اینترنت برقرار نیست! لطفا داده تلفن همراه خود را روشن کنید ", onConfirm, "خروج از برنامه!", "بله"); 
// Prompt the user with the choice
function onConfirm(button) {
if(button==2){//If User selected No, then we just do nothing
  return;
}
}
offline=1;
}	

todoService.idreg().then(function(items)
{
	$scope.regiser = items;
	if($scope.regiser){
	$location.path('/home/x');
	document.getElementById('inter').value=1;
	return 0;
	}else{
	if(offline==1){
	  $location.path('/online');
	}	
	}
});

$scope.trustSrc = function(src) {
return $sce.trustAsResourceUrl(src);
}
$scope.movie = {src:"http://www.borna-grp.ir/req.php", title:"واریز به حساب"};
/////////////////////////////////////////////////////////////////////
$scope.user = {};
$scope.sabtcode = function() {
var uid = device.uuid;

  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({name: $scope.user.fname, mname:$scope.user.name,userid:uid, codes:$scope.user.code}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(data) {
//alert(data.items[0].cell);
if(data.items[0].cell!=''){
todoService.insertcod(data.items[0].cell);
$location.path('/home/x');
}else{
alert('کد خرید وارد شده صحیح نمی باشد');
}
  });
};


});

/////////////////////////////

scotchApp.controller('mainController', function($scope,user, todoService,$location,$routeParams)
{


 $scope.user = user;
 $scope.user.bazdid = "بازدید اولیه برنا";
  $scope.user.namia = false;
 
$scope.go = function ( path ) {$location.path( path );};
todoService.getItems().then(function(items)
{
	$scope.todos = items;
});
$scope.query = '';
$scope.search = function (user) {
  var query = $scope.query.toLowerCase(),
  name = user.name.toLowerCase();

  if (name.indexOf(query) != -1) {
    return true;
  }
  return false;
};

 });
scotchApp.service('todoService', function($q) 
{
    this.getItems = function() 
    {   var flag=1;
        var deferred, result = [];
        deferred = $q.defer();
		var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
        db.transaction(function(tx) 
        {
            tx.executeSql("select * from company where flag="+flag, [], function(tx, res) 
            {
                for(var i = 0; i < res.rows.length; i++)
                {
				result.push({id : 'list/'+res.rows.item(i).ids, name : res.rows.item(i).name,comment : res.rows.item(i).comment, logo : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).logo})
				}
				deferred.resolve(result);
				});
				});
				return deferred.promise;
				},
				
		               this.idreg = function()
						{  
						var deferred, result = [];
						deferred = $q.defer();
						var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
						db.transaction(function(tx) 
						{ tx.executeSql("SELECT * FROM settings where title='id_reg'", [], function(tx, res) 
						{ 
						result=res.rows.item(0).valuem;
						deferred.resolve(result);
						});
						});
						return deferred.promise;
						},
		this.insertcod = function(idss) 
		{
		var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
        db.transaction(function(tx) 
        {
            return tx.executeSql('INSERT INTO settings(title,valuem) values("id_reg","'+idss+'")' , [], function(tx, res) 
            {
                return true;
            });
        });
        return false;
    }
});

///////////////////////////////////////////////////setting
scotchApp.controller('settingCtrl', function($scope,$route,$location,$routeParams,$route,$timeout,$mdToast)
{
$scope.clear = function () {
var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
db.transaction(table, errorCB);
$mdToast.show(
      $mdToast.simple()
        .textContent(' حذف اطلاعات با موفقیت انجام شد!')
        .position('bottom right')
        .hideDelay(5000)
);
}// end onDeviceBase

function table(tx){    
tx.executeSql('DROP TABLE IF EXISTS company');
tx.executeSql('DROP TABLE IF EXISTS pics');
tx.executeSql('DROP TABLE IF EXISTS cars');

tx.executeSql('CREATE TABLE IF NOT EXISTS company(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER, name text,comment text,logo text,direct text,flag INTEGER)');
tx.executeSql('CREATE TABLE IF NOT EXISTS pics(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,ids INTEGER, pic text,id_car INTEGER,direct text,flag INTEGER)');
tx.executeSql('CREATE TABLE IF NOT EXISTS cars(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ids INTEGER, name text,comment text,bime text,pic text,direct text,company INTEGER,flag INTEGER,fav INTEGER)');
tx.executeSql('CREATE TABLE IF NOT EXISTS settings(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title text,valuem text)');
tx.executeSql('DELETE FROM settings where title<>"id_reg"');
}

function errorCB(err) {
	console.log("Error processing SQLm: "+err.message);
}

$scope.update_co = function () {

$.getJSON("http://www.borna-grp.ir/company.json", function(json) {
$mdToast.show(
      $mdToast.simple()
        .textContent('در حال دریافت تصاویر...')
        .position('bottom right')
        .hideDelay(10000)
);
for(i = 0; i < json.items.length; i++) {
//alert(json.items[i].pic);
testo( json.items[i].pic, json.items[i].direct);} 
if(i==json.items.length-1){

} 
});



function testo(id,pic,direct) {
DownloadFile('http://www.borna-grp.ir/'+direct+pic,pic);	 
}
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
},
false,
{
headers: {
  "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
}
}
);

}
}
});
//////////////////////////////////////////////////////////////////////////////////////////////
scotchApp.controller('listAppCtrl', function($scope,todoServicex,$location,$routeParams)
{

$scope.query = '';
$scope.search = function (user) {
  var query = $scope.query.toLowerCase(),
  name = user.name.toLowerCase();

  if (name.indexOf(query) != -1) {
    return true;
  }
  return false;
};
var param1 = $routeParams.param1;
$scope.pageid=param1;

todoServicex.getItems(param1).then(function(items)
{
$scope.todos = items;
});
 });
 
scotchApp.service('todoServicex', function($q) 
{
this.getItems = function(para)
  {   var idcom=para;
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("select * from cars where company="+idcom, [], function(tx, res) 
		  {
			  for(var i = 0; i < res.rows.length; i++)
			  {
		  result.push({id : 'content/'+idcom+'/'+res.rows.item(i).ids, name : res.rows.item(i).name, bime : res.rows.item(i).bime, company : res.rows.item(i).company,comment : res.rows.item(i).comment, pic : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).pic})
		  }
		  deferred.resolve(result);
		});
 });
	  return deferred.promise;
    },
this.searchItems = function(para)
  {   var idcom=para;
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("select * from cars where 1", [], function(tx, res) 
		  {
			  for(var i = 0; i < res.rows.length; i++)
			  {
		  result.push({id : 'content/search/'+res.rows.item(i).ids, name : res.rows.item(i).name, bime : res.rows.item(i).bime,fav : res.rows.item(i).fav, company : res.rows.item(i).company,comment : res.rows.item(i).comment, pic : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).pic})
		  }
		  deferred.resolve(result);
		});
 });
	  return deferred.promise;
    },
this.getfaver = function()
  {   
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("select * from cars where fav=1", [], function(tx, res) 
		  {
		for(var i = 0; i < res.rows.length; i++)
		{
		  result.push({id : 'content/fav/'+res.rows.item(i).ids, name : res.rows.item(i).name, company : res.rows.item(i).company,comment : res.rows.item(i).comment, pic : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).pic})
		}
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////search 
scotchApp.controller('searchAppCtrl', function($scope,todoServicex,$location,$routeParams)
{
$scope.query = '';
$scope.search = function (user) {
  var query = $scope.query.toLowerCase(),
  name = user.name.toLowerCase();

  if (name.indexOf(query) != -1) {
    return true;
  }
return false;
};


todoServicex.searchItems().then(function(items)
{
$scope.todos = items;
});
 });

///////////////////////////////////////////////////ContentCtrl
scotchApp.controller('ContentCtrl', function($scope,$route,todoServicez,$location,$routeParams,$mdDialog,$route,$timeout, $mdMedia,$mdToast)
{
var param1 = $routeParams.param1;
var page1 = $routeParams.page1;


//vareas='/list/'+param1;
//
//alert($location.path());
//document.addEventListener("backbutton", function(e){
//if($location.path()=='content/'+param1+page1 ){
//e.preventDefault();
//$location.path(vareas);
//  }
//}, false);

todoServicez.iffav(page1).then(function(items)
{

if(items[0].fav==1){
$scope.iconslike="img/icons/plain-heart.svg";
	}else{
$scope.iconslike="img/icons/like80.svg";
	}
});

/////////////////////////////////////// like kardan
$scope.fave = function (id_var,faver) 
{
if(faver==0){$scope.iconslike="img/icons/plain-heart.svg";
texts='این خودرو با موفقیت در لیست علاقه مندی های شما قرار گرفت!';
favt=1;}else{$scope.iconslike="img/icons/like80.svg"; 
texts='این خودرو از لیست علاقه مندی های شما حذف گردید!';
favt=0;}
todoServicez.faverat(id_var,favt);
$mdToast.show(
      $mdToast.simple()
        .textContent(texts)
        .position('bottom right')
        .hideDelay(5000)
);
};

/////////////////////////////////// download mohadad aks
$scope.downloadimg = function (URL,direct,File_Name,ids) 
{ 
$mdToast.show(
      $mdToast.simple()
        .textContent('برنامه در حال دریافت تصاویر از سرور می باشد لطفا چند لحظه صبر کنید!')
        .position('bottom right')
        .hideDelay(5000)
);
setTimeout(function () {
$route.reload();
}, 4000);
todoServicez.downgallery(ids);
urls=URL+direct+File_Name;
//alert(urls);
var fileTransfer = new FileTransfer();
var uri = encodeURI(urls);
fileTransfer.download(
uri,
"file:///storage/sdcard0/bazdid/images/"+File_Name,
function(entt) {
},
function(error) {
  console.log("upload error code" + error.message);
},
false,
{
  headers: {
	  "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
  }
}
);

};

//alert(id_var);;
$scope.pageid=page1;
todoServicez.carme(page1).then(function(items)
{ 
	$scope.todo = items;
});
todoServicez.picme(page1).then(function(items)
{ 
	$scope.todop = items;
});

$scope.showAdvanced = function(ev,textx) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
		locals:{dataToPass: textx}, 
      controller: DialogController,
      templateUrl: 'pages/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true
    });
};

function DialogController($scope, $mdDialog,dataToPass) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
$scope.todo = dataToPass ;
}
  
});


scotchApp.service('todoServicez', function($q) 
{
this.carme = function(para)
  {   var idcom=para;
	  var deferred, result = [];
	  deferred = $q.defer();
	  var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
	  db.transaction(function(tx) 
	  { tx.executeSql("select cars.*,company.name AS co_name from cars INNER JOIN company ON company.ids = cars.company where cars.ids="+idcom, [], function(tx, res) 
		  { 
			  for(var i = 0; i < res.rows.length; i++)
			  {//alert(res.rows.item(i).pic);
		  result.push({id : res.rows.item(i).ids, name : res.rows.item(i).name,co_name : res.rows.item(i).co_name,bime : res.rows.item(i).bime, picname: res.rows.item(i).pic,fav : res.rows.item(i).fav, direct: res.rows.item(i).direct, srcpic: 'http://www.borna-grp.ir/', company : res.rows.item(i).company,comment : res.rows.item(i).comment, pic : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).pic})
		  }
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    },
this.picme = function(para)
{   var idcom=para;
//alert(idcom);
var deferred, result = [];
deferred = $q.defer();
var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
db.transaction(function(tx) 
{ tx.executeSql("select * from pics where flag=1 and id_car="+idcom, [], function(tx, res) 
	{ 
		for(var i = 0; i < res.rows.length; i++)
		{
	result.push({id : res.rows.item(i).ids, pic : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).pic})
	}
	deferred.resolve(result);
  });
});
return deferred.promise;
},
this.iffav = function(para)
{   var idcom=para;
//alert(idcom);
var deferred, result = [];
deferred = $q.defer();
var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
db.transaction(function(tx) 
{ tx.executeSql("select fav from cars where ids="+idcom, [], function(tx, res) 
	{ 
		for(var i = 0; i < res.rows.length; i++)
		{
	result.push({fav : res.rows.item(i).fav})
	}
	deferred.resolve(result);
  });
});
return deferred.promise;
},
this.downgallery = function(idcarm)
{   var idcom=idcarm;
//alert(idcom);
var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
db.transaction(function(tx) 
{ tx.executeSql("select * from pics where flag=1 and id_car="+idcom, [], function(tx, res) 
	{ 
	  for(var i = 0; i < res.rows.length; i++)
		{
			var fileTransfer = new FileTransfer();
			var uri = encodeURI('http://www.borna-grp.ir/bazdid/'+res.rows.item(i).direct+res.rows.item(i).pic);
			//alert(uri);
			fileTransfer.download(
			uri,
			"file:///storage/sdcard0/bazdid/images/"+res.rows.item(i).pic,
			function(entt) {
			},
			function(error) {
			  console.log("upload error code" + error.message);
			},
			false,
			{
			  headers: {
				  "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			  }
			}
			);
	}
  });
});
return true;
},
this.UserImg=function(imageURI,file_name,counts){
         	var deferred, result = [];
            var deferred = $q.defer();
			var options = new FileUploadOptions();
			options.fileKey="file";
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
			var params = {};
			params.value1 = file_name;
			params.value2  = counts;
			options.params = params;
			var ft = new FileTransfer();
			ft.upload(imageURI, encodeURI('http://www.borna-grp.ir/sabt_kh.php'),
				function(r){
					//console.log("Code = " + r.responseCode);
					//alert("Response = " + r.response);
					//console.log("Sent = " + r.bytesSent);
					deferred.resolve(r.response);

				},
				function(error){
					//alert("An error has occurred: Code = " + error.code);
					//console.error("upload error source " + error.source);
					//console.error("upload error target " + error.target);
					deferred.reject(error);

				}, options);

return deferred.promise;
        },
this.faverat = function(idss,fave) 
    {
		var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
        db.transaction(function(tx) 
        {
            return tx.executeSql("UPDATE cars SET fav="+fave+" where ids="+idss , [], function(tx, res) 
            {
                return true;
            });
        });
        return false;
    }
	
});

///////////////////////////////////////////////////FORMCtrl
scotchApp.controller('FORMCtrl', function($scope, todoServicez,$location,$routeParams,$sce,$http,$mdToast)
{
pictureSource=navigator.camera.PictureSourceType;
destinationType=navigator.camera.DestinationType;
$scope.users = {};	
$scope.sendform = function(urlpic) {
$scope.user.company='no';
//var laImage = document.getElementById('largeImage0').src;	
if(!$scope.user.company || !$scope.user.cars){
$mdToast.show(
      $mdToast.simple()
        .textContent('لطفا  نام خودرو را وارد کنید!')
        .position('bottom right')
        .hideDelay(3500)
);
}else{	
$scope.btshow=true;
$mdToast.show(
$mdToast.simple()
  .textContent('برنامه در حال ارسال اطلاعات می باشد لطفا منتظر بمانید!')
  .position('bottom right')
  .hideDelay(3500)
);

for(var i = 0; i < 4; i++){
var d = new Date();	
namefile=d.getTime()+'.jpg';
var largeImage = document.getElementById('largeImage'+i);

imageURI=largeImage.src;
//alert(imageURI);
if(i==3){ends='end'}else{ends='no'}
todoServicez.UserImg(imageURI,namefile,ends).then(function(items)
{
//alert(items);
if(items=='end' || items=='not'){
$scope.btshow=false;	

$mdToast.show(
  $mdToast.simple()
  .textContent('ارسال به اتمام رسید')
  .position('bottom right')
  .hideDelay(4000)
);
}
});
 
  $http({
  method  : 'POST',
  url     : 'http://www.borna-grp.ir/sabt_kh.php',
  data    : $.param({company: $scope.user.company, cars:$scope.user.cars, photo:namefile}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(data) {
   // alert(data.items[0].cell);
  });
};
}
}
});

///////////////////////////////////////////////////showfav
scotchApp.controller('Showfav', function($scope,todoServicex,$location,$routeParams)
{
$scope.query = '';
$scope.search = function (user) {
var query = $scope.query.toLowerCase(),
name = user.name.toLowerCase();

if (name.indexOf(query) != -1) {
    return true;
  }
  return false;
};

todoServicex.getfaver().then(function(items)
{
$scope.todos = items;
});

});

////////////////////////////////////////////////////////////////////////////////////sid nav
scotchApp.controller('Sidnav', function ($scope,user,$location,$routeParams, $timeout,$anchorScroll, $mdSidenav, $log) {
$scope.user = user;
$scope.user.bazdid = "فعالسازی برنامه";
$scope.user.namia = true;
$scope.gototop = function() {

$location.hash('tops');

// call $anchorScroll()
$anchorScroll();
};
$scope.go = function ( path ) { $location.path( path );};
$scope.toggleLeft = buildDelayedToggler('left');
$scope.toggleRight = buildToggler('right');
$scope.isOpenRight = function(){
  return $mdSidenav('right').isOpen();
};

$scope.close = function () {
  $mdSidenav('right').close()
	.then(function () {
	});
};


/**
 * Supplies a function that will continue to operate until the
 * time is up.
 */
function debounce(func, wait, context) {
  var timer;
  return function debounced() {
	var context = $scope,
		args = Array.prototype.slice.call(arguments);
	$timeout.cancel(timer);
	timer = $timeout(function() {
	  timer = undefined;
	  func.apply(context, args);
	}, wait || 10);
  };
}
/**
 * Build handler to open/close a SideNav; when animation finishes
 * report completion in console
 */
function buildDelayedToggler(navID) {
  return debounce(function() {
	$mdSidenav(navID)
	  .toggle()
	  .then(function () {
	
	  });
  }, 200);
}
function buildToggler(navID) {
  return function() {
	$mdSidenav(navID)
	  .toggle()
	  .then(function () {

	  });
  }
}
})

.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {

$scope.close = function () {
$mdSidenav('right').close()
  .then(function () {
	$log.debug("close RIGHT is done");
  });
}; 
$scope.settings = [
  { name: 'لیست شرکت ها', icon: 'img/icons/automobile-salesman.svg', links: '/home/x' },
  { name: 'لیست خودرو ها',  icon: 'img/icons/transport103.svg', links: '/search/2'  },
  { name: 'تنظیمات',  icon: 'img/icons/three115.svg', links: '/setting/2'  },
  { name: 'ثبت خودروي جديد',  icon: 'img/icons/car-insurance.svg', links: '/form/2'  },
  ];
});