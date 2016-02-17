 var scotchApp = angular.module('StarterApp', ['ngRoute','ngMaterial','ngSanitize'] );
 
//scotchApp.run(function($rootScope) {
//    $rootScope.test = new Date();
//})
// configure our routes
scotchApp.config(function($routeProvider) {	  

  $routeProvider
	  // route for the home page
	  .when('/', {
		  templateUrl : 'pages/start.html',
	  })
	  
	  .when('/home', {
		  templateUrl : 'pages/home.html',
	  })
	  
	  .when('/online', {
		  templateUrl : 'pages/online.html',
	  })
	  
	  // route for the list page
	  .when('/list/:param1', {
		  templateUrl : 'pages/list.html',
		
	  })
	 // route for the content page
	  .when('/content/:param1/:page1', {
		  templateUrl : 'pages/content.html',
		
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

});
////////////////////////////////////////////////////////
scotchApp.controller('onlineCtrl',  function($scope,$location,$routeParams)
{
document.addEventListener("online", onOnline, false);
function onOffline() {
$location.path('/');
}
});
////////////////////////////////////////////////////////////	
scotchApp.controller('StarterCtr',  function($scope, todoService,$location,$routeParams,$sce,$http)
{
$scope.go = function ( path ) {$location.path( path );};
document.addEventListener("offline", onOffline, false);
function onOffline() {
$location.path('/online');
}

todoService.idreg().then(function(items)
{
	$scope.regiser = items;
	if($scope.regiser){
	$location.path('/home');
	}
});

$scope.trustSrc = function(src) {
return $sce.trustAsResourceUrl(src);
}
$scope.movie = {src:"http://www.shahreroya.ir/bazdid/req.php", title:"واریز به حساب"};
/////////////////////////////////////////////////////////////////////
$scope.user = {};
$scope.sabtcode = function() {
  $http({
  method  : 'POST',
  url     : 'http://www.shahreroya.ir/phonegap/api/bazdid.php',
  data    : $.param({name: $scope.user.fname, mname:$scope.user.name, codes:$scope.user.code}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(data) {
//alert(data.items[0].cell);
if(data.items[0].cell!=''){
todoService.insertcod(data.items[0].cell);
$location.path('/home');
}


  });
};


});

/////////////////////////////

scotchApp.controller('mainController', function($scope, todoService,$location,$routeParams)
{
document.addEventListener("backbutton", function(e){
	if($location.path()=='/home' ){
	e.preventDefault();
	navigator.app.exitApp();
	}
	else {
	navigator.app.backHistory()
	}
}, false);
	
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

///////////////////////////////////////////
scotchApp.controller('listAppCtrl', function($scope,todoServicex,$location,$routeParams)
{
$scope.search = function (row) {
	return !!((row.name.indexOf($scope.query || '') !== -1));
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
		  result.push({id : 'content/list/'+res.rows.item(i).ids, name : res.rows.item(i).name, bime : res.rows.item(i).bime, company : res.rows.item(i).company,comment : res.rows.item(i).comment, pic : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).pic})
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
		  result.push({id : 'content/list/'+res.rows.item(i).ids, name : res.rows.item(i).name, company : res.rows.item(i).company,comment : res.rows.item(i).comment, pic : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).pic})
		}
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    }
});


///////////////////////////////////////////////////ContentCtrl
scotchApp.controller('ContentCtrl', function($scope,$route,todoServicez,$location,$routeParams,$mdDialog,$route,$timeout, $mdMedia,$mdToast)
{
var param1 = $routeParams.param1;
var page1 = $routeParams.page1;
/////////////////////////////////////// like kardan
$scope.fave = function (id_var) 
{
todoServicez.faverat(id_var);
$mdToast.show(
      $mdToast.simple()
        .textContent('این خودرو با موفقیت در لیست مورد علایق شما قرار گرفت!')
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
	  { tx.executeSql("select * from cars where ids="+idcom, [], function(tx, res) 
		  { 
			  for(var i = 0; i < res.rows.length; i++)
			  {
		  result.push({id : res.rows.item(i).ids, name : res.rows.item(i).name,bime : res.rows.item(i).bime, picname: res.rows.item(i).pic, direct: res.rows.item(i).direct, srcpic: 'http://www.irannoozdah.ir/bazdid/', company : res.rows.item(i).company,comment : res.rows.item(i).comment, pic : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).pic})
		  }
		  deferred.resolve(result);
		});
	  });
	  return deferred.promise;
    },
this.picme = function(para)
{   var idcom=para;

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
			var uri = encodeURI('http://www.irannoozdah.ir/bazdid/'+res.rows.item(i).direct+res.rows.item(i).pic);
			alert(uri);
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
this.UserImg=function(imageURI,file_name){
            var deferred = $q.defer();
			var options = new FileUploadOptions();
			options.fileKey="file";
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);

			var params = {};
			params.value1 = file_name;
			options.params = params;
			var ft = new FileTransfer();
			ft.upload(imageURI, encodeURI('http://www.shahreroya.ir/phonegap/api/bazdid.php'),
				function(r){
					console.log("Code = " + r.responseCode);
					console.log("Response = " + r.response);
					console.log("Sent = " + r.bytesSent);
					deferred.resolve(r.response);

				},
				function(error){
					alert("An error has occurred: Code = " + error.code);
					console.error("upload error source " + error.source);
					console.error("upload error target " + error.target);
					deferred.reject(error);

				}, options);


return deferred.promise;
        },
this.faverat = function(idss) 
    {
		var db = window.openDatabase("Database", "1.0", "Cordova bazdid", 200000);
        db.transaction(function(tx) 
        {
            return tx.executeSql("UPDATE cars SET fav=1 where ids="+idss , [], function(tx, res) 
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

$scope.users = {};	
$scope.sendform = function(urlpic) {
$scope.btshow=true;
$mdToast.show(
      $mdToast.simple()
        .textContent('برنامه در حال ارسال اطلاعات می باشد لطفا منتظر بمانید!')
        .position('bottom right')
        .hideDelay(3500)
);
	
var d = new Date();	
namefile=d.getTime()+'.jpg';
var largeImage = document.getElementById('largeImage');
 imageURI=largeImage.src ;
// alert(imageURI);
todoServicez.UserImg(imageURI,namefile).then(function(items)
{
$scope.btshow=false;	
//alert(items);
$mdToast.show(
      $mdToast.simple()
        .textContent('ارسال به اتمام رسید')
        .position('bottom right')
        .hideDelay(4000)
);
});

  $http({
  method  : 'POST',
  url     : 'http://www.shahreroya.ir/phonegap/api/bazdid.php',
  data    : $.param({company: $scope.user.company, cars:$scope.user.cars, photo:namefile}),  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 })
  .success(function(data) {
    alert(data.items[0].cell);
	if(data.items[0].cell!=''){
	$location.path('/home');
	}

  });
};

});

///////////////////////////////////////////////////showfav
scotchApp.controller('Showfav', function($scope,todoServicex,$location,$routeParams)
{
$scope.search = function (row) {
	return !!((row.name.indexOf($scope.query || '') !== -1));
};	
todoServicex.getfaver().then(function(items)
{
$scope.todos = items;
});
 
});

////////////////////////////////////////////////////////////////////////////////////sid nav
scotchApp.controller('Sidnav', function ($scope,$location,$routeParams, $timeout, $mdSidenav, $log) {
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
  { name: 'لیست شرکت ها', icon: 'img/icons/collision.svg', links: '/list/modern' },
  { name: 'انواع شماره شاسی',  icon: 'img/icons/car164.svg', links: '/list/farhang'  },
  { name: 'انواع خودرو',  icon: 'img/icons/transport103.svg', links: '/list/rols'  },
  { name: 'تنظیمات',  icon: 'img/icons/three115.svg', links: '/list/nice'  },
  ];
});
	
