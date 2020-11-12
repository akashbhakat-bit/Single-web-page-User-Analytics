

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

      document.getElementById("Logout_btn").innerHTML = "User : " + email_id +" Logout";

    }
  }else{
    theme.setAttribute('href', 'style3.css');

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("admin_div").style.display = "block";
    document.getElementById("Side_Nav").style.display = "none";

    //console.log("Inside Admin");
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


alert("Account Created Successfully.");





}


var Login_Timestamp_GMT;

function handleLogin(){
//console.log('called');


  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
//console.log("Logged In");
Login_Timestamp= new Date(Date.now());
Login_Timestamp_GMT = Login_Timestamp.toGMTString();

}

function logout(){

var name=document.getElementById("name1").value;
  //console.log("Logout called");
  var database= firebase.database();
    Logout_Timestamp= new Date(Date.now());

  Logout_Timestamp_GMT = Logout_Timestamp.toGMTString();
 
       if (name.length == 0){
         var name=document.getElementById("fullname").value;
       }
      if(Login_Timestamp_GMT==""){
        Login_Timestamp_GMT="1st Time";
      }



  
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

  document.getElementById("userloginchange").innerHTML = "ADMIN LOGIN HERE";


}


  var id;
 
  function data(){
    database = firebase.database();


//var ref= database.ref(`/users/${name}/analytics_overall`);
database.ref('/users').once('value').then(function(data){
  var data_of_names=data.val();
  //console.log(data_of_names);
  var keys =Object.keys(data_of_names);
  //console.log(keys);
  
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
   // console.log(data_of_id);
    //console.log(data_of_id.email);

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
 // console.log(data_of_id_analytics);
  var keys =Object.keys(data_of_id_analytics);
  //console.log(keys.length);
  //console.log(keys[0]);
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



 
      
  })
}

function show_data(){


  database = firebase.database();
  var date = document.getElementById("select_date").value;
  var id_name = document.getElementById("select_user").value;

//console.log(id_name);
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
  //  console.log(Click_Sequence.length);


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

          var t1=[];
          t1.push(["ID","No of Clicks"]);

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
                    t1.push([Click_Sequence[i].ID,Element_wise_Clicks[i].No]);
                
            }
      
            var dvTable = document.getElementById("elementWiseClick");
            dvTable.innerHTML = "";
            dvTable.appendChild(table);

           
            
            var t2=[];
            t2.push(["ID","Element Wise Mouse Overtime"]);

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
                      
                    t2.push([Element_wise_Mouse_over_time[i].ID,Element_wise_Mouse_over_time[i].Time]);
                  
              }
        
              var dvTable = document.getElementById("elementWiseMouseOverTime");
              dvTable.innerHTML = "";
              dvTable.appendChild(table);



    

             
  
           /* TO MAKE THE NAVMAP TABLE*/
           var table = document.createElement("TABLE");
            table.border = "1";
            table.Id = "NAVIGATION MAP";
            var columnCount=2;

            var headerCell = document.createElement("TH");
                headerCell.innerHTML = "Sequence";
                var row = table.insertRow(-1);
    
                row.appendChild(headerCell);
                
            var headerCell = document.createElement("TH");
                headerCell.innerHTML = "ID";
    
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
                  cell.innerHTML = i;
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
              

             for (var i = 1; i < Navigation_Map.length; i++) {
              var new_row = document.createElement("div");
              var ID = Navigation_Map[i].ID;
              var Time = Navigation_Map[i].Time_Over;
              var new_row1 = document.createElement("div");
              var new_row2 = document.createElement("div");
              var new_row3 = document.createElement("div");
              var new_row4 = document.createElement("div");




new_row2.setAttribute("class", "arrowbox");
new_row3.setAttribute("class", "border");
// Add some text
new_row.appendChild(document.createTextNode(`Element ID:- ${ID}`));

new_row1.appendChild(document.createTextNode(`Time Over:- ${Time}`));

new_row2.appendChild(document.createTextNode(""));

new_row.appendChild(new_row1);
new_row3.append(new_row);
new_row4.append(new_row3);
new_row4.append(new_row2);



// Add it to the document body

  document.getElementById("NavigationMap2").appendChild(new_row4);
  
              
          }
    
          var new_row5 = document.createElement("div");
          new_row5.appendChild(document.createTextNode(`End/Logout`));
          new_row5.setAttribute("class", "border");

          document.getElementById("NavigationMap2").appendChild(new_row5);




    
		  
         // drawChart1();


          
    
})
}

 
function signout(){
  firebase.auth().signOut();

}

function agregate(){

  var noofclicks=[];
  var timeover=[];
  database = firebase.database();
  database.ref('/users').once('value').then(function(data){
    var data_of_names=data.val();
  //  console.log(data_of_names);
    var keys =Object.keys(data_of_names);
    //console.log(keys);

    for (const val of keys) {
      var name = val;
      var data_of_id=data_of_names[name];
 //     console.log(data_of_id.analytics_overall);
   // console.log(data_of_id.email);
    data_of_id_analytics=data_of_id.analytics_overall;

 // console.log(name);
  var keys1 =Object.keys(data_of_id_analytics);
  for (const val1 of keys1) {
    date_value = val1;
    date_analytics=data_of_id_analytics[date_value];

    Element_wise_Clicks=date_analytics.Element_wise_Clicks;
    Element_wise_Mouse_over_time=date_analytics.Element_wise_Mouse_over_time;


    for (var i = 1; i < Element_wise_Mouse_over_time.length; i++) {
      
         
          timeover.push({ID: Element_wise_Mouse_over_time[i].ID,Time_over: Element_wise_Mouse_over_time[i].Time})
  }

          for (var i = 1; i < Element_wise_Clicks.length; i++) {
            
                
                noofclicks.push({ID:Element_wise_Clicks[i].ID,No_of_clicks:Element_wise_Clicks[i].No});
            
        }


 // console.log(timeover);




  }



    }

  //  console.log(noofclicks);
    //console.log(timeover);
 //timeover   
var temp1=[]
    
    for(var j=0;j<timeover.length;j++){
      temp1.push(timeover[+j].ID);
      }
    
    b=temp1
var temp3=[]
    for(var i=0;i<b.length;i++){
    if(temp3.indexOf(b[i]) == -1){
    temp3.push(b[i]);
    }
    }
    
    var time_over_admin=[];
    var time_over_intermediate=[];
    
    for(var i=0;i<temp3.length;i++){
      time_over_intermediate.push(0);
  //    console.log(time_over_intermediate);

    }
    
    for(var i=0;i<temp3.length;i++){
      for(var j=0;j<timeover.length;j++){
        if(temp3[i]==timeover[+j].ID){
          time_over_intermediate[i]+=timeover[+j].Time_over;
   //       console.log(time_over_intermediate);
     //     console.log(timeover[+j].Time_over);
        }
        
        }
    }
    
    for(var i=0;i<temp3.length;i++){
      var a=temp3[i];
      var b=time_over_intermediate[i]
  //    console.log(b);
      time_over_admin.push({ID:a,Time:b});
    }

  
  
    //no of clicks
    var no_of_clicks_admin=[];
    var no_of_clicks_intermediate=[];
var temp1=[]
    
for(var j=0;j<noofclicks.length;j++){
  temp1.push(noofclicks[+j].ID);
  }

b=temp1
var temp3=[]
for(var i=0;i<b.length;i++){
if(temp3.indexOf(b[i]) == -1){
temp3.push(b[i]);
}
}


for(var i=0;i<temp3.length;i++){
  no_of_clicks_intermediate.push(0);

}

for(var i=0;i<temp3.length;i++){
  for(var j=0;j<noofclicks.length;j++){
    if(temp3[i]==noofclicks[+j].ID){
      no_of_clicks_intermediate[i]+=noofclicks[+j].No_of_clicks;
    }
    
    }
}

for(var i=0;i<temp3.length;i++){
  var a=temp3[i];
  var b=no_of_clicks_intermediate[i]
  no_of_clicks_admin.push({ID:a,No:b});
}






//making of table
var table = document.createElement("TABLE");
          table.border = "1";
          table.Id = "ELEMENT-WISE-CLICKS-AVG";
          var columnCount=2;
          var headerCell = document.createElement("TH");
              headerCell.innerHTML = "ID";
              var row = table.insertRow(-1);
  
              row.appendChild(headerCell);var headerCell = document.createElement("TH");
              headerCell.innerHTML = 'Number of Clicks';
              row.appendChild(headerCell);
              for (var i = 1; i < no_of_clicks_admin.length; i++) {
                row = table.insertRow(-1);
                
                    var cell = row.insertCell(-1);
                    cell.innerHTML = no_of_clicks_admin[i].ID;
                    var cell = row.insertCell(-1);
                    cell.innerHTML = no_of_clicks_admin[i].No;
                
            }
      
            var dvTable = document.getElementById("elementWiseClickAvg");
            dvTable.innerHTML = "";
            dvTable.appendChild(table);

            
  
            var table = document.createElement("TABLE");
            table.border = "1";
            table.Id = "ELEMENT-WISE-MOUSE-OVERTIME-AVG";
            var columnCount=2;
            var headerCell = document.createElement("TH");
                headerCell.innerHTML = "ID";
                var row = table.insertRow(-1);
    
                row.appendChild(headerCell);var headerCell = document.createElement("TH");
                headerCell.innerHTML = 'Time in Miliseconds';
                row.appendChild(headerCell);
                for (var i = 1; i < time_over_admin.length; i++) {
                  row = table.insertRow(-1);
                  
                      var cell = row.insertCell(-1);
                      cell.innerHTML = time_over_admin[i].ID;
                      var cell = row.insertCell(-1);
                      cell.innerHTML = time_over_admin[i].Time;
                  
              }
        
              var dvTable = document.getElementById("elementWiseMouseOverTimeAvg");
              dvTable.innerHTML = "";
              dvTable.appendChild(table);

              


})
drawChart()}

function drawChart() {

  var noofclicks=[];
  var timeover=[];
  database = firebase.database();
  database.ref('/users').once('value').then(function(data){
    var data_of_names=data.val();
 //   console.log(data_of_names);
    var keys =Object.keys(data_of_names);
    //console.log(keys);

    for (const val of keys) {
      var name = val;
      var data_of_id=data_of_names[name];
 //     console.log(data_of_id.analytics_overall);
   // console.log(data_of_id.email);
    data_of_id_analytics=data_of_id.analytics_overall;

  //console.log(name);
  var keys1 =Object.keys(data_of_id_analytics);
  for (const val1 of keys1) {
    date_value = val1;
    date_analytics=data_of_id_analytics[date_value];

    Element_wise_Clicks=date_analytics.Element_wise_Clicks;
    Element_wise_Mouse_over_time=date_analytics.Element_wise_Mouse_over_time;


    for (var i = 1; i < Element_wise_Mouse_over_time.length; i++) {
      
         
          timeover.push({ID: Element_wise_Mouse_over_time[i].ID,Time_over: Element_wise_Mouse_over_time[i].Time})
  }

          for (var i = 1; i < Element_wise_Clicks.length; i++) {
            
                
                noofclicks.push({ID:Element_wise_Clicks[i].ID,No_of_clicks:Element_wise_Clicks[i].No});
            
        }


 // console.log(timeover);




  }



    }

//    console.log(noofclicks);
  //  console.log(timeover);
 //timeover   
var temp1=[]
    
    for(var j=0;j<timeover.length;j++){
      temp1.push(timeover[+j].ID);
      }
    
    b=temp1
var temp3=[]
    for(var i=0;i<b.length;i++){
    if(temp3.indexOf(b[i]) == -1){
    temp3.push(b[i]);
    }
    }
    
    var time_over_admin=[];
    var time_over_intermediate=[];
    
    for(var i=0;i<temp3.length;i++){
      time_over_intermediate.push(0);
   //   console.log(time_over_intermediate);

    }
    
    for(var i=0;i<temp3.length;i++){
      for(var j=0;j<timeover.length;j++){
        if(temp3[i]==timeover[+j].ID){
          time_over_intermediate[i]+=timeover[+j].Time_over;
     //     console.log(time_over_intermediate);
       //   console.log(timeover[+j].Time_over);
        }
        
        }
    }
    time_over_admin.push(['ID',"Time Over Element"]);
    for(var i=0;i<temp3.length;i++){
      var a=temp3[i];
      var b=time_over_intermediate[i]
    //  console.log(b);
      time_over_admin.push([a,b]);
    }

  
  
    //no of clicks
    var no_of_clicks_admin=[];
    var no_of_clicks_intermediate=[];
var temp1=[]
    
for(var j=0;j<noofclicks.length;j++){
  temp1.push(noofclicks[+j].ID);
  }

b=temp1
var temp3=[]
for(var i=0;i<b.length;i++){
if(temp3.indexOf(b[i]) == -1){
temp3.push(b[i]);
}
}


for(var i=0;i<temp3.length;i++){
  no_of_clicks_intermediate.push(0);

}

for(var i=0;i<temp3.length;i++){
  for(var j=0;j<noofclicks.length;j++){
    if(temp3[i]==noofclicks[+j].ID){
      no_of_clicks_intermediate[i]+=noofclicks[+j].No_of_clicks;
    }
    
    }
}
no_of_clicks_admin.push(['ID',"No of Clicks Over Element"]);

for(var i=0;i<temp3.length;i++){
  var a=temp3[i];
  var b=no_of_clicks_intermediate[i]
  no_of_clicks_admin.push([a,b]);
}
google.load('visualization', '1.0', {'packages':['corechart']});
  google.setOnLoadCallback(drawChart);
var data = google.visualization.arrayToDataTable(time_over_admin);

var options = {
  title: 'Time Over Key Elements'
};

var chart = new google.visualization.PieChart(document.getElementById('time_over_piechart'));

chart.draw(data, options);

var data1 = google.visualization.arrayToDataTable(no_of_clicks_admin);

var options1 = {
  title: 'No of Clicks Over Element'
};

var chart3 = new google.visualization.PieChart(document.getElementById('no_of_clicks_piechart'));

chart3.draw(data1, options1);

//console.log("blah");
//console.log(no_of_clicks_admin);

}
)
}




function drawChart1() {

  database = firebase.database();
  var date = document.getElementById("select_date").value;
  var id_name = document.getElementById("select_user").value;

//console.log(id_name);
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
  //  console.log(Click_Sequence.length);


  

          var t1=[];
          t1.push(['ID',"No of Clicks"]);

          
              for (var i = 1; i < Element_wise_Clicks.length; i++) {
                

                var a=Click_Sequence[i].ID;
                var b=Element_wise_Clicks[i].No;
                    t1.push([a,b]);
                
            }
      
         
           
            
            var t2=[];
            t2.push(['ID',"Element Wise Mouse Overtime"]);

            
                for (var i = 1; i < Element_wise_Mouse_over_time.length; i++) {

               
                      
                    var a=Element_wise_Mouse_over_time[i].ID;
                    var b=Element_wise_Mouse_over_time[i].Time;
                        t2.push([a,b]);
                  
              }
        
             

  //
  google.load('visualization', '1.0', {'packages':['corechart']});
  google.setOnLoadCallback(drawChart);

 var data = google.visualization.arrayToDataTable(t1);

  var options = {
    title: 'No of Clicks'
  };

  var chart1 = new google.visualization.PieChart(document.getElementById('no_of_clicks_userwise_piechart'));

  chart1.draw(data, options);

  var data2 = google.visualization.arrayToDataTable(t2);

  var options2 = {
    title: 'Element Wise Mouse Overtime'
  };

  var chart2 = new google.visualization.PieChart(document.getElementById('mouseovertime_pie'));

  chart2.draw(data2, options2);
}
  )
}


