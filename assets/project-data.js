app.directive('projectData', [ function () {
		
		var templateUrl = _ASSETS_URL + '/assets/project-data.html';

		return {
			require: 'stamplay',
			scope: {},
			templateUrl: templateUrl,
			link: function (scope, element, attrs) {
				var partialDate= attrs['expireDate'].split("/")  
				var date1 = new Date(parseInt(partialDate[2]), parseInt(partialDate[1])-1, parseInt(partialDate[0]));
				var date2 = new Date()
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				scope.daysLeft  = Math.ceil(timeDiff / (1000 * 60 *60 * 24)); 
				scope.goal = parseInt(attrs['goal'])
			},
			controller: function ($scope, $http, $rootScope) {
				
				$http({method:'GET', url:'/api/cobject/v0/backer'})
			    .success(function(data, status){
			    	$scope.backers = data.data.length
			    })
			    .error(function(data, status){
			    	/*Implement error login*/
			    })
			  
			  /* INSERT HERE THE OBJECTID OF YOUR FOUND OBJ */
			  var foundObjectId = "";


			  $http({method:'GET', url:'/api/cobject/v0/found/'+foundObjectId})
			    .success(function(data, status){
			    	$scope.money = data.money
			    })
			    .error(function(data, status){
			    	/*Implement error login*/
			  })

			  var update = function(data){ 

			  	return $http({method:'PUT', data: data, url: '/api/cobject/v0/found/'+foundObjectId})
			  }

			  var incrementBackerAndMoney = function($scope,money){
			  	$scope.backers = $scope.backers +1;
			  	$scope.money = $scope.money+ money;
			  	var call = update({money: $scope.money}).then(function(resp){})
			  }
			  $rootScope.$on('refreshData5', function(){
			  	incrementBackerAndMoney($scope, 5)
			  })
			  $rootScope.$on('refreshData15', function(){
			  	incrementBackerAndMoney($scope, 15)
			  })
			  $rootScope.$on('refreshData30', function(){
			  	incrementBackerAndMoney($scope, 30)
			  })

			}
		};
}]);