function haveBackdrop() {
    if ($('.modal-backdrop').length > 0) {
        //debugger;
        $('.modal-backdrop').addClass('my-modal-backdrop');
        clearTimeout(mBackdrop);
        return true;
    }
    return false;
    
}
var mBackdrop;

$('#sidePanel').on('show.bs.modal', function() {
    //console.log("sidePanel clicked");
    mBackdrop = setTimeout("haveBackdrop()", 10);
    
});


var tableaueReportVizDiv = document.getElementById('tableaueReport');
var tableaueVizURL = null;
var tableaueDisplayOptions =
{
    width:'100%',
    height: '100vh',
    hideToolbar: false,
    hideTabs: false, 
    onFirstInteractive: function(){
        //document.getElementById('sheetName') .innerHTML=viz.getWorkbook().getActiveSheet().getName();
        console.log('Tableu Exceuted');
    }
    };

var tableaueReportVizDivChannel = document.getElementById('tableaueReportChannel');
//var tableaueVizURL = null;

$(document).ready(function () {
	tableaueViz = null;
	tableaueVizChannel = null;
	$("#nav-overview-tab").click(function(){
		let token = GetToken();
		//token = 'EWMhLNeUQY27HADczo9V0g==:B-IvADeTnANQz-fDTUTemUn-';
		console.log("overview tab");
		tableaueVizURL = 'https://peatableau-db01.upeadev.com/trusted/' + token +'/t/SpendOReports/views/'
		
        if(tableaueReportVizDiv != null || tableaueVizURL != null){
            tableaueViz = new tableauSoftware.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
        }
	});
	
	$("#nav-channel-tab").click(function(){
		let token = GetToken();
		//token = 'EWMhLNeUQY27HADczo9V0g==:B-IvADeTnANQz-fDTUTemUn-';
		console.log("channel tab");
		tableaueVizURL = 'https://peatableau-db01.upeadev.com/trusted/' + token +'/t/SpendOReports/views/'
	    
	    if(tableaueReportVizDivChannel != null || tableaueVizURL != null){
	        tableaueVizChannel = new tableauSoftware.Viz(tableaueReportVizDivChannel, tableaueVizURL, tableaueDisplayOptions);
	    }
	});
	
	GetToken();


function GetToken() {
    $.ajax({
        type: 'POST',
        url: 'https://localhost:8080/acetab/login',
        crossDomin: true,
        dataType: "json",
        //contentType: 'application/x-www-form-urlencoded', 
        success: function () {
        	console.log('Successfully retrieved ' + data);
        	return data;
        },
        error: function (error) {
            console.log("Error:", error);
        }
    });
}

    });

	//token = 'EWMhLNeUQY27HADczo9V0g==:B-IvADeTnANQz-fDTUTemUn-';
	token = data;
	console.log(data);
	tableaueVizURL = 'https://peatableau-db01.upeadev.com/trusted/' + token +'/views/'
	tableaueViz = null;
    if(tableaueReportVizDiv != null || tableaueVizURL != null){
        tableaueViz = new tableauSoftware.Viz(tableaueReportVizDiv, tableaueVizURL, tableaueDisplayOptions);
    }
    
    /*switchReport: function(sheetname){
        let workbook=tableaueViz.getWorkbook();
        workbook.activateSheetAsync(sheetName);
    }*/

/*$(document).ready(function(){
    if(window.sessionStorage.getItem("username") == null )
            window.location.replace("/ace/login.html");
    
    
});*/
