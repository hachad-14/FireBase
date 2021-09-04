//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
//import { getStorage } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-storage.js";
var ImgName, ImgUrl;
var files = [];
var reader;
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

document.getElementById("select").onclick = function(e) {
  var input = document.createElement('input');
  input.type = 'file';
  //input.capture = 'user' or 'environement'
  document.getElementById('console').innerHTML = 'Press Fired';
  input.addEventListener('change', (e) => {
    document.getElementById('console').innerHTML = 'Image Fired';
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function() {
      document.getElementById("myimg").src = files.result;
      $('#myimg').attr('src', reader.result);
      }
      reader.readAsDataURL(files[0])
  });
  input.click();
}
document.getElementById("upload").onclick = function() {
  ImgName = document.getElementById('namebox').value;
  var uploadTask = firebase.storage().ref('Images/'+ImgName+".png").put(files[0]);
  uploadTask.on('state_changed', function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("upProgress").innerHTML = 'Upload'+' '+progress+'%';
  },
  function(error) {
      alert('error');
  },
  function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
          ImgUrl = url;
      firebase.database().ref('Pictures/'+ImgName).set({
          Name: ImgName,
          Link: ImgUrl
      });
      console.log('Image Stored In DataBase.');
      document.getElementById('console').innerHTML = 'Image Stored In DataBase';
    });
  });
}
document.getElementById('retrieve').onclick = function() {
  ImgName = document.getElementById('namebox').value;
  firebase.database().ref('Pictures/'+ImgName).on('value', function(snapshot){
    document.getElementById('myimg').src = snapshot.val().Link;
  });
}