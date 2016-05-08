angular.module('MyBlog')
	.controller('LoginController', ['$scope', 'Login', function($scope, Login){
		$scope.LoginHandler = function() {
			$scope.logUser = {
				username: $scope.username,
				password: $scope.password
			};

			$scope.user = Login.save($scope.logUser , function(data, status) {
				window.location.href = '/dashboard'
				console.log(data );
			});
		};
	}])
	.controller('DashboardController', ['$scope', function($scope){
		$scope.message = 'hello world this is dashboard';
	}])
	.controller('PostsController', ['$scope', 'Posts', 'Post', 'Comments', '$stateParams', function($scope, Posts, Post, Comments, $stateParams) {
		//getting all the posts
		$scope.getPosts = function() {
			$scope.posts = Posts.query();
		};

		// getting single post
		$scope.getSingle = function(){
			$scope.singlePost = Post.get({ id: $stateParams.id })
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

		//adding a post 
		$scope.addPost = function() {
			$scope.NewPost = {
				title: $scope.title,
				author: $scope.author,
				image: $scope.image,
				category: $scope.category,
				likes: $scope.likes,
				content: $scope.content
			};

			$scope.addPost = Posts.save($scope.NewPost, function() {
				window.location.href = '/#/posts';
			});
		};

		//updating a post
		$scope.updatePost = function() {
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

		//remove a post
		$scope.removePost = function() {
			$scope.remove = Post.delete({id: $stateParams.id}, function() {
				window.location.href = '/#/posts';
			})
		};
	}]);