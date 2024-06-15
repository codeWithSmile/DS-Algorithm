class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    extractMax() {
        if (this.size === 0) {
            return null;
        }

        const max = this.heap[0];
        const last = this.heap.pop();

        if (this.size > 0) {
            this.heap[0] = last;
            this.heapifyDown();
        }

        return max;
    }

    heapifyUp() {
        let index = this.size - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] > this.heap[parentIndex]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown() {
        let index = 0;

        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let largest = index;

            if (leftChild < this.size && this.heap[leftChild] > this.heap[largest]) {
                largest = leftChild;
            }

            if (rightChild < this.size && this.heap[rightChild] > this.heap[largest]) {
                largest = rightChild;
            }

            if (largest !== index) {
                this.swap(index, largest);
                index = largest;
            } else {
                break;
            }
        }
    }

    peek() {
        return this.size > 0 ? this.heap[0] : null;
    }

    get size() {
        return this.heap.length;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

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

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

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

class MedianFinder {
    constructor() {
        this.minHeap = new MinHeap(); // right half
        this.maxHeap = new MaxHeap(); // left half
    }

    addNum(num) {
        this.maxHeap.insert(num);

        this.minHeap.insert(this.maxHeap.extractMax());

        if (this.maxHeap.size < this.minHeap.size) {
            this.maxHeap.insert(this.minHeap.extractMin());
        }
    }

    findMedian() {
        if (this.maxHeap.size === this.minHeap.size) {
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        } else {
            return this.maxHeap.peek();
        }
    }
}
const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
medianFinder.addNum(4)
medianFinder.addNum(3);
medianFinder.addNum(5);
medianFinder.addNum(6);
console.log(medianFinder.findMedian());