angular
	.module("MyBlog")
	.factory('Login', ['$http', function($http){
		var user = {};
		user.postCredential = function() {
			$http.post('/api/admin', $scope.logUser).success(function(res) {
				window.location.href = '/dashboard';
			}).error(function(err) {
				user.message = 'Invalid User';
				user.show = true;
			});
		};

		return user;
	}])
	.factory("Posts", ["$resource", function($resource) {
		return $resource("/api/posts", {
			query: {
				method: "GET",
				isArray: !0
			},
			save: {
				method: "POST",
				url: "/api/posts"
			}
		})
	}]).factory("Post", ["$resource", function($resource) {
		return $resource("/api/post/:id", null, {
			query: {
				method: "GET",
				params: {
					id: "@_id"
				},
				isArray: !0
			},
			update: {
				method: "PUT",
				params: {
					id: "@_id"
				}
			},
			"delete": {
				method: "DELETE",
				params: {
					id: "@_id"
				}
			}
		})
	}]).factory("Comments", ["$resource", function($resource) {
		return $resource("/api/comments", {
			query: {
				method: "GET",
				isArray: !0
			},
			save: {
				method: "POST",
				params: {
					id: "@_id"
				}
			}
		})
	}]).factory("Likes", ["$resource", function($resource) {
		return $resource("/api/likes", {
			save: {
				method: "POST"
			}
		})
	}])
	.factory('SinglePostLikes', ['$http', '$stateParams', function($http, $stateParams){
		var data = {};
		data.getlikes = function (id, sep){
			if(sep === 'true') {
				return $http.get('/api/postlikes/'+ $stateParams.id);
			}else if(sep === 'false') {
				return $http.get('/api/postlikes/'+id);
			}
		};

		return data;
	}])
	.factory('SinglePostComments', ['$http', function($http){
		var data = {};
		data.getComments = function (id){
			return $http.get('/api/comments/'+id);
		};

		return data;
	}]);