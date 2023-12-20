let canvas
let resizeObserver
let requestAnimation

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

	resize_canvas()
})

function update() {
	const date = new Date()

	const time =
		(date.getHours() +
			(date.getMinutes() +
				(date.getSeconds() + date.getMilliseconds() / 1000) / 60) /
				60) /
		24

	draw_clock(canvas, time)

	window.cancelAnimationFrame(requestAnimation)
	requestAnimation = window.requestAnimationFrame(event => {
		update()
	})
}

function draw_clock(canvas, time) {
	let ctx = canvas.getContext("2d")

	ctx.save()
	ctx.scale(canvas.width / 2, canvas.height / 2)
	ctx.translate(1, 1)

	draw_back(ctx, time, "#fff")
	draw_marks(ctx, time, {
		hour: { color: "#000", start: 0.8, end: 0.9, width: 0.01 },
		minute: { color: "#666", start: 0.85, end: 0.9, width: 0.005 },
	})

	draw_hand(ctx, time, {
		color: "#f55e5e",
		length: 0.7,
		width: 0.03,
		base: 0.03,
		timescale: 2,
	})
	draw_hand(ctx, time, {
		color: "#0090ff",
		length: 0.8,
		width: 0.02,
		base: 0.02,
		timescale: 24,
	})
	draw_hand(ctx, time, {
		color: "#000",
		length: 0.88,
		width: 0.01,
		base: 0.01,
		timescale: 24 * 60,
	})

	ctx.restore()
}

function draw_back(ctx, time, color = "#fff") {
	ctx.save()

	ctx.fillStyle = color

	ctx.beginPath()
	ctx.arc(0, 0, 1, 0, Math.PI * 2, true)
	ctx.fill()

	ctx.restore()
}

function draw_marks(
	ctx,
	time,
	{
		hour = { color: "#000", start: 0.8, end: 0.9, width: 0.01 },
		minute = { color: "#666", start: 0.85, end: 0.9, width: 0.005 },
		text = { color: "#000", distance: 0.7, size: 0.15, font: "serif" },
	}
) {
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

	if (text != null) {
		ctx.save()

		ctx.strokeStyle = text.color
		ctx.font = `${text.size}px ${text.font}`
		ctx.textAlign = "center"
		ctx.textBaseline = "alphabetic"

		for (let i = 1; i <= 12; i++) {
			let x = Math.sin((Math.PI / 6) * i) * text.distance
			let y =
				-Math.cos((Math.PI / 6) * i) * text.distance + text.size * 0.35
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
