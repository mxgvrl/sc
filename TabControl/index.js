let sieve = [];
let userCount = 0;
let colors = [
    '#414040',
    '#ffb3b3',
    '#aaddbb',
    '#3586ea',
    '#e438f6',
    '#ff7ce3',
    '#eae353',
    '#701e52',
    '#256e5a',
    '#c48b38',
    '#efc784',
    '#ff1212',
    '#ddc65e'
]

 function filling (n) {
     for (let i = 2; i < n + 1; i++) {
         sieve[i] = true;
     }
 }

function output () {
    for (let i = 0; i < sieve.length; i++) {
        console.log(i + ' :', sieve[i]);
    }
}

function start(){
    document.getElementById('tab-content1').innerHTML = '';
    let s = "<table border=\"1\" cellpadding=\"5\">";
    userCount = +prompt('Table will fill at 2 to n. Input n', 2);
    if ((userCount < 200 && userCount > 1) && typeof(userCount) === 'number') {
        const x = parseInt(userCount);
        filling(x);
        let y = Math.sqrt(x);
        y = +y.toFixed();
        if (y*y < x) {
            s += addToTable(x, y,1, s)
        }
        else {
            s += addToTable(x, y,0, s)
        }
        s += "</table>";
        document.getElementById('tab-content1').innerHTML += s;
    }
    else if (userCount > 200 || userCount < 2){
        alert('You can input values in range 2..200 only')
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
    const n = parseInt(userCount);
    let bar = document.getElementById('tab-content1').getElementsByTagName('td');
    let i = 0;
    let j = i*i;
    let k = 0;
    let color = '#43a47d';

    let inside = function (i, j, k) {
        if (j < n+1) {
            setTimeout( () => {

                bar[j-2].outerHTML = `<td width="25px" align="center" style="background-color: ${color}">`+ +j +'</td>';
                sieve[j] = false;
                inside(i, (i*i) + (k*i) ,++k)
            }, 100)
        }
        else {
            outside(++i, n);
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
    outside(i, n);
}
