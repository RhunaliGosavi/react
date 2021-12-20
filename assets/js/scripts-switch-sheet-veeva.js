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
	   part2 = 'PatientLead';
	   tableaueVizURL = part1+data.responseText+'/t/Retrophin/views/VeevaDashboard/'+part2
	   //tableaueVizURL = part1+data.responseText+'/views/ExecutiveDashboard/'+part2
		tableaueViz = null;
	    if(tableaueReportVizDiv != null || tableaueVizURL != null){
	        tableaueViz = new tableauSoftware.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
	    }
	    console.log("tableaueViz 1: ",tableaueViz);
             $("#patient-lead").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
		workbook.activateSheetAsync("Patient Lead");

	    	
	   });
       $("#prospective-patient").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	
	    	console.log("workbook: ", workbook);
	        activeSheet = workbook.getActiveSheet();
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Prospective Patient");
     	   });
       $("#sent-emails1").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Sent Email");
    	   });
       
       $("#sent-emails2").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Sent Email - Bubble Chart");
 	   });
       
       $("#call-reporting").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Call Reporting");
   	   });

	    
	});
