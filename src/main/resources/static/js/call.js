function fillCall() {
    var request = new XMLHttpRequest();
    var response = null;
    var firstDay;
    var countOfDays;
    var previousDays;
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    if (month > 12) {
        alert("Wrong month number");
        return;
    }
    var url = "http://localhost:8080/fill?year=" + year + "&month=" + month;

    request.open("GET", url);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            response = JSON.parse(request.responseText);
            firstDay = response[0];
            countOfDays = response[1];
            previousDays = response[2];
            fillTable(firstDay, countOfDays, previousDays);
        }

    }
}

function fillTable(firstDay, countOfDays, previousDays) {
    var tblBody = document.getElementById("body");
    var rows = tblBody.getElementsByTagName("tr");
    var rowCount = rows.length;

    for (var i = rowCount - 1; i > 0; i--) {
        tblBody.removeChild(rows[i]);
    }

    var text = 1;
    var text2 = 1;
    var cellText;
    var previousMonthDays = previousDays - firstDay + 2;
    for (var i = 0; i < 6; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 7; j++) {
            if ((j < firstDay - 1) && (i === 0)) {
                var cell = document.createElement("td");
                cellText = document.createTextNode(previousMonthDays);
                cell.style.backgroundColor = "grey";
                cell.style.textAlign = "center";
                previousMonthDays++;
            } else {
                if (text <= countOfDays) {
                    var cell = document.createElement("td");
                    cellText = document.createTextNode(text);
                    text++;
                    cell.style.backgroundColor = "aqua";
                    cell.style.textAlign = "center";

                } else {
                    var cell = document.createElement("td");
                    cellText = document.createTextNode(text2);
                    cell.style.backgroundColor = "grey";
                    cell.style.textAlign = "center";
                    text2++;
                }
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
}