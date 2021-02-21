import React from "react";
import { ResponsiveLine } from '@nivo/line'

const MarketChart = (props) => {
    const data = [
        {
            "data": [
                {
                    "x": 1,
                    "y": props.data[0]
                },{
                    "x": 2,
                    "y": props.data[2]
                },{
                    "x": 3,
                    "y": props.data[3]
                },{
                    "x": 4,
                    "y": props.data[4]
                },{
                    "x": 5,
                    "y": props.data[5]
                },{
                    "x": 6,
                    "y": props.data[6]
                },
            ]
        },
    ]
    return (
        <div style={{width:'4vw',height:'3vh',display:"block"}}>
            <ResponsiveLine
                data={data}
                margin={{ top: 3, right: 3, bottom: 3, left: 3 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                enableGridX={false}
                enableGridY={false}
                colors={props.color}
                lineWidth={2}
                pointSize={3}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                areaOpacity={0.05}
                isInteractive={false}
                useMesh={true}
                animate={false}
                legends={[]}
            />
        </div>
    )
}




export default MarketChart;
