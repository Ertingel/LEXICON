const minPasswordLength = 8

window.onload = () => {
	const firstName = document.getElementById("first-name")
	const lastName = document.getElementById("last-name")

	const username = document.getElementById("username")
	const email = document.getElementById("email")

	const password = document.getElementById("password")
	const confirmPassword = document.getElementById("confirm-password")

	const create = document.getElementById("create")

	const fields = [firstName, lastName, username, email]

	const verify = function (e) {
		const f = fields.every(f => f.value.length > 0)

		const p1 = password.value.length >= minPasswordLength
		const p2 =
			confirmPassword.value.length >= minPasswordLength &&
			password.value === confirmPassword.value

		password.classList.toggle("wrong", !p1 && password.value.length > 0)
		confirmPassword.classList.toggle(
			"wrong",
			!p2 && confirmPassword.value.length > 0
		)

		create.disabled = !(f && p1 && p2)
	}

	password.onchange = function (e) {
		verify()
	}

	confirmPassword.onchange = function (e) {
		verify()
	}

	const blockWhiteSpace = function (e) {
		return !/\s/g.test(String.fromCharCode(e.which))
	}

	firstName.onkeydown = blockWhiteSpace
	lastName.onkeydown = blockWhiteSpace
	username.onkeydown = blockWhiteSpace
	email.onkeydown = blockWhiteSpace

	const stripWhiteSpace = function (e) {
		e.target.value = e.target.value.replace(/\s/g, "")
		verify()
	}

	firstName.onchange = stripWhiteSpace
	lastName.onchange = stripWhiteSpace
	username.onchange = stripWhiteSpace
	email.onchange = stripWhiteSpace
}
