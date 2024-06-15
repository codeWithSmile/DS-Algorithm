const number = [1, 2, 3]

function permute(nums) {
    const result = [];

    function perm(arr) {
        if (arr.length === nums.length) {
            result.push(...arr);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (arr.includes(nums[i])) {
                continue;
            }
            arr.push(nums[i]);
            perm(arr);
            arr.pop();
        }
    }
    perm([]);
    return result;
}
console.log(permute(number));