angular 
	.module('MyBlog')
	.directive('drLikes', ['SinglePostLikes', function(SinglePostLikes){
		return {
			scope: {},
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
	.directive('drComments', ['SinglePostComments', function(SinglePostComments){
		return {
			scope: {},
			restrict: 'E',
			templateUrl: '../views/directives/comments.html',
			link: function($scope, element, attr) {
				$scope.SinglepostComment = SinglePostComments.getComments(attr.id);
				$scope.SinglepostComment.success(function(res) {
					$scope.SinglepostComments = res;
				});
			}

		};
	}])
	.directive('sideBar', ['Posts', function(Posts){
		return {
			scope: {},
			restrict: 'EA',
			templateUrl: '../views/directives/sidebar.html',
			link: function($scope, element, attr) {
				$scope.shower = attr.showing;
				if($scope.shower === 'true') {
					$scope.recentPosts = Posts.query();
				}
			}
		};
	}]);