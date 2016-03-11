import rest from "rest";

var mime      = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var client    = rest.wrap(mime, {
	mime          : 'application/json'
})

var host      = "http://localhost:3000/";

export function add(data) {
	return client({
		path		: host+"add", 
		method  : "POST",
		entity  : data
	})
}

export function register(data) {
	return client({
		path		: host+"registerUser", 
		method  : "POST",
		entity  : data
	})
}

export function login(data) {
	return client({
		path		: host+"login", 
		method  : "POST",
		entity  : data
	})
}

export function auth_login(access_token) {
	return rest('https://www.googleapis.com/oauth2/v1/tokeninfo?'+access_token)
	.then(function(data){
		return client({
			path		: host+"auth_login", 
			method  : "POST",
			entity  : JSON.parse(data.entity)
		})
	})
}