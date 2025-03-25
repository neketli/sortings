<script setup lang="ts">
import VCodeBlock from "@wdns/vue-code-block";

const props = defineProps<{
  type: string;
}>();

const descriptions = {
  bubble: {
    code: `
function bubbleSort(arr) {
    let len = arr.length;
    // Outer loop for the number of passes
    for (let i = 0; i < len; i++) {
        // Inner loop for comparing adjacent elements
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements using destructuring
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
	`,
    description: `A simple sorting algorithm that repeatedly steps through the array, comparing adjacent elements and swapping them if they are in the wrong order.
	<br/>

	<b>How it works:</b>
	
    <ul>
      <li>- Compares pairs of adjacent elements and "bubbles up" the larger element to the end of the array.</li>
      <li>- After each pass, the largest unsorted element is placed in its correct position.</li>
      <li>- Simple but inefficient for large arrays.</li>
    </ul>
`,

    complexity: `Time complexity: <b>O(n<sup>2</sup>)</b>; Space complexity: <b>O(1)</b>`,
  },
  gnome: {
    code: `
function gnomeSort(arr) {
    let index = 0;
    while (index < arr.length) {
        if (index === 0 || arr[index] >= arr[index - 1]) {
            index++; // Move forward if in correct order
        } else {
            // Swap with previous element and move back
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            index--;
        }
    }
    return arr;
}
    `,
    description: `A simple comparison-based sorting algorithm that moves elements into their correct positions by repeatedly comparing and swapping with the previous element.
    <br/>

    <b>How it works:</b>
    
    <ul>
      <li>- Starts at the beginning and compares the current element with the previous one.</li>
      <li>- If they are in the wrong order, swaps them and moves back to check earlier elements.</li>
      <li>- If in correct order, moves forward to the next element.</li>
      <li>- Continues until the entire array is sorted.</li>
      <li>- Intuitive but inefficient for large datasets.</li>
    </ul>
    `,
    complexity: `Time complexity: <b>O(n<sup>2</sup>)</b>; Space complexity: <b>O(1)</b>`,
  },
  shaker: {
    code: `
function shakerSort(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        // Move from left to right, bubbling up the largest element
        for (let i = left; i < right; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
        }
        right--; // Largest element is now at the end

        // Move from right to left, bubbling down the smallest element
        for (let i = right; i > left; i--) {
            if (arr[i] < arr[i - 1]) {
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            }
        }
        left++; // Smallest element is now at the start
    }
    return arr;
}
    `,
    description: `An improved version of Bubble Sort that sorts in both directions, moving the largest elements to the end and the smallest to the beginning in each pass.
    <br/>

    <b>How it works:</b>
    
    <ul>
      <li>- Starts by moving left to right, swapping adjacent elements to push the largest unsorted element to the end.</li>
      <li>- Then moves right to left, pushing the smallest unsorted element to the beginning.</li>
      <li>- Repeats this bidirectional process, shrinking the unsorted portion from both ends.</li>
      <li>- Faster than Bubble Sort for some cases but still inefficient for large arrays.</li>
    </ul>
    `,
    complexity: `Time complexity: <b>O(n<sup>2</sup>)</b>; Space complexity: <b>O(1)</b>`,
  },
  quick: {
    code: `
function quickSort(arr) {
    if (arr.length <= 1) return arr; // Base case

    const pivot = arr[Math.floor(arr.length / 2)]; // Pivot element (middle of the array)
    const left = []; // Elements less than the pivot
    const right = []; // Elements greater than the pivot
    const equal = []; // Elements equal to the pivot

    // Partition the array
    for (let element of arr) {
        if (element < pivot) left.push(element);
        else if (element > pivot) right.push(element);
        else equal.push(element);
    }

    // Recursively sort the left and right portions
    return [...quickSort(left), ...equal, ...quickSort(right)];
}
    `,
    description: `An efficient "divide and conquer" algorithm that selects a pivot element and partitions the array around it, recursively sorting the subarrays.
    <br/>

    <b>How it works:</b>
    
    <ul>
      <li>- Chooses a pivot element (e.g., the middle element).</li>
      <li>- Partitions the array into three groups: less than the pivot, equal to the pivot, and greater than the pivot.</li>
      <li>- Recursively applies the same process to the "less than" and "greater than" subarrays.</li>
      <li>- Combines the sorted subarrays with the equal elements.</li>
      <li>- Very fast on average, though worst-case performance depends on pivot choice.</li>
    </ul>
    `,
    complexity: `Time complexity: <b>O(n log n)</b> (average), <b>O(n<sup>2</sup>)</b> (worst); Space complexity: <b>O(n)</b> (or <b>O(log n)</b> in optimized versions)`,
  },
  merge: {
    code: `
function mergeSort(arr) {
    if (arr.length <= 1) return arr; // Base case

    // Split the array in half
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Recursively sort and merge
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Merge two arrays into one sorted array
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add remaining elements
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}
    `,
    description: `A stable "divide and conquer" algorithm that recursively splits the array into smaller parts, sorts them, and merges them back into a sorted array.
    <br/>

    <b>How it works:</b>
    
    <ul>
      <li>- Divides the array into two halves until each subarray has one element.</li>
      <li>- Merges pairs of subarrays by comparing elements and combining them in sorted order.</li>
      <li>- Continues merging until the entire array is sorted.</li>
      <li>- Consistent performance regardless of input, but requires extra memory.</li>
    </ul>
    `,
    complexity: `Time complexity: <b>O(n log n)</b>; Space complexity: <b>O(n)</b>`,
  },
  selection: {
    code: `
function selectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i; // Assume the current element is the minimum
        // Find the minimum element in the remaining unsorted portion
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap the current element with the found minimum
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}
    `,
    description: `A straightforward sorting algorithm that repeatedly selects the smallest element from the unsorted portion and places it at the beginning.
    <br/>

    <b>How it works:</b>
    
    <ul>
      <li>- Divides the array into sorted and unsorted portions.</li>
      <li>- Finds the minimum element in the unsorted portion and swaps it with the first unsorted element.</li>
      <li>- Expands the sorted portion with each iteration.</li>
      <li>- Simple to implement but inefficient for large datasets.</li>
    </ul>
    `,
    complexity: `Time complexity: <b>O(n<sup>2</sup>)</b>; Space complexity: <b>O(1)</b>`,
  },
  insertion: {
    code: `
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i]; // Current element to insert
        let j = i - 1; // Index of the last sorted element
        // Shift elements greater than current to the right
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current; // Place current in its correct position
    }
    return arr;
}
    `,
    description: `A simple algorithm that builds a sorted array one element at a time by inserting each element into its correct position within the sorted portion.
    <br/>

    <b>How it works:</b>
    
    <ul>
      <li>- Starts with the first element as the sorted portion.</li>
      <li>- Takes the next element and shifts larger elements in the sorted portion to make room.</li>
      <li>- Inserts the current element into its correct position.</li>
      <li>- Efficient for small or nearly sorted arrays, but slow for large random datasets.</li>
    </ul>
    `,
    complexity: `Time complexity: <b>O(n<sup>2</sup>)</b>; Space complexity: <b>O(1)</b>`,
  },
  radix: {
    code: `
function radixSort(arr) {
    // Find the maximum number to determine the number of digits
    const max = Math.max(...arr);
    let digitPlace = 1;

    // Process each digit place
    while (digitPlace <= max) {
        const buckets = Array.from({ length: 10 }, () => []);

        // Distribute elements into buckets based on current digit
        for (let num of arr) {
            const digit = Math.floor(num / digitPlace) % 10;
            buckets[digit].push(num);
        }

        // Collect elements from buckets back into the array
        arr = [].concat(...buckets);
        digitPlace *= 10;
    }
    return arr;
}
    `,
    description: `A non-comparative sorting algorithm that sorts integers by processing individual digits, grouping numbers by each digit place from least to most significant.
    <br/>

    <b>How it works:</b>
    
    <ul>
      <li>- Determines the maximum number to know how many digit places to process.</li>
      <li>- For each digit place (ones, tens, etc.), distributes numbers into buckets (0-9).</li>
      <li>- Collects numbers from buckets in order, then moves to the next digit place.</li>
      <li>- Efficient for large sets of integers, but requires extra space for buckets.</li>
    </ul>
    `,
    complexity: `Time complexity: <b>O(nk)</b> (where k is the number of digits in the largest number); Space complexity: <b>O(n + k)</b>`,
  },
  bogo: {
    code: `
function bogoSort(arr) {
    // Check if array is sorted
    function isSorted(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    }

    // Randomly shuffle array
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Keep shuffling until sorted
    while (!isSorted(arr)) {
        shuffle(arr);
    }
    return arr;
}
    `,
    description: `A highly inefficient and impractical sorting algorithm that randomly shuffles the array until it happens to be sorted.
    <br/>

    <b>How it works:</b>
    
    <ul>
      <li>- Checks if the array is sorted by comparing adjacent elements.</li>
      <li>- If not sorted, randomly shuffles all elements using a Fisher-Yates shuffle.</li>
      <li>- Repeats the process until the array is sorted by chance.</li>
      <li>- Theoretical worst-case time is unbounded; used mostly as a joke or educational example.</li>
    </ul>
    `,
    complexity: `Time complexity: <b>O(n × n!)</b> (average), <b>O(∞)</b> (worst); Space complexity: <b>O(1)</b>`,
  },
};

const active = ref(["code", "complexity", "description"]);
</script>

<template>
  <ElCollapse v-model="active">
    <ElCollapseItem title="Code" name="code">
      <VCodeBlock
        :code="descriptions[props.type as keyof typeof descriptions].code"
        highlightjs
        lang="javascript"
        persistent-copy-button
        theme="monokai"
      />
    </ElCollapseItem>
    <ElCollapseItem title="Complexity" name="complexity">
      <div
        v-html="
          descriptions[props.type as keyof typeof descriptions].complexity
        "
      />
    </ElCollapseItem>
    <ElCollapseItem title="Description" name="description">
      <div
        v-html="
          descriptions[props.type as keyof typeof descriptions].description
        "
      />
    </ElCollapseItem>
  </ElCollapse>
</template>
