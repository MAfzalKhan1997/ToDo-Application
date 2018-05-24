 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAgGVUsXSfpeCJ2bJnU5H2I5_iXH0AGc2E",
    authDomain: "todo-application-mak.firebaseapp.com",
    databaseURL: "https://todo-application-mak.firebaseio.com",
    projectId: "todo-application-mak",
    storageBucket: "",
    messagingSenderId: "884738754892"
  };
  firebase.initializeApp(config);

var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var auth = firebase.auth();
 
function login()
{
	var email = userEmail.value;
	var password = userPassword.value;

	auth.signInWithEmailAndPassword(email, password)
		.then(function(user){
			alert("Successfully logged in!");
			location.href = "ToDo.html";
		})
		.catch(function(error){
			alert(error.message);
		})
}  