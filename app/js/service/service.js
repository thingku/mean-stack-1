app.service('Users', [ '$http', '$q', '$location', 'Hobbies', function( $http, $q, $location, Hobbies ) {
	this.getUsersPromise = function() {
		var deferred = $q.defer();
		$http.get( '/data/users' ).then( function( response ) {
			deferred.resolve( response.data );
		});
		return deferred.promise;
	};
	this.getUsers = function() {
		var usersData = [];
		$http.get( '/data/users' ).then( function( response ) {
			angular.forEach( response.data, function( v ) {
				usersData.push( v );
			} );
		});
		return usersData;
	}
	this.viewUserInfo = function( id ) {
		var userInfo = {};
		$http.get( '/data/user/' + id ).then( function( response ) {
			for ( var key in response.data ) {
				userInfo[key] = response.data[key];
			}
		});
		return userInfo;
	}	
	this.getUserInfo = function( id ) {
		var deferred = $q.defer();
		$http.get( '/data/user/edit/' + id ).then( function( response ) {
			deferred.resolve( response.data );
		});
		return deferred.promise;
	}
	this.updateUserSettings = function( id, data ) {
		$http.put( '/data/user/save-edit/' + id, data ).then( function( response ) {
			if ( response.status === 200 ) {
				$location.url( '/users' );
			}
		});
	}	
	this.getUserHobbies = function( id ) {
		var hobbies = [];
		var defered = $q.defer();
		$http.get( '/data/user/edit/' + id ).then( function( response ) {
			defered.resolve( response.data.hobbies );
		});
		return defered.promise;
	}	
	this.addNewUser = function( data ) {
		$http.post('/data/add/user', data ).then(function(response) {
			if ( response.status === 200 ) {
				$location.url( '/users' );
				this.userHobbies = [];
			}
		});		
	}
	this.getCurrentPassword = function( id ) {
		var deferred = $q.defer();
		$http.get( '/data/user/' + id ).then( function( response ) {
			deferred.resolve( response.data );
		});
		return deferred.promise;
	}		
	this.userHobbies = [];
}]);
app.service('Hobbies', [ '$http', '$q', function( $http, $q ) {
	this.getHobbies = function() {
		var defered = $q.defer();
		$http.get( '/data/hobbies' ).then( function( response ) {
			defered.resolve( response.data );
		});
		return defered.promise;
	}
}]);
app.service('Status', [ '$http', '$q', function( $http, $q ) {
	this.getStatuses = function() {
		var defered = $q.defer();
		$http.get( '/data/status' ).then( function( response ) {
			defered.resolve( response.data );
		});
		return defered.promise;
	}
}]);
app.service('Globals', [ function() {
	this.getDate = function() {
		var date = new Date();
		var month = date.getMonth() + parseInt(1);
		if ( month < 10 ) {
			month = '0' + month;
		}		
		var day = date.getDate();
		if ( day < 10 ) {
			day = '0' + day;
		}		
		var year = date.getFullYear();
		var hour = date.getHours();
		if ( hour < 10 ) {
			hour = '0' + hour;
		}
		var minutes = date.getMinutes();
		if ( minutes < 10 ) {
			minutes = '0' + minutes;
		}		
		var seconds = date.getSeconds();
		if ( seconds < 10 ) {
			seconds = '0' + seconds;
		}			
		return month + '/' + day + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds;
	}
}]);