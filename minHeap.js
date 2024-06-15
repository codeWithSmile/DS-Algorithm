class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Function to get the index of the parent of a node
    getParentIndex(index) {
        return Math.floor((index) / 2);
    }

    // Function to get the index of the left child of a node
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    // Function to get the index of the right child of a node
    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    // Function to swap two elements in the heap
    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    // Function to heapify up
    heapifyUp() {
        let currentIndex = this.heap.length - 1;

        while (
            currentIndex > 0 &&
            this.heap[currentIndex] < this.heap[this.getParentIndex(currentIndex)]
        ) {
            const parentIndex = this.getParentIndex(currentIndex);
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
    }

    // Function to heapify down
    heapifyDown() {
        let currentIndex = 0;

        while (this.getLeftChildIndex(currentIndex) < this.heap.length) {
            const leftChildIndex = this.getLeftChildIndex(currentIndex);
            const rightChildIndex = this.getRightChildIndex(currentIndex);
            let smallerChildIndex = leftChildIndex;

            if (
                rightChildIndex < this.heap.length &&
                this.heap[rightChildIndex] < this.heap[leftChildIndex]
            ) {
                smallerChildIndex = rightChildIndex;
            }

            if (this.heap[currentIndex] < this.heap[smallerChildIndex]) {
                break;
            }

            this.swap(currentIndex, smallerChildIndex);
            currentIndex = smallerChildIndex;
        }
    }

    // Function to insert a new element into the heap
    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    // Function to remove and return the minimum element from the heap
    extractMin() {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return min;
    }

    // Function to get the minimum element without removing it
    peekMin() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    // Function to check if the heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }

    // Function to get the size of the heap
    size() {
        return this.heap.length;
    }
}

// Example usage:
const minHeap = new MinHeap();

minHeap.insert(3);
minHeap.insert(1);
minHeap.insert(4);
minHeap.insert(2);
minHeap.insert(5);

console.log("Min Heap:", minHeap.heap);

console.log("Extract Min:", minHeap.extractMin());
console.log("Min Heap after extraction:", minHeap.heap);
