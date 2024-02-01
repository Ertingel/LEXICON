let playlist = {
	title: "Rock",
	songs: [
		{
			artist: "Modern Pitch",
			song: "Boys, Girls, Toys & Words",
			audio_file: "Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.mp3",
			cover_file: "Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.jpg",
		},
		{
			artist: "Scream Inc",
			song: "Higher And Higher",
			audio_file: "Higher_And_Higher_-_Scream_Inc._(3).mp3",
			cover_file: "Higher_And_Higher_-_Scream_Inc._(3).jpg",
		},
		{
			artist: "All My Friends Hate Me",
			song: "Not My Problem",
			audio_file: "Not_My_Problem_-_All_My_Friends_Hate_Me.mp3",
			cover_file: "Not_My_Problem_-_All_My_Friends_Hate_Me.jpg",
		},
		{
			artist: "Hot Fiction",
			song: "Old News",
			audio_file: "Old_News_-_Hot_Fiction.mp3",
			cover_file: "Old_News_-_Hot_Fiction.jpg",
		},
		{
			artist: "Kinematic",
			song: "Peyote",
			audio_file: "Peyote_-_Kinematic.mp3",
			cover_file: "Peyote_-_Kinematic.jpg",
		},
		{
			artist: "VITNE",
			song: "Say Goodbye",
			audio_file: "Say_Goodbye_-_VITNE.mp3",
			cover_file: "Say_Goodbye_-_VITNE.jpg",
		},
	],
}

function make(parent, type, { id, class: class_, ...data }) {
	const e = document.createElement(type)

	if (id) e.id = id
	if (class_) {
		if (typeof class_ === "string") e.classList.add(class_)
		else e.classList.add(...class_)
	}
	if (data) for (const [key, value] of Object.entries(data)) e[key] = value
	if (parent) parent.appendChild(e)

	return e
}

function timeToStr(time) {
	return `${Math.floor((time / 60) % 60)}:${String(
		Math.floor(time % 60)
	).padStart(2, "0")}`
}

window.onload = () => {
	const background1 = document.getElementById("background1")
	const background2 = document.getElementById("background2")

	const playlist_title = document.getElementById("playlist-title")
	const list = document.getElementById("playlist")

	const album_cover = document.getElementById("album-cover")
	const title = document.getElementById("title")
	const favorite = document.getElementById("favorite")

	const play_time = document.getElementById("play-time")
	const play_progress = document.getElementById("play-progress")
	const length = document.getElementById("length")

	const repeat = document.getElementById("repeat")
	const rewind = document.getElementById("rewind")
	const play_pause = document.getElementById("play-pause")
	const forward = document.getElementById("forward")
	const shuffle = document.getElementById("shuffle")

	const audio = document.getElementById("audio")

	let playing = null
	let is_repeat = false
	let is_shuffle = false

	function play(bool) {
		if (playing)
			if (bool) {
				playing.icon.innerText = "pause_circle"
				play_pause.innerText = "pause_circle"
				audio.play()
			} else {
				playing.icon.innerText = "play_circle"
				play_pause.innerText = "play_circle"
				audio.pause()
			}
	}

	function setSong(song) {
		if (playing) {
			if (song === playing) return play(audio.paused)

			playing.icon.innerText = "play_circle"
			playing.classList.remove("playing")
		}
		playing = song
		playing.classList.add("playing")

		album_cover.src = playing.cover_file

		background2.style.setProperty(
			"background-image",
			background1.style.getPropertyValue("background-image")
		)

		background1.style.setProperty(
			"background-image",
			`url("${playing.cover_file}")`
		)

		//background1.classList.remove("transition")
		background1.animate([{ opacity: "0" }, { opacity: "1" }], {
			duration: 1000,
		})

		title.innerHTML = `${playing.artist}<br /><small>${playing.song}</small>`
		audio.src = playing.audio_file
		favorite.classList.toggle("active", playing.favorite)

		play(true)
	}

	function playPrev() {
		if (audio.currentTime < 1 && playing.prev) setSong(playing.prev)
		else if (is_repeat) {
			let e = playing

			while (e.next) e = e.next

			setSong(e)
		} else {
			audio.currentTime = 0
			play(true)
		}
	}

	function playNext() {
		if (playing.next) setSong(playing.next)
		else if (is_repeat) {
			let e = playing

			while (e.prev) e = e.prev

			setSong(e)
		} else {
			audio.currentTime = audio.duration
			play(false)
		}
	}

	favorite.onclick = () => {
		if (!playing) return

		playing.favorite = !playing.favorite
		favorite.classList.toggle("active", playing.favorite)
	}

	audio.onloadedmetadata = () => {
		play_progress.max = Math.floor(audio.duration)
		length.innerText = timeToStr(audio.duration)
	}

	audio.ontimeupdate = () => {
		play_time.innerText = timeToStr(audio.currentTime)
		play_progress.value = audio.currentTime
		play_progress.style.setProperty(
			"--progress",
			`${(play_progress.value / play_progress.max) * 100}%`
		)
	}

	audio.onended = () => {
		playNext()
	}

	play_progress.oninput = () => {
		audio.currentTime = play_progress.value
	}

	repeat.onclick = () => {
		is_repeat = !is_repeat
		repeat.classList.toggle("active", is_repeat)
	}

	rewind.onclick = () => {
		playPrev()
	}

	play_pause.onclick = () => {
		play(audio.paused)
	}

	forward.onclick = () => {
		playNext()
	}

	shuffle.onclick = () => {
		is_shuffle = !is_shuffle
		shuffle.classList.toggle("active", is_shuffle)
	}

	function addPlaylistSong({
		artist,
		song,
		audio_file,
		cover_file,
		favorite = false,
	}) {
		const li = make(list, "li", {
			artist,
			song,
			audio_file: `./media/${audio_file}`,
			cover_file: `./media/${cover_file}`,
			favorite,
		})
		const button = make(li, "button", {
			onclick: () => {
				setSong(li)
			},
		})

		make(button, "img", { src: li.cover_file })
		make(button, "p", {
			innerHTML: `${artist}<br /><small>${song}</small>`,
		})

		li.icon = make(button, "div", {
			class: "material-icons",
			innerText: "play_circle",
		})

		return li
	}

	playlist_title.innerText = `Playlist - ${playlist.title}`
	let prev = null
	playlist.songs.forEach(e => {
		let li = addPlaylistSong(e)

		if (prev) {
			li.prev = prev
			prev.next = li
		}

		prev = li
	})
}
