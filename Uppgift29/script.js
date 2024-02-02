function randomWord() {
	return wordlist[Math.floor(Math.random() * wordlist.length)]
}

window.onload = () => {
	const hangman = document.getElementById("hangman")
	const gueses = document.getElementById("gueses")
	const text = document.getElementById("word")

	let state, word, cars, guess, current_guess

	function update() {
		const wrong = new Set()
		const correct = new Set()
		guess.forEach(e => {
			if (cars.has(e)) correct.add(e)
			else wrong.add(e)
		})

		if (wrong.size >= hangman.children.length) state = "lose"
		else if (correct.size >= cars.size) state = "win"

		document.body.classList.toggle("lose", state === "lose")
		document.body.classList.toggle("win", state === "win")

		gueses.innerHTML = Array.from(wrong)
			.map(c =>
				c === current_guess ? `<span class="highlight">${c}</span>` : c
			)
			.join(" ")

		if (state === "play")
			text.innerHTML = Array.from(word)
				.map(c =>
					correct.has(c)
						? `<p${
								c === current_guess ? ' class="highlight"' : ""
						  }>${c}</p$>`
						: "<p></p>"
				)
				.join("")
		else
			text.innerHTML = Array.from(word)
				.map(
					c =>
						`<p${
							correct.has(c) ? ' class="highlight"' : ""
						}>${c}</p$>`
				)
				.join("")

		Array.from(hangman.children).forEach((e, i) =>
			e.classList.toggle("visible", i < wrong.size)
		)
	}

	function newGame() {
		word = randomWord().toUpperCase()
		cars = new Set(word)
		guess = new Set()

		state = "play"

		update()
	}

	document.onkeyup = e => {
		if (state != "play") {
			newGame()
			return
		}

		const key = e.key.toUpperCase()

		if (!/^[A-Z]$/gu.test(key)) return

		current_guess = key
		guess.add(key)

		update()
	}

	newGame()
}
