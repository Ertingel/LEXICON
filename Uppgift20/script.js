// 1
let lexicon = {
	name: "lexicon",
	address: "Klarabergsviadukten 70",
	zipcode: "Box 863, 101 37",
	city: "STOCKHOLM",
	students: [],
	teachers: [],
	subjects: [],
}

// 2
lexicon.subjects.push({
	name: "matematik",
	students: [],
	teacher: {},
})

lexicon.subjects.push({
	name: "svenska",
	students: [],
	teacher: {},
})

lexicon.subjects.push({
	name: "historia",
	students: [],
	teacher: {},
})

// 3
lexicon.students.push({
	name: "student1",
	age: 12,
	gender: "male",
	subjects: [],
})

lexicon.students.push({
	name: "student2",
	age: 13,
	gender: "male",
	subjects: [],
})

lexicon.students.push({
	name: "student3",
	age: 12,
	gender: "female",
	subjects: [],
})

lexicon.students.push({
	name: "student4",
	age: 11,
	gender: "female",
	subjects: [],
})

lexicon.students.push({
	name: "student5",
	age: 12,
	gender: "male",
	subjects: [],
})

// 4
lexicon.teachers.push({
	name: "teacher1",
	subjects: [],
})

lexicon.teachers.push({
	name: "teacher2",
	subjects: [],
})

// 5
/*
lexicon.teachers[0].subjects.push(matematik)
console.log(lexicon.teachers[0])
*/

// 6
/*
lexicon.subjects[0].students.push(student1)
console.log(lexicon.subjects[0])
*/

// 7
function add_teacher(teacher, subject) {
	teacher.subjects.push(subject)
	subject.teacher = teacher
}

// 8
lexicon.teachers.forEach(teacher => {
	teacher.add_subject = function (subject) {
		add_teacher(this, subject)
		return this
	}
})

lexicon.teachers[1].add_subject(lexicon.subjects[1])
console.log(lexicon.teachers[1])

// 9
function add_student(student, subject) {
	student.subjects.push(subject)
	subject.students.push(student)
}

lexicon.students.forEach(student => {
	student.add_subject = function (subject) {
		add_student(this, subject)
		return this
	}
})

lexicon.subjects.forEach(subject => {
	subject.add_student = function (student) {
		add_student(student, this)
		return this
	}

	subject.add_teacher = function (teacher) {
		add_teacher(teacher, this)
		return this
	}
})

// 10
lexicon.teachers[0].add_subject(lexicon.subjects[0])
lexicon.subjects[1].add_teacher(lexicon.teachers[0])
lexicon.subjects[2].add_teacher(lexicon.teachers[1])

lexicon.students[0].add_subject(lexicon.subjects[0])
lexicon.students[1].add_subject(lexicon.subjects[0])
lexicon.students[2].add_subject(lexicon.subjects[0])

lexicon.subjects[1].add_student(lexicon.students[2])
lexicon.subjects[1].add_student(lexicon.students[3])
lexicon.subjects[1].add_student(lexicon.students[4])

lexicon.subjects[2].add_student(lexicon.students[0])
lexicon.subjects[2].add_student(lexicon.students[2])
lexicon.subjects[2].add_student(lexicon.students[4])

console.log(lexicon.subjects[0])
console.log(lexicon.subjects[1])
console.log(lexicon.subjects[2])

// 11
function remove_teacher(teacher, subject) {
	teacher.subjects = teacher.subjects.filter(e => e != subject)
	subject.teacher = {}
}

function remove_student(student, subject) {
	student.subjects = student.subjects.filter(e => e != subject)
	subject.students = subject.students.filter(e => e != student)
}

lexicon.teachers.forEach(teacher => {
	teacher.remove_subject = function (subject) {
		remove_teacher(this, subject)
		return this
	}
})

lexicon.students.forEach(student => {
	student.remove_subject = function (subject) {
		remove_student(this, subject)
		return this
	}
})

lexicon.subjects.forEach(subject => {
	subject.remove_teacher = function (teacher) {
		remove_teacher(teacher, this)
		return this
	}

	subject.remove_student = function (teacher) {
		remove_student(teacher, this)
		return this
	}
})

// 12
lexicon.subjects[2].remove_student(lexicon.students[2])
console.log(lexicon.subjects[2])

lexicon.teachers[0].remove_subject(lexicon.subjects[0])
console.log(lexicon.teachers[0])

// 13
// Allready done.

// 14
lexicon.print_students = function () {
	return this.students.map(s => s.name).join("\n")
}

console.log(lexicon.print_students())

// 15
lexicon.print_teachers = function () {
	return this.teachers.map(s => s.name).join("\n")
}

lexicon.print_subjects = function () {
	return this.subjects.map(s => s.name).join("\n")
}

lexicon.subjects.forEach(subject => {
	subject.print_students = function () {
		return this.students.map(s => s.name).join("\n")
	}
})

lexicon.students.forEach(student => {
	student.print_subjects = function () {
		return this.subjects.map(s => s.name).join("\n")
	}
})

lexicon.teachers.forEach(teacher => {
	teacher.print_subjects = function () {
		return this.subjects.map(s => s.name).join("\n")
	}
})

console.log(lexicon.subjects[0].print_students())
console.log(lexicon.students[0].print_subjects())
console.log(lexicon.teachers[0].print_subjects())
