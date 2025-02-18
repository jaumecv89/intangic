import { ChartData } from "../types/chartDataTypes"

export const chartData: ChartData = {
	months: [
		new Date(2023, 1),
		new Date(2023, 2),
		new Date(2023, 3),
		new Date(2023, 4),
		new Date(2023, 5),
		new Date(2023, 6),
		new Date(2023, 7),
		new Date(2023, 8),
		new Date(2023, 9),
		new Date(2023, 10),
		new Date(2023, 11),
		new Date(2024, 0),
	],
	companyData: [55, 55, 56, 55, 55, 56, 57, 57, 57, 57, 58, 57],
	lowRiskData: [20, 22, 21, 20, 19, 21, 20, 20, 23, 19, 20, 23],
	midRiskData: [42, 40, 41, 40, 39, 40, 41, 40, 40, 39, 42, 41],
	midHighRiskData: [60, 60, 61, 60, 61, 60, 62, 63, 62, 63, 62, 62],
	highRiskData: [80, 81, 80, 81, 80, 79, 78, 78, 79, 79, 78, 79],
	highestRiskData: [90, 90, 91, 90, 91, 90, 90, 91, 93, 92, 93, 92],
}
