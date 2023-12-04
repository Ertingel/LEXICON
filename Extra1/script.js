let player

let playlist
let playlist_count = 1
let playing

let play_time
let play_progress
let play_length

let shuffle
let rewind
let play_pause
let forward
let repeat

let playlist_array = [
	{ title: "Test", length: 3 },
	{ title: "Lily of the Valley", length: 396 },
	{ title: "Before Summer", length: 241 },
	{ title: "Immutable", length: 249 },
	{ title: "CONFRONT", length: 248 },
	{ title: "Lily of the Valley", length: 396 },
	{ title: "Before Summer", length: 241 },
	{ title: "Immutable", length: 249 },
	{ title: "CONFRONT", length: 248 },
	{ title: "Lily of the Valley", length: 396 },
	{ title: "Before Summer", length: 241 },
	{ title: "Immutable", length: 249 },
	{ title: "CONFRONT", length: 248 },
]

function init() {
	player = document.getElementById("player")

	playlist = document.getElementById("playlist")

	play_time = document.getElementById("play-time")
	play_progress = document.getElementById("play-progress")
	play_length = document.getElementById("play-length")

	shuffle = document.getElementById("shuffle")
	rewind = document.getElementById("rewind")
	play_pause = document.getElementById("play-pause")
	forward = document.getElementById("forward")
	repeat = document.getElementById("repeat")

	fill_playlist()

	on_play_progress()
}

function fill_playlist() {
	playlist_array.forEach((entry) => add_playlist_entry(entry.title, entry.length))
}

function format_time(time) {
	const hrs = ~~(time / 3600)
	const mins = ~~((time % 3600) / 60)
	const secs = ~~time % 60

	let ret = ""

	if (hrs > 0) ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
	if (mins > 0) ret += "" + mins + ":" + (secs < 10 ? "0" : "")
	ret += "" + secs

	return ret
}

function add_playlist_entry(title, length) {
	let element = document.createElement("li")
	element.innerHTML = `
		<p class="number">
			<span class="index">${playlist_count++}</span>
			<span class="play material-symbols-rounded">play_circle</span>
			<span class="pause material-symbols-rounded">pause_circle</span>
		</p>
		<p class="name">${title}</p>
		<time class="length">${format_time(length)}</time>
	`

	element.onclick = () => on_playlist(element)

	element.song_title = title
	element.song_length = length

	playlist.appendChild(element)
}

function on_playlist(element) {
	let old = document.getElementById("playing")

	if (element === old) {
		on_play_pause()
		return
	}

	if (old != null) old.id = ""

	element.id = "playing"

	play_progress.max = element.song_length
	play_length.innerHTML = format_time(element.song_length)
	set_play_progress(0)

	set_play_pause(true)

	element.scrollIntoView({
		behavior: "auto",
		block: "nearest",
	})
}

function set_play_progress(value) {
	play_progress.value = value
	on_play_progress()
}

function on_play_progress() {
	let percentage = (play_progress.value / play_progress.max) * 100

	play_progress.style.setProperty("--progress", `${percentage}%`)
	play_time.innerHTML = format_time(play_progress.value)
}

function on_shuffle() {
	shuffle.classList.toggle("active")
}

function on_fast_rewind() {
	let old = document.getElementById("playing")
	if (old == null) return

	if (play_progress.value > 0) set_play_progress(0)
	else if (old.previousElementSibling != null && old.previousElementSibling.tagName == "LI")
		on_playlist(old.previousElementSibling)
}

function set_play_pause(value) {
	if (player.classList.contains("playing") != value) on_play_pause()
}

function on_play_pause() {
	player.classList.toggle("playing")
}

function on_fast_forward() {
	let old = document.getElementById("playing")
	if (old == null) return

	if (old.nextElementSibling != null && old.nextElementSibling.tagName == "LI") on_playlist(old.nextElementSibling)
}

function on_repeat() {
	repeat.classList.toggle("active")
}
