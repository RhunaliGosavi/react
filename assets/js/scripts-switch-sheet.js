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
		
		var tableaueReportVizDiv = document.getElementById('tableaueReport');
		var tableaueReportVizDivSales = document.getElementById('tableaueReportSales');
		var tableaueReportVizDivShipments = document.getElementById('tableaueReportShipments');
		var tableaueReportVizDivPatient = document.getElementById('tableaueReportPatient');
		var tableaueReportVizDivCompliance = document.getElementById('tableaueReportCompliance');
		var tableaueReportVizDivDosage = document.getElementById('tableaueReportDosage');
		var tableaueVizURL = null;
		var tableaueDisplayOptions =
		{
			width:'100%',
			height: '100vh',
			hideToolbar: false,
			hideTabs: true, 
			onFirstInteractive: function(){
				//document.getElementById('sheetName').innerHTML=tableaueViz.getWorkbook().getActiveSheet().getName();
				workbook = tableaueViz.getWorkbook();
	              activeSheet = workbook.getActiveSheet();
	              console.log("Workboo: ",workbook);
	              console.log("activeSheet", activeSheet);
				console.log('Tableu Exceuted');
			}
			};
		
		var data = $.ajax({
	        //url:  'https://localhost:8080/acetab/login',
		url:  'https://ace-uat.travere.com/acetab/login',
	        dataType: "json", 
	        async: false
	    }); // This will wait until you get a response from the ajax request.
	    
	   console.log(data.responseText);
	   //tableaueVizURL = 'https://peatableau-db01.upeadev.com/trusted/'+data.responseText+'/views/ACEDashboardDemo/SalesDashboard'
	   part1 = 'https://tableau-uat.travere.com/trusted/';
	   part2 = 'FieldSummary';
	   tableaueVizURL = part1+data.responseText+'/t/Retrophin/views/FieldSalesDashboard/'+part2
	   //tableaueVizURL = part1+data.responseText+'/views/ExecutiveDashboard/'+part2
		tableaueViz = null;
	    if(tableaueReportVizDiv != null || tableaueVizURL != null){
	        tableaueViz = new tableauSoftware.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
	    }
	    console.log("tableaueViz 1: ",tableaueViz);
             $("#compliance-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
		workbook.activateSheetAsync("Compliance Detail");

	    	
	   });
       $("#field-summary").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Field Summary");
     	   });
       $("#patient-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Patient Detail");
    	   });
       
       $("#movement-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Movement Detail");
 	   });
       
       $("#shipment-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Shipment Detail");
   	   });

       
       
       $("#patient-central-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Patient Central");
 	   });
       
       $("#hp-central-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("HCP Central");
	    
       });
       
       console.log(tableau);
       tableaueViz.addEventListener(tableau.TableauEventName.TAB_SWITCH,  function(a,b){
           console.log(a,b);
           console.log(a.getNewSheetName(), a.getOldSheetName());
            if(a.getNewSheetName() == 'Compliance Detail'){
            	console.log("in if");
            	$('.nav-item').removeClass("active");
            	$("#compliance-tab").addClass("active");
            	$("#field-summary").removeClass("active");
              }
            
            if(a.getNewSheetName() == 'Patient Detail'){
            	$('.nav-item').removeClass("active");
            	$("#patient-tab").addClass("active");
            	$("#field-summary").removeClass("active");
             }
            if(a.getNewSheetName() == 'Movement Detail'){
            	$('.nav-item').removeClass("active");
            	$("#movement-tab").addClass("active");
            	$("#field-summary").removeClass("active");
             }
            if(a.getNewSheetName() == 'Shipment Detail'){
            	$('.nav-item').removeClass("active");
            	$("#shipment-tab").addClass("active");
            	$("#field-summary").removeClass("active");
             }
            if(a.getNewSheetName() == 'HCP Central'){
            	$('.nav-item').removeClass("active");
            	$("#hp-central-tab").addClass("active");
            	$("#patient-central-tab").removeClass("active");
             }
            if(a.getNewSheetName() == 'Patient Central'){
            	$('.nav-item').removeClass("active");
            	$("#patient-central-tab").addClass("active");
		    if ($( "#movement-tab" ).hasClass( "active" )){ 
			    $( "#movement-tab" ).removeClass( "active" ) 
		    }
            	$("#hp-central-tab").removeClass("active");
             }
            
            /****21Dec****/
            if( a.getNewSheetName() == 'Patient Central'){
              $('.nav-item').removeClass("active");
              $("#patient-central-tab").addClass("active");
              
            }
            if( a.getNewSheetName() == 'Field Summary'){
                $('.nav-item').removeClass("active");
                $("#field-summary").addClass("active");
                // $("#compliance-tab").removeClass("active");
              }



	    
	});
      var ref_this = $("div.nav tabs a").find(".active");
		       console.log(ref_this.data);

	});
