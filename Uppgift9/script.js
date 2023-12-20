let canvas
let resizeObserver
let requestAnimation

let inputs

let clock_setting = {
	back: {
		color: "#fff",
		hour: { color: "#000", start: 0.8, end: 0.9, width: 0.01 },
		minute: { color: "#666", start: 0.85, end: 0.9, width: 0.005 },
		number: {
			color: "#000",
			distance: 0.7,
			size: 0.15,
			font: "system-ui",
		},
	},
	hour: {
		color: "#f55e5e",
		length: 0.7,
		width: 0.03,
		base: 0.03,
	},
	minute: {
		color: "#0090ff",
		length: 0.8,
		width: 0.02,
		base: 0.02,
	},
	second: {
		color: "#000",
		length: 0.88,
		width: 0.01,
		base: 0.01,
	},
}

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
			color: "#fff",
			hour: {
				color: document.getElementById("hour-marks-color"),
				start: document.getElementById("hour-marks-start"),
				end: document.getElementById("hour-marks-end"),
				width: document.getElementById("hour-marks-width"),
			},
			minute: {
				color: document.getElementById("minute-marks-color"),
				start: document.getElementById("minute-marks-start"),
				end: document.getElementById("minute-marks-end"),
				width: document.getElementById("minute-marks-width"),
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
		},
		minute: {
			color: document.getElementById("minute-color"),
			length: document.getElementById("minute-length"),
			width: document.getElementById("minute-width"),
			base: document.getElementById("minute-base"),
		},
		second: {
			color: document.getElementById("second-color"),
			length: document.getElementById("second-length"),
			width: document.getElementById("second-width"),
			base: document.getElementById("second-base"),
		},
	}

	resize_canvas()
	update_vars()
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
	const date = new Date()

	const time =
		(date.getHours() +
			(date.getMinutes() +
				(date.getSeconds() + date.getMilliseconds() / 1000) / 60) /
				60) /
		24

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
		hour = { color: "#000", start: 0.8, end: 0.9, width: 0.01 },
		minute = { color: "#666", start: 0.85, end: 0.9, width: 0.005 },
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

	if (minute != null) {
		const minute_step = ((Math.PI / 180) * 360) / 12 / 5

		ctx.save()
		ctx.lineCap = "round"
		ctx.strokeStyle = minute.color
		ctx.lineWidth = minute.width

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

	if (minute != null) {
		const hour_step = ((Math.PI / 180) * 360) / 12

		ctx.save()
		ctx.lineCap = "round"
		ctx.strokeStyle = hour.color
		ctx.lineWidth = hour.width

		for (let i = 0; i < 12; i++) {
			ctx.beginPath()
			ctx.moveTo(0, hour.start)
			ctx.lineTo(0, hour.end)
			ctx.stroke()

			ctx.rotate(hour_step)
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

function draw_hand(
	ctx,
	time,
	{
		color = "#000",
		length = 0.9,
		width = 0.005,
		base = 0.01,
		timescale = 1440,
	}
) {
	ctx.save()

	ctx.strokeStyle = color
	ctx.lineWidth = width
	ctx.lineCap = "round"

	ctx.rotate(Math.PI * 2 * time * timescale)

	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(0, -length)
	ctx.stroke()

	ctx.fillStyle = color

	ctx.beginPath()
	ctx.arc(0, 0, base, 0, Math.PI * 2, true)
	ctx.fill()

	ctx.restore()
}
