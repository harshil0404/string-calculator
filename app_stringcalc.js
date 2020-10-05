let a = []; 
let op = ['^','/','*','+','-'];
let ob = '(', cb = ')' ;
let c = 0;
let ans = document.querySelector('.res'); 

function triggerSolve(){
    let temp = -1 ;
    let val = document.querySelector('input').value ;
    for(let i = 0 ; i < val.length ; i++){
        if(Number.isInteger(+val[i]) && val[i] != " "){
            if (c == 0) {
                a.push(+val[i])
            }
            else if (c > 0){
                a[a.length-1] = +(a[a.length-1] + val[i]);
            }
            c++ ;
        }
        else if(val[i] == " "){
            continue;
        }
        else if(val[i] == "."){
            a[a.length-1] = (a[a.length-1] + val[i]);
            c++;
        }
        else if(op.includes(val[i])){
            c = 0
            if(val[i] == '-' && i==0){
                temp=1
            }
            a.push(val[i])
        }
        else if(val[i] == ob || val[i] == cb){
            c = 0
            a.push(val[i])
        }
        else if(val[i] == 's' || val[i] == 'S'){
            c = 0
            a.push(val[i])
            console.log(a);
        }
        else if (val[i] == 'n' || val[i] == 'N'){
            c = 0
            console.log(a);
            a.push(val[i])
        }
        else if(val[i] == ","){
            c = 0
            a.push(val[i])
        }
    }
    if(temp == 1){
        a.splice(0,1)
        a[0] = a[0]*(-1)
    }
    console.log(a);
    for(let i = a.length ; i > -1 ; i--){
        if(a[i] == 's' || a[i] == 'S'){
            a[i] = Math.pow(+a[i+2],1/2)
            a.splice(i+1,3)
        }
        else if(a[i] == 'n' || a[i] == 'N'){
            a[i] = Math.pow(+a[i+2],1/(a[i+4]))
            a.splice(i+1,5)
        }
    }
    noBrack(a,a.length-1);
}
function noBrack(a,start){
    console.log(a);
    let open = [] , close = [] ;
    // 66+5+7*(2*(5-3)+(6+8)/2)*3+5-7
    // [66,"+",5,"+",7,"*","(",2,"*","(",5,"-",3,")","+","(",6,"+",8,")","/",2,")","*",3,"+",5,"-",7]
    for(let i = start ; i > -1 ; i--){
        if(a[i] == cb && a[Math.max(0,i-2)] == ob){
            a.splice(i,1);
            a.splice(i-2,1);
        }
        else if(a[i] == cb){
            close.push(i)
        }
        else if(a[i] == ob){
            open.push(i)
        }
        if(close.length >= open.length && open.length > 0 && close.length > 0){
            // console.log(open[open.length-1],close[close.length-1]);
            a.splice(close[close.length-1],1)
            console.log("its a " + a);
            // console.log("initializing loop"+close[close.length-1],open[open.length-1]);
            loop(open[open.length-1],close[close.length-1])
            close = []
            open = []
            start = a.length-1
        }
    }
    if (a.includes(ob) || a.includes(cb)){
        noBrack(a,a.length-1)
    }
    else if(a.length == 1){
        console.log("first result " + a)
        ans.innerHTML = (a[0].toFixed(5))
    }
    else{
        console.log("entering non bracket section");
        loop(-1,a.length)
        console.log("second " + a);
        ans.innerHTML = (a[0].toFixed(5))
    }
}
function loop(i,j){
    let check = 0 ;
    for(let m = 0 ; m < op.length ; m++){
        for(let k = i+1 ; k <= j-1 ; k++){
            // console.log("loop -=> "+ i  + " "+j);
            if(a[k]===op[m]){
                // console.log("k,j "+k + " "+j);
                console.log(a);
                // console.log("-=>>"+a[k]+i+" "+k+" "+j);
                if(a[k-2] == '-'){
                    a[k-1] = perform(a[k-1],a[k+1],op[m],false)
                }
                // else if(a[k-2] == '+'){
                //     a[k-1] = perform(a[k-1],a[k+1],op[m],false)
                // }
                else{
                    a[k-1] = perform(a[k-1],a[k+1],op[m])
                }
                a.splice(k+1,1);
                a.splice(k,1);
                check++;
                // k=k-2
                // console.log("k,j "+k + " "+j);
                console.log(a);
                k = i+1 ;
                j-=2 ;
            }
        }
        // if(check > 0){
        //     j = j - (2*check)
        //     check = 0
        // }
    }
    if(a[i] == ob){
        a.splice(i,1)
    }
}
function perform(x=0,y=0,ope,tf = true){
    switch (ope) {
        case "+": 
                if(tf){
                    return x+y
                        }
                else{
                    return x-y
                }
        case "-": 
                if(tf){
                    return x-y
                        }
                else{
                    return x+y
                }
        case "*": return x*y
        case "^": return x**y
        case "/": return x/y
        default:
            break;
    }
}

// perform(2,3,'^')
// let a = [6,'*',2,')',4,'+',4,'-',2]
// console.log(a.includes(cb));
// loop(0,8,a)
// let x = "52+6-4/2*3/++55++";
// a.splice(2,3)
// console.log(a);
// 6+5+((2*3+1)-(3*2+1))*3+10/5 = 19.00000
// (5*2+7-2^4-8)+(5+6-7*2+3^4-50+1) = 22.00000
// 56+(4*6/2+12)/(45/15*6/2-6)*2+7 = 79.00000
// 5+6*((4/2*3+1)-(6-2-2/1)*3)*2/4+1 = 9.00000
// 4/4/4/4 = 0.06250
