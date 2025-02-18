export const calculateAverage = (
	data1: number[],
	data2: number[]
): number[] => {
	return data1.map((value, index) => (value + data2[index]) / 2)
}

export const drawCircles = (
  ctx: CanvasRenderingContext2D,
  months: Date[],
  companyData: number[],
  lowRiskData: number[],
  midRiskData: number[],
  midHighRiskData: number[],
  highRiskData: number[],
  highestRiskData: number[],
  padding: number,
  xStep: number,
  yMin: number,
  yMax: number,
  height: number
) => {
  for (let i = 0; i < months.length; i++) {
    const x = padding + i * xStep
    const y = height - padding - ((companyData[i] - yMin) / (yMax - yMin)) * (height - 2 * padding)

    // Determine the closest risk level
    const differences = [
      Math.abs(companyData[i] - lowRiskData[i]),
      Math.abs(companyData[i] - midRiskData[i]),
      Math.abs(companyData[i] - midHighRiskData[i]),
      Math.abs(companyData[i] - highRiskData[i]),
      Math.abs(companyData[i] - highestRiskData[i]),
    ]
    const minDifference = Math.min(...differences)
    const closestRiskIndex = differences.indexOf(minDifference)

    // Determine the color and direction based on the trend
    let color = "black"
    let angle = 0
    if (closestRiskIndex === 0) {
      color = companyData[i] < lowRiskData[i] ? "green" : companyData[i] > lowRiskData[i] ? "red" : "orange"
      angle = companyData[i] < lowRiskData[i] ? 0 : companyData[i] > lowRiskData[i] ? 180 : 90
    } else if (closestRiskIndex === 1) {
      color = companyData[i] < midRiskData[i] ? "green" : companyData[i] > midRiskData[i] ? "red" : "orange"
      angle = companyData[i] < midRiskData[i] ? 0 : companyData[i] > midRiskData[i] ? 180 : 90
    } else if (closestRiskIndex === 2) {
      color = companyData[i] < midHighRiskData[i] ? "green" : companyData[i] > midHighRiskData[i] ? "red" : "orange"
      angle = 120
    } else if (closestRiskIndex === 3) {
      color = companyData[i] < highRiskData[i] ? "green" : companyData[i] > highRiskData[i] ? "red" : "orange"
      angle = 45
    } else if (closestRiskIndex === 4) {
      color = companyData[i] < highestRiskData[i] ? "green" : companyData[i] > highestRiskData[i] ? "red" : "orange"
      angle = 45
    }

    // Draw the larger circle with reduced opacity
    ctx.fillStyle = color
    ctx.globalAlpha = 0.2
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, 2 * Math.PI)
    ctx.fill()

    // Draw the smaller circle with full opacity
    ctx.globalAlpha = 1
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fill()

    // Draw the arrow
    drawArrow(ctx, x - 6, y - 25, angle, color)
  }
}

const drawArrow = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  color: string
) => {
  const length = 16
  const headLength = 5
  const radians = (angle * Math.PI) / 180

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(radians)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, -length)
  ctx.lineTo(-headLength, -length + headLength)
  ctx.moveTo(0, -length)
  ctx.lineTo(headLength, -length + headLength)
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.restore()
}

export const drawHorizontalLine = (
	ctx: CanvasRenderingContext2D,
	months: Date[],
	data: number[],
	padding: number,
	xStep: number,
	yMin: number,
	yMax: number,
	height: number,
	color: string
) => {
	ctx.beginPath()
	ctx.setLineDash([3, 2])
	ctx.moveTo(
		padding,
		height -
			padding -
			((data[0] - yMin) / (yMax - yMin)) * (height - 2 * padding)
	)

	for (let i = 1; i < months.length; i++) {
		const x = padding + i * xStep
		const y =
			height -
			padding -
			((data[i] - yMin) / (yMax - yMin)) * (height - 2 * padding)
		ctx.lineTo(x, y)
	}

	ctx.strokeStyle = color
	ctx.lineWidth = 1
	ctx.stroke()
	ctx.setLineDash([])
}

export const drawVerticalLines = (
	ctx: CanvasRenderingContext2D,
	months: Date[],
	padding: number,
	xStep: number,
	height: number
) => {
	ctx.beginPath()
	ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"
	ctx.lineWidth = 1

	for (let i = 1; i < months.length - 1; i++) {
		// Skip the first and last month
		const x = padding + i * xStep
		ctx.moveTo(x, padding)
		ctx.lineTo(x, height - padding)
	}

	ctx.stroke()
}

export const drawAverageLine = (
	ctx: CanvasRenderingContext2D,
	months: Date[],
	data1: number[],
	data2: number[],
	padding: number,
	xStep: number,
	yMin: number,
	yMax: number,
	height: number
) => {
	ctx.beginPath()
	const avgY = (data1[0] + data2[0]) / 2
	ctx.moveTo(
		padding,
		height - padding - ((avgY - yMin) / (yMax - yMin)) * (height - 2 * padding)
	)

	for (let i = 1; i < months.length; i++) {
		const x = padding + i * xStep
		const avgY = (data1[i] + data2[i]) / 2
		const y =
			height -
			padding -
			((avgY - yMin) / (yMax - yMin)) * (height - 2 * padding)
		ctx.lineTo(x, y)
	}

	ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"
	ctx.lineWidth = 1
	ctx.stroke()
}

export const fillArea = (
	ctx: CanvasRenderingContext2D,
	months: Date[],
	data1: number[],
	data2: number[],
	padding: number,
	xStep: number,
	yMin: number,
	yMax: number,
	height: number,
	color: string
) => {
	ctx.beginPath()
	ctx.moveTo(
		padding,
		height -
			padding -
			((data1[0] - yMin) / (yMax - yMin)) * (height - 2 * padding)
	)

	for (let i = 1; i < months.length; i++) {
		const x = padding + i * xStep
		const y =
			height -
			padding -
			((data1[i] - yMin) / (yMax - yMin)) * (height - 2 * padding)
		ctx.lineTo(x, y)
	}

	for (let i = months.length - 1; i >= 0; i--) {
		const x = padding + i * xStep
		const y =
			height -
			padding -
			((data2[i] - yMin) / (yMax - yMin)) * (height - 2 * padding)
		ctx.lineTo(x, y)
	}

	ctx.closePath()
	ctx.fillStyle = color
	ctx.fill()
}

export const drawRiskLabel = (
	ctx: CanvasRenderingContext2D,
	data: number[],
	padding: number,
	yMin: number,
	yMax: number,
	height: number,
	color: string,
	label: string
) => {
	const yStart =
		height -
		padding -
		((data[0] - yMin) / (yMax - yMin)) * (height - 2 * padding)
	const yEnd =
		height -
		padding -
		((data[data.length - 1] - yMin) / (yMax - yMin)) * (height - 2 * padding)

	ctx.fillStyle = color
	ctx.textAlign = "right"
	ctx.textBaseline = "middle"
	ctx.font = "13px Arial"
	ctx.fillText(label.toUpperCase(), padding - 10, yStart)

	ctx.textAlign = "left"
	ctx.fillText(label.toUpperCase(), ctx.canvas.width - padding + 10, yEnd)
}
