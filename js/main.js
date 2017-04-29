
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
var item = document.createElement('div');
var card = document.createElement('div');
var cardContent = document.createElement('div');
var taskTitle   = document.createElement('span');
var cardAction =  document.createElement('div');
var remove = document.createElement('button');
var deleteIcon = document.createElement('i');
var complete = document.createElement('button');
var completeIcon = document.createElement('i');

document.addEventListener("DOMContentLoaded", function(event) {
  ref.child('task').on('value', function(snapshot) {
    if(snapshot.val() == null){
      return;
    }
    taskTitle.innerText = snapshot.val();
    addItemTodo(taskTitle.innerText);
  });
});

// function createItem(name){
//   return `<div class="col s12 m4">
//     <div class="card grey lighten-4">
//       <div class="card-content ">
//         <span class="card-title">`+name+`</span>
//       </div>
//       <div class="card-action">
//         <a href="#"><i class="material-icons">done</i></a>
//         <a href="#"><i class="material-icons">delete</i></a>
//       </div>
//     </div>
//   </div>`;
// }


function  addItemTodo(value){

  if(taskTitle.innerText !== null){
    item.classList.add('col','s12','m4');
    card.classList.add('card','grey','lighten-4');
    cardContent.classList.add('card-content');
    taskTitle.classList.add('card-title');
    cardAction.classList.add('card-action');
    //remove.classList.add('secondary-content');
    deleteIcon.classList.add('material-icons');
    deleteIcon.innerHTML= 'delete';
    remove.addEventListener('click', removeItem);
  }




  completeIcon.classList.add('material-icons');
  completeIcon.innerHTML= 'done';
  complete.appendChild(completeIcon);
  remove.appendChild(deleteIcon);
  cardAction.appendChild(remove);
  cardAction.appendChild(complete);
  card.appendChild(cardContent);
  card.appendChild(cardAction);
  cardContent.appendChild(taskTitle);
  item.appendChild(card);
  list.appendChild(item);
  complete.addEventListener('click' , completedItem);

  document.getElementById('item').value= '';
  document.getElementById('item').focus();



}

function completedItem(value){

  this.classList.add('completed');
  var myNode = this.parentNode.parentNode.parentNode;
  ref.child('task').remove();
  myNode.parentNode.removeChild(myNode);

  var list = document.getElementById('task_completed');
  //  var item = document.createElement('li');
  //  item.innerText= text;
  //  item.classList.add('collection-item');
  list.appendChild(item);

}


function removeItem() {
  var myNode = this.parentNode.parentNode.parentNode;
  ref.child('task').remove();
  myNode.parentNode.removeChild(myNode);
  // while (myNode.firstChild) {
  //   myNode.removeChild(myNode.firstChild);
  // }
  var item = this.parentNode;
  var parent = item.parentNode;

  // parent.removeChild(item);

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
