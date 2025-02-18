import { useEffect, useRef } from "react"
import useDrawChart from "../../hooks/useDrawChart"
import { ChartData } from "../../types/chartDataTypes"
import "./LineChart.scss"

type LineChartProps = {
	data: ChartData
}

const LineChart = ({ data }: LineChartProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const drawChart = useDrawChart()

	useEffect(() => {
		const canvas = canvasRef.current
		if (canvas) {
			const ctx = canvas.getContext("2d")
			if (ctx) {
				drawChart(ctx, data)
			}
		}
	}, [data, drawChart])

	return (
		<canvas ref={canvasRef} className="risk-graph" width={1200} height={700} />
	)
}

export default LineChart
