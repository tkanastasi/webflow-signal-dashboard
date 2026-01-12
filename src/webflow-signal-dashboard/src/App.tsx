import Indicator, { IndicatorType } from './components/Indicator/Indicator'
import { SignalView } from './components/SignalView/SignalView'

function App() {
    return (
        <div>
            <div>
                <Indicator type={IndicatorType.MonthlyGrowth} />
                <Indicator type={IndicatorType.ProfitFactor} />
                <Indicator type={IndicatorType.WinRate} />
            </div>
            <div style={{ padding: "2em" }}>
                <SignalView market={"All"} />
            </div>
        </div>
    )
}

export default App
