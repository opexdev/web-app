import React from "react";
import { ResponsiveLine } from '@nivo/line'

const MarketChart = (props) => {
    const data = [
        {
            "id": "japan",
            "color": "hsl(213, 70%, 50%)",
            "data": [
                {
                    "x": "plane",
                    "y": 95
                },
                {
                    "x": "helicopter",
                    "y": 182
                },
                {
                    "x": "boat",
                    "y": 157
                },
                {
                    "x": "train",
                    "y": 259
                },
                {
                    "x": "subway",
                    "y": 105
                },
                {
                    "x": "bus",
                    "y": 255
                },
                {
                    "x": "car",
                    "y": 157
                },
                {
                    "x": "moto",
                    "y": 160
                },
                {
                    "x": "bicycle",
                    "y": 162
                },
                {
                    "x": "horse",
                    "y": 93
                },
                {
                    "x": "skateboard",
                    "y": 196
                },
                {
                    "x": "others",
                    "y": 26
                }
            ]
        },
    ]
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            colors={{ scheme: 'category10' }}
            lineWidth={3}
            pointSize={9}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            areaOpacity={0.05}
            useMesh={true}
            legends={[]}
        />
    )
}




export default MarketChart;
