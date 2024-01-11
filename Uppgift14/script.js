// 6
alert("Hello. ")

// 1

let a = prompt("What is the value of A? ")
a = parseFloat(a) || a

// 2

let b = prompt("What is the value of B? ")
b = parseFloat(b) || b

// 3

let method = prompt(
	"Out of the following '+' '-' '*' '/' would you like to do with A and B? "
)

// 4

if (method === "+") alert(`The result of ${a} + ${b} is ${a + b}.`)
else if (method === "-") alert(`The result of ${a} - ${b} is ${a - b}.`)
else if (method === "*") alert(`The result of ${a} * ${b} is ${a * b}.`)
else if (method === "/") alert(`The result of ${a} / ${b} is ${a / b}.`)
// 5
else alert(`The method of ${method} is invalid.`)

// 6
alert("Good bye. ")
