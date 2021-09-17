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

var stdNo = 0;

var img = $('#list img');
img.onload = function bew() {
    alert("test")
    console.log('width:'+this.width+' - height:'+this.height);
    //console.log('----------------');
    //if ($('#box img').height() > 300) {
    //  $('#box img').css('objectFit', 'cover');
    //  $('#box img').css('height', '100vw');
    //  $('#box').css('height', '100vw');
    //} else{
    //  $('#box img').css('height', 'auto');
    //  $('#box').css('height', 'au');
    //}
}   

function addItemsToList(name,com) {
    var ul = document.getElementById('list');
    
    var _name = document.createElement('li');
    var _com = document.createElement('li');

    //_name.innerHTML = 'Name : '+ name;
    _com.innerHTML = 'Commentaire : '+ com;
    
    ul.appendChild(_name);
    ul.appendChild(_com);
}

firebase.database().ref('Pictures').orderByChild('Order').once('value',function test(snapshot) {
    snapshot.forEach (
        function(childSnapshot) {   
            console.log( childSnapshot.val().Link);

            var ul = document.getElementById('list');
            var header = document.createElement('p');
            header.innerHTML =  childSnapshot.val().Name;
            ul.appendChild(header);

            let name = '';
            $("#list").append("<img src=" + childSnapshot.val().Link + "/img>");
            let com = childSnapshot.val().Commentaire;
            addItemsToList(name,com);
        }
    );
});