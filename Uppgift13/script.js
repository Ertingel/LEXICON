// 1
const user_name = prompt("What is your name? ")
console.log(`The name is ${user_name}. `)
alert(`Hello ${user_name}. `)

// 2
let user_age = prompt("What is your birth year? ")
// 3
const curent_year = new Date().getFullYear()
user_age = curent_year - user_age

console.log(`The age is ${user_age}. `)
alert(`You are ${user_age} years old. `)

// 4
let a = prompt("What is A? ")
let b = prompt("What is B? ")
console.log(`A is ${a} and B is ${b}. `)

// 5
a = parseFloat(a) || a
b = parseFloat(b) || b

console.log(`A is ${a} and B is ${b}. `)

const add = a + b
const sub = a - b
const mul = a * b
const div = a / b

console.log(`${a} + ${b} = ${add} 
${a} - ${b} = ${sub} 
${a} * ${b} = ${mul} 
${a} / ${b} = ${div} `)

// 6
alert(`${a} + ${b} = ${add} 
${a} - ${b} = ${sub} 
${a} * ${b} = ${mul} 
${a} / ${b} = ${div} `)
