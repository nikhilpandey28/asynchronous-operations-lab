console.log("Task 1");
console.log("Start");

const startTime = Date.now();

setTimeout(() => {
    console.log("Calculation Started");
    
    let sum = 0;

    for(let i = 0 ; i < 10000000 ; i++) {
        sum+=i;
    }

    console.log("Calculation Finished");
    console.log("Sum: " + sum);

    const endTime = Date.now();
    console.log("Time taken : " + (endTime - startTime) + "ms");
},1000);

console.log("End");