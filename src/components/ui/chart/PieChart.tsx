import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { FC } from 'react'

export type IPieSeriesData = { name: string; y: number; sliced?: boolean; selected?: boolean }
export type IPieChart = {
  title?: string
  seriesName: string
  data: IPieSeriesData[]
  labelDistance?: number
  height?: string
}

const PieChart: FC<IPieChart> = ({ title, seriesName, data, labelDistance, height }) => {
  const series = [
    {
      name: seriesName,
      data,
    },
  ]

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      height: height || '100%',
    },
    title: {
      text: title || '',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          distance: labelDistance || -30,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series,
    credits: {
      enabled: false,
    },
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default PieChart
