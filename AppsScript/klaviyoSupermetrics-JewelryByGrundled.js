function myFunction() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    var sourceSheet = spreadsheet.getSheetByName(
        "Grundled - All Data - Campaigns"
    );
    var targetSheet = spreadsheet.getSheetByName("Grundled - February");

    targetSheet.clearContents();

	// TODO: update the date range to be dynamic based on the current date
	// var today = new Date();
	// var startDate = new Date(today.getFullYear(), today.getMonth(), 1);	
	// var endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	
    var data = sourceSheet.getDataRange().getValues();
    var startDate = new Date("2025-02-01");
    var endDate = new Date("2025-02-28");
    var filteredData = [];

    for (var i = 1; i < data.length; i++) {
        var orderValue = data[i][10];
        var campaignDate = new Date(data[i][0]);

        if (
            orderValue > 0 &&
            campaignDate >= startDate &&
            campaignDate <= endDate
        ) {
            data[i].splice(2, 0, "");
            filteredData.push(data[i]);
        }
    }

    var header = data[0];
    header.splice(2, 0, "Flow name");

    var flowSheet = spreadsheet.getSheetByName("Grundled - All Data - Flows");
    var dataFlow = flowSheet.getDataRange().getValues();
    var filteredDataFlow = [];

    for (var i = 1; i < dataFlow.length; i++) {
        var orderValueFlow = dataFlow[i][10];
        var campaignDateFlow = new Date(dataFlow[i][0]);

        if (
            orderValueFlow > 0 &&
            campaignDateFlow >= startDate &&
            campaignDateFlow <= endDate
        ) {
            dataFlow[i].splice(2, 0, dataFlow[i][1]);
            dataFlow[i][1] = "";
            console.log(dataFlow[i][1]);
            filteredDataFlow.push(dataFlow[i]);
        }
    }

    filteredData = filteredData.concat(filteredDataFlow);

    filteredData.sort(function (a, b) {
        return a[0] - b[0];
    });

    targetSheet.getRange(1, 1, 1, header.length).setValues([header]);
    targetSheet
        .getRange(2, 1, filteredData.length, filteredData[0].length)
        .setValues(filteredData);
}
