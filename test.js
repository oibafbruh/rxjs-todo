// a = 1;
// b = 0;

// //Swap function without any intermediate vars
// console.log(a,b);
// a = a^b;
// b = a^b;
// a = a^b;
// console.log(a,b);

console.time("timer");

n=100;

console.log(n);
const c = [];

for(let i=0; i<n; i++) {
    c[i] = Math.floor(Math.random() * (n + 1));
};
console.log(c);

const mean = c.reduce((sum, x) => sum + x, 0) / c.length;

const variance = c.reduce((sum, x) => sum + Math.pow(x-mean, 2), 0) /c.length;

const stdDev = Math.sqrt(variance);

console.log("Mean = " + mean + ", stdDev = " + stdDev);

const expectedMean = n / 2;
const expectedStdDev = n / Math.sqrt(12);

const meanErrorPercent = ((expectedMean - mean) / expectedMean) * 100;
const stdDevErrorPercent = ((expectedStdDev - stdDev) / expectedStdDev) * 100;

console.log("Mean error (%) = " + meanErrorPercent);
console.log("StdDev error (%) = " + stdDevErrorPercent);

const memory = process.memoryUsage();
console.log("Memory usage:");
console.log(`RSS: ${memory.rss} bytes`);
console.log(`Heap Total: ${memory.heapTotal} bytes`);
console.log(`Heap Used: ${memory.heapUsed} bytes`);
console.log(`External: ${memory.external} bytes`);
console.timeEnd("timer");