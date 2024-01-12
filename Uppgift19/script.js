// 1
const person = {
	name: "John",
	age: 12,
	city: "New York",
}

// 2
console.log(person.name)
console.log(person.age)
console.log(person.city)

// 3
person.age += 1
person.email = "JohnSmith@gmail.com"

console.log(person)

// 4
const car = {
	make: "Ford",
	model: "Civic",
	details: function () {
		console.log(`A ${this.model} made by ${this.make}. `)
	},
}

car.details()

// 5
Object.entries(person).forEach(([key, value]) => console.log(key, value))

// 6
const student = {
	...person,
	subjects: {
		math: "D",
		science: "C",
		english: "B",
	},
}

// 7
student.subjects.science = "B"

// 8
const book_list = [
	{ title: "Irrfan Khan: A Life in Movies", Author: "Shubhra Gupta" },
	{
		title: "The World: A Family History",
		Author: "British historian Simon Sebag Montefiore",
	},
	{
		title: "Breaking Barriers: the Story of a Dalit Chief Secretary",
		Author: "Kaki Madhava Rao",
	},
	{ title: "Ambedkar: A Life", Author: "Shashi Tharoor" },
	{ title: "Human Anatomy", Author: "Dr. Ashvini Kumar Dwivedi" },
	{
		title: "Revolutionaries: The Other Story of How India Won Its Freedom",
		Author: "Sanjeev Sanyal",
	},
]

// 9
book_list.forEach(({ title, Author }) => console.log(`"${title}" by ${Author}`))
