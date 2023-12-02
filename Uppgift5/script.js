let playlist;
let play_time;
let play_progress;
let play_length;

function init() {
	playlist = document.getElementById("playlist");
	play_time = document.getElementById("play-time");
	play_progress = document.getElementById("play-progress");
	play_length = document.getElementById("play-length");

	on_play_progress();
}

function format_time(time) {
	const hrs = ~~(time / 3600);
	const mins = ~~((time % 3600) / 60);
	const secs = ~~time % 60;

	let ret = "";

	if (hrs > 0) ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
	if (mins > 0) ret += "" + mins + ":" + (secs < 10 ? "0" : "");
	ret += "" + secs;

	return ret;
}

function on_play_progress() {
	let percentage = (play_progress.value / play_progress.max) * 100;
	let time = format_time(play_progress.value);

	play_progress.style.setProperty("--progress", `${percentage}%`);
	play_time.innerHTML = time;
}
