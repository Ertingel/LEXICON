const minPasswordLength = 8

window.onload = () => {
	const form = document.getElementById("account-registration")

	const firstName = document.getElementById("first-name")
	const lastName = document.getElementById("last-name")

	const username = document.getElementById("username")
	const email = document.getElementById("email")

	const password = document.getElementById("password")
	const confirmPassword = document.getElementById("confirm-password")

	const create = document.getElementById("create")

	const verify = function () {
		const fields = [firstName, lastName, username]
		const fieldsValid = fields.every(f => f.value.length > 0)

		const emailValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.value)
		email.classList.toggle("wrong", !emailValid && email.value.length > 0)

		const password1Valid = password.value.length >= minPasswordLength
		const password2Valid =
			confirmPassword.value.length >= minPasswordLength &&
			password.value === confirmPassword.value

		password.classList.toggle(
			"wrong",
			!password1Valid && password.value.length > 0
		)
		confirmPassword.classList.toggle(
			"wrong",
			!password2Valid && confirmPassword.value.length > 0
		)

		create.disabled = !(
			fieldsValid &&
			emailValid &&
			password1Valid &&
			password2Valid
		)
	}

	const keydown = function (e) {
		return !/\s/g.test(String.fromCharCode(e.which))
	}

	firstName.onkeydown = keydown
	lastName.onkeydown = keydown
	username.onkeydown = keydown
	email.onkeydown = keydown
	password.onkeydown = keydown
	confirmPassword.onkeydown = keydown

	const keyup = function (e) {
		verify()
	}

	firstName.onkeyup = keyup
	lastName.onkeyup = keyup
	username.onkeyup = keyup
	email.onkeyup = keyup
	password.onkeyup = keyup
	confirmPassword.onkeyup = keyup

	const change = function (e) {
		e.target.value = e.target.value.replace(/\s/g, "")
		verify()
	}

	firstName.onchange = change
	lastName.onchange = change
	username.onchange = change
	email.onchange = change
	password.onchange = change
	confirmPassword.onchange = change

	form.onsubmit = function (e) {
		const data = {
			firstName: firstName.value,
			lastName: lastName.value,
			username: username.value,
			email: email.value,
			password: password.value,
		}

		console.log(data)

		return false
	}
}
