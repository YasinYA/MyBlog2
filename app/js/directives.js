angular 
	.module('MyBlog')
	.directive('drLikes', ['Likes', '$http', '$stateParams', function(Likes, $http, $stateParams){
		// Runs during compile
		return {
			restrict: 'E',
			templateUrl: '../views/directives/likes.html',
			link: function($scope, element, attr) {
				$scope.separator = attr.separate;
				if($scope.separator === 'false') {
					$http.get('/api/postlikes/' + attr.id).success(function(res) {
						$scope.postlikes = res;
						console.log($scope.postlikes);
					});
				}else if($scope.separator === 'true') {
					$http.get('/api/postlikes/' + $stateParams.id).success(function(res) {
						$scope.postlikes = res;
					});
				}
			}

		};
	}])
	.directive('drComments', ['$http', '$stateParams', function($http, $stateParams){
		// Runs during compile
		return {
			restrict: 'E',
			templateUrl: '../views/directives/comments.html',
			link: function($scope, element, attr) {
				$http.get('/api/comments/' + attr.id).success(function(res) {
					$scope.SinglepostComments = res;
				});
			}

		};
	}]);