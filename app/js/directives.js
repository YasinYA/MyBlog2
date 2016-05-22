angular 
	.module('MyBlog')
	.directive('drLikes', ['SinglePostLikes', function(SinglePostLikes){
		// Runs during compile
		return {
			restrict: 'E',
			templateUrl: '../views/directives/likes.html',
			link: function($scope, element, attr) {
				$scope.postlike = SinglePostLikes.getlikes(attr.id, attr.separate);
				$scope.postlike.success(function(res) {
					$scope.postlikes = res;
				});
			}

		};
	}])
	.directive('drComments', ['$http', 'SinglePostComments', '$stateParams', function($http, SinglePostComments, $stateParams){
		// Runs during compile
		return {
			restrict: 'E',
			templateUrl: '../views/directives/comments.html',
			link: function($scope, element, attr) {
				$scope.SinglepostComment = SinglePostComments.getComments(attr.id);
				$scope.SinglepostComment.success(function(res) {
					$scope.SinglepostComments = res;
				});
			}

		};
	}]);