function randomWord() {
	return wordlist[Math.floor(Math.random() * wordlist.length)]
}

window.onload = () => {
	const hangman = document.getElementById("hangman")
	const gueses = document.getElementById("gueses")
	const text = document.getElementById("word")

	let word = randomWord()

	text.innerHTML = Array.from(word)
		.map(c => `<p>${c}</p>`)
		.join("")
}
