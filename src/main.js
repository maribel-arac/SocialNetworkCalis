// document.querySelector(".newUserPage").style.display = "none";


// //función para ocultar pantalla de bienvenida y te mande a pantalla 'crear cuenta'
// function logIn(){
//   document.querySelector(".newUserPage").style.display = "block";
//   document.querySelector(".welcomePage").style.display = "none";
// }

// document.querySelector(".logInBtn").addEventListener("click", logIn);

//funcion para que el usuario se registre
function register(){
	let email = document.querySelector(".email").value;
	let password = document.querySelector(".password").value;

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}