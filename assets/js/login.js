$(document).ready(function(){
    //var user = sessionStorage.getItem(username);
    //var pass = sessionStorage.getItem(password);
    //console.log(user);
    //console.log(pass);
    
    

    $('.btn-login').click(function() {

        var username = $("#username").val();
        var password = $("#password").val();
        
        if( username =='' || password ==''){
            $('input[type="text"],input[type="password"]').css("border-bottom","2px solid red");
            $('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
            
            }
             
        if (username === 'demo' && password === 'demo')
            {
                console.log("correct");
                sessionStorage.setItem("username", username);
                window.location.replace("/acetab/html/home.html");

            }
        else
        {
            //console.log("wrong");
            $('.wrongCred').css("display", "block");
        }    
        

        

        
    });

});