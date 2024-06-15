class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) {
        return Math.floor((index) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    heapifyUp() {
        let currentIndex = this.heap.length - 1; //last element which is added currently

        while (
            currentIndex > 0 &&
            this.heap[currentIndex] < this.heap[this.getParentIndex(currentIndex)] //curIndex is not root 
        ) {
            const parentIndex = this.getParentIndex(currentIndex); //loop is true thn swap of cur with parent
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
    }

    heapifyDown() {
        let currentIndex = 0;

        while (this.getLeftChildIndex(currentIndex) < this.heap.length) { //untill left child is there the will work - bcz heap must be a complete tree
            const leftChildIndex = this.getLeftChildIndex(currentIndex);
            const rightChildIndex = this.getRightChildIndex(currentIndex);
            let smallerChildIndex = leftChildIndex;

            if (
                rightChildIndex < this.heap.length &&
                this.heap[rightChildIndex] < this.heap[leftChildIndex]
            ) {
                smallerChildIndex = rightChildIndex;
            }

            if (this.heap[currentIndex] < this.heap[smallerChildIndex]) {  //jo cur add krre hai woh already smallest of this 2 children to break kr denge - that means heap is in right position
                break;
            }

            this.swap(currentIndex, smallerChildIndex);
            currentIndex = smallerChildIndex;
        }
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    extractMin() {                        //removeMin
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(); //to see whether the heap property is maintain or not? 
        return min;
    }

    peekMin() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    size() {
        return this.heap.length;
    }
}

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) {
        return Math.floor((index) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    heapifyUp() {
        let currentIndex = this.heap.length - 1;

        while (
            currentIndex > 0 &&
            this.heap[currentIndex] > this.heap[this.getParentIndex(currentIndex)]
        ) {
            const parentIndex = this.getParentIndex(currentIndex);
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
    }

    heapifyDown() {
        let currentIndex = 0;

        while (this.getLeftChildIndex(currentIndex) < this.heap.length) {
            const leftChildIndex = this.getLeftChildIndex(currentIndex);
            const rightChildIndex = this.getRightChildIndex(currentIndex);
            let largerChildIndex = leftChildIndex;

            if (
                rightChildIndex < this.heap.length &&
                this.heap[rightChildIndex] > this.heap[leftChildIndex]
            ) {
                largerChildIndex = rightChildIndex;
            }

            if (this.heap[currentIndex] > this.heap[largerChildIndex]) {
                break;
            }

            this.swap(currentIndex, largerChildIndex);
            currentIndex = largerChildIndex;
        }
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    extractMax() {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return max;
    }

    peekMax() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    size() {
        return this.heap.length;
    }
}

function maximumCapital(c, k, capitals, profits) {
    let currentCapital = c;
    let capitalsMinHeap = new MinHeap();
    let profitsMaxHeap = new MaxHeap();

    for (let i = 0; i < capitals.length; i++) {
        capitalsMinHeap.insert([capitals[i], i]);
    }

    for (let i = 0; i < k; i++) {
        // Choose projects with capital less than or equal to the current capital
        while (
            capitalsMinHeap.size() > 0 &&
            capitalsMinHeap.peekMin()[0] <= currentCapital
        ) {
            // Extract the project with the minimum capital and update currentCapital
            let element = capitalsMinHeap.extractMin();
            currentCapital = element[0];
            let j = element[1];
            // Insert the corresponding profit into the max heap
            profitsMaxHeap.insert([profits[j]]);
        }
        // If there are no more projects with capital less than or equal to currentCapital, break the loop
        if (profitsMaxHeap.size() == 0) {
            break;
        }
        // Choose the project with the maximum profit and update currentCapital
        let element = profitsMaxHeap.extractMax();
        let j = element[0];
        currentCapital = currentCapital + j;
    }

    return currentCapital;
}

function main() {
    const input = [
        [0, 1, [1, 1, 2], [1, 2, 3]],
        [1, 2, [1, 2, 2, 3], [2, 4, 6, 8]],
        [2, 3, [1, 3, 4, 5, 6], [1, 2, 3, 4, 5]],
        [1, 3, [1, 2, 3, 4], [1, 3, 5, 7]],
        [7, 2, [6, 7, 8, 10], [4, 8, 12, 14]],
        [2, 4, [2, 3, 5, 6, 8, 12], [1, 2, 5, 6, 8, 9]],
    ];

    for (let i = 0; i < input.length; i++) {
        console.log(i + 1 + ".\tProject capital requirements:\t", input[i][2]);
        console.log("\tProject expected profits:\t", input[i][3]);
        console.log("\tNumber of projects:\t\t", input[i][1]);
        console.log("\tStart-up capital:\t\t", input[i][0]);
        console.log(
            "\n\tMaximum capital earned:",
            maximumCapital(input[i][0], input[i][1], input[i][2], input[i][3])
        );
        console.log("-".repeat(100));
    }
}

main();
