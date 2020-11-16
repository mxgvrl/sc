let sieve = [];
let cellsCount = 0;

let colors = [];
while (colors.length < 100) {
    do {
        var color = Math.floor((Math.random()*1000000)+1);
    } while (colors.indexOf(color) >= 0);
    colors.push("#" + ("00000A" + color.toString(16)).slice(-6));
}

 function filling (n) {
     for (let i = 2; i < n + 1; i++) {
         sieve[i] = true;
     }
 }

function createTable(){
    document.getElementById('tab-content1').innerHTML = '';
    let tableTagString = "<table border=\"1\" cellpadding=\"5\">";
    cellsCount = +prompt('Table will fill at 2 to n. Input n', 2);
    if ((cellsCount < 1000001 && cellsCount > 1) && typeof(cellsCount) === 'number') {
        filling(cellsCount);
        let cellsCountSqrt = Math.sqrt(cellsCount);
        cellsCountSqrt = +cellsCountSqrt.toFixed();
        if (cellsCountSqrt*cellsCountSqrt < cellsCount) {
            tableTagString += addToTable(cellsCount, cellsCountSqrt,1, tableTagString)
        }
        else {
            tableTagString += addToTable(cellsCount, cellsCountSqrt,0, tableTagString)
        }
        tableTagString += "</table>";
        document.getElementById('tab-content1').innerHTML += tableTagString;
    }
    else if (cellsCount < 2){
        alert('You can input values starts at 2 only')
    }
    else if (cellsCount > 1000000) {
        alert('Too big value')
    }
    else {
        alert('You can input number only')
    }
}

function addToTable(square ,minSide, isNotSquare, tableString) {
    let adder = 0;
    for (let i = 0; i < minSide+isNotSquare; i++) {
        tableString += '<tr>'
        i > 0 ? adder += minSide : adder;
        for (let j = 2; j < minSide+2; j++) {
            if ((j + adder) <= square){
                i > 0 ? tableString += '<td width="25px" align="center">' + (+j + +adder) : tableString += '<td width="25px" align="center">' + (+j);
            }
        }
        tableString += '</tr>'
    }
    return tableString;
}

function sieveTraverse () {
    let bar = document.getElementById('tab-content1').getElementsByTagName('td');
    let i = 0;
    let j = i*i;
    let k = 0;
    let color = '#43a47d';

    let inside = function (i, j, k) {
        if (j < cellsCount+1) {
            setTimeout( () => {
                bar[j-2].outerHTML = `<td width="25px" align="center" style="background-color: ${color}">`+ +j +'</td>';
                sieve[j] = false;
                inside(i, (i*i) + (k*i) ,++k)
            }, 100)
        }
        else {
            outside(++i, cellsCount);
        }
    }

    let outside = function (i, n) {
        if ((i*i) <= n) {
            if (sieve[i] === true) {
                color = colors[i] ? colors[i] : '#43a47d' ;
                inside(i ,(i*i) + (k*i) ,++k)
            }
            else {
                outside(++i, n);
            }
        }
    }
    outside(i, cellsCount);
}
