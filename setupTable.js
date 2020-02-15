// Create the connect 4 table from scratch
function setupTable() {
    const tbody = document.getElementById("tbody");
    const rows = [];
    for (let row=0; row<numHigh; row++) {
        const rowElem = document.createElement("tr");
        for (let col=0; col<numWide; col++) {
            const dataElem = document.createElement("td");
            dataElem.id = boxId(col, row);
            dataElem.style.background = "white";
            dataElem.onclick = function() { click(col) };
            rowElem.append(dataElem);
        }
        rows.push(rowElem);
    }
    
    // add rows to table in reverse order (so that the 0th row is on the bottom)
    while (rows.length > 0) {
        tbody.append(rows.pop());
    }
}

setupTable();