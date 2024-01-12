// 1
function greeting() {
	alert("Hello there my friend! ")
}

// 2
function greetingWithName(name) {
	alert(`Hello there my friend! You must be ${name}! `)
}

// 3
function addition(a, b) {
	let res = a + b
	console.log(res)
	return res
}

// 4
function division(a, b) {
	if (b == 0) {
		console.error("Can not divide by 0! ")
		return NaN
	}

	let res = a / b
	console.log(res)
	return res
}

// 5
function area(a, b) {
	let res = a * b
	console.log(`The area of box with dimentions ${a}x${b} is ${res}. `)
	return res
}

// 6
function greetingWithNameAgain(firstName, lastName) {
	alert(`Hello ${firstName} ${lastName}! How are you doing? `)
}

// 7
function distanceConverter(kilometres) {
	let miles = kilometres * 0.621371
	console.log(`${kilometres} kilometres is ${miles} miles. `)
	return miles
}

// 8
function temperatureConverter(celsius) {
	let fahrenheit = (celsius * 9.0) / 5.0 + 32.0
	console.log(`${celsius}°C celsius is ${fahrenheit}°F fahrenheit. `)
	return fahrenheit
}

// 9
function meanValue(arr) {
	let mean = arr.reduce((acc, e) => acc + e, 0) / arr.length
	console.log(`The mean of ${arr} is ${mean}. `)
	return mean
}

// 10
function systembolaget(age) {
	if (age < 15) alert("Get out of here!")
	else if (age < 18) alert("Sorry, you are not old enough")
	else if (age < 20)
		alert("Sorry, you must be atleast 20. Why don't you try a bar instead?")
	else if (age <= 80) alert("Thank you! Welcome!")
	else alert("I'm sorry, where is your caretaker?")
}

// 11
function sum(arr) {
	let sum = arr.reduce((acc, e) => acc + e, 0)
	console.log(`The sum of ${arr} is ${sum}. `)
	return sum
}

// 12
function listAPersonsSkills(person) {
	person.skills.array.forEach((skill) => {
		console.log(`Person ${person.name} has the skill \"${skill}\". `)
	})
}
