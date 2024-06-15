const number = [1, 2, 3]
const target = 3;

function combination() {
    const result = [];

    function comb(start, arr, currentSum) {
        if (currentSum === target) {
            result.push(...arr);
            return;
        }

        for (let i = start; i <= nums.length; i++) {
            arr.push(nums[i]);
            comb(i + 1, arr, currentSum + nums[i]);
            arr.pop();
        }
    }
    comb(0, [], 0);
    return result;
}
console.log(combination());