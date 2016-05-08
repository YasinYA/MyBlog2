angular
	.module('MyBlog')
	//the login service
	.factory('Login', ['$resource', function($resource){
		return $resource('/api/admin', {
			save: {method : 'POST'}
		});
	}])
	.factory('Posts', ['$resource', function($resource){
		return $resource('/api/posts', {
			query : {method: 'GET', isArray:true},
			save: {method : 'POST', url: '/api/posts'}
		});
	}])
	// this handles the posts requests 
	.factory('Post', ['$resource', function($resource){
		return $resource('/api/post/:id', null, {
			query: { method:'GET', params:{ id: '@_id' }, isArray:true },
			// save: {method : 'POST', params:{ id: '@_id' }}
			'update': {method : 'PUT', params:{ id: '@_id' }},
			'delete': {method: 'DELETE', params: {id: '@_id'}}
		});
	}])
	//this handles the comments requests 
	.factory('Comments', ['$resource', function($resource){
		return $resource('/api/comments', {
			query: { method:'GET', isArray:true },
			save: {method : 'POST', params:{ id: '@_id' }}
		});
	}]);
