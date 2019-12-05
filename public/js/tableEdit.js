function deleteRow(tableID,currentRow,rowId) {
    try {
        var table = document.getElementById(tableID);
        var rowCount = table.rows.length;
        for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            /*var chkbox = row.cells[0].childNodes[0];*/
            /*if (null != chkbox && true == chkbox.checked)*/
            
            if (row==currentRow.parentNode.parentNode) {
                if (rowCount <= 1) {
                    alert("Cannot delete all the rows.");
                    break;
                }
                table.deleteRow(i);
                rowCount--;
                i--;
				var req = new XMLHttpRequest();
				var payload = "{id:" + rowId + "}";
				req.open('POST',"http://flip3.engr.oregonstate.edu:34692/delete", true);
				req.setRequestHeader('Content-Type','application/json');
				req.addEventListener('load',function(){
					if(req.status >= 200 && req.status < 400){
						var response = JSON.parse(req.responseText);
						//document.getElementById('postResult').textContent = response.data;
						//document.getElementById('shortUrl').textContent = response.id;
					  } else {
						console.log("Error in network request: " + req.statusText);
					 }});
				req.send(JSON.payload);
				event.preventDefault();
			}
        }
    } catch (e) {
        alert(e);
    }
    //getValues();
}

