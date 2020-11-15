function start() {
    document.write('chill')
}

function inter (callback) {
    //setInterval(callback, 1000);
    let i = 0;
    let tran = function (i) {
        if (i < 5) {
            setTimeout(() => {
                document.write('async');
                return tran(i + 1);
            }, 1000);
        }
    }
    tran(i);

    document.write('fuck')
}



