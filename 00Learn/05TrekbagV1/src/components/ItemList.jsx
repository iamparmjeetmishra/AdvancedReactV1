
export default function ItemList({items}) {
  
  return (
    <ul>
      {
        items.map(item =>
          <Item key={item.id} item={item} />
        )
      }
    </ul>
  )
}


function Item({ item }) {
  return <li className='item'>
    <label>
      <input type='checkbox' defaultChecked={item.packed} />
      {item.name}
    </label>
    <button key={item.id} >❌</button>
  </li>
}