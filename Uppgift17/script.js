// 1
const numbers = [0, 1]
for (let i = 2; i < 10; i++) numbers.push(numbers[i - 2] + numbers[i - 1])
console.log(numbers)

// 2
const numbers2 = numbers.map(e => e * 3)
console.log(numbers2)

// 3
const numbers3 = numbers.filter(e => e % 2 == 0)
console.log(numbers3)

// 4
const sum = numbers.reduce((acc, e) => acc + e, 0)
console.log("sum", sum)

// 5
numbers.filter(e => e % 3 == 0).forEach(e => console.log("Found", e))

// 6
const numbers4 = numbers.filter((e, i) => i < numbers.length - 1)
console.log(numbers4)

// 7
const highest = numbers.map(e => e).sort((a, b) => b - a)[0]
console.log("Highest", highest)

// 8
const clone = numbers.map(e => e)
console.log(clone)

// 9
while (clone.length > 0) clone.pop()
console.log(clone)
