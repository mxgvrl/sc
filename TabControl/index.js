let sieve = [];
let userCount = 0;

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

function addToTable(square ,minSide, isNotSquare, tableString) {
    let adder = 0;
    for (let i = 0; i < minSide+isNotSquare; i++) {
        tableString += '<tr>'
        i > 0 ? adder += minSide : adder;
        for (let j = 2; j < minSide+2; j++) {
            if ((j + adder) <= square){
                i > 0 ? tableString += '<td>' + (+j + +adder) : tableString += '<td>' + (+j);
            }
        }
        tableString += '</tr>'
    }
    return tableString;
}

function sieveTraverse () {
    const n = parseInt(userCount);
    let bar = document.getElementById('tab-content1').getElementsByTagName('td');
    let coo = Array.prototype.slice.call(bar);
    let i = 0;
    let j = i*i;
    let k = 0;

    let inside = function (i, j, k) {
        if (j < n+1) {
            setTimeout( () => {
                coo[j-2].innerHTML = '<tb style="background:#ff4141;">'+ +j +'</tb>';
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
                inside(i ,(i*i) + (k*i) ,++k)
            }
            else {
                outside(++i, n);
            }
        }
    }
    outside(i, n);
}
