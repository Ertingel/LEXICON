window.onload = () => {
	const firstName = document.getElementById("first-name")
	const lastName = document.getElementById("last-name")

	const username = document.getElementById("username")
	const email = document.getElementById("email")

	const password = document.getElementById("password")
	const confirmPassword = document.getElementById("confirm-password")

	const blockWhiteSpace = function (e) {
		if (e.which === 32) return false
		console.log(e)
	}

	const stripWhiteSpace = function (e) {
		console.log(e)

		e.preventDefault()

		this.value = this.value.replace(/\s/g, "")
	}

	firstName.onkeydown = blockWhiteSpace
	firstName.onpaste = stripWhiteSpace

	lastName.onkeydown = blockWhiteSpace
	lastName.onpaste = stripWhiteSpace

	username.onkeydown = blockWhiteSpace
	username.onpaste = stripWhiteSpace
}
