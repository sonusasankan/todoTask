
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC3kzi1YF-pBRvNg5MxsD-F6oBbuiay514",
  authDomain: "todotask-d8b9e.firebaseapp.com",
  databaseURL: "https://todotask-d8b9e.firebaseio.com",
  projectId: "todotask-d8b9e",
  storageBucket: "todotask-d8b9e.appspot.com",
  messagingSenderId: "936490125543"
};

firebase.initializeApp(config);
var database = firebase.database();
var ref  = database.ref();
var list = document.getElementById('todo');
var item = document.createElement('li');
var remove = document.createElement('button');
var deleteIcon = document.createElement('i')
var complete = document.createElement('button');
var completeIcon = document.createElement('i');

document.addEventListener("DOMContentLoaded", function(event) {
    ref.child('task').on('value', function(snapshot) {
      if(snapshot.val() == null){
        return;
      }
      item.innerText = snapshot.val();
      addItemTodo(item.innerText);
    });
});


function  addItemTodo(value){

if(item.innerText !== null){
  item.classList.add('collection-item');
  remove.classList.add('secondary-content');
  deleteIcon.classList.add('material-icons');
  deleteIcon.innerHTML= 'delete';
  remove.addEventListener('click', removeItem);
}



  complete.classList.add('secondary-content');
  completeIcon.classList.add('material-icons');
  completeIcon.innerHTML= 'done';

  complete.appendChild(completeIcon);
  remove.appendChild(deleteIcon);
  item.appendChild(remove);
  item.appendChild(complete);
  list.appendChild(item);
  complete.addEventListener('click' , completedItem);

  document.getElementById('item').value= '';
  document.getElementById('item').focus();



}

function completedItem(value){
  this.classList.add('completed');
  var item = this.parentNode;
  var parent = item.parentNode;
  parent.removeChild(item);

  var list = document.getElementById('task_completed');
  //  var item = document.createElement('li');
  //  item.innerText= text;
  //  item.classList.add('collection-item');
  list.appendChild(item);

}


function removeItem() {
  var item = this.parentNode;
  var parent = item.parentNode;
  ref.child('task').remove();
  parent.removeChild(item);

}


document.getElementById('add').addEventListener('click', function(){
  var value = document.getElementById('item').value;
  if(value){addItemTodo(value);
  ref.child('task').set(value);
} else{
  document.getElementsByName('task')[0].placeholder="Field shouldn't be empty";
  document.getElementById('item').classList.add('warning');
}

});

document.getElementById('item').onkeydown = function(event) {
    if (event.keyCode == 13) {
      var value = document.getElementById('item').value;
      if(value){addItemTodo(value);
      ref.child('task').set(value);
    } else{
      document.getElementsByName('task')[0].placeholder="Field shouldn't be empty";
      document.getElementById('item').classList.add('warning');
    }
    }
}
