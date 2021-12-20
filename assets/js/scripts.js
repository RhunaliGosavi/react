/*$(document).ready(function(){
    if(window.sessionStorage.getItem("username") == null )
            window.location.replace("/ace/index.html");
    
    
});	
*/
//var username = window.sessionStorage.getItem("username")? window.sessionStorage.getItem("username"): null;
	//var userEmail = window.sessionStorage.getItem("userEmail")? window.sessionStorage.getItem("userEmail"): null;
	//var aquisitionAccess;
	//console.log("script username:",username)
	//console.log("script email:",userEmail)
	//var token;
	var firstname;

	var getUserDetails = function() {
		//debugger;
		username = window.sessionStorage.getItem("username");
		userEmail = window.sessionStorage.getItem("userEmail");
		/*token = window.sessionStorage.getItem("token");*/
		//if(username != null || username != undefined) {
			//document.getElementById('user-name').innerHTML = username;
		//} else {
			$.ajax({
				type : "get",
				url : "/acetab/userDetails",
			 	dataType : "json",
			 	async : false,
				success : function(response) {
					//debugger;
						username = response.username;
						userEmail = response.userEmail;
						//aquisitionAccess = response.aquisitionAccess;
						//document.getElementById('user-name').innerHTML = username;
						window.sessionStorage.setItem("username", username);
						window.sessionStorage.setItem("userEmail", userEmail);
						document.getElementById('fullName').innerHTML = username;
						fullname = username.split(' ');
						
						firstname = fullname[0];
						//console.log("firstname",firstname )
						document.getElementById('firstname').innerHTML = firstname;
					},
				error : function(e) {
					console.log("error");
				}
			});
		//}
		
	}
	username = window.sessionStorage.getItem("username");
	userEmail = window.sessionStorage.getItem("userEmail");
	
	/*tableaueViz = null;
	tableaueVizChannel = null;
	$("#nav-overview-tab").click(function(){
		let token = GetToken();
		token = 'EWMhLNeUQY27HADczo9V0g==:B-IvADeTnANQz-fDTUTemUn-';
		console.log("overview tab");
		tableaueVizURL = 'https://peatableau-db01.upeadev.com/trusted/'+token+'/t/SpendOReports/views/'
		
        if(tableaueReportVizDiv != null || tableaueVizURL != null){
            tableaueViz = new tableauSoftware.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
        }
	});
	*/
	
	$(document).ready(function(){
		
		$('#sales-perf').click(function(){
			  $('.nav-tabs a[href="#overview"]').tab('show');

		});
	    //document.getElementById("mySidenav").style.width = "0px";
	    $('#SidePanelMenu').click(function(){
	        if(document.getElementById("mySidenav").style.width == "350px"){
	            document.getElementById("mySidenav").style.width = "0px";
	            //console.log("=250px");
	            
	        }
	        else{
	            document.getElementById("mySidenav").style.width = "350px";
	            //console.log("0px");
	                
	        }
	        
	    });
	    
	   // $(document).on('click', function (e){
	    //    if(document.getElementById("mySidenav").style.width == "350px"){
	        	
	            //console.log("width = 350");
	            
	      //      if(!$(e.target).is('#SidePanelMenu')){
	                //document.getElementById("mySidenav").style.width = "0";
	                //console.log("clicked outside");
	                
	        //    }
	        //}

	    //});
	});


	    
	   /* function openNav() {
	      document.getElementById("mySidenav").style.width = "250px";
	    }
	    
	    function closeNav() {
	      document.getElementById("mySidenav").style.width = "0";
	    }*/
	   
	    $('#sales-perf').click(function(){
			  $('.nav-tabs a[href="#overview"]').tab('show');

		});
	    
	    $('.closebtn').click(function(){
	    	document.getElementById("mySidebar").style.width = "40px";
	    	$('.fa-sidemenu').hide();
	        $('.closebtn').hide();
	    });
	    $('#nav-icon1').click(function(){
	    	document.getElementById("mySidebar").style.width = "40px";
	    	$('.fa-sidemenu').hide();
	    });
	    
	    $('#cross').click(function(){
        	document.getElementById("mySidebar").style.width = "40px";
        	$('#hamburger').show();
        	$('#cross').hide();
        	$('.fa-sidemenu').hide();
        });
        $('#hamburger').click(function(){
        	document.getElementById("mySidebar").style.width = "350px";
        	$('#cross').show();
        	$('#hamburger').hide();
        	$('.fa-sidemenu').show();
        });
        
	    function is_touch_device() {  
	  	  try {  
	  	    document.createEvent("TouchEvent");  
	  	    return true;  
	  	  } catch (e) {  
	  	    return false;  
	  	  }  
	  	}
	    
	        var mini = true;
	        $('.fa-sidemenu').hide();

	        function toggleSidebar() {
	            if (mini) {
	                //console.log("opening sidebar");
	                document.getElementById("mySidebar").style.width = "270px";
	                //document.getElementById("main").style.marginLeft = "250px";
	                $('.fa-sidemenu').show();
	                //$('.closebtn').show();
	                //$('#cross').show();
	                //$('#hamburger').hide();
	                this.mini = false;
//	                console.log(is_touch_device());
//	                if(is_touch_device()){
//	                	$('#cross').show();
//	                	$('#hamburger').hide();
//	                }
	                
	            } else {
	                //console.log("closing sidebar");
	                document.getElementById("mySidebar").style.width = "42px";
	                //document.getElementById("main").style.marginLeft = "85px";
	                $('.fa-sidemenu').hide();
	                //$('.closebtn').hide();
	                //$('#cross').hide();
	                //$('#hamburger').show();
	                
	                this.mini = true;
	                
//	                if(is_touch_device()){
//	                	$('#hamburger').show();
//	                	$('#cross').hide();
//	                }
	            }
	        }
	        //var ifOpened = true;
	       /* var windowsize = $(window).width();
	        const ua = navigator.userAgent;
	        const device = {
	          iPad: /iPad/.test(ua),
	          iPhone: /iPhone/.test(ua),
	          Android4: /Android 4/.test(ua)
	        }
	        console.log("UA: ",ua)
	        console.log("Device: ",device)
	        
	       

	console.log(is_touch_device());
	if(is_touch_device()){
		$('#hamburger').show();
		$('#cross').hide();
	}*/

	       
	        /* $('#nav-icon1').click(function(){
	        	
	        	if (ifOpened) {
	                document.getElementById("mySidebar").style.width = "40px";
	                $('.cross1').css("top", "7px");
	                $('.cross1').css("-webkit-transform", "rotate(0deg)");
	                $('.cross1').css("-moz-transform", "rotate(0deg);");
	                $('.cross1').css("-o-transform", "rotate(0deg)");
	                $('.cross1').css("transform", "rotate(0deg)");
	                
	                $('.cross2').css("top", "16px");
	                
	                $('.cross3').css("top", "25px");
	                $('.cross3').css("-webkit-transform", "rotate(0eg)");
	                $('.cross3').css("-moz-transform", "rotate(0deg);");
	                $('.cross3').css("-o-transform", "rotate(0deg)");
	                $('.cross3').css("transform", "rotate(0	deg)");
	                
	  				console.log("TRUE::::set width: 40px");
	                ifOpened = false;
	            } else {
	                document.getElementById("mySidebar").style.width = "400px";
	                $('.cross1').css("top", "25px");
	                $('.cross1').css("-webkit-transform", "rotate(135deg)");
	                $('.cross1').css("-moz-transform", "rotate(135deg);");
	                $('.cross1').css("-o-transform", "rotate(135deg)");
	                $('.cross1').css("transform", "rotate(135deg)");
	                
	                $('.cross2').css("opacity", "0");
	                $('.cross2').css("left", "-30px");
	                
	                $('.cross3').css("top", "26px");
	                $('.cross3').css("-webkit-transform", "rotate(-135deg)");
	                $('.cross3').css("-moz-transform", "rotate(-135deg);");
	                $('.cross3').css("-o-transform", "rotate(-135deg)");
	                $('.cross3').css("transform", "rotate(-135deg)");
	                console.log("FALSE:::set width: 40px")
	                ifOpened = true;
	            } 
	        	//document.getElementById("mySidebar").style.width = "40px";
	        	//$('.fa-sidemenu').hide();
	        });*/
	        
	        /* ar ranges = [
	        	  // Range names ...
	        	];
	        	gapi.client.sheets.spreadsheets.values.batchGet({
	        	   spreadsheetId: spreadsheetId,
	        	   ranges: ranges
	        	}).then((response) => {
	        	  var result = response.result;
	        	  console.log(`${result.valueRanges.length} ranges retrieved.`);
	        	}); */
