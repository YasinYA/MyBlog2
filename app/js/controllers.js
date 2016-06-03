angular.module('MyBlog')
	.controller('LoginController', ['$scope', 'Login', function($scope, Login){
		$scope.LoginHandler = function() {
			$scope.logUser = {
				username: $scope.username,
				password: $scope.password
			};

			$scope.login = Login.postCredential($scope.logUser);
			$scope.message = Login.message;
			$scope.show = Login.show;
			// $http.post('/api/admin', $scope.logUser).success(function(res) {
			// 	window.location.href = '/dashboard';
			// }).error(function(err) {
			// 	$scope.message = 'Invalid User';
			// 	$scope.show = true;
			// });
		};
	}])
	.controller('DashboardController', ['$scope', 'Dashboard' , function($scope, Dashboard){
		$scope.message = 'hello world this is dashboard';
		// $scope.check = Dashboard.checkauthorization();
	}])
	.controller('PostsController', ['$scope', 'Posts', 'Post', 'Likes', 'Comments', '$stateParams', function($scope, Posts, Post, Likes, Comments, $stateParams) {
		//getting all the posts
		$scope.getPosts = function() {
			$scope.posts = Posts.query();
		};

		// getting single post
		$scope.getSingle = function(){
			$scope.singlePost = Post.get({ id: $stateParams.id });
		};

		$scope.like = 0;
		$scope.liker = function(postid) {
			$scope.like++;
			$scope.newLike = {
				postId: postid,
				likes: $scope.like
			};
			$scope.postLike = Likes.save($scope.newLike, function() {
				window.location.reload()
			});
		};

		$scope.getComments = function() {
			$scope.comments = Comments.query();
			$scope.arr = [];
			
			// filtering the post comment
			$scope.comments.$promise.then(function(val) {
				val.forEach(function(comment) {
					if($stateParams.id === comment.postId) {
						$scope.arr.push(comment);
					}
				});
			})
		};

		//adding comments
		$scope.addComment = function() {
			$scope.comment = {
				name: $scope.name,
				email: $scope.email,
				postId: $stateParams.id,
				body: $scope.body,
				image: "https://cdn1.iconfinder.com/data/icons/photography-2/512/YPS__human_avatar_portrait_photography_picture_photo-512.png"
			};

			//console.log($scope.comment);
			var id = $stateParams.id;
			$scope.commentPost = Comments.save({id: $stateParams.id}, $scope.comment, function() {
				window.location.reload();	
			});
		};

		//remove a post
		$scope.removePost = function() {
			$scope.remove = Post.delete({id: $stateParams.id}, function() {
				window.location.href = '/#/posts';
			})
		};
	}])
	.controller('AddPostController', ['$scope', 'Posts', function($scope, Posts){
		$scope.addNewPost = function() {
			var NewPost = {
				title: $scope.title,
				author: $scope.author,
				image: $scope.image,
				category: $scope.category,
				likes: $scope.likes,
				content: $scope.content
			};

			$scope.addPost = Posts.save(NewPost, function() {
				window.location.href = '/#/posts';
			});
		};
	}])
	.controller('EditRemoveController', ['$scope', 'Post', '$stateParams', function($scope, Post, $stateParams){
		$scope.getSinglePost = function(){
			$scope.singlePost = Post.get({ id: $stateParams.id });
		};
		
		//updating a post
		$scope.editPost = function() {
			var editedVal = {
				title: $scope.singlePost.title,
				author: $scope.singlePost.author,
				image: $scope.singlePost.image,
				category: $scope.singlePost.category,
				content: $scope.singlePost.content
			};
			$scope.editPost = Post.update({id: $stateParams.id}, editedVal, function() {
				var id = $stateParams.id;
				window.location.href = '/#/single/'+id;
			});
		};
	}]);