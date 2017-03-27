app.directive('preventDefault' , function() {
	return {
		link : function ( scope,element,attr ) {
			element.on( 'click', function(e) {
				e.defaultPrevented = true;
			});
		}
	}
});
app.directive('isChecked' , function( Users, $timeout ) {
	return {
		link : function ( scope,element,attr ) {
			Users.userHobbies = new Array();
			angular.forEach( element, function( value, key ){
				var thisInput = angular.element( value );
				$timeout( function() {
					if ( thisInput[key].checked === true  ) {
						var arrayIndex = Users.userHobbies.indexOf( thisInput[key].value );
						if ( arrayIndex === -1 ) {
							Users.userHobbies.push( thisInput[key].value );
						}
					}
				});
				thisInput.on( 'change', function( v ) {
					if ( v.target.checked === true ) {
						Users.userHobbies.push( v.target.value );
					} else {
						var removeArrString = Users.userHobbies.indexOf( v.target.value );
						Users.userHobbies.splice( removeArrString, 1 );
					}
				});
			});
		}
	}
});