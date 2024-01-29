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

window.onload = () => {
	const playlist_title = document.getElementById("playlist-title")
	const list = document.getElementById("playlist")

	function addPlaylistSong({ artist, song, audio_file, cover_file }) {
		const li = make(list, "li", {
			artist,
			song,
			audio_file: `./media/${audio_file}`,
			cover_file: `./media/${cover_file}`,
		})
		const button = make(li, "button", {})

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
