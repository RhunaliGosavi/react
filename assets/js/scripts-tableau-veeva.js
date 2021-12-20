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
	              console.log("Workbook: ",workbook);
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
	   //tableaueVizURL = 'https://tableau-uat.retrophin.com/trusted/'+data.responseText+'/views/ExecutiveDashboard/ExecutiveSummary'
	   //tableaueVizURL = 'https://peatableau-db01.upeadev.com/trusted/'+data.responseText+'/views/ACEDashboardDemo/SalesDashboard'
	   part1 = 'https://tableau-uat.travere.com/trusted/';
	   part2 = 'PatientLead';
	   tableaueVizURL = part1+data.responseText+'/t/Retrophin/views/VeevaDashboard/'+part2
		tableaueViz = null;
	    if(tableaueReportVizDiv != null || tableaueVizURL != null){
	        tableaueViz = new tableauSoftware.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
	    }
	    //console.log("tableaueViz 1: ",tableaueViz);
	    
	    var prospectiveCalled = false;
	    $("#prospective-patient").click(function(){
			if (!prospectiveCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace-uat.travere.com/acetab/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			tableaueViz = null;
			tableaueVizURLSales = part1+data.responseText+'/t/Retrophin/views/VeevaDashboard/ProspectivePatient'
			tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivSales, tableaueVizURLSales, tableaueDisplayOptions);
	    	}
			prospectiveCalled = true;
		});

	    var sentEmailsCalled = false;
	    $("#sent-emails").click(function(){
			if (!sentEmailsCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace-uat.travere.com/acetab/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			console.log("sentEmail tab");
			console.log("data.responseText:", data.responseText);
			tableaueViz = null;
			tableaueVizURLShipments = part1+data.responseText+'/t/Retrophin/views/VeevaDashboard/SentEmail'
			tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivShipments, tableaueVizURLShipments, tableaueDisplayOptions);
	    	}
			sentEmailsCalled = true;
		});
	    
	    var callReportingCalled = false;
	    $("#call-reporting").click(function(){
			if (!callReportingCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace-uat.travere.com/acetab/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			console.log("callReportingCalled");
			console.log("data.responseText:", data.responseText);
			tableaueViz = null;
			tableaueVizURLPatient = part1+data.responseText+'/t/Retrophin/views/VeevaDashboard/CallReporting'
			tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivPatient, tableaueVizURLPatient, tableaueDisplayOptions);
	    	}
			callReportingCalled = true;
		});
	    
	    var complianceCalled = false;
	    $("#nav-compliance-tab").click(function(){
			if (!complianceCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace-uat.travere.com/acetab/login',
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
		        url:  'https://ace-uat.travere.com/acetab/login',
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