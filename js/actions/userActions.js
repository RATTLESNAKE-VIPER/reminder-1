import { login } from "../../sdk/sdk";

export function loginAction(user) {
  return function (dispatch) {
    return login(user)
    .then(function(data){
    	console.log("loggedin user",data)
			dispatch({ 
		  	type: "login",
		    user: data
		  })
		})
  };
}

export function logout(user) {
  return {
  	type: "logout",
    user: user 
  }
}
