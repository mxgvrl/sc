let sieve = [];

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

function sieveTraverse (n) {
     for (let i = 2; (i*i) <= n; i++) {
         if (sieve[i] === true) {
             for (let k = 0, j = i*i; j < n; ++k, j = (i*i) + (k*i)) {
                 sieve[j] = false;
             }
         }
     }
}

function start(){ //запускается при клике на кнопку
    let s = "<table border=\"1\" cellpadding=\"5\">";
    const userCount = document.getElementById("users").value;    //получил значение из input
    const x = parseInt(userCount); //преобразовал из строки в число
    for(let i = 0; i < x; i++){
        s += "<tr><td>" + i + "</td></tr>";       //новая строка таблицы для каждого пользователя
    }
    s += "</table>";

    document.body.innerHTML += s; //добавил в body, на самом деле можно добавить куда хотите))
}

function start1(x){
    let y = Math.sqrt(x);
    y = y.toFixed();
    if (y*y < x) {
        console.log(+y+1 + 'x' + y);
    }
    else {
        console.log(y + 'x' + y);
    }
}

function start2(){
    let s = "<table border=\"1\" cellpadding=\"5\">";
    const userCount = document.getElementById("users").value;
    const x = parseInt(userCount);
    filling(x);
    let y = Math.sqrt(x);
    y = y.toFixed();
    if (y*y < x) {
        let adding = -y + 1;
        // let adding = 0;
        for (let j = 0; j < +y; j++) {
            s += "<tr>";
            adding += +y + 1;
            for(let i = 0; i < +y+1; i++){
                if ((+i + +adding) <= x){
                    s += "<td>" + (+i + +adding) + "</td>";
                }
            }
            s += "</tr>";
        }
    }
    else {
        for (let j = 0; j < +y; j++) {
            s += "<tr>";
            for(let i = 0; i < +y; i++){
                s += "<td>" + sieve[i] + "</td>";
            }
            s += "</tr>";
        }
    }
    s += "</table>";

    document.body.innerHTML += s;
}

function start3(){
    let s = "<table border=\"1\" cellpadding=\"5\">";
    const userCount = document.getElementById("users").value;
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
    document.body.innerHTML += s;
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

function sieveTraverse1 () {
    const userCount = document.getElementById("users").value;
    const n = parseInt(userCount);
    let bar = document.getElementsByTagName('td');
    let coo = Array.prototype.slice.call(bar);

    for (let i = 0; (i*i) <= n; i++) {
        if (sieve[i] === true) {
            for (let k = 0, j = i*i; j < n+1; ++k, j = (i*i) + (k*i)) {
                coo[j-2].innerHTML = '<tb style="background:#ff4141;">'+ +j +'</tb>';
                sieve[j] = false ;
            }
        }
    }
}

function sieveTraverse2 () {
    const userCount = document.getElementById("users").value;
    const n = parseInt(userCount);
    let bar = document.getElementsByTagName('td');
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


    // for (let i = 0; (i*i) <= n; i++) {
    //     if (sieve[i] === true) {
    //         setTimeout( () => {
    //             for (let k = 0, j = i*i; j < n+1; ++k, j = (i*i) + (k*i)) {
    //                 setTimeout( () => {
    //
    //                     , 100)
    //             }
    //         }, 2000);
    //     }
    // }
}

// filling(50);
// output();
// console.log('============================');
// sieveTraverse(sieve.length);
// output();
