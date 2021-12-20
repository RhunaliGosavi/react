
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
		var tableaueReportVizDivChannel = document.getElementById('tableaueReportChannel');
		var tableaueReportVizDivGeography = document.getElementById('tableaueReportGeography');
		var tableaueReportVizDivCalls = document.getElementById('tableaueReportCalls');
		var tableaueVizURL = null;
		var tableaueDisplayOptions =
		{
			width:'100%',
			height: '100vh',
			hideToolbar: false,
			hideTabs: true, 
			onFirstInteractive: function(){
				document.getElementById('sheetName').innerHTML=tableaueViz.getWorkbook().getActiveSheet().getName();
				workbook = tableaueViz.getWorkbook();
	              activeSheet = workbook.getActiveSheet();
	              console.log("Workbook: ",workbook);
	              console.log("activeSheet:", activeSheet);
				console.log('Tableu Exceuted');
			}
			};
		
		var data = $.ajax({
	        //url:  'https://localhost:8080/acetab/login',
	        url:  'https://ace.saama.com/acetab/login',
	        dataType: "json", 
	        async: false
	    }); // This will wait until you get a response from the ajax request.
	    
	   console.log(data.responseText);
	   console.log("Workbook: ",workbook);
       console.log("activeSheet:", activeSheet);
	   //tableaueVizURL = 'https://peatableau-db01.upeadev.com/trusted/'+data.responseText+'/views/ACEDashboardDemo/SalesDashboard'
	   part1 = 'https://peatableau-db01.upeadev.com/trusted/';
	   part2 = 'SalesDashboard';
	   tableaueVizURL = part1+data.responseText+'/views/ACEDashboardDemo/'+part2
		tableaueViz = null;
	    if(tableaueReportVizDiv != null || tableaueVizURL != null){
	        tableaueViz = new tableauSoftware.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
	    }
	    console.log("tableaueViz 1: ",tableaueViz);
	    
	    var channelCalled = false;
	    $("#nav-channel-tab").click(function(){
			/*if (!channelCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace.saama.com/acetab/login',
		        dataType: "json", 
		        async: false
		    });*/
	    	
			console.log("channel tab");
			//console.log("data.responseText:", data.responseText);
			//tableaueViz = null;
			//tableaueVizURLChannel = part1+data.responseText+'/views/ACEDashboardDemo/Channel'
			//tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivChannel, tableaueVizURLChannel, tableaueDisplayOptions);
	    	//}
			let workbook = tableaueViz.getWorkbook();
			console.log("Workbook:", workbook);
			workbook.activateSheetAsync('Channel');
			
	    	channelCalled = true;
		});
	    
	    var geographyCalled = false;
	    $("#nav-geography-tab").click(function(){
	    	if (!geographyCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace.saama.com/acetab/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			console.log("geography tab");
			//console.log(tableaueViz);
			console.log("data.responseText:", data.responseText);
			tableaueViz = null;
			tableaueVizURLGeography = part1+data.responseText+'/views/ACEDashboardDemo/Geography'
			tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivGeography, tableaueVizURLGeography, tableaueDisplayOptions);
	    	}
	    	geographyCalled = true;
            
		});
	    
	    var callsCalled = false;
	    $("#nav-calls-tab").click(function(){
	    	if (!callsCalled){
	    	let data = $.ajax({
		        //url:  'https://localhost:8080/acetab/login',
		        url:  'https://ace.saama.com/acetab/login',
		        dataType: "json", 
		        async: false
		    });
	    	
			console.log("calls tab");
			//console.log(tableaueViz);
			console.log("data.responseText:", data.responseText);
			tableaueViz = null;
			tableaueVizURLCalls = part1+data.responseText+'/views/ACEDashboardDemo/Calls'
			tableaueViz = new tableauSoftware.Viz(tableaueReportVizDivCalls, tableaueVizURLCalls, tableaueDisplayOptions);
	    	}
	    	callsCalled = true;
		});
	    
	    /*$(".nav-tabs a").click(function(){
	        $(this).tab('show');
	      });*/
	    
	});