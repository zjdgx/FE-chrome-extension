# (2019/01/28)[算法: 堆排序](https://www.qdfuns.com/article/50934/4c8778a8c03ca82964dba40e8ba294f7.html)

```javascript
// 获取左子节点下标
const leftChildIndex = i => 2 * i + 1

// 获取右子节点下标
const rightChildIndex = i => 2 * i + 2

// 交换数组中两个数的位置
const exchange = (array, i, j) => {
  let temp = array[i];
  array[i] = array[j]
  array[j] = temp
}

// 维护最大堆
const maintainMaxHeap = (array, i) => {
  let leftIndex = leftChildIndex(i)
  let rightIndex = rightChildIndex(i)
  let largestIndex = i

  if (leftIndex <= array.length && array[leftIndex] > array[i]) {
    largestIndex = leftIndex
  }

  if (rightIndex <= array.length && array[rightIndex] > array[largestIndex]) {
    largestIndex = rightIndex
  }

  if (largestIndex !== i) {
    exchange(array, i, largestIndex) // 交换位置
    maintainMaxHeap(array, largestIndex)
  }
}

/*
// 测试维护最大堆
let arr = [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]
maintainMaxHeap(arr, 1)
*/

// 建堆
const buildMaxHeap = (array) => {
  let halfIndex = Math.floor(array.length / 2)

  for (let i = halfIndex; halfIndex >= 0; halfIndex--) {
    maintainMaxHeap(array, halfIndex)
  }
}

/*// 测试建堆
let arr = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]
console.log(arr)
buildMaxHeap(arr)
console.log(arr)*/

// 堆排序
const heapSort = (array) => {
  let sortedArray = []
  let i = array.length - 1
  buildMaxHeap(array)

  for (; i >= 0; i--) {
    exchange(array, i, 0)
    sortedArray.unshift(array.pop())
    maintainMaxHeap(array, 0)
  }

  return sortedArray
}

// 测试堆排序
let arr = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]
console.log('end:')
console.log(heapSort(arr))
```