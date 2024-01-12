const numbers = [2, 6, 12, 7, 22, 35]
console.log(numbers)

// 1
const first = numbers[0]
console.log("first", first)

// 2
const last = numbers[numbers.length - 1]
console.log("last", last)

// 3
const fourth = numbers[3]
console.log("fourth", fourth)

// 4
const second = numbers[1]
const fifth = numbers[4]

const arr = [second, fifth]
console.log("arr", arr)

// 5
const length = numbers.length
console.log("length", length)

// 6
const push = numbers.push(13)
console.log("push", push, numbers)

// 7
const unshift = numbers.unshift(13)
console.log("unshift", unshift, numbers)

// 8
const pop = numbers.pop()
console.log("pop", pop, numbers)

// 9
const shift = numbers.shift()
console.log("shift", shift, numbers)

// 10
console.log(numbers)
