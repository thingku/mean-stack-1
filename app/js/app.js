var app = angular.module( 'usersApp', [ 'ui.router', 'angular-md5' ] );
app.config( function( $stateProvider, $urlRouterProvider ) {
	$stateProvider
	.state( 'index', {
		url : '/',
		templateUrl : 'templates/home.html',
		controller : 'index'
	})
	.state( 'users', {
		url : '/users',
		templateUrl : 'templates/userlist.html',
		controller : 'users'
	})
	.state( 'users.user', {
		url : '/:id',
		views : {
			'userview' : {
				templateUrl : 'templates/userinfo.html',
				controller : 'user'
			}
		}
	})
	.state( 'users.edit', {
		url : '/edit/:id',
		views : {
			'editview' : {
				templateUrl : 'templates/edituserinfo.html',
				controller : 'useredit'
			}
		}
	})
	.state( 'add', {
		url : '/add',
		templateUrl : 'templates/adduser.html',
		controller : 'adduser'
	})
	.state( 'settings', {
		url : '/user/settings/:id',
		templateUrl : 'templates/editusersettings.html',
		controller : 'editusersettings'
	})
	.state( 'changepassword', {
		url : '/changepassword/:id',
		templateUrl : 'templates/changepassword.html',
		controller : 'changepassword'
	});	
	$urlRouterProvider.otherwise( function($injector) {
		var $state = $injector.get('$state');
		$state.go('index');
	});	 
});