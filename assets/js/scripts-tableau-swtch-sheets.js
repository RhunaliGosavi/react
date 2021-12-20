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
		/*var tableaueReportVizDivSales = document.getElementById('tableaueReportSales');
		var tableaueReportVizDivShipments = document.getElementById('tableaueReportShipments');
		var tableaueReportVizDivPatient = document.getElementById('tableaueReportPatient');
		var tableaueReportVizDivCompliance = document.getElementById('tableaueReportCompliance');
		var tableaueReportVizDivDosage = document.getElementById('tableaueReportDosage');*/
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
	        url:  'https://ace-uat.retrophin.com/acetab/login',
	        dataType: "json", 
	        async: false
	    }); // This will wait until you get a response from the ajax request.
	    
	   console.log(data.responseText);
	   //tableaueVizURL = 'https://peatableau-db01.upeadev.com/trusted/'+data.responseText+'/views/ACEDashboardDemo/SalesDashboard'
	   part1 = 'https://tableau-uat.retrophin.com/trusted/';
	   part2 = 'ExecutiveSummary';
	   //tableaueVizURL = part1+data.responseText+'/t/Retrophin/views/ExecutiveDashboard/'+part2
	   tableaueVizURL = part1+data.responseText+'/site/Retrophin/views/ExecutiveDashboard/'+part2
		tableaueViz = null;
	    if(tableaueReportVizDiv != null || tableaueVizURL != null){
	        tableaueViz = new tableauSoftware.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
	    }
	    console.log("tableaueViz 1: ",tableaueViz);
             $("#nav-sales-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
		workbook.activateSheetAsync("Sales Detail");

	    	
	   });
       $("#nav-exec-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Executive Summary");
     	   });
       $("#nav-patient-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Patient Detail");
    	   });
       
       $("#nav-shipments-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Shipment Detail");
   	   });

       $("#nav-compliance-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Compliance Detail");
  	   });
       
       $("#nav-dosage-tab").click(function(){
	    	workbook = tableaueViz.getWorkbook();
	    	activeSheet = workbook.getActiveSheet();
	    	console.log("workbook: ", workbook);
	    	console.log("activeSheet: ", activeSheet);
	    	workbook.activateSheetAsync("Dosage Detail");
 	   });
	    
       /*
       tableauViz.addEventListener(tableau.TableauEventName.TAB_SWITCH, onTabSwitch){
    	   console.log("inside");
       }*/
	   
	    
	});
