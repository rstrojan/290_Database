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
				var payload = {id:rowId};
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
				console.log(payload);
				console.log(JSON.stringify(payload));
				req.send(JSON.stringify(payload));
				event.preventDefault();
			}
        }
    } catch (e) {
        alert(e);
    }
    //getValues();
}

function addRow(tableID) {
    try {
        var table = document.getElementById(tableID);
		console.log(document.getElementById("add_name").value)
		var row = table.insertRow(2);
		row.insertCell(0).innerHTML = document.getElementById("add_name").value;
		row.insertCell(1).innerHTML = document.getElementById("add_reps").value;
		row.insertCell(2).innerHTML = document.getElementById("add_weight").value;
		row.insertCell(3).innerHTML = document.getElementById("add_lbs").value;
		row.insertCell(4).innerHTML = document.getElementById("add_date").value;
		var req = new XMLHttpRequest();
		 req.open("GET", "http://flip3.engr.oregonstate.edu:34692/insert?"+
		 "name=" + document.getElementById("add_name").value +
		 "&reps=" + document.getElementById("add_reps").value +
		 "&weight=" + document.getElementById("add_weight").value +
		 "&lbs=" + document.getElementById("add_lbs").value +
		 "&date=" + document.getElementById("add_date").value, true);
		req.send();
    } catch (e) {
        alert(e);
    }
    //getValues();
}

function editRow(tableID,rowId) {
	try{
	window.location.href = "http://flip3.engr.oregonstate.edu:34692/update?id="+rowId;
    } catch (e) {
        alert(e);
    }//getValues();
}

function updateRow(tableID,rowId) {
    try {
		var req = new XMLHttpRequest();
		 req.open("GET", "http://flip3.engr.oregonstate.edu:34692/save?"+
		 "id=" + rowId +
		 "&name=" + document.getElementById("add_name").value +
		 "&reps=" + document.getElementById("add_reps").value +
		 "&weight=" + document.getElementById("add_weight").value +
		 "&lbs=" + document.getElementById("add_lbs").value +
		 "&date=" + document.getElementById("add_date").value, true);
		req.send();
    } catch (e) {
        alert(e);
    }
    //getValues();
}

function backHome() {
	try{
	window.location.href = "http://flip3.engr.oregonstate.edu:34692/";
    } catch (e) {
        alert(e);
    }//getValues();
}