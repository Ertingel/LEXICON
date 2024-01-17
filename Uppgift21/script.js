class School {
	constructor(name, students = [], teachers = [], subjets = []) {
		this.name = name
		this.students = students
		this.teachers = teachers
		this.subjets = subjets
	}
}

class Subject {
	constructor(name, students = [], teacher = null) {
		this.name = name

		this.students = []
		students.forEach(s => this.add_student(s))

		this.set_teacher(teacher)
	}

	add_student(student) {
		this.students.push(student)
		student.subjects.push(this)

		return this
	}

	remove_student(student) {
		this.students = this.students.filter(s => s != student)
		student.subjets = student.subjects.filter(s => s != this)

		return this
	}

	set_teacher(teacher) {
		if (teacher) teacher.subjects = teacher.subjects.filter(s => s != this)

		if (teacher) {
			this.teacher = teacher
			teacher.subjects.push(this)
		} else this.teacher = null

		return this
	}
}

class Student {
	constructor(name, age, gender, subjects = []) {
		this.name = name
		this.age = age
		this.gender = gender

		this.subjects = []
		subjects.forEach(s => this.add_subject(s))
	}

	add_subject(subject) {
		if (subject) subject.add_student(this)
		return this
	}

	remove_subject(subject) {
		if (subject) subject.remove_student(this)
		return this
	}
}

class Teacher {
	constructor(name, subjects = []) {
		this.name = name

		this.subjects = []
		subjects.forEach(s => this.add_subject(s))
	}

	add_subject(subject) {
		if (subject) subject.set_teacher(this)
		return this
	}

	remove_subject(subject) {
		if (subject) if (subject.teacher === this) subject.set_teacher(null)
		return this
	}
}

let school1 = new School(
	"School1",
	[
		new Student("Student1", 11, "male"),
		new Student("Student2", 12, "female"),
		new Student("Student3", 13, "male"),
		new Student("Student4", 14, "female"),
		new Student("Student5", 15, "male"),
	],
	[new Teacher("Teacher1"), new Teacher("Teacher2")],
	[new Subject("Subject1"), new Subject("Subject2"), new Subject("Subject3")]
)

school1.students[0].add_subject(school1.subjets[0])
school1.students[1].add_subject(school1.subjets[0])
school1.students[2].add_subject(school1.subjets[0])
school1.teachers[0].add_subject(school1.subjets[0])

school1.subjets[1].add_student(school1.students[2])
school1.subjets[1].add_student(school1.students[3])
school1.subjets[1].add_student(school1.students[4])
school1.subjets[1].set_teacher(school1.teachers[1])

school1.subjets[2].add_student(school1.students[0])
school1.subjets[2].add_student(school1.students[2])
school1.subjets[2].add_student(school1.students[4])
school1.subjets[2].set_teacher(school1.teachers[0])

console.log(school1)
