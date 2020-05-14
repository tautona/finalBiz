// wrap in IIFE to control scope
(function(){
   const baseURL = 'http://localhost:8080';

   function testAPIs(){
     console.log("how about this? in testAPI");


    var testJSON = {};

    // list
    callAPI('GET', '/api/users', null, null)
      .then((list)=>{
        //list = {"_id":"5e978bbb7753b349a8475eb3","username":"funnny","firstUnit":45,"secondUnit":55,"createdAt":"2020-04-15T22:33:31.558Z","__v":0};
        console.log("in get with list"+list);
        console.log('\n\n***************************\nlist results:');
        console.log(list);


        // create
        let data = new FormData();
        data.append('title', 'My API Test Title');
        data.append('description','This is an AJAX API test');
        data.append('username',document.getElementById("username").value);
        data.append('firstUnit',document.getElementById("firstUnit").value);
        data.append('secondUnit',document.getElementById("secondUnit").value);
        //console.log("i am " + data.get('username'));
        callAPI('POST', '/api/users', null, data)
          .then((user)=>{
            newuserId = user._id;
            savedUser = user;
          //  console.log("me:" +list[0]._id);
            //var savedUser = user;  // keep a handle to the created user object
            console.log('\n\n***************************\ncreate results:');
            console.log(user + " is also" + savedUser.name);
          //  var newuserId = savedUser._id;

            // find
        callAPI('GET','/api/users/'+newuserId, null, null)
          .then((find)=>{
            userId = savedUser._id;
            userName= user.username;
            console.log('\n\n***************************\nfind results:');
            //console.log(list[list.length-1].username);
            console.log(userId + " : " + userName);
//


    //
                // update
                newname="fatty";
                data.set('username', newname);
                testJSON.description += ' appended by the AJAX API ';
                callAPI('PUT','/api/users/'+newuserId, null, data)
                  .then((user)=>{
                    console.log('\n\n***************************\nupdate results:');
                    console.log(user);

                    //delete
                    callAPI('DELETE', '/api/users/'+newuserId, null, null)
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
    jsonMimeType = {
      'Content-type':'application/json'
    }
    try{
      /*  Set up our fetch.
       *   'body' to be included only when method is POST
       *   If 'PUT', we need to be sure the mimetype is set to json
       *      (so bodyparser.json() will deal with it) and the body
       *      will need to be stringified.
       *   '...' syntax is the ES6 spread operator.
       *      It assigns new properties to an object, and in this case
       *      lets us use a conditional to create, or not create, a property
       *      on the object. (an empty 'body' property will cause an error
       *      on a GET request!)
       */
         console.log (baseURL + uri);
      var response = await fetch(baseURL + uri, {
        method: method,
        ...(method =='POST' || method == 'PUT' ? {headers:  { 'Content-type':'application/json'}, body:JSON.stringify(body)}:{})
        ...(method =='GET' || method =='DELETE' ?  {body:body} : {})
      });

      return response.json(); // parses response to JSON
    }catch(err){
      console.error(err);
      return "{'status':'error'}";
    }
  }

  // Calls our test function when we click the button
  //  afer validating that there's a file selected.
  document.querySelector('#testme').addEventListener("click", ()=>{
    let input = document.querySelector('input[username]')
  //  if (input.value){
    console.log("hey hey in the api somewhere");
      testAPIs();
  //  }else{
    //  alert("please select an image file first");
  //  }
  });
})();
