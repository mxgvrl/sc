let bar = 100;

function workWithIt1(){
    bar += 100;
    alert(bar)
}

function workWithIt2(){
    bar = bar/2;
    alert(bar)
}

setTimeout(workWithIt1, 500);
workWithIt2();