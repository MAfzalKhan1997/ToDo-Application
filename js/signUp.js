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
    
  
  var auth = firebase.auth(); 
  var database = firebase.database().ref("/");
  
 
  var userEmail = document.getElementById("email");
  var userword = document.getElementById("word");
  var userName = document.getElementById("name");
  
  function submit() {
      var emailAddress = userEmail.value;
      var word = userword.value;
      var name = userName.value; 

      auth.createUserWithEmailAndPassword(emailAddress, word)
          .then(function () {
              user = firebase.auth().currentUser;
          })
          .then(() => {
              user.updateProfile({
                      displayName: name,
                  })
                  .then(function () {
                      alert("You are Successfully Signed-Up!");
                      addUserToDatabase(emailAddress, name, word);
                      location.href = "index.html";
                  })
                  .catch(function (error) {
                      alert(error.message);
                  })
          })
          .catch(function (error) {
              alert(error.message);
          })
  
  
  }
  
  function addUserToDatabase(emailAddress, name, words) {
      var userObject = {
          displayName: name,
          email: emailAddress,
          word:words,
      };
  
      database.child("users").push(userObject);
  
      database.child("users").on("child_added", function (snapshot) {
          var obj = snapshot.val();
          obj.id = snapshot.key;
      });
  }
 