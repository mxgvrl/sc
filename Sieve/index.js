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

filling(50);
output();
console.log('============================');
sieveTraverse(sieve.length);
output();
