angular
	.module("MyBlog")
	.factory("Login", ["$resource", function($resource) {
		return $resource("/api/admin", {
			save: {
				method: "POST"
			}
		})
	}]).factory("Posts", ["$resource", function($resource) {
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
			query: {
				method: "GET",
				isArray: !0
			},
			save: {
				method: "POST"
			}
		})
	}]);