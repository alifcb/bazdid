 var scotchApp = angular.module('StarterApp', ['ngRoute','ngMaterial','ngSanitize'] );
 
 
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
		  controller  : 'listAppCtrl'
	  })
	   // route for the content page
	  .when('/content/:param1/:page1', {
		  templateUrl : 'pages/content.html',
		  controller  : 'ContentCtrl'
	  })
	  
	   // route for the tabs page
	  .when('/tabs', {
		  templateUrl : 'pages/tabs.html',
		  controller  : 'tabsController'
	  })

});

////////////////////////////////////////////////////////////	
scotchApp.controller('mainController', function($scope,$location,$routeParams) {

$scope.go = function ( path ) {$location.path( path );};
var imagePath = 'img/bmw.png';
var imagePath2 = 'img/benz.png';
	  var imagePath3 = 'img/lamb.png';
    $scope.todos = [
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'شرکت تویتا',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath2,
        what: 'شرکت بنز',
        who: 'شرکت بنز',
        when: '3:08PM',
        notes: " در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath3,
        what: 'Brunch this weekend?',
        who: 'ایران خودرو',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'کیا موتور',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
	        {
        face : imagePath2,
        what: 'Brunch this weekend?',
        who: 'شرکت هیوندا',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath3,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath2,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath3,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
    ];
});

scotchApp.controller('ContentCtrl', function($scope, $mdDialog, $mdMedia) {
$scope.imagePath = 'img/eefre.jpg';	

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

scotchApp.controller('listAppCtrl', function($scope) {
	var imagePath = 'img/eee.jpg';
    var imagePath2 = 'img/ggg.jpg';
	  var imagePath3 = 'img/hhh.jpg';
    $scope.todos = [
      {
        face : imagePath,
        what: 'پراید 141',
        who: 'شرکت تویتا',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath2,
        what: 'بنز کلاس E',
        who: 'شرکت بنز',
        when: '3:08PM',
        notes: " در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath3,
        what: 'لامبورگینی',
        who: 'ایران خودرو',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath,
        what: 'پژو 207',
        who: 'کیا موتور',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
	        {
        face : imagePath2,
        what: 'کیا سراتو',
        who: 'شرکت هیوندا',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath3,
        what: 'اپتیما',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },
      {
        face : imagePath,
        what: 'سانتافه',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: "در حال حاضر مدل های  ایکس در لیست قرار دارند"
      },

    ];
	});




//////////////////////////////////////////////////////////	//////////////////////////sid nav
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
	
