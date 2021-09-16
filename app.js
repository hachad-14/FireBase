//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
//import { getStorage } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBsWbH_cHvDHsMFiMi_DNn13e7sfwk2zZA",
  authDomain: "test-54a77.firebaseapp.com",
  databaseURL: "https://test-54a77-default-rtdb.firebaseio.com",
  projectId: "test-54a77",
  storageBucket: "test-54a77.appspot.com",
  messagingSenderId: "94297928022",
  appId: "1:94297928022:web:f82973978d5592cc47a6f7",
  measurementId: "G-12GPLK769J"
};
firebase.initializeApp(firebaseConfig);
//const firebase = initializeApp(firebaseConfig);
//const storage = getStorage(firebase);
var ImgName, ImgUrl, comment, imgHeight;
var files = [];
var reader;

document.getElementById("select").onclick = function(e) {
    var input = document.createElement('input');
    input.type = 'file';
    //input.capture = 'user' or 'environement'
    input.addEventListener('change', (e) => {
      files = e.target.files;
      reader = new FileReader();
      reader.onload = function() {
        imgHeight = document.getElementById('myimg').height;
        alert(imgHeight);

        document.getElementById("myimg").src = files.result;
        $('#myimg').attr('src', reader.result);
        document.getElementById('comment').innerHTML = '';
      }
      reader.readAsDataURL(files[0])
    });
    input.click();
}

document.getElementById("upload").onclick = function() {
  if(document.getElementById("namebox").value.length == 0) {
    ImgName = 'post' + Math.floor(1000 + Math.random() * 9000);
    console.log(ImgName + '.png');
  } else {
    ImgName = document.getElementById('namebox').value.toLowerCase();
  }
  comment = document.getElementById('commentbox').value;
  var uploadTask = firebase.storage().ref('Images/'+ImgName+".png").put(files[0]);
  uploadTask.on('state_changed', function(snapshot) {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    document.getElementById("console").innerHTML = 'Upload'+' '+progress+'%';
  },
  function(error) {
    alert('error');
  },
  function() {
    uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
      ImgUrl = url;
      firebase.database().ref('Pictures/'+ImgName).set({
        Name: ImgName,
        Link: ImgUrl,
        Commentaire: comment,
        ImgHeight: imgHeight
      });
      console.log('Image Stored In DataBase.');
      document.getElementById('console').innerHTML = 'Image Stored In DataBase';

      setTimeout( function(){ 
        document.getElementById('commentbox').value = '';
        document.getElementById('console').innerHTML = '';
      }, 1500 );
    });
  });
}

const img = document.getElementById('myimg');
img.onload = function test() {
  console.log('width:'+this.width+' - height:'+this.height);
  console.log('----------------');
  if ($('#box img').height() > 300) {
    $('#box img').css('objectFit', 'cover');
    $('#box img').css('height', '100vw');
    $('#box').css('height', '100vw');
  } else{
    $('#box img').css('height', 'auto');
    $('#box').css('height', 'au');
  }
}

document.getElementById('retrieve').onclick = function() {
  ImgName = document.getElementById('namebox').value.toLowerCase();
  firebase.database().ref('Pictures/'+ImgName).on('value', function(snapshot){
    $('#myimg').attr('src', snapshot.val().Link);

    firebase.database().ref()
    .child('Pictures')
    .child(ImgName)
    .once('value', function (Snapshot) {
      console.log(Snapshot.val().Name);
      console.log(Snapshot.val().Commentaire);
      document.getElementById('comment').innerHTML = (Snapshot.val().Commentaire);
    });
  });
}

document.getElementById('test').onclick = function() {
  firebase
  .database()
  .ref('Pictures')
  .orderByChild('timestamp')
  .limitToLast(1)
  .once('value', (snapshot) => {
      // take the last item with the lowest timestamp in the snapshot
      console.log(snapshot.val().Name);
  });
}
