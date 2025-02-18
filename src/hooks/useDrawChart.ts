import { useCallback } from "react"
import { COLORS } from "../lib/constants"
import {
  calculateAverage,
  drawAverageLine,
  drawCircles,
  drawHorizontalLine,
  drawRiskLabel,
  drawVerticalLines,
  fillArea,
} from "../lib/utils"
import { ChartData } from "../types/chartDataTypes"

const useDrawChart = () => {
	const drawChart = useCallback(
		(ctx: CanvasRenderingContext2D, data: ChartData) => {
			const {
				months,
				companyData,
				lowRiskData,
				midRiskData,
				midHighRiskData,
				highRiskData,
				highestRiskData,
			} = data
			const width = ctx.canvas.width
			const height = ctx.canvas.height
			const padding = 100
			const xStep = (width - 2 * padding) / (months.length - 1)
			const yMax = 100
			const yMin = 0

			ctx.clearRect(0, 0, width, height)

			// Calculate average lines
			const avgHighestHigh = calculateAverage(highestRiskData, highRiskData)
			const avgHighMidHigh = calculateAverage(highRiskData, midHighRiskData)
			const avgMidHighMid = calculateAverage(midHighRiskData, midRiskData)
			const avgMidLow = calculateAverage(midRiskData, lowRiskData)

			// Fill areas between average lines
			fillArea(
				ctx,
				months,
				avgHighestHigh,
				Array(months.length).fill(yMax),
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.AREA_HIGHEST
			)
			fillArea(
				ctx,
				months,
				avgHighMidHigh,
				avgHighestHigh,
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.AREA_HIGH
			)
			fillArea(
				ctx,
				months,
				avgMidHighMid,
				avgHighMidHigh,
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.AREA_MEDIUM_HIGH
			)
			fillArea(
				ctx,
				months,
				avgMidLow,
				avgMidHighMid,
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.AREA_MEDIUM
			)
			fillArea(
				ctx,
				months,
				Array(months.length).fill(yMin),
				avgMidLow,
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.AREA_LOW
			)

			drawHorizontalLine(
				ctx,
				months,
				companyData,
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.COMPANY_DATA
			)
      drawCircles(
        ctx,
        months,
        companyData,
        lowRiskData,
        midRiskData,
        midHighRiskData,
        highRiskData,
        highestRiskData,
        padding,
        xStep,
        yMin,
        yMax,
        height
      )
			drawHorizontalLine(
				ctx,
				months,
				lowRiskData,
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.LOW_RISK
			)
			drawHorizontalLine(
				ctx,
				months,
				midRiskData,
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.MEDIUM_RISK
			)
			drawHorizontalLine(
				ctx,
				months,
				midHighRiskData,
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.MEDIUM_HIGH_RISK
			)
			drawHorizontalLine(
				ctx,
				months,
				highRiskData,
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.HIGH_RISK
			)
			drawHorizontalLine(
				ctx,
				months,
				highestRiskData,
				padding,
				xStep,
				yMin,
				yMax,
				height,
				COLORS.HIGHEST_RISK
			)

			// Draw average lines between risk levels
			drawAverageLine(
				ctx,
				months,
				highestRiskData,
				highRiskData,
				padding,
				xStep,
				yMin,
				yMax,
				height
			)
			drawAverageLine(
				ctx,
				months,
				highRiskData,
				midHighRiskData,
				padding,
				xStep,
				yMin,
				yMax,
				height
			)
			drawAverageLine(
				ctx,
				months,
				midHighRiskData,
				midRiskData,
				padding,
				xStep,
				yMin,
				yMax,
				height
			)
			drawAverageLine(
				ctx,
				months,
				midRiskData,
				lowRiskData,
				padding,
				xStep,
				yMin,
				yMax,
				height
			)

			// Draw vertical lines for months
			drawVerticalLines(ctx, months, padding, xStep, height)

			// Draw x-axis labels at the top and bottom
			ctx.fillStyle = "black"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.font = "13px"
			for (let i = 0; i < months.length; i++) {
				const x = padding + i * xStep
				const yBottom = height - padding + 20
				const yTop = padding - 40
				const monthYear = months[i]
					.toLocaleString("default", { month: "short", year: "numeric" })
					.toUpperCase()
				const [month, year] = monthYear.split(" ")
				ctx.fillText(month, x, yBottom)
				ctx.fillText(year, x, yBottom + 16)
				ctx.fillText(month, x, yTop)
				ctx.fillText(year, x, yTop + 16)
			}

			// Draw risk level labels on the left and right sides
			drawRiskLabel(
				ctx,
				lowRiskData,
				padding,
				yMin,
				yMax,
				height,
				COLORS.LOW_RISK,
				"LOW"
			)
			drawRiskLabel(
				ctx,
				midRiskData,
				padding,
				yMin,
				yMax,
				height,
				COLORS.MEDIUM_RISK,
				"MEDIUM"
			)
			drawRiskLabel(
				ctx,
				midHighRiskData,
				padding,
				yMin,
				yMax,
				height,
				COLORS.MEDIUM_HIGH_RISK,
				"MEDIUM/HIGH"
			)
			drawRiskLabel(
				ctx,
				highRiskData,
				padding,
				yMin,
				yMax,
				height,
				COLORS.HIGH_RISK,
				"HIGH"
			)
			drawRiskLabel(
				ctx,
				highestRiskData,
				padding,
				yMin,
				yMax,
				height,
				COLORS.HIGHEST_RISK,
				"HIGHEST"
			)
		},
		[]
	)

	return drawChart
}

export default useDrawChart
