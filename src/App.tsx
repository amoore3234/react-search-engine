import { useState } from 'react'
import { DebounceSearchEngine } from './component/DebounceSearchEngine'
import { SearchEngine } from './component/SearchEngine'

export type Food = {
  id: string,
  name: string,
  type: 'Dairy' | 'Poultry' | 'Vegetables'
}

export default function App() {
  const foodOne: Food = {
    id: '1',
    name: 'Spinach',
    type: 'Vegetables',
  }

  const foodTwo: Food = {
    id: '2',
    name: 'Chicken',
    type: 'Poultry'
  }

  const foodThree: Food = {
    id: '3',
    name: 'Milk',
    type: 'Dairy'
  }
  const foods: Food[] = [foodOne, foodTwo, foodThree]
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchExecution(query: string) {
    console.log("Debounced search fired with:", query);
    setSearchQuery(query);
  }
  return (
    <div>
      <SearchEngine foods={foods} />
      <DebounceSearchEngine onSearch={handleSearchExecution} />

      <p>Current search value: {searchQuery}</p>
    </div>
  )
}