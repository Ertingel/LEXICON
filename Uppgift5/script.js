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
	const playlist_title = document.getElementById("playlist-title")
	const list = document.getElementById("playlist")

	const album_cover = document.getElementById("album-cover")
	const title = document.getElementById("title")

	const play_time = document.getElementById("play-time")
	const play_progress = document.getElementById("play-progress")
	const length = document.getElementById("length")

	const play_pause = document.getElementById("play-pause")
	const audio = document.getElementById("audio")

	let playing = null

	function setSong(song) {
		if (playing) playing.classList.remove("playing")

		playing = song
		playing.classList.add("playing")

		album_cover.src = playing.cover_file
		title.innerHTML = `${playing.artist}<br /><small>${playing.song}</small>`
		audio.src = playing.audio_file
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

	play_progress.oninput = () => {
		audio.currentTime = play_progress.value
	}

	play_pause.onclick = () => {
		if (playing) {
			if (audio.paused) audio.play()
			else audio.pause()
		}
	}

	function addPlaylistSong({ artist, song, audio_file, cover_file }) {
		const li = make(list, "li", {
			artist,
			song,
			audio_file: `./media/${audio_file}`,
			cover_file: `./media/${cover_file}`,
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
		make(button, "div", {
			class: "material-icons",
			innerText: "play_circle",
		})
	}

	playlist_title.innerText = `Playlist - ${playlist.title}`
	playlist.songs.forEach(e => addPlaylistSong(e))
}
