function randomWord() {
	return wordlist[Math.floor(Math.random() * wordlist.length)]
}

window.onload = () => {
	const hangman = document.getElementById("hangman")
	const gueses = document.getElementById("gueses")
	const text = document.getElementById("word")

	let state, word, cars, guess, current_guess

	function redraw() {
		console.log(word, cars, guess)

		const wrong = new Set()
		const correct = new Set()
		guess.forEach(e => {
			if (cars.has(e)) correct.add(e)
			else wrong.add(e)
		})

		gueses.innerHTML = Array.from(wrong)
			.map(c =>
				c === current_guess ? `<span class="highlight">${c}</span>` : c
			)
			.join(" ")

		text.innerHTML = Array.from(word)
			.map(c =>
				correct.has(c)
					? `<p${
							c === current_guess ? ' class="highlight"' : ""
					  }>${c}</p$>`
					: "<p></p>"
			)
			.join("")
	}

	function newGame() {
		word = randomWord().toUpperCase()
		cars = new Set(word)
		guess = new Set()

		state = "play"

		redraw()
	}

	document.onkeyup = e => {
		const key = e.key.toUpperCase()

		if (!/^[A-Z]$/gu.test(key)) return

		current_guess = key
		guess.add(key)

		redraw()
	}

	newGame()
}
