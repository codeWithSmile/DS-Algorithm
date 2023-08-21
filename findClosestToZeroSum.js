const n = [1, 60, -10, 70, -80, 85]
function findClosestToZeroSum(arr) {
    arr.sort((a, b) => (a - b));

    let minSum = Infinity;
    let result = [];

    for (let i = 0; i < arr.length - 1; i++) {
        const sum = arr[i] + arr[i + 1];
        if (Math.abs(sum) < minSum) {
            minSum = Math.abs(sum);
            result = [arr[i], arr[i + 1]];
        }
    }

    return result;
}
const result = findClosestToZeroSum(n);
console.log(result);