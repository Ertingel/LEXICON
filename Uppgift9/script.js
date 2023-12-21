let canvas
let resizeObserver
let requestAnimation

let inputs

let clock_setting

window.addEventListener("DOMContentLoaded", event => {
	canvas = document.getElementById("analog-clock")

	const resize_canvas = event => {
		canvas.width = Math.round(
			window.getComputedStyle(canvas).width.replace("px", "")
		)
		canvas.height = Math.round(
			window.getComputedStyle(canvas).height.replace("px", "")
		)

		update()
	}

	resizeObserver = new ResizeObserver(resize_canvas).observe(canvas)

	inputs = {
		back: {
			color: document.getElementById("back-color"),
			hour: {
				color: document.getElementById("hour-marks-color"),
				start: document.getElementById("hour-marks-start"),
				end: document.getElementById("hour-marks-end"),
				width: document.getElementById("hour-marks-width"),
				style: document.getElementById("hour-marks-style"),
			},
			minute: {
				color: document.getElementById("minute-marks-color"),
				start: document.getElementById("minute-marks-start"),
				end: document.getElementById("minute-marks-end"),
				width: document.getElementById("minute-marks-width"),
				style: document.getElementById("minute-marks-style"),
			},
			number: {
				color: document.getElementById("number-marks-color"),
				distance: document.getElementById("number-marks-distance"),
				size: document.getElementById("number-marks-size"),
				font: document.getElementById("number-marks-font"),
			},
		},
		hour: {
			color: document.getElementById("hour-color"),
			length: document.getElementById("hour-length"),
			width: document.getElementById("hour-width"),
			base: document.getElementById("hour-base"),
			animation: document.getElementById("hour-animation"),
			style: document.getElementById("hour-style"),
		},
		minute: {
			color: document.getElementById("minute-color"),
			length: document.getElementById("minute-length"),
			width: document.getElementById("minute-width"),
			base: document.getElementById("minute-base"),
			animation: document.getElementById("minute-animation"),
			style: document.getElementById("minute-style"),
		},
		second: {
			color: document.getElementById("second-color"),
			length: document.getElementById("second-length"),
			width: document.getElementById("second-width"),
			base: document.getElementById("second-base"),
			animation: document.getElementById("second-animation"),
			style: document.getElementById("second-style"),
		},
		text: {
			color: document.getElementById("time-text-color"),
			x: document.getElementById("time-text-x"),
			y: document.getElementById("time-text-y"),
			size: document.getElementById("time-text-size"),
			font: document.getElementById("time-text-font"),
			text: document.getElementById("time-text-text"),
		},
	}

	update_vars()
	resize_canvas()
})

function update_vars() {
	const map_inputs = input => {
		let out = {}

		Object.keys(input).forEach(key => {
			if (
				typeof input[key] !== "object" ||
				Array.isArray(input[key]) ||
				input[key] === null
			) {
				out[key] = input[key]
				return
			}

			if (input[key].nodeType == null) {
				out[key] = map_inputs(input[key])
				return
			}

			if (
				!isNaN(input[key].value) &&
				!isNaN(parseFloat(input[key].value))
			) {
				out[key] = parseFloat(input[key].value)
				return
			}

			out[key] = input[key].value
		})

		return out
	}

	clock_setting = map_inputs(inputs)

	update()
}

function update() {
	const time = new Date()

	draw_clock(canvas, time, clock_setting)

	window.cancelAnimationFrame(requestAnimation)
	requestAnimation = window.requestAnimationFrame(event => {
		update()
	})
}

function draw_clock(canvas, time, params) {
	let ctx = canvas.getContext("2d")

	ctx.save()
	ctx.scale(canvas.width / 2, canvas.height / 2)
	ctx.translate(1, 1)

	if (params.back != null) draw_back(ctx, time, params.back)
	if (params.text != null) draw_text(ctx, time, params.text)

	if (params.hour != null)
		draw_hand(ctx, time, {
			...params.hour,
			timescale: 2,
		})
	if (params.minute != null)
		draw_hand(ctx, time, {
			...params.minute,
			timescale: 24,
		})
	if (params.second != null)
		draw_hand(ctx, time, {
			...params.second,
			timescale: 24 * 60,
		})

	ctx.restore()
}

function draw_back(
	ctx,
	time,
	{
		color = "#ffffff",
		hour = {
			color: "#000",
			start: 0.8,
			end: 0.9,
			width: 0.01,
			style: "round",
		},
		minute = {
			color: "#666",
			start: 0.85,
			end: 0.9,
			width: 0.005,
			style: "round",
		},
		number = {
			color: "#000",
			distance: 0.7,
			size: 0.15,
			font: "system-ui",
		},
	}
) {
	if (color != null) {
		ctx.save()

		ctx.fillStyle = color

		ctx.beginPath()
		ctx.arc(0, 0, 1, 0, Math.PI * 2, true)
		ctx.fill()

		ctx.restore()
	}

	if (hour != null && hour.style != "none") {
		const hour_step = ((Math.PI / 180) * 360) / 12

		ctx.save()
		ctx.strokeStyle = hour.color
		ctx.lineWidth = hour.width
		ctx.lineCap = hour.style

		for (let i = 0; i < 12; i++) {
			ctx.beginPath()
			ctx.moveTo(0, hour.start)
			ctx.lineTo(0, hour.end)
			ctx.stroke()

			ctx.rotate(hour_step)
		}

		ctx.restore()
	}

	if (minute != null && minute.style != "none") {
		const minute_step = ((Math.PI / 180) * 360) / 12 / 5

		ctx.save()
		ctx.strokeStyle = minute.color
		ctx.lineWidth = minute.width
		ctx.lineCap = minute.style

		for (let i = 0; i < 60; i++) {
			if (i % 5 != 0) {
				ctx.beginPath()
				ctx.moveTo(0, minute.start)
				ctx.lineTo(0, minute.end)
				ctx.stroke()
			}

			ctx.rotate(minute_step)
		}

		ctx.restore()
	}

	if (number != null) {
		ctx.save()

		ctx.fillStyle = number.color
		ctx.font = `${number.size}px ${number.font}`
		ctx.textAlign = "center"
		ctx.textBaseline = "alphabetic"

		for (let i = 1; i <= 12; i++) {
			let x = Math.sin((Math.PI / 6) * i) * number.distance
			let y =
				-Math.cos((Math.PI / 6) * i) * number.distance +
				number.size * 0.35
			ctx.fillText(i, x, y)
		}

		ctx.restore()
	}
}

function draw_text(
	ctx,
	time,
	{
		color = "#000000",
		x = 0,
		y = 0.5,
		size = 0.15,
		font = "system-ui",
		text = "hh:mm:ss",
	}
) {
	ctx.save()
	ctx.fillStyle = color
	ctx.font = `${size}px ${font}`
	ctx.textAlign = "center"
	ctx.textBaseline = "alphabetic"

	ctx.fillText(format_time(time, text), x, y + size * 0.35)

	ctx.restore()
}

function draw_hand(
	ctx,
	time,
	{
		color = "#000",
		length = 0.9,
		width = 0.005,
		base = 0.01,
		animation = "continuous",
		style = "round",
		timescale = 1440,
	}
) {
	if (style == "none") return

	ctx.save()

	ctx.strokeStyle = color
	ctx.fillStyle = color
	ctx.lineWidth = width
	ctx.lineCap = style

	const t =
		(time.getHours() +
			(time.getMinutes() +
				(time.getSeconds() + time.getMilliseconds() / 1000) / 60) /
				60) /
		24

	ctx.rotate(
		Math.PI * 2 * timescale * animation_styles[animation](t, timescale)
	)

	if (style == "pointy") {
		ctx.beginPath()
		ctx.moveTo(-width / 2.0, 0)
		ctx.lineTo(0, -length)
		ctx.lineTo(width / 2.0, 0)
		ctx.fill()
	} else {
		ctx.beginPath()
		ctx.moveTo(0, 0)
		ctx.lineTo(0, -length)
		ctx.stroke()
	}

	ctx.fillStyle = color

	ctx.beginPath()
	ctx.arc(0, 0, base, 0, Math.PI * 2, true)
	ctx.fill()

	ctx.restore()
}

const animation_styles = {
	continuous: (t, timescale) => t,
	discreet: (t, timescale) => {
		if (timescale < 24) return Math.floor(24 * t) / 24

		return Math.floor(timescale * 60 * t) / timescale / 60
	},

	discreet_mins: (t, timescale) => {
		if (timescale < 24) return Math.floor(24 * 5 * t) / 24 / 5

		return Math.floor(timescale * 60 * t) / timescale / 60
	},
}

const time_lookup = {
	month_full: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
	month_short: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	],
	weekday_full: [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	],
	weekday_short: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
}

/* https://doc.qt.io/qt-5/qml-qtqml-qt.html#formatDateTime-method */
function format_time(time, format) {
	const regex = /yyyy|yy|M{1,4}|d{1,4}|h{1,2}|m{1,2}|s{1,2}|zzz|z/gmu

	return format.replaceAll(regex, match => {
		if (match == "yyyy") return time.getFullYear()
		if (match == "yy") return String(time.getFullYear()).substring(2)
		if (match == "MMMM") return time_lookup.month_full[time.getMonth()]
		if (match == "MMM") return time_lookup.month_short[time.getMonth()]
		if (match == "MM") return String(time.getMonth()).padStart(2, "0")
		if (match == "M") return time.getMonth()

		if (match == "dddd") return time_lookup.weekday_full[time.getDay()]
		if (match == "ddd") return time_lookup.weekday_short[time.getDay()]
		if (match == "dd") return String(time.getDate()).padStart(2, "0")
		if (match == "d") return time.getDate()

		if (match == "hh") return String(time.getHours()).padStart(2, "0")
		if (match == "h") return time.getHours()
		if (match == "mm") return String(time.getMinutes()).padStart(2, "0")
		if (match == "m") return time.getMinutes()
		if (match == "ss") return String(time.getSeconds()).padStart(2, "0")
		if (match == "s") return time.getSeconds()

		if (match == "zzz") return
		String(time.getMilliseconds()).padStart(3, "0")
		if (match == "z") return time.getMilliseconds()

		return match
	})
}
