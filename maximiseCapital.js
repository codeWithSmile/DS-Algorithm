function findMaximumProfit(initialCapital, capitals, profits) {
    let newProfit = 0;
    let index = 0;
    for (let i = 0; i < capitals.length; i++) {
        if (capitals[i] <= initialCapital && profits[i] >= newProfit) {
            newProfit = profits[i];
            index = i;
        }
    }
    capitals.splice(index, 1)
    profits.splice(index, 1)
    console.log("capitals profit:", capitals, profits)
    return newProfit;
}
function findMaximiseCapital(initialCapital, project, capitals, profits) {
    for (let i = 0; i < project; i++) {
        let output = findMaximumProfit(initialCapital, capitals, profits);
        initialCapital = initialCapital + output; //12
        console.log(initialCapital)
    }
    return initialCapital;
}
const project = 2;
const initialCapital = 1;
const capitals = [1, 2, 2, 3]
const profits = [2, 4, 6, 8]
const maximumProfit = findMaximiseCapital(initialCapital, project, capitals, profits);
console.log("maximumProfit:", maximumProfit);


