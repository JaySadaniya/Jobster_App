import { isArray, isEmpty, isString } from 'lodash'
import { FC, ReactElement } from 'react'
import cx from 'classnames'

export type IStatInfo = { id?: string | number; title: string | ReactElement; stat: string | ReactElement }
export type IStat = { stats: IStatInfo[]; statFontSize?: string }

const Stats: FC<IStat> = ({ stats, statFontSize }) => {
  const cols = stats.length || 1

  const styles = {
    'text-3xl': statFontSize === 'medium',
    'text-5xl': statFontSize !== 'medium',
    grids: {
      'sm:grid-cols-1': cols === 1,
      'sm:grid-cols-2': cols === 2,
      'sm:grid-cols-3': cols === 3,
      'sm:grid-cols-4': cols === 4,
      'sm:grid-cols-5': cols === 5,
      'sm:grid-cols-6': cols === 6,
    },
  }

  return (
    <dl className={cx(styles.grids, 'rounded-lg bg-white shadow-lg sm:grid')}>
      {!isEmpty(stats) &&
        isArray(stats) &&
        stats.map((stat, index) => (
          <div
            key={stat.id ? stat.id : isString(stat.title) ? stat.title : index}
            className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r"
          >
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{stat.title}</dt>
            <dd className={cx(styles, `order-1 font-extrabold text-brand-600`)}>{stat.stat}</dd>
          </div>
        ))}
    </dl>
  )
}

export default Stats
