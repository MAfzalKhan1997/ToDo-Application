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
 
var j = true;
let currUserKey;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        // compairing emails of all users with the current user

        firebase.database().ref("/" + "users").once('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().email === user.email) {
                        currUserKey = childSnapshot.key;
                    }
                });
            })
            .then(() => {
                //to check first past todos from server
                checkPastToDos();

            });

    } else {
        if(j==true)
        {
        alert("You are not Signed-in!");
        }
        window.location = "index.html";
    }
});



var userInput = document.getElementById("work");
var addbutton = document.getElementById("addbutton");
var delallbutton = document.getElementById("delallbutton");
 

let toDos = [];

addbutton.addEventListener('click', (event) => {
    if (userInput.value === "")
    {
        alert("Please Add Some Work ToDo...");
    }
    else{
    addToDo(userInput);
    }
});

userInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
    if (userInput.value === "")
    {
        alert("Please Add Some Work ToDo...");
    }
    else{
    addToDo(userInput);
    }
    }
})

 delallbutton.addEventListener('click', (e) => {
     delAllTodo();
 }) 

let i = 1;

function addToDo(userInp, pastToDos = 0, childKey = 0) {
    var val;

    if (pastToDos === 0) {
        val = userInp.value;
        firebase.database().ref(`/users/${currUserKey}/ToDos`).child("ToDoNo" + i).set(val);
        childKey = "ToDoNo" + i;
        var text=document.createTextNode(userInp.value);
        
    } 
    else {
        val = userInp ;
        var text=document.createTextNode(val);
        
    }

    i++;
    if(i==10){
        i=i+80;
    }
    if(i==100){
        i=i+890;
    }

    var list= document.getElementById('list');
            var li= document.createElement('li');
            var btn=document.createElement('button');
            var btnText = document.createTextNode('');
            // var btn2= document.createElement('button');
            // var btnText2 = document.createTextNode('');
            btn.appendChild(btnText);//it takes variable
            // btn2.appendChild(btnText2);
            btn.className="trashbutton";
            btn.className += " glyphicon glyphicon-trash butt";

            // btn2.className="editbutton";
            // btn2.className += " glyphicon glyphicon-edit butt";
             

        li.appendChild(text)
        li.appendChild(btn)
        // li.appendChild(btn2)
        list.appendChild(li)
        userInput.value="";
         
        btn.addEventListener('click', () => {
            // removing from firebase
            firebase.database().ref(`/users/${currUserKey}/ToDos`).child(childKey).remove();
            
            // removing from HTML
            var li=text.parentNode;
            var ol =li.parentNode;
            ol.removeChild(li);
        });

    }

        
function checkPastToDos() {
    firebase.database().ref(`/users/${currUserKey}/ToDos/`).once('value', function (snapshot) {
        // console.log(snapshot);
        snapshot.forEach(function (childSnapshot) {
            // console.log(childSnapshot);
            var childKey = childSnapshot.key;
            // console.log(childKey);
            var childData = childSnapshot.val();
            // console.log(childData);
            addToDo(childData, "pastToDos", childKey);
        });
    });

}

function delAllTodo(){
    alert("Sure to Delete All?");
    document.getElementById("list").innerHTML="";
    firebase.database().ref(`/users/${currUserKey}/ToDos`).remove();
    i=1;
}

function logOut(){

firebase.auth().signOut()
.then(function() {
    // Sign-out successful.
    
    window.location.href = "index.html";
    alert("You are Successfully Signed-Out!");

    j=false;    

  }).catch(function(error) {
    // An error happened.
    console.log("Error,"+ error);
  });

}
 
    //         firebase.database().ref("ToDo App").child("Registration Data/" + result.uid).set(obj);
    //           console.log(result);
    //         setTimeout(() => {
    //             name.value = "";
    //             number.value = "";
    //             email.value = "";
    //             password.value = "";
    //             alert("You are signed in successfully");
    //         }, 1000);
    //     })


    
    // }
 