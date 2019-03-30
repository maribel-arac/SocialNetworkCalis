// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCDjKnqcccpzC4EcSwfXQzDbFl0pa8tj0o",
    authDomain: "social-network-calis.firebaseapp.com",
    databaseURL: "https://social-network-calis.firebaseio.com",
    projectId: "social-network-calis",
    storageBucket: "social-network-calis.appspot.com",
    messagingSenderId: "86664419590"
  };
  firebase.initializeApp(config);

  //funcion para que el usuario se registre
function register(event){
	event.preventDefault(); //para evitar que se reload automatico
	let email = document.querySelector(".email").value;
	let password = document.querySelector(".password").value;


	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function(){
		verify( ) //se va a ejecutar la función de verificar cuando el usuario se registre
	})
	.catch(function(error) {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
 
  // ...
});
}
document.querySelector(".signInBtn").addEventListener('click', register);

//funcion para que el usuario inicie sesión
function logIn(event){
	event.preventDefault();
	let email2 = document.querySelector(".email2").value;
	let password2 = document.querySelector(".password2").value;

/*se le dice a firebase que ejecute la funcion de ingreso y va a veficar si 
el usuario y contraseña existen*/
	firebase.auth().signInWithEmailAndPassword(email2, password2)
	.catch(function(error) {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
});
}

// //esta función esta monitoreando si se registra un nuevo usuario o si existe alguna sesión activa
function observer(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log('existe usuario activo');
			showUp(user);
		// User is signed in.
		let displayName = user.displayName;
		let email = user.email;

		console.log('****************');
		console.log(user.emailVerified);
		console.log('****************');
		var emailVerified = user.emailVerified;

		let photoURL = user.photoURL;
		let isAnonymous = user.isAnonymous;
		let uid = user.uid;
		let providerData = user.providerData;
		// ...
	} else {
	// User is signed out.
	// ...
}
});
}
observer();
document.querySelector(".logInBtn").addEventListener('click', logIn);


// /*va a mostrar un boton de cerrar sesión siempre y cuando el usuario
//  se encuentre activo*/
function showUp(user){
	user = user;
	let content = document.querySelector("#content");
	if(user.emailVerified){
		content.innerHTML = `
		<button class="logOutBtn">Cerrar sesión</button>

	`;
document.querySelector(".logOutBtn").addEventListener('click', logOut); /*debe de ir el addEvent dentro 
de la función donde esta el string template  para que la ejecute*/
}
	}

 /*ejecuta la funcion de signOut cuando el usuario da click en el boton 
de 'cerrar sesion'*/
function logOut(){
	firebase.auth().signOut()
	.then(function(){

	})
	.catch(function(){

	})
	content.innerHTML= ""; //ejecuta la funcion de logOut y 'limpia' el template
}

//funcion para que el usuario verifique su email
function verify(){
	let user = firebase.auth().currentUser;
	user.sendEmailVerification().then(function() {
	// Email sent.
	console.log('Enviando correo');
}).catch(function(error) {
// An error happened.
console.log(error);
});
}

// Inicia Cloud Firestore a traves de Firebase
var db = firebase.firestore();

//agregar documentos
function savePost(){
	let name = document.querySelector(".name").value;
	let surname = document.querySelector(".lastname").value;
	let dateOfBirth = document.querySelector(".dob").value;

db.collection("users").add({ //agrega un ID automatico a cada usuario
    name: name,
    lastname: surname,
    dob: dateOfBirth,
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.querySelector(".name").value = "";
    document.querySelector(".lastname").value = "";
    document.querySelector(".dob").value = "";
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

}
	
//document.querySelector(".saveBtn").addEventListener('click', savePost);


//leer documentos
let table = document.querySelector(".table"); //es donde se va imprimir la info de los usuarios

db.collection("users").onSnapshot((querySnapshot) => { /*el onSnapshot es para actualizar por 
	cada usuario nuevo ingresado y pintarlo en la tabla */
	table.innerHTML = ""; /*es para que la table de HTML, este vacía y se vayan agregando los 
	nuevos usuarios porque sino va a repetir los datos */
    querySnapshot.forEach((doc) => { //es el ciclo que se va repitiendo por c/u de los objetos creados
        console.log(`${doc.id} => ${doc.data().name}`);
        //es para que jale la data de c/ usuario y la imprima en pantalla
        table.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().name}</td>
        <td>${doc.data().lastname}</td>
        <td>${doc.data().dob}</td>
        </tr> 
        `
    });
});

