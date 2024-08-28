import { useItemsContext } from "../lib/hooks"

export default function Counter() {

  const { items } = useItemsContext()
  const numberOfItemsPacked = items.filter((item) => item.packed).length
  return <p><b>{numberOfItemsPacked}</b> / {items.length} items packed</p>
}
