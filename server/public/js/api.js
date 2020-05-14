// wrap in IIFE to control scope
(function(){
   const baseURL = 'http://localhost:8080';

   function testAPIs(){
     var testJSON = {};//leave this here becasue...???...
     //create first
     //
     var data1 = {
       username:document.getElementById("username").value,
       firstUnit:document.getElementById("firstUnit").value,
       secondUnit:document.getElementById("secondUnit").value
     };

     callAPI('POST','/api/users/',null, data1)
     .then((user)=>{
       savedUser = user;/* this is not doing what I want;  I spent some time on this, and
       I can use user.username, user.firstUnit, but if I try user._id I get undefined. Sigh.
       So I have to use the elements in the array to grab the _id value I want.
*/
      // console.log(`this works ${user.username}`);
       //console.log(`this does not work ${user._id}`);

    // list
    callAPI('GET', '/api/users', null, null)
      .then((list)=>{
        console.log("in get with list"+list);
        console.log('\n\n***************************\nlist results:');
        console.log(list);
        userid = list[list.length-1]._id;


        // find
        /*  well, after this one I can get the id from the user we are interested in,  This will protect from the array size changing and stuff, but it is still odd to me
        why I can't get the user._id afte the create (I will figure it out....)*/
        callAPI('GET','/api/users/'+userid, userid, null)
          .then((user)=>{
            userId = user._id;
            userName= user.username;
            console.log('\n\n***************************\nfind results:');
            console.log(userId + " : " + userName);


            /*  the data below is for the modification of a student.  */
            var data2 ={
            username:"fattytwo",
            firstUnit:0,
            secondUnit:1
            }
            testJSON.description += 'appended by the AJAX API ';
            callAPI('PUT','/api/users/'+userId, null, data2)
              .then((user)=>{
                  console.log('\n\n***************************\nupdate results:');
                  console.log(user);

                    //delete
                  callAPI('DELETE', '/api/users/' +userId, null, null)
                     .then((result)=>{
                       console.log('\n\n***************************\ndelete result:');
                       console.log(result);
                     })
                });
            });
        });
    })
    .catch((err)=>{
      console.error(err);
    });
}


async function callAPI(method, uri, params, body){
  console.log("in callAPI");
  console.log("method " + method);
  console.log("uri " + uri);
    //jsonMimeType = {
      //'Content-type':'application/json'
  //  }
    try{

      var response;
      console.log("trying with "+ method);
      if(method=="GET" || method == "DELETE") {
          console.log("trying with "+ method);
        response = await fetch(baseURL + uri, {method: method});
      } else if (method =="POST" || method =="PUT") {
        response = await fetch(baseURL + uri, {
          method: method,
          headers:{
            'Content-type':'application/json'
          },
          body: JSON.stringify(body)
        });
      }
      return response.json(); // parses response to JSON
    }catch(err){
      console.error(err);
      return "{'status':'error'}";
    }
  }

  // Calls our test function when we click the button

  document.querySelector('#testme').addEventListener("click", ()=>{
      console.log("clicked testme??");
      testAPIs();

  });
})();
