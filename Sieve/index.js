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
    let s = "<table border=\"1\" cellpadding=\"5\" width=\"100%\">";
    const userCount = document.getElementById("users").value;    //получил значение из input
    const x = parseInt(userCount); //преобразовал из строки в число
    for(let i = 0; i < x; i++){
        s += "<tr><td>" + i + "</td></tr>";       //новая строка таблицы для каждого пользователя
    }
    s += "</table>";

    document.body.innerHTML += s; //добавил в body, на самом деле можно добавить куда хотите))
}

filling(50);
output();
console.log('============================');
sieveTraverse(sieve.length);
output();
