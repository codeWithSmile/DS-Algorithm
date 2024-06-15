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

// Example usage:
const maxHeap = new MaxHeap();

maxHeap.insert(3);
maxHeap.insert(1);
maxHeap.insert(4);
maxHeap.insert(2);
maxHeap.insert(5);

console.log("Max Heap:", maxHeap.heap);

console.log("Extract Max:", maxHeap.extractMax());
console.log("Max Heap after extraction:", maxHeap.heap);
