// 1
let lexicon = {
	name: "lexicon",
	address: "Klarabergsviadukten 70",
	zipcode: "Box 863, 101 37",
	city: "STOCKHOLM",
	students: [],
	teachers: [],
}

// 2
let matematik = {
	name: "matematik",
	students: [],
	teacher: {},
}

let svenska = {
	name: "svenska",
	students: [],
	teacher: {},
}

let historia = {
	name: "historia",
	students: [],
	teacher: {},
}

// 3
let student1 = {
	name: "student1",
	age: 12,
	gender: "male",
	subjects: [],
}

let student2 = {
	name: "student2",
	age: 13,
	gender: "male",
	subjects: [],
}

let student3 = {
	name: "student3",
	age: 12,
	gender: "female",
	subjects: [],
}

let student4 = {
	name: "student4",
	age: 11,
	gender: "female",
	subjects: [],
}

let student5 = {
	name: "student5",
	age: 12,
	gender: "male",
	subjects: [],
}

// 4
let teacher1 = {
	name: "teacher1",
	subjects: [],
}

let teacher2 = {
	name: "teacher2",
	subjects: [],
}

// 5
//teacher1.subjects.push(matematik)
//console.log(teacher1)

// 6
//matematik.students.push(student1)
//console.log(matematik)

// 7
function add_teacher(teacher, subject) {
	teacher.subjects.push(subject)
	subject.teacher = teacher
}

// 8
teacher1.add_subject = function (subject) {
	add_teacher(this, subject)
	return this
}

teacher2.add_subject = function (subject) {
	add_teacher(this, subject)
	return this
}

teacher2.add_subject(svenska)
console.log(teacher2)

// 9
function add_student(student, subject) {
	student.subjects.push(subject)
	subject.students.push(student)
}

student1.add_subject = function (subject) {
	add_student(this, subject)
	return this
}

student2.add_subject = function (subject) {
	add_student(this, subject)
	return this
}

student3.add_subject = function (subject) {
	add_student(this, subject)
	return this
}

student4.add_subject = function (subject) {
	add_student(this, subject)
	return this
}

student5.add_subject = function (subject) {
	add_student(this, subject)
	return this
}

matematik.add_student = function (student) {
	add_student(student, this)
	return this
}

matematik.add_teacher = function (teacher) {
	add_teacher(teacher, this)
	return this
}

svenska.add_student = function (student) {
	add_student(student, this)
	return this
}

svenska.add_teacher = function (teacher) {
	add_teacher(teacher, this)
	return this
}

historia.add_student = function (student) {
	add_student(student, this)
	return this
}

historia.add_teacher = function (teacher) {
	add_teacher(teacher, this)
	return this
}

// 10
teacher1.add_subject(matematik)
historia.add_teacher(teacher1)

student1.add_subject(matematik)
student2.add_subject(matematik)
student3.add_subject(matematik)

svenska.add_student(student3)
svenska.add_student(student4)
svenska.add_student(student5)

historia.add_student(student1)
historia.add_student(student3)
historia.add_student(student5)

console.log(matematik)
console.log(svenska)
console.log(historia)
