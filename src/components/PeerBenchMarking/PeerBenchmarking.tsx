import { COLORS } from "../../lib/constants"
import { chartData } from "../../mocks/chartDataMocks"
import LineChart from "../LineChart/LineChart"
import "./PeerBenchmarking.scss"

const PeerBenchmarking = () => {
	return (
		<div className="peer-benchmarking">
			<p className="peer-description">
				Peer benchmarking showcases the company's cyber risk performance by
				comparing it with other companies from the same industry sector and with
				similar business models, categorizing risk from low to highest across
				five zones. It emphasizes the current risk category and the risk trend
				direction.
			</p>
			<div className="peer-legend">
				<div className="legend-item">
					<div
						className="legend-color"
						style={{
							backgroundColor: COLORS.AREA_COMPANY,
							display: "flex",
							alignItems: "center",
						}}
					>
						<div className="legend-acme" />
					</div>
					<p className="legend-text">ACME</p>
				</div>
				<div className="legend-item">
					<div
						className="legend-color"
						style={{ backgroundColor: COLORS.AREA_LOW }}
					/>
					<div className="legend-text">
						<span>LOW</span>
						<span>RISK</span>
					</div>
				</div>
				<div className="legend-item">
					<div
						className="legend-color"
						style={{ backgroundColor: COLORS.AREA_MEDIUM }}
					/>
					<div className="legend-text">
						<span>MEDIUM</span>
						<span>RISK</span>
					</div>
				</div>
				<div className="legend-item">
					<div
						className="legend-color"
						style={{ backgroundColor: COLORS.AREA_MEDIUM_HIGH }}
					/>
					<div className="legend-text">
						<span>MEDIUM/HIGH</span>
						<span>RISK</span>
					</div>
				</div>
				<div className="legend-item">
					<div
						className="legend-color"
						style={{ backgroundColor: COLORS.AREA_HIGH }}
					/>
					<div className="legend-text">
						<span>HIGH</span>
						<span>RISK</span>
					</div>
				</div>
				<div className="legend-item">
					<div
						className="legend-color"
						style={{ backgroundColor: COLORS.AREA_HIGHEST }}
					/>
					<div className="legend-text">
						<span>HIGHEST</span>
						<span>RISK</span>
					</div>
				</div>
			</div>
			<div className="legend-separator" />
			<LineChart data={chartData} />
		</div>
	)
}

export default PeerBenchmarking
