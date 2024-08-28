import { useItemsContext } from '../lib/hooks'
import AddItemForm from './AddItemForm'
import ButtonGroup from './ButtonGroup'

export default function Sidebar() {

  const { btnActions, handleAddItem } = useItemsContext()
  
  return (
    <div className='sidebar'>
      <AddItemForm onAddItem={handleAddItem} />
      <ButtonGroup btnActions={btnActions} />
    </div>
  )
}