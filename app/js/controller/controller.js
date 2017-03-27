app.controller('index', ['$scope', function( $scope ) {
	$scope.intro = "Rafon";
}]);
app.controller('users', ['$scope', 'Users',  function( $scope, Users ) {
	$scope.users = Users.getUsers();
}]);
app.controller('user', ['$scope', 'Users', '$state',  function( $scope, Users, $state ) {
	if ( $state.params.id ) {
		console.log( Users.viewUserInfo( $state.params.id ) );
	}
}]);
app.controller('adduser', ['$scope', 'Users', 'Hobbies', 'Status', '$state', 'md5', 'Globals',  function( $scope, Users, Hobbies, Status, $state, md5, Globals ) {
	$scope.confirm = {};
	$scope.userInput = {};
	Status.getStatuses().then( function( response ) {
		$scope.statuses = response;
	});			
	Hobbies.getHobbies().then( function( response ) {
		hobbies = new Array();
		angular.forEach( response, function( value ) {
			hobbies.push( {
				hobby : value.name,
				name : value.name,
				checked : false
			} );
		} );
		$scope.hobbies = hobbies;
	});	
	$scope.addUser = function() {
		if ( $scope.confirm.password !== $scope.userInput.password ) {
			$scope.passwordError = 'Password did not match.';
		} else {
			if ( $scope.userInput.password.length < 3 ) {
				$scope.passwordError = 'Password is at least 8 characters.';
			} else {
				$scope.passwordError = '';
				$scope.userInput.password = md5.createHash( $scope.userInput.password );
				if ( Users.userHobbies.length !== 0 ) {
					$scope.userInput.hobbies = Users.userHobbies;
				}
				$scope.userInput.datecreated = Globals.getDate();
				console.log( $scope.userInput );			
				Users.addNewUser( $scope.userInput );
			}
		}
	}
}]);
app.controller('useredit', ['$scope', 'Hobbies', 'Users', 'Status', '$state',  function( $scope, Hobbies, Users, Status, $state ) {
	if ( $state.params.id ) {
		$scope.userInput = {};		
		var hobbies = [];	
		var userHobbies = [];
		Users.getUserInfo( $state.params.id ).then( function( response ) {
			$scope.userInput.firstname = response.firstname;
			$scope.userInput.middlename = response.middlename;
			$scope.userInput.lastname = response.lastname;
			$scope.userInput.occupation = response.occupation;
			$scope.userInput.summary = response.summary;
			$scope.userInput.email = response.email;
			$scope.userInput.status = response.status;
		});			
		Status.getStatuses().then( function( response ) {
			$scope.statuses = response;
		});			
		Hobbies.getHobbies().then( function( response ) {
			hobbies = new Array();
			angular.forEach( response, function( value ) {
				hobbies.push( value.name );
			} );
		});		
		Users.getUserHobbies( $state.params.id ).then( function( response ) {
			for ( var key in response ) {
				userHobbies.push( response[key] );
			}
			var map = hobbies.map( function( value, index ) {
				var object = {};
				var hobbyIndex = userHobbies.indexOf( value );
				object.hobby = value;
				object.name = value;
				object.checked = false;
				if ( hobbyIndex !== -1 ) {
					object.checked = true;
				}
				return object;
			});
			$scope.hobbies = map;
		});
		$scope.addUserInfo = function() {
			var editData = {};
			for ( var key in $scope.userInput ) {
				if ( $scope.userInput[key] !== undefined ) {
					editData[key] = $scope.userInput[key];
				}
			}
			if ( Users.userHobbies.length !== 0 ) {
				editData.hobbies = Users.userHobbies;
			}		
			Users.updateUserSettings( $state.params.id, editData );
		}
	}
}]);
app.controller('editusersettings', ['$scope', 'Users', '$state', 'Globals',  function( $scope, Users, $state, Globals ) {
	if ( $state.params.id ) {
		$scope.userInput = {};
		$scope.userData = {};
		Users.getUserInfo( $state.params.id ).then( function( response ) {
			for ( var key in response ) {
				$scope.userData[key] = response[key];
			}
		});		
		Users.getUserInfo( $state.params.id ).then( function( response ) {
			$scope.userInput.username = response.username;
		});			
		$scope.updateUsername = function() {
			$scope.userInput.usernameupdated = Globals.getDate();
			Users.updateUserSettings( $state.params.id, $scope.userInput );
		}
	}
}]);
app.controller('changepassword', ['$scope', 'Users', '$state', 'md5', 'Globals',  function( $scope, Users, $state, md5, Globals ) {
	if ( $state.params.id ) {
		$scope.userData = {};
		$scope.userInput = {};
		$scope.current = {};
		$scope.confirm = {};
		$scope.current.password = '';
		$scope.userInput.password = '';
		$scope.confirm.password = '';
		Users.getUserInfo( $state.params.id ).then( function( response ) {
			for ( var key in response ) {
				$scope.userData[key] = response[key];
			}
		});			
		$scope.changePassword = function() {
			Users.getCurrentPassword( $state.params.id ).then( function( response ) {
				var currentPassword = '';
				if ( $scope.current.password === '' ) {
					$scope.passwordError = 'Current password cannot be empty.';
				} else {
					currentPassword = md5.createHash( $scope.current.password );
					if ( currentPassword !== response.password ) {
						$scope.passwordError = 'Current password is not correct.';
						$scope.userInput.password = '';
						$scope.confirm.password = '';
						scope.current.password = '';
					} else {
						if ( $scope.userInput.password !== '' ) {
							$scope.passwordErrorRepeat = '';
							$scope.passwordError = '';
							if ( $scope.userInput.password.length < 8 ) {
								$scope.passwordErrorRepeat = 'Password is at least 8 characters.';
								$scope.userInput.password = '';
								$scope.confirm.password = '';
							} else {
								if ( $scope.userInput.password !== $scope.confirm.password ) {
									$scope.passwordErrorRepeat = 'Password did not match.';
									$scope.userInput.password = '';
									$scope.confirm.password = '';
								} else {
									var newPassword = md5.createHash( $scope.userInput.password );
									if ( newPassword === currentPassword ) {
										$scope.passwordErrorRepeat = 'Current password is not accepted.';
										$scope.userInput.password = '';
										$scope.confirm.password = '';
									} else {
										$scope.passwordErrorRepeat = '';
										$scope.userInput.passwordupdated = Globals.getDate();
										$scope.userInput.password = newPassword;
										Users.updateUserSettings( $state.params.id, $scope.userInput );
									}
								}
							}
						} else {
							$scope.passwordErrorRepeat = 'New password cannot be empty.';
						}
					}
				}
			});
		}
	}
}]);
