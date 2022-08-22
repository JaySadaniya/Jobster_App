import { FC } from 'react'
import Highcharts from 'highcharts/highcharts.js'
import highchartsMore from 'highcharts/highcharts-more.js'
import solidGauge from 'highcharts/modules/solid-gauge.js'
import HighchartsReact from 'highcharts-react-official'

highchartsMore(Highcharts)
solidGauge(Highcharts)

type IGuageSeriesData = { color: Highcharts.Color; radius: string; innerRadius: string; y: number }
type IGaugeChart = { text?: string; data: IGuageSeriesData[]; seriesName?: string; height?: string }

const GaugeChart: FC<IGaugeChart> = ({ text, height, seriesName, data }) => {
  const background = (data || []).map((item) => ({
    outerRadius: item.radius,
    innerRadius: item.innerRadius,
    backgroundColor: Highcharts.color(item.color.get()).setOpacity(0.3).get('rgba'),
    borderWidth: 0,
  }))

  let dataSet = (data || []).map((item) => ({ ...item, color: item.color.get() }))

  const options = {
    chart: {
      type: 'solidgauge',
      height: height || '100%',
    },

    title: {
      text: text || '',
    },

    tooltip: {
      enabled: false,
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
      background,
    },

    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.y:.1f}%',
          style: {
            fontSize: '24px',
            fontWeight: '200',
          },
          borderWidth: 0,
          y: -15,
        },
        linecap: 'round',
        stickyTracking: false,
        rounded: true,
      },
    },

    series: [
      {
        name: seriesName || '',
        data: dataSet,
      },
    ],
    credits: {
      enabled: false,
    },
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default GaugeChart
