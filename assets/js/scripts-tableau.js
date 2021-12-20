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
	        url:  'https://ace-uat.retrophin.com/acetab/login',
	        dataType: "json", 
	        async: false
	    }); // This will wait until you get a response from the ajax request.
	    
	   console.log(data.responseText);
	   //tableaueVizURL = 'https://tableau-uat.retrophin.com/trusted/'+data.responseText+'/views/ExecutiveDashboard/ExecutiveSummary'
	   //tableaueVizURL = 'https://peatableau-db01.upeadev.com/trusted/'+data.responseText+'/views/ACEDashboardDemo/SalesDashboard'
	   part1 = 'https://tableau-uat.retrophin.com/trusted/';
	   part2 = 'ExecutiveSummary';
	   tableaueVizURL = part1+data.responseText+'/t/Retrophin/views/ExecutiveDashboard/'+part2
		tableaueViz = null;
	    if(tableaueReportVizDiv != null || tableaueVizURL != null){
	        tableaueViz = new tableauSoftware.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
	    }
	    //console.log("tableaueViz 1: ",tableaueViz);
	    
	    var salesCalled = false;
	    $("#nav-sales-tab").click(function(){
			if (!salesCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace-uat.retrophin.com/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			console.log("Sales tab");
			console.log("data.responseText:", data.responseText);
			tableaueViz = null;
			tableaueVizURLSales = part1+data.responseText+'/t/Retrophin/views/ExecutiveDashboard/SalesDetail'
			tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivSales, tableaueVizURLSales, tableaueDisplayOptions);
	    	}
	    	salesCalled = true;
		});

	    var shipmentsCalled = false;
	    $("#nav-shipments-tab").click(function(){
			if (!shipmentsCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace-uat.retrophin.com/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			console.log("Shipments tab");
			console.log("data.responseText:", data.responseText);
			tableaueViz = null;
			tableaueVizURLShipments = part1+data.responseText+'/t/Retrophin/views/ExecutiveDashboard/ShipmentDetail'
			tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivShipments, tableaueVizURLShipments, tableaueDisplayOptions);
	    	}
			shipmentsCalled = true;
		});
	    
	    var patientCalled = false;
	    $("#nav-patient-tab").click(function(){
			if (!patientCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace-uat.retrophin.com/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			console.log("patient tab");
			console.log("data.responseText:", data.responseText);
			tableaueViz = null;
			tableaueVizURLPatient = part1+data.responseText+'/t/Retrophin/views/ExecutiveDashboard/PatientDetail'
			tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivPatient, tableaueVizURLPatient, tableaueDisplayOptions);
	    	}
			patientCalled = true;
		});
	    
	    var complianceCalled = false;
	    $("#nav-compliance-tab").click(function(){
			if (!complianceCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace-uat.retrophin.com/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			console.log("compliance tab");
			//console.log("data.responseText:", data.responseText);
			tableaueViz = null;
			tableaueVizURLCompliance = part1+data.responseText+'/t/Retrophin/views/ExecutiveDashboard/ComplianceDetail'
			tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivCompliance, tableaueVizURLCompliance, tableaueDisplayOptions);
	    	}
			complianceCalled = true;
		});
	    
	    var dosageCalled = false;
	    $("#nav-dosage-tab").click(function(){
			if (!dosageCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace-uat.retrophin.com/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			console.log("dosage tab");
			//console.log("data.responseText:", data.responseText);
			tableaueViz = null;
			tableaueVizURLDosage = part1+data.responseText+'/t/Retrophin/views/ExecutiveDashboard/DosageDetail'
			tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivDosage, tableaueVizURLDosage, tableaueDisplayOptions);
	    	}
			dosageCalled = true;
		});
	    
	  
	   
	    /*$(".nav-tabs a").click(function(){
	        $(this).tab('show');
	      });*/
	    
	});