

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    var email_id = user.email;
    if(email_id!=='admin@admin.com'){

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    theme.setAttribute('href', 'style2.css');
    document.getElementById("Side_Nav").style.display = "block";
    document.getElementById("admin_div").style.display = "none";


    


    if(user != null){

      document.getElementById("basic4").innerHTML = "User : " + email_id +" Logout";

    }
  }else{
    theme.setAttribute('href', 'style3.css');

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("admin_div").style.display = "block";
    document.getElementById("Side_Nav").style.display = "none";

    console.log("Inside Admin");
    data();

    //

  }
  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("admin_div").style.display = "none";

    theme.setAttribute('href', 'style.css')
    
  }
});

function handleSignUp() {
  var email = document.getElementById('sign_email').value;
  var password = document.getElementById('sign_password').value;
  var name= document.getElementById('fullname').value;
  var mobile= document.getElementById('mobileno').value;
  var age = document.getElementById('age').value;

  
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  // [START createwithemail]
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // [START_EXCLUDE]
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
  // [END_EXCLUDE]
});


var database= firebase.database();
database.ref('/users/'+name).set({
  email: email,
  mobile: mobile,
  age: age
});


alert("Account Created Successfully.Please Log-In to Continue");

firebase.auth().signOut();




}


var Login_Timestamp_GMT;

function handleLogin(){
console.log('called');


  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
console.log("Logged In");
Login_Timestamp= new Date(Date.now());
Login_Timestamp_GMT = Login_Timestamp.toGMTString();

}

function logout(){

var name=document.getElementById("name1").value;
  console.log("Logout called");
  var database= firebase.database();
    Logout_Timestamp= new Date(Date.now());

  Logout_Timestamp_GMT = Logout_Timestamp.toGMTString();
 


  
database.ref('/users/'+name +'/analytics_overall/' +Login_Timestamp_GMT +'-' + Logout_Timestamp_GMT).set({
  Element_wise_Clicks: click_per_element,
  Element_wise_Mouse_over_time: overTime_per_element,
  Navigation_Map: history_seq,
  Click_Sequence:  click_seq
  
  

});





firebase.auth().signOut();

}

function admin(){
  document.getElementById("Login_Here").innerHTML = "ADMIN LOGIN HERE";
  document.getElementById("admin_login").style.display = "none";


}


  var id;
 
  function data(){
    database = firebase.database();


//var ref= database.ref(`/users/${name}/analytics_overall`);
database.ref('/users').once('value').then(function(data){
  var data_of_names=data.val();
  console.log(data_of_names);
  var keys =Object.keys(data_of_names);
  console.log(keys);
  
  var select = document.createElement("select");
  select.name = "select_user";
  select.id = "select_user"
 
  for (const val of keys) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }
 
  var label = document.createElement("label");
  label.innerHTML = "Choose user: "
  label.htmlFor = "user";
 
  document.getElementById("admin_div_select_user").appendChild(label).appendChild(select);
}
)}




function get_info(){
  
  database = firebase.database();
  var id_name = document.getElementById("select_user").value;

  //var ref= database.ref(`/users/${name}/analytics_overall`);
  database.ref('/users').once('value').then(function(data){

    var data_of_names=data.val();
    var data_of_id=data_of_names[id_name];
    console.log(data_of_id);
    console.log(data_of_id.email);

  //console.log(id_name);

  var myTableDiv = document.getElementById("user_info");
  
    var table = document.createElement('TABLE');
    table.border = '1';
  
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    
      
        
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
          var td = document.createElement('TD');
          td.width = '75';
          td.appendChild(document.createTextNode( "Email :"));
          tr.appendChild(td);
          var td = document.createElement('TD');
          td.width = '75';
          td.appendChild(document.createTextNode( data_of_id.email));
          tr.appendChild(td);
        

        var tr = document.createElement('TR');
      tableBody.appendChild(tr);
        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode( "Age :"));
        tr.appendChild(td);
        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode( data_of_id.age));
        tr.appendChild(td);
        
        
        var tr = document.createElement('TR');
      tableBody.appendChild(tr);
        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode( "Mobile :"));
        tr.appendChild(td);
        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode( data_of_id.mobile));
        tr.appendChild(td);
      
   
    myTableDiv.appendChild(table);
    
  //

  data_of_id_analytics=data_of_id.analytics_overall;
  console.log(data_of_id_analytics);
  var keys =Object.keys(data_of_id_analytics);
  console.log(keys.length);
  console.log(keys[0]);
  var select = document.createElement("select");
  select.name = "select_date";
  select.id = "select_date"
 
  for (const val of keys) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }
 
  var label = document.createElement("label");
  label.innerHTML = "Choose user: "
  label.htmlFor = "user";
 
  document.getElementById("user_analytics").appendChild(label).appendChild(select);



  /*for(var i=0;i<keys.length;i++){
  k=keys[0];
  df= data_of_id_analytics[k]
  //console.log(data_of_id_analytics[k]);
  console.log("Click_Sequence");
  console.log(df.Click_Sequence);
  console.log("Element_wise_Clicks");
  console.log(df.Element_wise_Clicks);
  console.log("Element_wise_Mouse_over_time");
  console.log(df.Element_wise_Mouse_over_time);
  console.log("Navigation_Map");
  console.log(df.Navigation_Map);
}*/
      
  })
}

function show_data(){
  //Timestamp= new Date(Date.now());

//Timestamp_GMT = Timestamp.toGMTString();
//document.getElementById("report_date").innerHTML=Timestamp_GMT;

  database = firebase.database();
  var date = document.getElementById("select_date").value;
  var id_name = document.getElementById("select_user").value;

console.log(id_name);
  //var ref= database.ref(`/users/${name}/analytics_overall`);
  database.ref('/users').once('value').then(function(data){

    var data_of_names=data.val();
    var data_of_id=data_of_names[id_name];
    data_of_id_analytics=data_of_id.analytics_overall;
    //console.log(data_of_id_analytics);
    date_analytics=data_of_id_analytics[date];
    //console.log(date_analytics);
    Click_Sequence=date_analytics.Click_Sequence;
    Element_wise_Clicks=date_analytics.Element_wise_Clicks;
    Element_wise_Mouse_over_time=date_analytics.Element_wise_Mouse_over_time;
    Navigation_Map=date_analytics.Navigation_Map;
    console.log(Click_Sequence.length);
    
    var table = document.createElement("TABLE");
        table.border = "1";
        table.Id = "CLICK-SEQUENCE";
        var columnCount=2;
        var headerCell = document.createElement("TH");
            headerCell.innerHTML = "ID";
            var row = table.insertRow(-1);

            row.appendChild(headerCell);var headerCell = document.createElement("TH");
            headerCell.innerHTML = 'TimeStamp of Click';
            row.appendChild(headerCell);
            for (var i = 1; i < Click_Sequence.length; i++) {
              row = table.insertRow(-1);
              
                  var cell = row.insertCell(-1);
                  cell.innerHTML = Click_Sequence[i].ID;
                  var cell = row.insertCell(-1);
                  cell.innerHTML = Click_Sequence[i].TimeStamp;
              
          }
    
          var dvTable = document.getElementById("ClickSequence");
          dvTable.innerHTML = "";
          dvTable.appendChild(table);

          var table = document.createElement("TABLE");
          table.border = "1";
          table.Id = "ELEMENT-WISE-CLICKS";
          var columnCount=2;
          var headerCell = document.createElement("TH");
              headerCell.innerHTML = "ID";
              var row = table.insertRow(-1);
  
              row.appendChild(headerCell);var headerCell = document.createElement("TH");
              headerCell.innerHTML = 'Number of Clicks';
              row.appendChild(headerCell);
              for (var i = 1; i < Element_wise_Clicks.length; i++) {
                row = table.insertRow(-1);
                
                    var cell = row.insertCell(-1);
                    cell.innerHTML = Element_wise_Clicks[i].ID;
                    var cell = row.insertCell(-1);
                    cell.innerHTML = Element_wise_Clicks[i].No;
                
            }
      
            var dvTable = document.getElementById("elementWiseClick");
            dvTable.innerHTML = "";
            dvTable.appendChild(table);

            
  
            var table = document.createElement("TABLE");
            table.border = "1";
            table.Id = "ELEMENT-WISE-MOUSE-OVERTIME";
            var columnCount=2;
            var headerCell = document.createElement("TH");
                headerCell.innerHTML = "ID";
                var row = table.insertRow(-1);
    
                row.appendChild(headerCell);var headerCell = document.createElement("TH");
                headerCell.innerHTML = 'Time in Miliseconds';
                row.appendChild(headerCell);
                for (var i = 1; i < Element_wise_Mouse_over_time.length; i++) {
                  row = table.insertRow(-1);
                  
                      var cell = row.insertCell(-1);
                      cell.innerHTML = Element_wise_Mouse_over_time[i].ID;
                      var cell = row.insertCell(-1);
                      cell.innerHTML = Element_wise_Mouse_over_time[i].Time;
                  
              }
        
              var dvTable = document.getElementById("elementWiseMouseOverTime");
              dvTable.innerHTML = "";
              dvTable.appendChild(table);

    

             
  
            var table = document.createElement("TABLE");
            table.border = "1";
            table.Id = "NAVIGATION MAP";
            var columnCount=2;
            var headerCell = document.createElement("TH");
                headerCell.innerHTML = "ID";
                var row = table.insertRow(-1);
    
                row.appendChild(headerCell);
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = 'Enter Timestamp';
                row.appendChild(headerCell);
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = 'Leave Timestamp';
                row.appendChild(headerCell);
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = 'Time Over in Miliseconds';
                row.appendChild(headerCell);
                for (var i = 1; i < Navigation_Map.length; i++) {
                  row = table.insertRow(-1);
                  
                      var cell = row.insertCell(-1);
                      cell.innerHTML = Navigation_Map[i].ID;
                      var cell = row.insertCell(-1);
                      cell.innerHTML = Navigation_Map[i].Enter_timestamp;
                      var cell = row.insertCell(-1);
                      cell.innerHTML = Navigation_Map[i].Leave_timestamp;
                      var cell = row.insertCell(-1);
                      cell.innerHTML = Navigation_Map[i].Time_Over;
                  
              }
        
              var dvTable = document.getElementById("NavigationMap");
              dvTable.innerHTML = "";
              dvTable.appendChild(table);


    
		  
  

  
    
})
}


   
    function signout(){
      firebase.auth().signOut();

    }
  