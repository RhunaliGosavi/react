	$(document).ready(function(){
		
		var tableaueReportVizDivCalls = document.getElementById('tableaueReportCalls');
		var tableaueReportVizDivCallAnalysis = document.getElementById('tableaueReportCallAnalysis');
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
			}
		};
		
		var data = $.ajax({
	        //url:  'https://localhost:8080/acetab/login',
	        url:  'https://ace.saama.com/acetab/login',
	        dataType: "json", 
	        async: false
	    }); // This will wait until you get a response from the ajax request.
	    
	   console.log(data.responseText);
	   //tableaueVizURL = 'https://peatableau-db01.upeadev.com/trusted/'+data.responseText+'/views/ACEDashboardDemo/SalesDashboard'
	   part1 = 'https://peatableau-db01.upeadev.com/trusted/';
	   part2 = 'Calls';
	   tableaueVizURL = part1+data.responseText+'/views/ACESalesandLaunchInsights/'+part2
		tableaueViz = null;
	    if(tableaueReportVizDivCalls != null || tableaueVizURL != null){
	        tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivCalls, tableaueVizURL, tableaueDisplayOptions);
	    }

	    var callAnalysisCalled = false;
	    $("#nav-callsAnalysis-tab").click(function(){
	    	if (!callAnalysisCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace.saama.com/acetab/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			console.log("Call Analysis tab");
			//console.log(tableaueViz);
			console.log("data.responseText:", data.responseText);
			tableaueVizCallAnalysis = null;
			tableaueVizURLCallAnalysis = part1+data.responseText+'/views/ACESalesandLaunchInsights/CallAnalysis'
			tableaueVizCallAnalysis = new tableauSoftware.Viz(tableaueReportVizDivCallAnalysis, tableaueVizURLCallAnalysis, tableaueDisplayOptions);
	    	}
	    	callAnalysisCalled = true;
		});
	    
	});
