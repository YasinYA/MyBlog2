angular.module('MyBlog', ['ui.router', 'ngResource'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',function($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('home', {
				url: '/',
				views: {
		        	'nav' : {templateUrl: 'views/homeNav.html'},
		        	'content': {templateUrl: 'views/welcome.html'}
		        }
			})
			.state('admin', {
		    	url: "/admin",
		    	views : {
		    		'content': { templateUrl: '../../admin.html',
		    					 controller: "LoginController"}
		    	}
		    })
		    .state('userPosts', {
		    	url: '/userposts',
		    	views: {
		        	'nav' : {templateUrl: 'views/homeNav.html'},
		        	'content' : { templateUrl: 'views/userPosts.html',
		        			  controller: 'PostsController'}
		        }
		    })
		    .state('more', {
		    	url: '/more/:id',
		    	views: {
		        	'nav' : {templateUrl: 'views/homeNav.html'},
		        	'content' : { templateUrl: 'views/more.html',
		        				  controller: 'PostsController'}
		        }
		    })
		    .state('about', {
		    	url: '/about',
		    	views: {
		    		'nav': {templateUrl: 'views/homeNav.html'},
		    		'content': {templateUrl: 'views/aboutMe.html'}
		    	}
		    })
		    .state('dashboard', {
		    	url: '/dashboard',
		    	views: {
		        	'nav' : {templateUrl: 'views/dashboardNav.html'},
		        	'content' : { templateUrl: '../../dashboard.html',
		        				  controller: 'DashboardController'	}
		        }
		    })
		    .state('posts', {
		    	url: '/posts',
		    	views: {
		        	'nav' : {templateUrl: 'views/dashboardNav.html'},
		        	'content' : { templateUrl: 'views/posts.html',
		        				  controller: 'PostsController'}
		        }
		    })
		    .state('add', {
		    	url: '/add',
		    	views: {
		        	'nav' : {templateUrl: 'views/dashboardNav.html'},
		        	'content' : { templateUrl: 'views/newPost.html',
		        				  controller: 'AddPostController'}
		        }
		    })
		    .state('edit', {
		    	url: '/edit/:id',
		    	views: {
		        	'nav' : {templateUrl: 'views/dashboardNav.html'},
		        	'content' : { templateUrl: 'views/edit.html',
		        				  controller: 'EditRemoveController'}
		        }
		    })
		    .state('single', {
		    	url: '/single/:id',
		    	views: {
		        	'nav' : {templateUrl: 'views/dashboardNav.html'},
		        	'content' : { templateUrl: 'views/singlePost.html',
		        				  controller: 'PostsController'}
		        }
		    })
		    .state('activities', {
		    	url: '/activities',
		    	views: {
		        	'nav' : {templateUrl: 'views/dashboardNav.html'},
		        	'content' : { templateUrl: 'views/activities.html',
		        				  controller: 'PostsController'}
		        }
		    });

		    $locationProvider.html5Mode(true);
	}])
	.run(["$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;	
	}]);