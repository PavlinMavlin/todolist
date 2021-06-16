//console.log("wwwww")

function minMax(arr){
    let arg=[]
    for(let i=0;i<arr.length;i++){
        arg[i]=arr[i]
    }
let min=arg[0];
    let max = min;
    for (i = 1; i < arg.length; ++i) {
        if (arg[i] > max) max = arg[i];
        if (arg[i] < min) min = arg[i];
    }



    return [min,max];

     // fix me!
}

minMax([1,2,3,4,5])  // [1,5]
//minMax([2334454,5])   // [5, 2334454]
//minMax([1])           // [1, 1]

console.log(minMax([1,2,3,4,5]))
