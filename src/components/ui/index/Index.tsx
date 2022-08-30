import { isArray, isEmpty } from 'lodash'
import { FC } from 'react'

type IItem = { title: string; value: number | string }
type IIndex = { items: IItem[] }

const Index: FC<IIndex> = ({ items }) => {
  if (isEmpty(items) || !isArray(items)) return null

  return (
    <div className="space-y-4 py-4">
      {items.map((item) => (
        <div key={item.title} className="flex items-center justify-between text-brand text-lg">
          <div>{item.title}</div>
          <div className="text-brand-500 font-semibold">{item.value}</div>
        </div>
      ))}
    </div>
  )
}

export default Index
