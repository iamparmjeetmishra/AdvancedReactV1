import { useMemo, useState } from 'react'
import Select from 'react-select'
import { useItemsContext } from '../lib/hooks'

const sortingOptions = [
  {
    label: 'Sort by default',
    value: 'default'
  },
  {
    label: 'Sort by packed',
    value: 'packed'
  },
  {
    label: 'Sort by unpacked',
    value: 'unpacked'
  }
]


export default function ItemList() {
  const [sortBy, setSortBy] = useState('default')

  const { items, itemActions } = useItemsContext()
  
  console.log(items)
  // clone 
  const sortedItem = useMemo(() => [...items].sort((a, b) => {
    if (sortBy === 'packed') {
      return b.packed - a.packed
    } 
    if (sortBy === 'unpacked') {
      return a.packed - b.packed
    }

    return
  }), [items, sortBy])

  return (
    <ul className='item-list'>
      {items.length === 0 && <EmptyView />}
      {
        items.length > 0
          ? <section className="sorting">
            <Select
              options={sortingOptions}
              defaultValue={sortingOptions[0]}
              onChange={(option) => setSortBy(option.value)}
            />
          </section>
          : null
      }
      {
        sortedItem.map(item =>
          <Item itemActions={itemActions} key={item.id} item={item} />
        )
      }
    </ul>
  )
}


function Item({ item, itemActions }) {
  return <li className='item'>
    <label>
      <input
        type='checkbox'
        onChange={() => itemActions.checkedItem(item.id)}
        checked={item.packed}
      />
      {item.name}
    </label>
    <button onClick={() => itemActions.removeSingleItem(item.id)} >❌</button>
  </li>
}

function EmptyView() {
  return (
    <section className='empty-state'>
      <h3>Empty Packing List</h3>
      <p>Start by adding some items you {"don't"} want to forget.</p>
    </section>
  )
}