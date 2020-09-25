var myName= prompt ("Enter Your Name");
    


function sendMessage(){
  //get message
  var message=document.getElementById("messaage").value;
  //save in database
  firebase.database().ref("messages").push().set({
  "sender": myName,
  "message": message
  });
  //prevent form from submitting
  return false;
}

//listen for incomming messages
firebase.database().ref("messages").on("child_added" , function (snapshot){
  var html ="";
  //give each message a unique ID
  html +="<li id='message-" + snapshot.key +"'>";
  //show del button if message is sent
  if (snapshot.val().sender == myName){
      html += "<button data-id='"+ snapshot.key + "'onclick='deleteMessage(this)'>";
      html += "DELETE";
      html += "<button/>";
  }
  html += snapshot.val().sender + ": " + snapshot.val().message;
  html +="<li/>";

  document.getElementById("messages").innerHTML += html;
});

function deleteMessage(self){
  //get message ID
  var messageId= self.getAttribute("data-id");
//delete message
firebase.database().ref("messages").child(messageId).remove();
}

//attach listner for delete message
firebase.database().ref("messages").on("child_removed", function (snapshot){
//remove messagenode
document.getElementById("message-" + snapshot.key).innerHTML = "This Message Has Been Removed";
});