 var scotchApp = angular.module('StarterApp', ['ngRoute','ngMaterial','ngSanitize'] );
 
scotchApp.run(function($rootScope) {
    $rootScope.test = new Date();
})
// configure our routes
scotchApp.config(function($routeProvider) {	  

  $routeProvider
	  // route for the home page
	  .when('/', {
		  templateUrl : 'pages/home.html',
		  controller  : 'mainController'
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

});

////////////////////////////////////////////////////////////	
//scotchApp.controller('mainController',  ['$scope', '$window', function($scope,$window) {


/////////////////////////////

scotchApp.controller('mainController', ['$scope', 'todoService','$location','$routeParams', function($scope, todoService,$location,$routeParams)
{
$scope.go = function ( path ) {$location.path( path );};

todoService.getItems().then(function(items)
{
	$scope.todos = items;
});
$scope.search = function (row) {
	return !!((row.name.indexOf($scope.query || '') !== -1));
};
 }]);
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
		  result.push({id : 'content/list/'+res.rows.item(i).ids, name : res.rows.item(i).name, company : res.rows.item(i).company,comment : res.rows.item(i).comment, pic : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).pic})
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
scotchApp.controller('ContentCtrl', function($scope,todoServicez,$location,$routeParams,$mdDialog, $mdMedia)
{
var param1 = $routeParams.param1;
var page1 = $routeParams.page1;
$scope.fave = function (id_var) 
{  
todoServicez.faverat(id_var);
alert('با موفقیت در لیست علایق قرار گرفت');
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
		  result.push({id : res.rows.item(i).ids, name : res.rows.item(i).name, company : res.rows.item(i).company,comment : res.rows.item(i).comment, pic : 'file:///storage/sdcard0/bazdid/images/'+res.rows.item(i).pic})
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
scotchApp.controller('FORMCtrl', function($scope,todoServicez,$location,$routeParams,$mdDialog, $mdMedia)
{
	
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
scotchApp.controller('Sidnav', function ($scope, $timeout, $mdSidenav, $log) {
$scope.toggleLeft = buildDelayedToggler('left');
$scope.toggleRight = buildToggler('right');
$scope.isOpenRight = function(){
  return $mdSidenav('right').isOpen();
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
		$log.debug("toggle " + navID + " is done");
	  });
  }, 200);
}
function buildToggler(navID) {
  return function() {
	$mdSidenav(navID)
	  .toggle()
	  .then(function () {
		$log.debug("toggle " + navID + " is done");
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
	
